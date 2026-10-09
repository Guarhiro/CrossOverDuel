// Additional characters. Classic script loaded before app.js; effects run after the duel initializes.
const NEW_CHARACTERS = [
  { id: "C66", name: "アリア・ルーチェ", series: "レゾナンスデュオ", rarity: "SR", element: "風", role: "ST", cost: 3, atk: 1, def: 1, hp: 4, skill: "再奏", text: "配置時、撤退済みの味方キャラ1枚を選んで基本状態で手札に戻す。記載コスト2以下・同名以外。味方ノクスがいれば3以下" },
  { id: "C67", name: "ノクス・リゾルブ", series: "レゾナンスデュオ", rarity: "R", element: "無", role: "SP", cost: 3, atk: 1, def: 2, hp: 4, skill: "閉律", text: "配置時、相手後衛1体の開始時・終了時スキルを次の相手ターン終了まで停止。味方アリアがいれば前衛も選べる。攻撃・常在効果は停止しない" },
  { id: "C68", name: "ステラリア・フォン・エテルニア", series: "エテルニアステラリア", rarity: "R", element: "無", role: "ST", cost: 2, atk: 1, def: 1, hp: 4, skill: "皇帝の勅命", text: "配置時、他の味方1体を空いた反対の列へ移すか、他の味方前衛と後衛を入れ替える。配置制限・状態・攻撃済みを保持。整理しない選択も可" },
  { id: "C69", name: "セラフィナ・オルブライト", series: "エテルニアステラリア", rarity: "R", element: "無", role: "ST", cost: 2, atk: 1, def: 1, hp: 3, skill: "外交上の保護", text: "配置時、味方1体を選ぶ。次の相手ターン終了まで、相手サポートの直接解決によるその味方へのダメージ・状態異常・能力低下を1回防ぐ" },
  { id: "C70", name: "ガルディオ・ヴェルム", series: "エテルニアステラリア", rarity: "R", element: "地", role: "GD", cost: 3, atk: 2, def: 3, hp: 4, skill: "忠義の護衛", tags: ["guard"], text: "【ガード】前衛にいる間、相手ターンに1回、味方後衛への相手キャラスキルダメージをDEF適用前に最大2肩代わり。DEF無視は引き継ぎ、再転送しない" },
  { id: "C71", name: "ネイラス", series: "光と幻の幻想譚", rarity: "SR", element: "無", role: "ST", cost: 3, atk: 1, def: 1, hp: 4, skill: "幻影の誘導", text: "配置時、味方前衛1体を選ぶ。このターン最初の通常攻撃だけ、ガード越しに相手後衛を選べる。LP・非ガード前衛は解禁せず、攻撃宣言で消費" },
  { id: "C72", name: "カノン", series: "神楽の舞い手", rarity: "SR", element: "風", role: "ST", cost: 3, atk: 1, def: 1, hp: 4, skill: "結びと祓い", text: "配置時、味方1体の状態異常を全解除。自分のメインに1ターン1回、1エネルギーで同じ祓いを使える。HP・ATK・DEFは戻さない" },
].map((card) => ({ kind: "character", no: `#${card.id.slice(1)}`, ...card, referenceArt: true }));
const NEW_CHARACTER_IDS = new Set(NEW_CHARACTERS.map((card) => card.id));

function cardArtPath(card) {
  if (["C66", "C67", "C68", "C69", "C70", "C71", "C72"].includes(card.id)) return `assets/characters/${card.id}-card-v2.png`;
  return card.referenceArt ? `assets/characters/${card.id}.png` : `assets/cards/${card.id}.png`;
}

function periodicSkillValue(card) {
  if (!card || card.status?.silenced || card.status?.periodicStop || card.statusImmune) return 0;
  const values = { C01: 8, C04: 5, C05: 4, C10: 10, C12: 8, C15: 10, C24: 7, C27: 4, C38: 4, C51: 24, C62: 6 };
  // Closing a disposable card's self-retreat or self-damage can benefit the opponent.
  if (["C08", "C29", "C64"].includes(card.id)) return -2;
  if (["C02", "C06"].includes(card.id)) return !card.awakened && state[card.ownerKey].turns + 1 - card.summonedOnTurn >= 3 ? 12 : 0;
  if (card.id === "C18") return !card.rageUsed && card.currentHp <= Math.ceil(card.maxHp / 2) ? 8 : 0;
  if (card.id === "C54") return card.energyBoosted ? 0 : 8;
  return values[card.id] || (card.id === "C25" && !card.selfSacrificeBuffed && card.currentHp <= 2 ? 5 : 0);
}

function cleanseValue(card) {
  if (!hasNegativeStatus(card)) return 0;
  let value = 1;
  if (card.status.stun) value += effectiveAtk(card) * 2 + (card.tags?.includes("guard") ? 4 : 0);
  if (card.status.guardOff && card.tags?.includes("guard")) value += 5;
  if (card.status.bind) value += 3 + (card.currentHp <= 2 ? 6 : 0);
  if (card.status.silenced) value += ["ST", "SP"].includes(card.role) ? 7 : 3;
  if (card.status.periodicStop) value += card.id === "C51" ? 10 : 3;
  return value;
}

function newCardChoiceOption(card, label, detail, score, run) {
  return { card, label, detail, score, run };
}

function requestNewCardChoice(source, player, description, options) {
  if (!options.length) {
    log(`${source.name} の${source.skill}には有効な対象がない。`, "effect");
    return false;
  }
  if (state.pendingCardChoice) return false;
  state.pendingCardChoice = {
    sourceInstanceId: source.instanceId, ownerKey: player.key,
    title: `${source.name} — ${source.skill}`, description, options,
  };
  state.selectedHandIndex = null;
  state.pendingSupport = null;
  hideSkillPopup();
  closeHandDock();
  if (player.key === "ai" || state.autoCardChoices) {
    let best = -1;
    options.forEach((option, index) => {
      if (option.score > 0 && (best < 0 || option.score > options[best].score)) best = index;
    });
    completeNewCardChoice(best < 0 ? null : best);
  } else {
    render();
  }
  return true;
}

function completeNewCardChoice(index) {
  const choice = state?.pendingCardChoice;
  if (!choice || (index !== null && (!Number.isInteger(index) || !choice.options[index]))) return false;
  const player = state[choice.ownerKey];
  // A restart or a finished duel invalidates every queued action.
  if (!player || state.gameOver || state.current !== player.key || state.phase !== "main") return false;
  state.pendingCardChoice = null;
  if (index === null) log(`${choice.title}を見送った。`, "effect");
  else choice.options[index].run();
  render();
  return true;
}

function eligibleAriaGraves(source, player) {
  const limit = hasBoardCard(player, "C67") ? 3 : 2;
  return player.grave.filter((card) => card.kind === "character" && card.id !== source.id && (CARD_DB.get(card.id)?.cost ?? Infinity) <= limit);
}

function formationValue(card, lane, player) {
  if (lane === "front") {
    if (card.tags?.includes("guard")) return 8 + effectiveDef(card);
    const ready = !card.attacked && !card.status.stun && (card.haste || player.turns > card.summonedOnTurn);
    return effectiveAtk(card) * (ready ? 3 : 1) - (card.currentHp <= 1 ? 3 : 0);
  }
  return ["ST", "SP"].includes(card.role) ? 6 : (card.currentHp <= 1 ? 5 : 0);
}

function formationOptions(source, player) {
  const options = [];
  ["front", "back"].forEach((fromLane) => {
    const toLane = fromLane === "front" ? "back" : "front";
    player[fromLane].forEach((card, fromIndex) => {
      if (!card || card === source || !isValidLane(card, toLane)) return;
      player[toLane].forEach((other, toIndex) => {
        if (other === source || (other && (!isValidLane(other, fromLane) || fromLane !== "front"))) return;
        const laneLabel = toLane === "front" ? "前衛" : "後衛";
        const label = other ? `${card.name} ↔ ${other.name}` : `${card.name} → ${laneLabel}${toIndex + 1}`;
        const score = formationValue(card, toLane, player) - formationValue(card, fromLane, player)
          + (other ? formationValue(other, fromLane, player) - formationValue(other, toLane, player) : 0);
        options.push(newCardChoiceOption(card, label, other ? "前衛と後衛を交換。状態・攻撃済みを保持" : "空き枠へ移動。配置時スキルは再発動しない", score, () => {
          if (player[fromLane][fromIndex] !== card || player[toLane][toIndex] !== other || !isValidLane(card, toLane) || (other && !isValidLane(other, fromLane))) return;
          player[fromLane][fromIndex] = other;
          player[toLane][toIndex] = card;
          state.selectedField = { owner: player.key, lane: toLane, index: toIndex };
          log(`皇帝の勅命：${label}。`, "effect");
        }));
      });
    });
  });
  return options;
}

function handleNewCardSummon(source, player) {
  if (!NEW_CHARACTER_IDS.has(source.id)) return false;
  const foe = opponentOf(player);
  let options = [];
  let description = "対象を1体選んでください。";
  switch (source.id) {
    case "C66":
      description = `記載コスト${hasBoardCard(player, "C67") ? 3 : 2}以下・同名以外の撤退済みキャラを回収します。`;
      options = eligibleAriaGraves(source, player).map((card) => newCardChoiceOption(card, card.name, `記載コスト${CARD_DB.get(card.id).cost} / 基本状態で手札へ`, RARITY_ORDER[card.rarity] * 5 + card.atk + card.def + card.hp, () => {
        if (!eligibleAriaGraves(source, player).includes(card)) return;
        player.grave.splice(player.grave.indexOf(card), 1);
        player.hand.push(createInstance(CARD_DB.get(card.id), player.key));
        log(`再奏：${card.name}を基本状態で手札に戻した。`, "effect");
      }));
      break;
    case "C67": {
      const enemies = hasBoardCard(player, "C66") ? boardCards(foe) : foe.back.filter(Boolean);
      description = "次の相手ターン終了まで、開始時・終了時のキャラスキルを停止します。";
      options = enemies.filter((card) => !card.statusImmune).map((card) => newCardChoiceOption(card, card.name, `${card.skill} / 通常攻撃・ガードは維持`, periodicSkillValue(card), () => {
        if (findCardLocation(card)?.owner !== foe.key) return;
        if (setStatus(card, "periodicStop", Math.max(card.status.periodicStop || 0, 1))) log(`閉律：${card.name}の開始時・終了時スキルを次の相手ターン終了まで停止。`, "effect");
      }));
      break;
    }
    case "C68":
      description = "自身以外の味方を1回移動・交換します。整理しない場合は「見送る」を選べます。";
      options = formationOptions(source, player);
      break;
    case "C69":
      description = "次の相手ターン終了まで、敵サポートの直接の不利益を1回防ぎます。";
      options = boardCards(player).map((card) => newCardChoiceOption(card, card.name, "対象限定の保護 / キャラスキル・通常攻撃は対象外", (card.id === "C51" ? 15 : 0) + effectiveAtk(card) * 2 + effectiveDef(card) + (card.tags?.includes("guard") ? 5 : 0), () => {
        if (findCardLocation(card)?.owner !== player.key) return;
        card.supportProtection = { expiresAfterTurn: foe.turns + 1 };
        log(`外交上の保護：${card.name}を次の相手ターン終了まで守る。`, "effect");
      }));
      break;
    case "C70":
      return true;
    case "C71":
      description = "このターン最初の攻撃だけ、相手後衛への経路を追加します。召喚酔いは解除しません。";
      options = player.front.filter(Boolean).map((card) => newCardChoiceOption(card, card.name, `ATK ${effectiveAtk(card)} / ${canJoinUpcomingAttack(card, player) ? "このターン攻撃可能" : "現在攻撃不可"}`, canJoinUpcomingAttack(card, player) && foe.back.some(Boolean) ? effectiveAtk(card) * 3 + (card.id === "C28" ? 8 : 0) : 0, () => {
        if (!player.front.includes(card)) return;
        card.illusionRouteTurn = player.turns;
        log(`幻影の誘導：${card.name}の最初の攻撃で相手後衛を選べる。`, "effect");
      }));
      break;
    case "C72":
      description = "味方1体の状態異常を全解除します。HP・ATK・DEFは変わりません。";
      options = kanonCleanseOptions(source, player, false);
      break;
  }
  requestNewCardChoice(source, player, description, options);
  return true;
}

function canUseKanon(card, player) {
  return Boolean(card?.id === "C72" && player && state.current === player.key && state.phase === "main" && !state.gameOver
    && (player.key !== "player" || !state.busy)
    && !state.pendingCardChoice && !state.pendingSupport && !state.pendingDeckChoice
    && findCardLocation(card)?.owner === player.key && !card.status.stun && !card.status.silenced
    && card.activeCleanseTurn !== player.turns && player.energy >= 1 && boardCards(player).some(hasNegativeStatus));
}

function kanonCleanseOptions(source, player, active) {
  return boardCards(player).filter(hasNegativeStatus).map((card) => newCardChoiceOption(card, card.name,
    `全解除${active ? " / 1エネルギー" : ""} / 数値・覚醒は保持`, cleanseValue(card), () => {
      if (findCardLocation(card)?.owner !== player.key || !hasNegativeStatus(card)) return;
      if (active) {
        if (!canUseKanon(source, player)) return;
        player.energy -= 1;
        source.activeCleanseTurn = player.turns;
        if (consumeEffectNullify(source, player, `${source.name}の能動祓い`)) return;
      }
      clearAllStatuses(card);
      log(`結びと祓い：${card.name}の状態異常をすべて解除。`, "effect");
    }));
}

function requestKanonCleanse(card, player) {
  if (!canUseKanon(card, player) || (player.key === "player" && state.busy)) return false;
  return requestNewCardChoice(card, player, "1エネルギーを払い、味方1体の状態異常を全解除します。見送る場合は消費しません。", kanonCleanseOptions(card, player, true));
}

function useAiKanonCleanse(player) {
  const kanon = boardCards(player).find((card) => canUseKanon(card, player));
  return kanon ? requestKanonCleanse(kanon, player) : false;
}

function newCardAiValue(card, player) {
  const foe = opponentOf(player);
  switch (card.id) {
    case "C66": return eligibleAriaGraves(card, player).length ? 14 : -8;
    case "C67": return Math.max(0, ...((hasBoardCard(player, "C66") ? boardCards(foe) : foe.back.filter(Boolean)).map(periodicSkillValue))) * 1.5;
    case "C68": return Math.max(0, ...formationOptions(card, player).map((option) => option.score));
    case "C69": return boardCards(player).length ? 4 : 0;
    case "C70": return player.back.some(Boolean) && hasBoardCard(foe, "C51") ? 15 : 0;
    case "C71": return foe.back.some(Boolean) && player.front.some((ally) => ally && canJoinUpcomingAttack(ally, player)) ? 22 : -8;
    case "C72": return Math.max(0, ...boardCards(player).map(cleanseValue)) * 2;
    default: return 0;
  }
}
