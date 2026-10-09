// バランス検証用 自動対戦ドライバ（開発専用・ゲーム本体からは読み込まれない）
// 使い方: preview_eval から <script src="/.claude/sim-driver.js"> を注入し、
// window.__duel.startBatch(...) → window.__batchStatus / __results を読む。
window.__duel = (() => {
  const D = { speedInstalled: false };

  D.installSpeed = () => {
    if (D.speedInstalled) return;
    D.speedInstalled = true;
    const origSetTimeout = window.setTimeout.bind(window);
    window.__origSetTimeout = origSetTimeout;
    // バックグラウンドタブのタイマースロットル回避のため MessageChannel で即時実行
    const channel = new MessageChannel();
    const queue = [];
    channel.port1.onmessage = () => { const fn = queue.shift(); if (fn) fn(); };
    window.setTimeout = (fn, ms, ...args) => {
      if ((ms || 0) < 3000) { queue.push(() => fn(...args)); channel.port2.postMessage(null); return 0; }
      return origSetTimeout(fn, ms, ...args);
    };
    window.FX = null;
    audio.musicOn = false; audio.sfxOn = false; audio.voiceOn = false;
    audio.sfx = () => {}; audio.voice = () => {}; audio.speak = () => {}; audio.updateMusic = () => {};
    window.render = () => {}; window.renderLog = () => {}; window.renderHud = () => {}; window.renderCollectionSummary = () => {};
  };

  D.grantAll = () => {
    const col = {};
    ALL_CARDS.forEach(c => { col[c.id] = 4; });
    localStorage.setItem("crossover-duel-collection", JSON.stringify(col));
  };

  D.setPlayerDeck = (ids) => {
    savePlayerDeckIds(ids, 1);
    saveActiveDeckSlot(1);
    const loaded = loadPlayerDeckIds();
    const norm = (a) => JSON.stringify([...a].sort());
    if (norm(loaded) !== norm(ids)) throw new Error("deck rejected: " + JSON.stringify(loaded));
  };

  const botLanePlanFor = (card) => {
    if (card.backOnly) return "back";
    const plan = AI_CHARACTER_LANE_PLAN[card.id];
    if (plan) return plan;
    return ["AT", "GD"].includes(card.role) ? "front" : "back";
  };

  const botChooseSlot = (card, p) => {
    const frontOpen = p.front.findIndex(s => !s);
    const backOpen = p.back.findIndex(s => !s);
    if (card.backOnly) return backOpen >= 0 ? { lane: "back", index: backOpen } : null;
    const plan = botLanePlanFor(card);
    if (plan === "front") return frontOpen >= 0 ? { lane: "front", index: frontOpen } : null;
    if (frontOpen >= 0 && shouldAiAdvanceBackPlanToFront(card, p)) return { lane: "front", index: frontOpen };
    if (backOpen >= 0) return { lane: "back", index: backOpen };
    return null;
  };

  const botUseSupport = (p, foe, entry) => {
    const { card, index } = entry;
    const target = chooseSupportTarget(card, p, foe);
    resolveSupport(p, foe, card, target);
    p.hand.splice(index, 1);
    if (state.pendingDeckChoice && state.pendingDeckChoice.ownerKey === p.key) {
      const cards = state.pendingDeckChoice.cards;
      let bestIdx = 0;
      cards.forEach((c, i) => {
        const b = cards[bestIdx];
        if (RARITY_ORDER[c.rarity] > RARITY_ORDER[b.rarity] ||
            (RARITY_ORDER[c.rarity] === RARITY_ORDER[b.rarity] && (c.cost || 0) > (b.cost || 0))) bestIdx = i;
      });
      completeDeckChoice(bestIdx);
    }
  };

  const botPlayBest = async (p, foe) => {
    const supports = p.hand.map((card, index) => ({ card, index }))
      .filter(({ card }) => card.kind === "support" && canPay(p, card))
      .filter(({ card }) => chooseSupportTarget(card, p, foe) !== false)
      .filter(({ card }) => isSupportWorthUsing(card, p, foe))
      .sort((a, b) => RARITY_ORDER[b.card.rarity] - RARITY_ORDER[a.card.rarity] || b.card.cost - a.card.cost);
    const chars = p.hand.map((card, index) => ({ card, index }))
      .filter(({ card }) => card.kind === "character" && canPay(p, card))
      .map(e => ({ ...e, slot: botChooseSlot(e.card, p) }))
      .filter(e => e.slot)
      .sort((a, b) => scoreCardForAi(b.card, b.slot, p) - scoreCardForAi(a.card, a.slot, p));
    const needsBoard = !p.front.some(Boolean) && chars.length > 0;
    if (supports.length && !needsBoard && Math.random() < 0.42) { botUseSupport(p, foe, supports[0]); return true; }
    if (!chars.length) {
      if (supports.length) { botUseSupport(p, foe, supports[0]); return true; }
      return false;
    }
    const { index, slot } = chars[0];
    return playCharacterFromHand(p, index, slot.lane, slot.index);
  };

  const botPredictHpDamage = (attacker, card) => {
    const ignore = attacker.id === "C28" || (attacker.id === "C46" && !attacker.atomicFlareUsed);
    let dmg = effectiveAtk(attacker);
    if (attacker.id === "C44" && card.role === "ST") dmg += 2;
    if (card.id === "C03") dmg = Math.max(1, dmg - 1);
    return ignore ? dmg : Math.max(0, dmg - effectiveDef(card));
  };

  const botChooseTarget = (attacker, p, foe) => {
    const targets = getLegalTargets(attacker, p);
    if (!targets.length) return null;
    const lp = targets.find(t => t.type === "lp");
    const cards = targets.filter(t => t.type === "card");
    if (lp && foe.lp <= effectiveAtk(attacker)) return lp;
    if (!cards.length) return lp;
    if (activeGuards(foe).length) {
      return cards.sort((a, b) => (effectiveDef(a.card) + a.card.currentHp) - (effectiveDef(b.card) + b.card.currentHp))[0];
    }
    const oneShot = cards.filter(({ card }) =>
      botPredictHpDamage(attacker, card) >= card.currentHp &&
      effectiveAtk(card) >= 3 &&
      findCardLocation(card)?.lane === "front"
    ).sort((a, b) => effectiveAtk(b.card) - effectiveAtk(a.card));
    if (oneShot.length) return oneShot[0];
    return lp || cards[0];
  };

  const botBattle = async (p, foe) => {
    let safety = 0;
    const attackers = () => p.front.filter(c => canAttack(c, p));
    while (attackers().length && !state.gameOver && safety < 24) {
      safety++;
      let attacker = attackers().sort((a, b) => effectiveAtk(b) - effectiveAtk(a))[0];
      if (foe.counterAttack > 0) {
        const bait = attackers().sort((a, b) => effectiveAtk(a) - effectiveAtk(b))
          .find(c => effectiveAtk(c) < c.currentHp);
        if (!bait) break;
        attacker = bait;
      }
      const target = botChooseTarget(attacker, p, foe);
      if (!target) break;
      const wasAttacked = attacker.attacked;
      await performAttack(attacker, target, { allowWhileBusy: true });
      if (!state.gameOver && attacker.attacked === wasAttacked && findCardLocation(attacker)) break;
    }
  };

  D.playGame = async ({ deck, aiLevel, forceFirst = null }) => {
    D.installSpeed();
    D.grantAll();
    D.setPlayerDeck(deck);
    const profile = AI_DECKS.find(d => d.level === aiLevel);
    if (!profile) throw new Error("no AI level " + aiLevel);
    if (forceFirst) {
      const orig = Math.random;
      Math.random = () => { Math.random = orig; return forceFirst === "player" ? 0.25 : 0.75; };
    }
    await startNewGame(profile);
    let guard = 0;
    while (!state.gameOver && guard < 70) {
      guard++;
      if (state.current !== "player" || state.phase !== "main" || state.busy) {
        await new Promise(r => window.__origSetTimeout(r, 5));
        continue;
      }
      let plays = 0;
      while (!state.gameOver && plays < 10 && await botPlayBest(state.player, state.ai)) plays++;
      if (state.gameOver) break;
      state.phase = "battle";
      await botBattle(state.player, state.ai);
      if (state.gameOver) break;
      endTurn(state.player);
      state.turnNumber += 1;
      await runAiTurn();
    }
    document.querySelector("#rewardModal")?.classList.add("hidden");
    const winner = state.ai.lp <= 0 ? "player" : state.player.lp <= 0 ? "ai" : "timeout";
    return { winner, rounds: state.player.turns, lpP: state.player.lp, lpA: state.ai.lp, first: state.firstPlayerKey };
  };

  D.startBatch = (name, configs, reps) => {
    window.__batchStatus = { name, total: configs.length * reps, done: 0, running: true, error: null };
    (async () => {
      try {
        const out = [];
        for (let r = 0; r < reps; r++) {
          for (const cfg of configs) {
            const res = await D.playGame(cfg);
            out.push({ label: cfg.label, aiLevel: cfg.aiLevel, forceFirst: cfg.forceFirst || null, ...res });
            window.__batchStatus.done++;
          }
        }
        window.__results = window.__results || {};
        window.__results[name] = out;
      } catch (e) {
        window.__batchStatus.error = String((e && e.stack) || e);
      } finally {
        window.__batchStatus.running = false;
      }
    })();
    return "started";
  };

  D.summarize = (name) => {
    const rows = (window.__results || {})[name] || [];
    const groups = {};
    rows.forEach(r => {
      const key = r.label + "|Lv" + r.aiLevel + (r.forceFirst ? "|" + r.forceFirst + "First" : "");
      groups[key] = groups[key] || { n: 0, pWin: 0, aWin: 0, to: 0, rounds: 0, pFirstWins: 0, pFirstN: 0, aFirstWins: 0, aFirstN: 0 };
      const g = groups[key];
      g.n++;
      if (r.winner === "player") g.pWin++;
      else if (r.winner === "ai") g.aWin++;
      else g.to++;
      g.rounds += r.rounds;
      if (r.first === "player") { g.pFirstN++; if (r.winner === "player") g.pFirstWins++; }
      else { g.aFirstN++; if (r.winner === "ai") g.aFirstWins++; }
    });
    return Object.entries(groups).map(([k, g]) => ({
      matchup: k, games: g.n,
      playerWinRate: +(g.pWin / g.n * 100).toFixed(1),
      avgRounds: +(g.rounds / g.n).toFixed(1),
      timeouts: g.to,
      winWhenPlayerFirst: g.pFirstN ? +(g.pFirstWins / g.pFirstN * 100).toFixed(1) : null,
      aiWinWhenAiFirst: g.aFirstN ? +(g.aFirstWins / g.aFirstN * 100).toFixed(1) : null,
    }));
  };

  D.decks = {
    STARTER_NEW: [...PLAYER_DECK],
    AGGRO: ["C22","C22","C28","C28","C29","C29","C34","C34","C35","C35","C44","C44","C55","C55","C64","C11","C11","C56","C56","S09"],
    GUARD_WALL: ["C03","C05","C47","C47","C49","C49","C25","C25","C30","C30","C40","C40","C38","C38","S15","S15","S01","S01","S11","C27"],
    MARG_CHIP: ["C51","C51","C03","C47","C47","C49","C49","C30","C30","C25","C25","S15","S15","S01","S01","C38","C38","C09","C09","S11"],
  };

  return D;
})();
