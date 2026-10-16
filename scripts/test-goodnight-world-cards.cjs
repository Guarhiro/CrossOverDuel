// Run: node scripts/test-goodnight-world-cards.cjs
// Loads current production rules in the existing isolated duel harness.
const fs = require('node:fs');
const { createDuelVm, writeReport, hash } = require('./duel-vm.cjs');
const cases = [];
const test = (name, run) => cases.push({ name, run });

test('both new cards retain their approved names, series, stats and roles', () => {
  const expected = {
    C73: ['ペルセポネ', 'UR', 'AT', 6, 5, 2, 5],
    C74: ['リナ', 'SR', 'SP', 3, 2, 1, 4],
  };
  for (const [id, values] of Object.entries(expected)) {
    const card = CARD_DB.get(id);
    assert.ok(card, `${id} must be in the real card catalog`);
    assert.equal(card.series, 'グッドナイトワールド');
    assert.equal(card.element, '無');
    assert.deepEqual([card.name, card.rarity, card.role, card.cost, card.atk, card.def, card.hp], values);
  }
  assert.equal(CHARACTERS.length, 74);
  assert.equal(SUPPORTS.length, 16);
  assert.equal(CARD_DB.get('C73').haste, true);
});

test('instances initialize independent velocity and slow state', () => {
  const first = createInstance(CARD_DB.get('C73'), 'player');
  const second = createInstance(CARD_DB.get('C73'), 'player');
  const lina = createInstance(CARD_DB.get('C74'), 'player');
  for (const card of [first, second, lina]) assert.equal(card.status.slow, 0);
  assert.equal(first.velocityAttackUsed, false);
  assert.equal(first.velocityTargetId, null);
  first.velocityAttackUsed = true;
  first.velocityTargetId = 'a-different-instance';
  first.status.slow = 1;
  assert.equal(second.velocityAttackUsed, false);
  assert.equal(second.velocityTargetId, null);
  assert.equal(second.status.slow, 0);
});

test('Persephone attacks immediately but never LP on her placement turn', async () => {
  const enemy = testPlace('C05', 'ai');
  const emperor = testSummon('C73', 'player', 'front');
  state.phase = 'battle';
  assert.equal(canAttack(emperor, state.player), true);
  assert.equal(getLegalTargets(emperor, state.player).some(target => target.type === 'lp'), false);
  await testAttack(emperor, { type: 'card', card: enemy });
  assert.equal(enemy.currentDef, 0);
  assert.equal(enemy.currentHp, 6);
  assert.equal(emperor.velocityAttackUsed, true);
  assert.equal(emperor.velocityTargetId, enemy.instanceId);
  assert.equal(canAttack(emperor, state.player), true);
  await testAttack(emperor, { type: 'card', card: enemy });
  assert.equal(enemy.currentHp, 1);
  assert.equal(canAttack(emperor, state.player), false);
  assert.equal(state.ai.lp, 20);
});

test('DEF-only damage activates exactly one same-target follow-up', async () => {
  const enemy = testPlace('C03', 'ai');
  const emperor = testPlace('C73');
  const decoy = testPlace('C35', 'ai', 'back');
  await testAttack(emperor, { type: 'card', card: enemy });
  assert.deepEqual([enemy.currentDef, enemy.currentHp], [1, 7]);
  assert.equal(emperor.attacked, false);
  const targets = getLegalTargets(emperor, state.player);
  assert.equal(targets.length, 1);
  assert.equal(targets[0].card, enemy);
  assert.equal(targets.some(target => target.card === decoy || target.type === 'lp'), false);
  await testAttack(emperor, { type: 'card', card: enemy });
  assert.deepEqual([enemy.currentDef, enemy.currentHp], [0, 4]);
  assert.equal(emperor.velocityAttackUsed, true);
  assert.equal(canAttack(emperor, state.player), false);
  await performAttack(emperor, { type: 'card', card: enemy });
  assert.deepEqual([enemy.currentDef, enemy.currentHp], [0, 4], 'direct calls also cannot bypass the two-attack cap');
});

test('a first-hit removal gives no new enemy or LP attack', async () => {
  const enemy = testPlace('C35', 'ai');
  const survivor = testPlace('C05', 'ai', 'front', 1);
  survivor.tags = [];
  const emperor = testPlace('C73');
  await testAttack(emperor, { type: 'card', card: enemy });
  assert.equal(findCardLocation(enemy), null);
  assert.equal(canAttack(emperor, state.player), false);
  assert.equal(emperor.attacked, true);
  assert.equal(emperor.velocityAttackUsed, false);
  assert.equal(emperor.velocityTargetId, null);
  assert.equal(survivor.currentDef, survivor.def);
  assert.equal(state.ai.lp, 20);
});

test('ordinary LP attacks on later turns do not create a follow-up', async () => {
  const emperor = testPlace('C73');
  await testAttack(emperor, { type: 'lp', player: state.ai });
  assert.equal(state.ai.lp, 15);
  assert.equal(emperor.velocityAttackUsed, false);
  assert.equal(emperor.velocityTargetId, null);
  assert.equal(canAttack(emperor, state.player), false);
});

test('Albert interception with no original target DEF or HP loss gives no follow-up', async () => {
  const emperor = testPlace('C73');
  const target = testPlace('C35', 'ai');
  target.currentDef = 0;
  const albert = testPlace('C25', 'ai', 'back');
  await testAttack(emperor, { type: 'card', card: target });
  assert.deepEqual([target.currentDef, target.currentHp], [0, 3]);
  assert.equal(albert.interceptUsed, true);
  assert.equal(emperor.velocityAttackUsed, false);
  assert.equal(emperor.velocityTargetId, null);
  assert.equal(canAttack(emperor, state.player), false);
});

test('Albert interception still permits velocity when original target DEF was lost', async () => {
  const emperor = testPlace('C73');
  const target = testPlace('C35', 'ai');
  const albert = testPlace('C25', 'ai', 'back');
  await testAttack(emperor, { type: 'card', card: target });
  assert.deepEqual([target.currentDef, target.currentHp], [0, 3]);
  assert.equal(albert.interceptUsed, true);
  assert.equal(emperor.velocityAttackUsed, true);
  assert.equal(emperor.velocityTargetId, target.instanceId);
  assert.equal(canAttack(emperor, state.player), true);
  await testAttack(emperor, { type: 'card', card: target });
  assert.equal(findCardLocation(target), null);
  assert.equal(canAttack(emperor, state.player), false);
});

test('a surviving last-stand target can be hit twice without a kill chain', async () => {
  const emperor = testPlace('C73');
  const target = testPlace('C49', 'ai');
  const other = testPlace('C35', 'ai', 'back');
  await testAttack(emperor, { type: 'card', card: target });
  assert.equal(target.currentHp, 1);
  assert.equal(target.lastStandUsed, true);
  assert.equal(canAttack(emperor, state.player), true);
  await testAttack(emperor, { type: 'card', card: target });
  assert.equal(findCardLocation(target), null);
  assert.equal(canAttack(emperor, state.player), false);
  assert.equal(other.currentHp, other.hp);
});

test('target departure cannot redirect the follow-up to a replacement instance', async () => {
  const emperor = testPlace('C73');
  const original = testPlace('C05', 'ai');
  await testAttack(emperor, { type: 'card', card: original });
  destroyCharacter(original, state.player);
  const replacement = testPlace('C05', 'ai');
  assert.notEqual(replacement.instanceId, original.instanceId);
  assert.equal(getLegalTargets(emperor, state.player).length, 0);
  assert.equal(canAttack(emperor, state.player), false);
  await performAttack(emperor, { type: 'card', card: replacement });
  assert.deepEqual([replacement.currentDef, replacement.currentHp], [5, 6]);
});

test('a follow-up rechecks guards and cannot retain Neiras one-attack bypass', async () => {
  const emperor = testPlace('C73');
  const guard = testPlace('C03', 'ai');
  const rear = testPlace('C05', 'ai', 'back');
  testSummon('C71');
  testChoose(emperor);
  await testAttack(emperor, { type: 'card', card: rear });
  assert.equal(rear.currentDef, 0);
  assert.equal(emperor.velocityTargetId, rear.instanceId);
  assert.equal(activeGuards(state.ai).includes(guard), true);
  assert.equal(getLegalTargets(emperor, state.player).length, 0);
  assert.equal(canAttack(emperor, state.player), false);
});

test('a newly active guard blocks redirection instead of becoming a follow-up target', async () => {
  const emperor = testPlace('C73');
  const original = testPlace('C05', 'ai');
  original.tags = [];
  await testAttack(emperor, { type: 'card', card: original });
  const guard = testPlace('C03', 'ai', 'front', 1);
  assert.equal(getLegalTargets(emperor, state.player).length, 0);
  await performAttack(emperor, { type: 'card', card: guard });
  assert.deepEqual([guard.currentDef, guard.currentHp], [5, 7]);
  assert.equal(original.currentHp, 6);
});

test('S08 reflection consumes the first attack without velocity even if emperor survives', async () => {
  const emperor = testPlace('C73');
  emperor.currentHp = emperor.maxHp = 8;
  const target = testPlace('C05', 'ai');
  state.ai.counterAttack = 1;
  await testAttack(emperor, { type: 'card', card: target });
  assert.equal(emperor.currentHp, 3);
  assert.equal(emperor.attacked, true);
  assert.equal(emperor.velocityAttackUsed, false);
  assert.equal(emperor.velocityTargetId, null);
  assert.deepEqual([target.currentDef, target.currentHp], [5, 6]);
});

test('an attacker killed by a retaliation skill cannot gain a follow-up', async () => {
  const emperor = testPlace('C73');
  emperor.currentHp = 2;
  const retaliator = testPlace('C40', 'ai');
  retaliator.currentHp = retaliator.maxHp = 6;
  await testAttack(emperor, { type: 'card', card: retaliator });
  assert.equal(findCardLocation(emperor), null);
  assert.equal(retaliator.currentHp, 3);
  assert.equal(emperor.velocityAttackUsed, false);
  assert.equal(emperor.velocityTargetId, null);
});

test('zero ATK cannot begin a velocity sequence', () => {
  const emperor = testPlace('C73');
  testPlace('C05', 'ai');
  emperor.currentAtk = 0;
  state.phase = 'battle';
  assert.equal(canAttack(emperor, state.player), false);
  assert.equal(emperor.velocityAttackUsed, false);
});

test('a reflected second hit never generates a third hit', async () => {
  const emperor = testPlace('C73');
  emperor.currentHp = emperor.maxHp = 8;
  const target = testPlace('C05', 'ai');
  await testAttack(emperor, { type: 'card', card: target });
  state.ai.counterAttack = 1;
  await testAttack(emperor, { type: 'card', card: target });
  assert.equal(emperor.currentHp, 3);
  assert.equal(emperor.velocityAttackUsed, true);
  assert.equal(canAttack(emperor, state.player), false);
  assert.equal(target.currentHp, 6);
});

test('own-turn start resets a skipped velocity opportunity without extra LP hits', async () => {
  const emperor = testPlace('C73');
  const target = testPlace('C05', 'ai');
  await testAttack(emperor, { type: 'card', card: target });
  endTurn(state.player);
  startTurn(state.ai);
  assert.equal(emperor.velocityAttackUsed, true);
  startTurn(state.player);
  assert.equal(emperor.velocityAttackUsed, false);
  assert.equal(emperor.velocityTargetId, null);
  assert.equal(emperor.attacked, false);
  target.tags = [];
  const lpBefore = state.ai.lp;
  await testAttack(emperor, { type: 'lp', player: state.ai });
  assert.equal(state.ai.lp, lpBefore - 5);
  assert.equal(canAttack(emperor, state.player), false);
});

test('Nox stops placement haste and stops a mature emperor from gaining velocity', async () => {
  const emperor = testPlace('C73');
  const target = testPlace('C05', 'ai');
  emperor.summonedOnTurn = state.player.turns;
  emperor.status.periodicStop = 1;
  state.phase = 'battle';
  assert.equal(hasActiveHaste(emperor), false);
  assert.equal(canAttack(emperor, state.player), false);
  emperor.summonedOnTurn = 1;
  await testAttack(emperor, { type: 'card', card: target });
  assert.equal(canAttack(emperor, state.player), false);
  assert.equal(emperor.velocityAttackUsed, false);
});

test('Nox applied between hits suspends a pending follow-up', async () => {
  const emperor = testPlace('C73');
  const target = testPlace('C05', 'ai');
  await testAttack(emperor, { type: 'card', card: target });
  emperor.status.periodicStop = 1;
  assert.equal(canAttack(emperor, state.player), false);
  assert.equal(canJoinUpcomingAttack(emperor, state.player), false);
  assert.equal(getLegalTargets(emperor, state.player).length, 0);
});

test('ordinary generic silence retains existing haste and attack-trigger compatibility', async () => {
  const emperor = testPlace('C73');
  emperor.status.silenced = 1;
  emperor.summonedOnTurn = state.player.turns;
  const target = testPlace('C05', 'ai');
  assert.equal(hasActiveHaste(emperor), true);
  await testAttack(emperor, { type: 'card', card: target });
  assert.equal(emperor.velocityAttackUsed, true);
  assert.equal(canAttack(emperor, state.player), true);
});

test('AI naturally performs the same legal target follow-up and then stops', async () => {
  const emperor = testPlace('C73', 'ai');
  const guard = testPlace('C05');
  testPlace('C51', 'player', 'back');
  state.current = 'ai';
  state.phase = 'battle';
  const first = chooseAiBattleAction(state.ai.front.filter(card => canAttack(card, state.ai)));
  assert.equal(first.attacker, emperor);
  assert.equal(first.target.card, guard);
  await performAttack(first.attacker, first.target);
  const second = chooseAiBattleAction(state.ai.front.filter(card => canAttack(card, state.ai)));
  assert.equal(second.attacker, emperor);
  assert.equal(second.target.card, guard);
  await performAttack(second.attacker, second.target);
  assert.equal(chooseAiBattleAction(state.ai.front.filter(card => canAttack(card, state.ai))), null);
  assert.equal(state.player.lp, 20);
  assert.equal(guard.currentHp, 1);
});

test('Lina targets exactly one selected eligible enemy front character', () => {
  const first = testPlace('C01', 'ai', 'front', 0);
  const second = testPlace('C05', 'ai', 'front', 1);
  const rear = testPlace('C51', 'ai', 'back');
  testSummon('C74');
  assert.equal(state.pendingCardChoice.options.length, 2);
  assert.equal(state.pendingCardChoice.options.some(option => option.card === rear), false);
  testChoose(second);
  assert.equal(second.status.slow, 1);
  assert.equal(first.status.slow, 0);
  assert.equal(rear.status.slow, 0);
  state.current = 'ai';
  state.phase = 'battle';
  assert.equal(canAttack(second, state.ai), false);
  assert.equal(canJoinUpcomingAttack(second, state.ai), false);
  assert.equal(canAttack(first, state.ai), true);
});

test('slow preserves guard and actual start-of-turn skills', () => {
  const guard = testPlace('C21', 'ai');
  const rena = testPlace('C01', 'ai', 'front', 1);
  testSummon('C74');
  testChoose(guard);
  assert.equal(activeGuards(state.ai).includes(guard), true);
  assert.equal(guard.status.stun, 0);
  assert.equal(guard.status.guardOff, 0);
  state.player.energy = 10;
  testSummon('C74', 'player', 'back', 1);
  testChoose(rena);
  const before = rena.currentAtk;
  startTurn(state.ai);
  assert.equal(rena.currentAtk, before + 1);
  assert.equal(activeGuards(state.ai).includes(guard), true);
  state.phase = 'battle';
  assert.equal(canAttack(rena, state.ai), false);
});

test('slow lasts through exactly the next enemy turn and survives source retreat', () => {
  const enemy = testPlace('C01', 'ai');
  const lina = testSummon('C74');
  testChoose(enemy);
  destroyCharacter(lina, state.ai);
  endTurn(state.player);
  assert.equal(enemy.status.slow, 1);
  startTurn(state.ai);
  state.phase = 'battle';
  assert.equal(canAttack(enemy, state.ai), false);
  endTurn(state.ai);
  assert.equal(enemy.status.slow, 0);
  startTurn(state.player);
  endTurn(state.player);
  startTurn(state.ai);
  state.phase = 'battle';
  assert.equal(canAttack(enemy, state.ai), true);
});

test('Lina respects immunity and has no legal target when only rear characters remain', () => {
  const immune = testPlace('C61', 'ai');
  const rear = testPlace('C01', 'ai', 'back');
  testSummon('C74');
  assert.equal(state.pendingCardChoice, null);
  assert.equal(immune.status.slow, 0);
  assert.equal(rear.status.slow, 0);
  assert.equal(setStatus(immune, 'slow', 1), false);
  assert.equal(immune.status.slow, 0);
});

test('Lina can decline placement slow without consuming a target', () => {
  const enemy = testPlace('C01', 'ai');
  testSummon('C74');
  testSkip();
  assert.equal(enemy.status.slow, 0);
  assert.equal(state.pendingCardChoice, null);
});

test('fixed slow does not gain extra targets or duration from S04 or Sophia', () => {
  const first = testPlace('C01', 'ai');
  const second = testPlace('C05', 'ai', 'front', 1);
  state.player.nextBackSkillDouble = true;
  const lina = testSummon('C74');
  lina.nextSkillMultiplier = 2;
  testChoose(first);
  assert.equal(first.status.slow, 1);
  assert.equal(second.status.slow, 0);
  assert.equal(lina.nextSkillMultiplier, 2);
});

test('slow is a shared negative status cleared by both full and single cleanses', () => {
  const ally = testPlace('C01');
  assert.equal(setStatus(ally, 'slow', 1), true);
  assert.equal(hasNegativeStatus(ally), true);
  assert.equal(clearOneStatusFromAlly(state.player), true);
  assert.equal(ally.status.slow, 0);
  setStatus(ally, 'slow', 1);
  assert.equal(clearAllStatuses(ally), true);
  assert.equal(ally.status.slow, 0);
  assert.equal(hasNegativeStatus(ally), false);
});

test('Kanon placement and active cleanses both remove slow without changing stats', () => {
  const ally = testPlace('C01');
  ally.currentHp = 2;
  ally.currentDef = 0;
  ally.status.slow = 1;
  const kanon = testSummon('C72');
  testChoose(ally);
  assert.equal(ally.status.slow, 0);
  assert.deepEqual([ally.currentAtk, ally.currentDef, ally.currentHp], [7, 0, 2]);
  ally.status.slow = 1;
  assert.equal(requestKanonCleanse(kanon, state.player), true);
  testChoose(ally);
  assert.equal(ally.status.slow, 0);
});

test('C50 placement and C56 after-attack cleanse recognize slow', async () => {
  const ally = testPlace('C01');
  ally.status.slow = 1;
  testSummon('C50');
  assert.equal(ally.status.slow, 0);
  ally.status.slow = 1;
  const sprinter = testPlace('C56', 'player', 'front', 1);
  const guard = testPlace('C05', 'ai');
  await testAttack(sprinter, { type: 'card', card: guard });
  assert.equal(ally.status.slow, 0);
});

test('C32 existing deployment debuff cleanup also removes slow', () => {
  const ally = testPlace('C01');
  ally.status.slow = 1;
  testSummon('C32');
  assert.equal(ally.status.slow, 0);
});

test('AI Lina chooses an attack-capable threat and never a rear character', () => {
  const weak = testPlace('C30', 'player', 'front', 0);
  const threat = testPlace('C01', 'player', 'front', 1);
  const rear = testPlace('C07', 'player', 'back');
  testSummon('C74', 'ai');
  assert.equal(state.pendingCardChoice, null);
  assert.equal(threat.status.slow, 1);
  assert.equal(weak.status.slow, 0);
  assert.equal(rear.status.slow, 0);
});

test('Nox suppresses Lina placement while SP remains outside the ST counter', () => {
  const enemy = testPlace('C01', 'ai');
  const stopped = testPlace('C74', 'player', 'back');
  stopped.status.periodicStop = 1;
  applySummonEffects(stopped, state.player);
  assert.equal(state.pendingCardChoice, null);
  assert.equal(enemy.status.slow, 0);
  state.ai.effectNullify = 1;
  testSummon('C74', 'player', 'back', 1);
  testChoose(enemy);
  assert.equal(enemy.status.slow, 1);
  assert.equal(state.ai.effectNullify, 1);
});

async function main() {
  const duel = createDuelVm();
  const results = [];
  for (const entry of cases) {
    duel.run('testReset();');
    try {
      await duel.run(entry.run);
      results.push({ name: entry.name, passed: true });
    } catch (error) {
      results.push({ name: entry.name, passed: false, error: String(error.stack || error) });
    }
  }
  const report = {
    date: '2026-10-16',
    type: 'production-rule VM integration for C73/C74',
    hashes: { ...duel.hashes, 'scripts/test-goodnight-world-cards.cjs': hash(fs.readFileSync(__filename, 'utf8')) },
    storageIsolation: 'private in-memory Map',
    storageAudit: duel.storageAudit,
    total: results.length,
    passed: results.filter(result => result.passed).length,
    failed: results.filter(result => !result.passed).length,
    results,
    limitations: ['DOM, sound, animation and browser input are stubbed; rendered visuals and live deployment require separate verification.', 'Tests load current production rules without prototype gameplay patches; they do not establish competitive win rates.'],
  };
  const target = writeReport('goodnight-world-card-tests-2026-10-16.json', report);
  console.log(JSON.stringify({ total: report.total, passed: report.passed, failed: report.failed, report: target, failures: results.filter(result => !result.passed) }, null, 2));
  if (report.failed) process.exitCode = 1;
}

main().catch(error => { console.error(error); process.exitCode = 1; });
