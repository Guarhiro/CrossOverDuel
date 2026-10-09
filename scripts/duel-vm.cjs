// Headless validation only. Persistent storage is a private in-memory Map.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const ROOT = path.resolve(__dirname, '..');
const hash = (text) => crypto.createHash('sha256').update(text).digest('hex');
function fakeNode() {
  return { classList: { add() {}, remove() {}, toggle() {} }, style: { setProperty() {} }, dataset: {}, children: [],
    querySelector() { return null; }, querySelectorAll() { return []; }, addEventListener() {}, removeEventListener() {}, append() {}, appendChild() {}, replaceChildren() {}, remove() {}, focus() {},
    getBoundingClientRect() { return { x: 0, y: 0, width: 1, height: 1 }; }, offsetWidth: 1, offsetHeight: 1, textContent: '', innerHTML: '' };
}
function createDuelVm({ driver = false, updatedBot = false } = {}) {
  const storage = new Map();
  const nodes = new Map();
  const storageAudit = { writes: 0, reads: 0 };
  const context = { console, assert, Date, performance, TextEncoder, TextDecoder,
    setTimeout: (fn, ms, ...args) => setImmediate(fn, ...args), clearTimeout: clearImmediate,
    document: { body: fakeNode(), addEventListener() {}, querySelector(s) { if (!nodes.has(s)) nodes.set(s, fakeNode()); return nodes.get(s); }, querySelectorAll() { return []; }, createElement: fakeNode },
    localStorage: { getItem(k) { storageAudit.reads++; return storage.has(k) ? storage.get(k) : null; }, setItem(k, v) { storageAudit.writes++; storage.set(k, String(v)); }, removeItem(k) { storageAudit.writes++; storage.delete(k); } },
    MessageChannel: class { constructor() { this.port1 = { onmessage: null }; this.port2 = { postMessage: () => setImmediate(() => this.port1.onmessage?.()) }; } },
  };
  context.window = context;
  vm.createContext(context);
  const files = { 'app.js': fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8'), 'new-cards.js': fs.readFileSync(path.join(ROOT, 'new-cards.js'), 'utf8'), 'scripts/duel-vm.cjs': fs.readFileSync(__filename, 'utf8') };
  vm.runInContext(files['new-cards.js'], context, { filename: 'new-cards.js' });
  const marker = '\nbindEvents();';
  const cutoff = files['app.js'].lastIndexOf(marker);
  assert.ok(cutoff > 0, 'app startup marker is required: update this loader if startup changes');
  vm.runInContext(files['app.js'].slice(0, cutoff), context, { filename: 'app.js' });
  // Only display/audio/timing work is stubbed. Game rules, rewards, decks and AI remain real functions.
  vm.runInContext(`
    playBattleIntro=async()=>{}; animateCard=()=>{}; addFloatingPop=()=>{}; renderCard=()=>'';
    showTitleScreen=()=>{}; hideTitleScreen=()=>{}; closeDeckEditor=()=>{}; closeLevelSelect=()=>{};
    hideSkillPopup=()=>{}; closeHandDock=()=>{}; render=()=>{}; renderLog=()=>{}; renderHud=()=>{};
    renderCollectionSummary=()=>{}; renderNewCardChoice=()=>{}; renderCardChoice=()=>{};
    audio.musicOn=false; audio.sfxOn=false; audio.voiceOn=false;
    audio.sfx=()=>{}; audio.voice=()=>{}; audio.speak=()=>{}; audio.updateMusic=()=>{}; window.FX=null;
    function seededRandom(seed){let value=seed>>>0;return()=>{value=(value+0x6d2b79f5)|0;let t=Math.imul(value^(value>>>15),1|value);t^=t+Math.imul(t^(t>>>7),61|t);return ((t^(t>>>14))>>>0)/4294967296;};}
    function testReset(){
      state={player:createPlayer('player','Player',[]),ai:createPlayer('ai','AI',[]),current:'player',phase:'main',busy:false,gameOver:false,firstPlayerKey:'player',turnNumber:5,log:[],pendingCardChoice:null,pendingSupport:null,pendingDeckChoice:null,autoCardChoices:false};
      state.player.turns=3;state.ai.turns=3;state.player.energy=10;state.ai.energy=10;
    }
    function testPlace(id,key='player',lane='front',index=0){const c=createInstance(CARD_DB.get(id),key);c.summonedOnTurn=1;state[key][lane][index]=c;return c;}
    function testSummon(id,key='player',lane='back',index=0){const p=state[key];state.current=key;state.phase='main';const c=createInstance(CARD_DB.get(id),key);p.hand.push(c);assert.equal(playCharacterFromHand(p,p.hand.length-1,lane,index),true);return c;}
    function testChoose(card,predicate=()=>true){const choice=state.pendingCardChoice;assert.ok(choice,'expected a pending character choice');const index=choice.options.findIndex(option=>option.card===card&&predicate(option));assert.ok(index>=0,'expected the requested target option');assert.equal(completeNewCardChoice(index),true);}
    function testSkip(){if(state.pendingCardChoice)assert.equal(completeNewCardChoice(null),true);}
    async function testAttack(card,target){state.current=card.ownerKey;state.phase='battle';assert.equal(canAttack(card,state[card.ownerKey]),true,'attacker must be ready under the real rule');await performAttack(card,target);}
  `, context);
  if (driver) {
    files['scripts/simulation-bot.js'] = fs.readFileSync(path.join(ROOT, 'scripts/simulation-bot.js'), 'utf8');
    let source = files['scripts/simulation-bot.js'];
    const patchDriver = (from, to) => {
      assert.ok(source.includes(from), `simulation driver patch point missing: ${from}`);
      source = source.replace(from, to);
    };
    patchDriver('await startNewGame(profile);', 'await startNewGame(window.__simulationOpponentOverride || profile); state.autoCardChoices=true;');
    if (updatedBot) {
      patchDriver('if (backOpen >= 0) return { lane: "back", index: backOpen };\n    return null;', 'if (backOpen >= 0) return { lane: "back", index: backOpen };\n    if (NEW_CHARACTER_IDS.has(card.id) && frontOpen >= 0) return { lane: "front", index: frontOpen };\n    return null;');
      patchDriver('const targets = getLegalTargets(attacker, p);', 'const targets = getLegalTargets(attacker, p);\n    const route = targets.filter(t=>t.type===\"card\" && findCardLocation(t.card)?.lane===\"back\");\n    if (attacker.illusionRouteTurn===p.turns && route.length) return route.sort((a,b)=>(botPredictHpDamage(attacker,b.card)>=b.card.currentHp)-(botPredictHpDamage(attacker,a.card)>=a.card.currentHp)||periodicSkillValue(b.card)-periodicSkillValue(a.card))[0];');
      patchDriver('const botPlayBest = async (p, foe) => {', 'const botPlayBest = async (p, foe) => {\n    if (useAiKanonCleanse(p)) return true;');
    }
    files['sim-driver.js (isolated choice-aware player bot)'] = source;
    vm.runInContext(source, context, { filename: 'sim-driver.js (isolated choice-aware player bot)' });
  }
  return { context, storage, storageAudit, hashes: Object.fromEntries(Object.entries(files).map(([k, text]) => [k, hash(text)])),
    run: (source) => vm.runInContext(typeof source === 'function' ? `(${source.toString()})()` : source, context),
  };
}
function writeReport(filename, report) {
  const directory = path.join(ROOT, 'docs', 'validation');
  fs.mkdirSync(directory, { recursive: true });
  const target = path.join(directory, filename);
  fs.writeFileSync(target, JSON.stringify(report, null, 2) + '\n');
  return target;
}
module.exports = { ROOT, createDuelVm, writeReport, hash };
