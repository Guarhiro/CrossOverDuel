// Run: node scripts/simulate-goodnight-world-cards.cjs [seeds-per-first=10]
// Production rules and AI, seeded paired decks, private in-memory storage only.
const fs = require('node:fs');
const { createDuelVm, writeReport, hash } = require('./duel-vm.cjs');

function replaceCards(deck, replacements) {
  const result = [...deck];
  for (const [from, to] of replacements) {
    const index = result.indexOf(from);
    if (index < 0) throw new Error(`missing replacement source ${from}`);
    result[index] = to;
  }
  return result;
}

function emptyGroup() {
  return { games: 0, wins: 0, timeouts: 0, rounds: 0, metrics: { player: {}, ai: {} } };
}

function accumulate(group, row) {
  group.games++;
  group.wins += row.winner === 'player';
  group.timeouts += row.winner === 'timeout';
  group.rounds += row.rounds;
  for (const owner of ['player', 'ai']) {
    for (const [name, count] of Object.entries(row.metrics[owner])) {
      group.metrics[owner][name] = (group.metrics[owner][name] || 0) + count;
    }
  }
}

function summarize(group) {
  return { games: group.games, playerWins: group.wins, playerWinRate: +(100 * group.wins / group.games).toFixed(2), timeouts: group.timeouts, avgRounds: +(group.rounds / group.games).toFixed(2), metrics: group.metrics };
}

async function main() {
  const reps = Number(process.argv[2] || 10);
  if (!Number.isInteger(reps) || reps < 1 || reps > 100) throw new Error('seeds-per-first must be an integer from 1 to 100');
  const duel = createDuelVm({ driver: true, updatedBot: true });
  // These wrappers observe actual rule resolution without changing any rule result.
  duel.run(`
    let goodnightMetrics;
    let goodnightAttackCounts;
    let goodnightViolations;
    let goodnightCurrentAttack = null;
    function resetGoodnightObservations() {
      const metrics = () => ({ emperorSummons: 0, linaSummons: 0, emperorNormalAttacks: 0, velocityGranted: 0, velocityUsed: 0, velocityDamagingHits: 0, slowApplications: 0, slowTurns: 0 });
      goodnightMetrics = { player: metrics(), ai: metrics() };
      goodnightAttackCounts = new Map();
      goodnightViolations = [];
      goodnightCurrentAttack = null;
    }
    const goodnightOriginalPlay = playCharacterFromHand;
    playCharacterFromHand = function(player, handIndex, ...args) {
      const card = player.hand[handIndex];
      const result = goodnightOriginalPlay(player, handIndex, ...args);
      if (result && goodnightMetrics) {
        if (card.id === 'C73') goodnightMetrics[player.key].emperorSummons++;
        if (card.id === 'C74') goodnightMetrics[player.key].linaSummons++;
      }
      return result;
    };
    const goodnightOriginalStatus = setStatus;
    setStatus = function(card, key, value) {
      const before = card?.status?.[key] || 0;
      const result = goodnightOriginalStatus(card, key, value);
      if (goodnightMetrics && result && key === 'slow' && value > 0 && before === 0) {
        const sourceKey = opponentOf(state[card.ownerKey]).key;
        goodnightMetrics[sourceKey].slowApplications++;
      }
      return result;
    };
    const goodnightOriginalStart = startTurn;
    startTurn = function(player, ...args) {
      const result = goodnightOriginalStart(player, ...args);
      if (goodnightMetrics) {
        const sourceKey = opponentOf(player).key;
        goodnightMetrics[sourceKey].slowTurns += boardCards(player).filter(card => card.status.slow > 0).length;
      }
      return result;
    };
    const goodnightOriginalAfterAttack = afterAttackEffects;
    afterAttackEffects = function(attacker, owner, ...args) {
      const before = attacker.velocityAttackUsed;
      const result = goodnightOriginalAfterAttack(attacker, owner, ...args);
      if (goodnightMetrics && attacker.id === 'C73' && !before && attacker.velocityAttackUsed) goodnightMetrics[owner.key].velocityGranted++;
      return result;
    };
    const goodnightOriginalDamage = damageCharacter;
    damageCharacter = function(card, amount, sourcePlayer, options = {}) {
      const previousDef = card ? effectiveDef(card) : 0;
      const previousHp = card?.currentHp || 0;
      const result = goodnightOriginalDamage(card, amount, sourcePlayer, options);
      const targetLoss = card ? Math.max(0, previousDef - effectiveDef(card)) + Math.max(0, previousHp - card.currentHp) : 0;
      if (goodnightMetrics && goodnightCurrentAttack?.followup && card === goodnightCurrentAttack.target && !options.transferred && options.attacker?.id === 'C73' && targetLoss > 0) {
        goodnightMetrics[options.attacker.ownerKey].velocityDamagingHits++;
      }
      return result;
    };
    const goodnightOriginalAttack = performAttack;
    performAttack = async function(attacker, target, options = {}) {
      const owner = state[attacker.ownerKey];
      const legal = owner && !state.gameOver && (!state.busy || options.allowWhileBusy) && canAttack(attacker, owner)
        && getLegalTargets(attacker, owner).some(item => item.type === target?.type && (item.type === 'lp' || item.card === target.card));
      const followup = legal && attacker.id === 'C73' && attacker.velocityTargetId !== null;
      if (goodnightMetrics && legal && attacker.id === 'C73') {
        goodnightMetrics[owner.key].emperorNormalAttacks++;
        if (followup) goodnightMetrics[owner.key].velocityUsed++;
        const key = owner.key + '|' + owner.turns + '|' + attacker.instanceId;
        const count = (goodnightAttackCounts.get(key) || 0) + 1;
        goodnightAttackCounts.set(key, count);
        if (count > 2) goodnightViolations.push({ type: 'more-than-two-attacks', key, count });
        if (followup && (target.type !== 'card' || target.card.instanceId !== attacker.velocityTargetId)) goodnightViolations.push({ type: 'redirected-followup', key });
      }
      const previous = goodnightCurrentAttack;
      goodnightCurrentAttack = { followup, target: target?.card };
      try { return await goodnightOriginalAttack(attacker, target, options); }
      finally { goodnightCurrentAttack = previous; }
    };
  `);

  const originalDecks = duel.run('JSON.stringify({ player: PLAYER_DECK, ai: AI_DECKS })');
  const deckDefinitions = {};
  for (const name of ['AGGRO', 'GUARD_WALL', 'MARG_CHIP']) deckDefinitions[name] = Array.from(duel.run(`window.__duel.decks.${name}`));
  const replacementPlans = {
    AGGRO: [['C55', 'C73'], ['C56', 'C74'], ['C56', 'C74']],
    GUARD_WALL: [['C47', 'C73'], ['C40', 'C74'], ['C40', 'C74']],
    MARG_CHIP: [['C09', 'C73'], ['C38', 'C74'], ['C38', 'C74']],
  };
  const opponents = [
    { key: 'Lv11', level: 11, deck: Array.from(duel.run('AI_DECKS.find(profile => profile.level === 11).deck')), override: false },
    { key: 'Custom Marg Chip', level: 11, deck: deckDefinitions.MARG_CHIP, override: true },
  ];
  const configs = [];
  for (const [family, base] of Object.entries(deckDefinitions)) {
    for (const linaCopies of [0, 1, 2]) {
      const substitutions = linaCopies ? replacementPlans[family].slice(0, linaCopies + 1) : [];
      const deck = replaceCards(base, substitutions);
      for (const opponent of opponents) configs.push({ family, variant: linaCopies ? `C73x1+C74x${linaCopies}` : 'baseline', deck, substitutions, opponent });
    }
  }

  for (const cfg of configs) {
    for (const [side, deck] of [['player', cfg.deck], ['opponent', cfg.opponent.deck]]) {
      duel.context.goodnightValidationDeck = deck;
      const valid = duel.run(`isValidDeckIds(goodnightValidationDeck, Object.fromEntries(ALL_CARDS.map(card => [card.id, 4])))`);
      if (!valid) throw new Error(`illegal ${side} deck in ${cfg.family} ${cfg.variant} vs ${cfg.opponent.key}`);
    }
  }

  const rows = [];
  for (let repeat = 0; repeat < reps; repeat++) {
    for (const [familyIndex, family] of Object.keys(deckDefinitions).entries()) {
      for (const [opponentIndex, opponent] of opponents.entries()) {
        for (const first of ['player', 'ai']) {
          // All three versions of a deck use the same initial seed and first order.
          const seed = 731640 + repeat * 7919 + familyIndex * 104729 + opponentIndex * 15485863;
          for (const cfg of configs.filter(item => item.family === family && item.opponent.key === opponent.key)) {
            duel.context.goodnightSimulationConfig = { ...cfg, seed, first };
            const result = await duel.run(`(async () => {
              Math.random = seededRandom(goodnightSimulationConfig.seed);
              resetGoodnightObservations();
              window.__simulationOpponentOverride = goodnightSimulationConfig.opponent.override
                ? { level: 11, wins: 55, name: 'Custom Marg Chip (simulation only)', deck: goodnightSimulationConfig.opponent.deck }
                : null;
              const result = await window.__duel.playGame({ deck: goodnightSimulationConfig.deck, aiLevel: 11, forceFirst: goodnightSimulationConfig.first });
              if (state.pendingCardChoice) throw new Error('unresolved automatic character choice');
              return { ...result, metrics: JSON.parse(JSON.stringify(goodnightMetrics)), violations: goodnightViolations };
            })()`);
            if (result.violations.length) throw new Error(`rule audit failed: ${JSON.stringify(result.violations)}`);
            if (result.first !== first) throw new Error('requested first order was not respected');
            rows.push({ family, variant: cfg.variant, opponent: opponent.key, seed, ...result });
          }
        }
      }
    }
    if ((repeat + 1) % 2 === 0) console.log(JSON.stringify({ completed: rows.length, total: configs.length * reps * 2 }));
  }
  if (duel.run('JSON.stringify({ player: PLAYER_DECK, ai: AI_DECKS })') !== originalDecks) throw new Error('production deck definitions changed');

  const grouped = {};
  const byVariant = {};
  const totals = emptyGroup();
  for (const row of rows) {
    const key = `${row.family}|${row.variant}|${row.opponent}`;
    const group = grouped[key] ||= { ...emptyGroup(), first: { player: emptyGroup(), ai: emptyGroup() } };
    accumulate(group, row);
    accumulate(group.first[row.first], row);
    accumulate(byVariant[row.variant] ||= emptyGroup(), row);
    accumulate(totals, row);
  }
  const summary = Object.entries(grouped).map(([matchup, group]) => ({ matchup, ...summarize(group), first: { player: summarize(group.first.player), ai: summarize(group.first.ai) } }));
  const pairedComparisons = [];
  for (const family of Object.keys(deckDefinitions)) {
    for (const opponent of opponents) {
      const baseline = new Map(rows.filter(row => row.family === family && row.opponent === opponent.key && row.variant === 'baseline').map(row => [`${row.seed}|${row.first}`, row]));
      for (const variant of ['C73x1+C74x1', 'C73x1+C74x2']) {
        const selected = rows.filter(row => row.family === family && row.opponent === opponent.key && row.variant === variant);
        let bothWin = 0, bothLose = 0, gainedWins = 0, lostWins = 0, baselineWins = 0, variantWins = 0;
        for (const row of selected) {
          const prior = baseline.get(`${row.seed}|${row.first}`);
          if (!prior) throw new Error('paired baseline missing');
          const before = prior.winner === 'player', after = row.winner === 'player';
          baselineWins += before;
          variantWins += after;
          if (before && after) bothWin++;
          else if (!before && !after) bothLose++;
          else if (after) gainedWins++;
          else lostWins++;
        }
        pairedComparisons.push({ family, opponent: opponent.key, variant, pairedGames: selected.length, baselineWins, variantWins, winRateChangePoints: +(100 * (variantWins - baselineWins) / selected.length).toFixed(2), bothWin, bothLose, gainedWins, lostWins });
      }
    }
  }
  const report = {
    date: '2026-10-16',
    type: 'seeded paired production-rule AI integration for C73/C74',
    hashes: { ...duel.hashes, 'scripts/simulate-goodnight-world-cards.cjs': hash(fs.readFileSync(__filename, 'utf8')) },
    seedsPerFirst: reps,
    totalGames: rows.length,
    totals: summarize(totals),
    byVariant: Object.fromEntries(Object.entries(byVariant).map(([variant, group]) => [variant, summarize(group)])),
    storageIsolation: 'private in-memory VM Map; no browser saves or user collection touched',
    storageAudit: duel.storageAudit,
    legalDecksAndCopyLimits: true,
    existingProductionDeckDefinitionsUnchanged: true,
    ruleAuditViolations: rows.reduce((count, row) => count + row.violations.length, 0),
    playerBot: 'Existing simulation bot, common choice-aware harness adjustments, and minimal velocity-progress fix; identical for baselines and variants.',
    opponentBot: 'Current production AI; custom Marg Chip is a VM profile override only.',
    metrics: { velocityGranted: 'Actual false-to-true grant after production afterAttackEffects.', velocityUsed: 'Legal follow-up attack declarations including reflected attacks.', velocityDamagingHits: 'Follow-up normal-attack damage packets with positive actual DEF or HP damage.', slowApplications: 'New successful Slow states applied by production setStatus, attributed to the other side.', slowTurns: 'Slowed targets still present when their own turn begins.' },
    decks: configs.map(({ family, variant, deck, substitutions, opponent }) => ({ family, variant, deck, substitutions, opponent: opponent.key })),
    opponents,
    summary,
    pairedComparisons,
    limitations: ['These explicit replacement decks and deterministic bots do not establish human-play balance or a metagame tier.', 'Each matchup has only ' + (reps * 2) + ' games, evenly split first/second; small differences are noisy.', 'Substitutions change existing roles, cost curves and combinations, so the result does not isolate either new card alone.', 'The player bot favors direct LP attacks when no guard exists, and therefore does not optimize all Velocity opportunities.', 'Only rules and AI run headlessly; rendered cards, browser input, sound and deployment are separate checks.'],
  };
  const target = writeReport('goodnight-world-card-simulation-2026-10-16.json', report);
  console.log(JSON.stringify({ totalGames: report.totalGames, totals: report.totals, byVariant: report.byVariant, pairedComparisons, report: target }, null, 2));
  if (totals.timeouts) process.exitCode = 1;
}

main().catch(error => { console.error(error); process.exitCode = 1; });
