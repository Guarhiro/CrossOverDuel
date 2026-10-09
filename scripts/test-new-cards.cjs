// Run: node scripts/test-new-cards.cjs
const fs = require('node:fs');
const { createDuelVm, writeReport, hash } = require('./duel-vm.cjs');
const cases = [];
const test = (name, run) => cases.push({ name, run });

test('seven card definitions and unchanged starter/AI deck contents', () => {
  const expected={C66:[3,1,1,4],C67:[3,1,2,4],C68:[2,1,1,4],C69:[2,1,1,3],C70:[3,2,3,4],C71:[3,1,1,4],C72:[3,1,1,4]};
  for(const [id,stats] of Object.entries(expected)){const c=CARD_DB.get(id);assert.ok(c);assert.deepEqual([c.cost,c.atk,c.def,c.hp],stats);assert.equal(c.kind,'character');assert.equal(c.backOnly,undefined);}
  assert.equal(CHARACTERS.length,72);assert.equal(SUPPORTS.length,16);assert.equal(PLAYER_DECK.length,20);assert.ok(PLAYER_DECK.every(id=>!Object.hasOwn(expected,id)));assert.ok(AI_DECKS.every(p=>p.deck.every(id=>!Object.hasOwn(expected,id))));
  assert.ok(CARD_DB.get('C70').tags.includes('guard'));
});
test('all new instances initialize effect state and share negative-status helpers', () => {
  const artFiles={C66:'C66-card-v2.png',C67:'C67-card-v2.png',C68:'C68-card-v2.png',C69:'C69-card-v2.png',C70:'C70-card-v2.png',C71:'C71-card-v2.png',C72:'C72-card-v2.png'};
  for(const id of NEW_CHARACTER_IDS){const c=createInstance(CARD_DB.get(id),'player');assert.equal(c.status.periodicStop,0);assert.equal(c.supportProtection,null);assert.equal(c.illusionRouteTurn,-1);assert.equal(c.activeCleanseTurn,-1);assert.equal(c.galdioProtectTurn,-1);assert.equal(hasNegativeStatus(c),false);c.status.periodicStop=1;assert.equal(hasNegativeStatus(c),true);clearAllStatuses(c);assert.equal(hasNegativeStatus(c),false);assert.equal(cardArtPath(c),`assets/characters/${artFiles[id]}`);}
});
test('Aria recovers one real grave as a fresh unbuffed instance', () => {
  const dead=createInstance(CARD_DB.get('C35'),'player');dead.currentAtk=9;dead.currentDef=0;dead.currentHp=0;dead.awakened=true;dead.status.bind=2;state.player.grave.push(dead);
  testSummon('C66');testChoose(dead);assert.equal(state.player.grave.length,0);const recovered=state.player.hand[0];assert.equal(recovered.id,'C35');assert.notEqual(recovered.instanceId,dead.instanceId);assert.equal(recovered.currentAtk,recovered.atk);assert.equal(recovered.currentDef,recovered.def);assert.equal(recovered.currentHp,recovered.hp);assert.equal(recovered.awakened,false);assert.equal(hasNegativeStatus(recovered),false);
  testSummon('C66','player','back',1);assert.equal(state.pendingCardChoice,null);assert.equal(state.player.hand.filter(c=>c.id==='C35').length,1);
});
test('Aria uses printed cost and excludes the same name', () => {
  const high=createInstance(CARD_DB.get('C51'),'player');high.costReduction=99;const same=createInstance(CARD_DB.get('C66'),'player');state.player.grave.push(high,same);
  const aria=testSummon('C66');assert.equal(eligibleAriaGraves(aria,state.player).length,0);assert.equal(state.pendingCardChoice,null);
  testPlace('C67','player','front');const aria2=testSummon('C66','player','back',1);assert.equal(eligibleAriaGraves(aria2,state.player).length,1);testChoose(high);assert.equal(state.player.grave[0],same);
});
test('Aria cannot duplicate an S12-returned grave record', () => {
  const dead=testPlace('C35');state.player.reviveTrap=1;destroyCharacter(dead,state.ai);assert.equal(state.player.hand.filter(c=>c.id==='C35').length,1);
  const aria=testSummon('C66');assert.equal(eligibleAriaGraves(aria,state.player).some(c=>c.instanceId===dead.instanceId),false);testSkip();assert.equal(state.player.hand.filter(c=>c.id==='C35').length,1);
});
test('Aria cannot duplicate a Maria-returned grave record', () => {
  testPlace('C65','player','front',0);const dead=testPlace('C58','player','front',1);testPlace('C60','player','front',2);testPlace('C62','player','back',0);
  destroyCharacter(dead,state.ai);assert.equal(state.player.hand.filter(c=>c.id==='C58').length,1);const aria=testSummon('C66','player','front',1);assert.equal(eligibleAriaGraves(aria,state.player).some(c=>c.instanceId===dead.instanceId),false);testSkip();assert.equal(state.player.hand.filter(c=>c.id==='C58').length,1);
});
test('fixed new effects ignore S04 and preserve C15 pending multiplier', () => {
  const grave1=createInstance(CARD_DB.get('C35'),'player'),grave2=createInstance(CARD_DB.get('C30'),'player'),high=createInstance(CARD_DB.get('C51'),'player');state.player.grave.push(grave1,grave2,high);state.player.nextBackSkillDouble=true;
  const aria=testSummon('C66');aria.nextSkillMultiplier=2;testChoose(grave1);assert.equal(state.player.nextBackSkillDouble,false);assert.equal(state.player.grave.length,2);assert.equal(eligibleAriaGraves(aria,state.player).includes(high),false);assert.equal(aria.nextSkillMultiplier,2);
});
test('ST summon counter consumes one effect while Nox SP bypasses that counter', () => {
  const dead=createInstance(CARD_DB.get('C35'),'player');state.player.grave.push(dead);state.ai.effectNullify=1;testSummon('C66');assert.equal(state.pendingCardChoice,null);assert.equal(state.ai.effectNullify,0);assert.equal(state.player.grave[0],dead);
  const marg=testPlace('C51','ai','back');state.ai.effectNullify=1;testSummon('C67','player','back',1);testChoose(marg);assert.equal(marg.status.periodicStop,1);assert.equal(state.ai.effectNullify,1);
});
test('Nox stops one of two Marguerites and expires after the next enemy turn', () => {
  const m1=testPlace('C51','ai','back',0),m2=testPlace('C51','ai','back',1);testPlace('C30','ai','front');const nox=testSummon('C67');testChoose(m1);assert.equal(m2.status.periodicStop,0);
  state.current='ai';state.ai.turns+=1;applyStartEffects(state.ai);assert.equal(nox.currentDef,0);assert.equal(nox.currentHp,4);assert.equal(activeGuards(state.ai).length,1);endTurn(state.ai);assert.equal(m1.status.periodicStop,0);applyStartEffects(state.ai);assert.equal(findCardLocation(nox),null);
});
test('Nox has backline-only choices without Aria and respects status immunity', () => {
  const front=testPlace('C30','ai','front'),immune=testPlace('C61','ai','back');testSummon('C67');assert.equal(state.pendingCardChoice,null);assert.equal(front.status.periodicStop,0);assert.equal(immune.status.periodicStop,0);
});
test('Nox plus Aria can stop a frontline periodic skill without disabling guard or attacks', () => {
  testPlace('C66','player','back',0);const guard=testPlace('C21','ai','front');testSummon('C67','player','back',1);testChoose(guard);assert.equal(guard.status.periodicStop,1);assert.equal(activeGuards(state.ai).includes(guard),true);state.current='ai';state.phase='battle';assert.equal(canAttack(guard,state.ai),true);
});
test('periodic stop covers auto awakening but not forced S05 awakening', () => {
  const c=testPlace('C02','ai','back');c.summonedOnTurn=0;c.status.periodicStop=1;applyStartEffects(state.ai);assert.equal(c.awakened,false);resolveSupport(state.ai,state.player,createInstance(CARD_DB.get('S05'),'ai'),c);assert.equal(c.awakened,true);
});
test('periodic stop covers secondary C25 end buff and harmful end abilities', () => {
  const c=testPlace('C25');c.currentHp=2;c.status.periodicStop=1;const before=c.currentDef;applyEndEffects(state.player);assert.equal(c.currentDef,before);assert.equal(c.selfSacrificeBuffed,false);
  const sion=testPlace('C64','player','front',1);sion.status.periodicStop=1;const hp=sion.currentHp;applyEndEffects(state.player);assert.equal(sion.currentHp,hp);
});
test('C50 and C56 cleanse periodic stop using shared status helpers', async () => {
  const ally=testPlace('C35');ally.status.periodicStop=1;testSummon('C50');assert.equal(ally.status.periodicStop,0);
  ally.status.periodicStop=1;const sprinter=testPlace('C56','player','front',1);const enemy=testPlace('C47','ai','front');await testAttack(sprinter,{type:'card',card:enemy});assert.equal(ally.status.periodicStop,0);
});
test('Stellaria move retains instance, buffs, statuses and attack-used state', () => {
  const c=testPlace('C35','player','back');c.currentAtk=6;c.currentDef=0;c.currentHp=2;c.status.bind=1;c.attacked=true;c.summonedOnTurn=2;c.killCount=2;
  const before=JSON.stringify(c);const stella=testSummon('C68','player','front',2);testChoose(c,o=>o.label.includes('→ 前衛'));assert.equal(state.player.front.includes(c),true);assert.equal(JSON.stringify(c),before);assert.equal(state.player.front[2],stella);state.phase='battle';assert.equal(canAttack(c,state.player),false);
});
test('Stellaria swaps lanes without resummon or extra draw', () => {
  const a=testPlace('C35','player','front'),b=testPlace('C33','player','back');state.player.deck.push(createInstance(CARD_DB.get('C40'),'player'));const count=state.player.hand.length;testSummon('C68','player','front',2);testChoose(a,o=>o.label.includes('↔')&&o.label.includes(b.name));assert.equal(state.player.front[0],b);assert.equal(state.player.back[0],a);assert.equal(state.player.hand.length,count);state.phase='battle';assert.equal(canAttack(b,state.player),true);
});
test('Stellaria excludes self and never advances back-only C51/C15', () => {
  const marg=testPlace('C51','player','back',0),sophia=testPlace('C15','player','back',1);const stella=testSummon('C68','player','front',2);assert.equal(formationOptions(stella,state.player).length,0);assert.equal(state.pendingCardChoice,null);assert.equal(state.player.back[0],marg);assert.equal(state.player.back[1],sophia);
});
test('Stellaria choice can be skipped or invalidated without moving cards', () => {
  const c=testPlace('C35','player','back');testSummon('C68','player','front',2);testSkip();assert.equal(state.player.back[0],c);
  const source=createInstance(CARD_DB.get('C68'),'player');handleNewCardSummon(source,state.player);state.current='ai';assert.equal(completeNewCardChoice(0),false);assert.equal(state.player.back[0],c);state.pendingCardChoice=null;
});
test('Seraphina blocks all S03 harms once and repeated protection does not stack', () => {
  const c=testPlace('C30');testSummon('C69','player','back',0);testChoose(c);testSummon('C69','player','back',1);testChoose(c);
  resolveSupport(state.ai,state.player,createInstance(CARD_DB.get('S03'),'ai'),c);assert.equal(c.status.stun,0);assert.equal(c.status.guardOff,0);
  resolveSupport(state.ai,state.player,createInstance(CARD_DB.get('S03'),'ai'),c);assert.equal(c.status.stun,1);assert.equal(c.status.guardOff,1);
});
test('Seraphina protects only one target of S06 and blocks S14 DEF zero', () => {
  const target=testPlace('C30','player','front',0),other=testPlace('C40','player','front',1);testPlace('C01','ai','front',0);testPlace('C12','ai','front',1);testSummon('C69');testChoose(target);const def=target.currentDef,otherDef=other.currentDef;
  resolveSupport(state.ai,state.player,createInstance(CARD_DB.get('S06'),'ai'),null);assert.equal(target.currentDef,def);assert.equal(other.currentDef,Math.max(0,otherDef-2));
  const sera=testSummon('C69','player','back',1);testChoose(target);resolveSupport(state.ai,state.player,createInstance(CARD_DB.get('S14'),'ai'),target);assert.equal(target.currentDef,def);assert.ok(sera);
});
test('Seraphina protection expires at the next enemy end and persists after source retreat', () => {
  const c=testPlace('C30');const sera=testSummon('C69');testChoose(c);destroyCharacter(sera,state.ai);assert.ok(c.supportProtection);state.current='ai';state.ai.turns+=1;endTurn(state.ai);resolveSupport(state.ai,state.player,createInstance(CARD_DB.get('S03'),'ai'),c);assert.equal(c.status.stun,1);
});
test('Seraphina does not intercept C51 character damage', () => {
  const target=testPlace('C51','player','back',0);testSummon('C69','player','back',1);testChoose(target);const source=testPlace('C51','ai','back');damageCharacter(target,2,state.ai,{cause:'character-skill',sourceCard:source});assert.equal(target.currentHp,1);assert.ok(target.supportProtection);
});
test('Galdio intercepts nonlethal C51 damage before DEF once per enemy turn', () => {
  const g=testPlace('C70'),target=testPlace('C51','player','back'),source=testPlace('C51','ai','back');state.current='ai';state.ai.turns+=1;
  damageCharacter(target,2,state.ai,{cause:'character-skill',sourceCard:source});assert.equal(g.currentDef,1);assert.equal(target.currentHp,3);
  damageCharacter(target,2,state.ai,{cause:'character-skill',sourceCard:source});assert.equal(target.currentHp,1);assert.equal(g.currentDef,1);
  endTurn(state.ai);state.ai.turns+=1;damageCharacter(target,1,state.ai,{cause:'character-skill',sourceCard:source});assert.equal(g.currentDef,0);assert.equal(target.currentHp,1);
});
test('actual Marguerite start skill transfers damage to a periodic-stopped Galdio', () => {
  const g=testPlace('C70'),target=testPlace('C51','player','back');testPlace('C51','ai','back');g.status.periodicStop=1;state.current='ai';state.ai.turns+=1;applyStartEffects(state.ai);assert.equal(target.currentHp,3);assert.equal(g.currentDef,1);assert.equal(g.galdioProtectTurn,state.ai.turns);
});
test('Galdio requires a character-skill source, a rear target, and a non-transferred packet', () => {
  const g=testPlace('C70'),target=testPlace('C51','player','back'),front=testPlace('C35','player','front',1),source=testPlace('C51','ai','back');state.current='ai';state.ai.turns+=1;
  damageCharacter(target,1,state.ai,{cause:'support',sourceCard:createInstance(CARD_DB.get('S06'),'ai')});assert.equal(g.currentDef,3);
  damageCharacter(target,1,state.ai,{cause:'character-skill'});assert.equal(g.currentDef,3);
  damageCharacter(target,1,state.ai,{cause:'character-skill',sourceCard:source,transferred:true});assert.equal(g.currentDef,3);
  damageCharacter(front,1,state.ai,{cause:'character-skill',sourceCard:source});assert.equal(g.currentDef,3);g.status.stun=1;target.currentHp=3;damageCharacter(target,1,state.ai,{cause:'character-skill',sourceCard:source});assert.equal(g.currentDef,3);assert.equal(target.currentHp,2);
});
test('two Galdios never serially absorb the same damage and can cover distinct hits', () => {
  const g1=testPlace('C70','player','front',0),g2=testPlace('C70','player','front',1),target=testPlace('C51','player','back'),source=testPlace('C51','ai','back');state.current='ai';state.ai.turns+=1;
  damageCharacter(target,4,state.ai,{cause:'character-skill',sourceCard:source});assert.equal(g1.currentDef,1);assert.equal(g2.currentDef,3);assert.equal(target.currentHp,1);
  damageCharacter(target,2,state.ai,{cause:'character-skill',sourceCard:source});assert.equal(g2.currentDef,1);assert.equal(target.currentHp,1);
});
test('Galdio preserves ignoreDef and a transferred hit cannot redirect to C25', () => {
  const g=testPlace('C70'),albert=testPlace('C25','player','front',1),target=testPlace('C51','player','back'),source=testPlace('C51','ai','back');g.currentHp=1;state.current='ai';state.ai.turns+=1;
  damageCharacter(target,2,state.ai,{cause:'character-skill',sourceCard:source,ignoreDef:true});assert.equal(findCardLocation(g),null);assert.equal(target.currentHp,3);assert.equal(albert.currentHp,albert.hp);assert.equal(albert.interceptUsed,false);
});
test('Galdio does not intercept normal attacks, own-turn damage, or when silenced', () => {
  const g=testPlace('C70'),target=testPlace('C51','player','back'),source=testPlace('C35','ai','front');state.current='ai';state.ai.turns+=1;damageCharacter(target,1,state.ai,{cause:'attack',sourceCard:source,attacker:source});assert.equal(g.currentDef,3);assert.equal(target.currentHp,2);
  state.current='player';damageCharacter(target,1,state.ai,{cause:'character-skill',sourceCard:source});assert.equal(target.currentHp,1);assert.equal(g.currentDef,3);
  target.currentHp=3;state.current='ai';g.status.silenced=1;damageCharacter(target,2,state.ai,{cause:'character-skill',sourceCard:source});assert.equal(target.currentHp,1);assert.equal(g.currentDef,3);assert.equal(activeGuards(state.player).includes(g),true);
});
test('Neiras adds only backline targets through guard and preserves DEF absorption', async () => {
  const attacker=testPlace('C35'),guard=testPlace('C03','ai','front',0),nonguard=testPlace('C35','ai','front',1),back=testPlace('C51','ai','back');back.currentDef=2;testSummon('C71');testChoose(attacker);state.phase='battle';const targets=getLegalTargets(attacker,state.player);
  assert.ok(targets.some(t=>t.card===back));assert.ok(targets.some(t=>t.card===guard));assert.equal(targets.some(t=>t.card===nonguard),false);assert.equal(targets.some(t=>t.type==='lp'),false);await testAttack(attacker,{type:'card',card:back});assert.equal(back.currentDef,0);assert.equal(back.currentHp,2);assert.notEqual(attacker.illusionRouteTurn,state.player.turns);
});
test('Neiras can turn a ready ATK3 attack into a guarded Marguerite removal', async () => {
  const attacker=testPlace('C35');testPlace('C03','ai','front');const marg=testPlace('C51','ai','back');state.phase='battle';assert.equal(getLegalTargets(attacker,state.player).some(t=>t.card===marg),false);state.phase='main';testSummon('C71');testChoose(attacker);await testAttack(attacker,{type:'card',card:marg});assert.equal(findCardLocation(marg),null);assert.equal(state.ai.grave.includes(marg),true);assert.equal(state.ai.lp,20);
});
test('Neiras preserves summon sickness and unused routes expire', () => {
  const attacker=testPlace('C35');attacker.summonedOnTurn=state.player.turns;testPlace('C03','ai','front');const back=testPlace('C51','ai','back');testSummon('C71');testChoose(attacker);state.phase='battle';assert.equal(canAttack(attacker,state.player),false);endTurn(state.player);state.player.turns+=1;assert.equal(getLegalTargets(attacker,state.player).some(t=>t.card===back),false);
});
test('Neiras route is consumed by normal guard attacks and native C01 extra attacks', async () => {
  const attacker=testPlace('C01');attacker.currentHp=2;const guard=testPlace('C03','ai','front'),back=testPlace('C51','ai','back');testSummon('C71');testChoose(attacker);await testAttack(attacker,{type:'card',card:guard});assert.equal(canAttack(attacker,state.player),true);assert.equal(getLegalTargets(attacker,state.player).some(t=>t.card===back),false);
});
test('Neiras route is consumed by S08 reflection and Seraphina does not prevent reflection', async () => {
  const attacker=testPlace('C35');testPlace('C03','ai','front');const back=testPlace('C51','ai','back');testSummon('C69','player','back',0);testChoose(attacker);testSummon('C71','player','back',1);testChoose(attacker);state.ai.counterAttack=1;await testAttack(attacker,{type:'card',card:back});assert.equal(findCardLocation(attacker),null);assert.notEqual(attacker.illusionRouteTurn,state.player.turns);assert.equal(back.currentHp,3);assert.equal(state.ai.lp,20);
});
test('new automatic choices grant a usable Neiras route during main phase', () => {
  const attacker=testPlace('C35');testPlace('C03','ai','front');testPlace('C51','ai','back');state.autoCardChoices=true;testSummon('C71');assert.equal(state.pendingCardChoice,null);assert.equal(attacker.illusionRouteTurn,state.player.turns);
});
test('Kanon summon cleans all statuses without restoring combat values or triggering bind damage', () => {
  const target=testPlace('C35');target.currentAtk=1;target.currentDef=0;target.currentHp=2;target.status={stun:1,guardOff:1,bind:2,silenced:1,periodicStop:1};const kanon=testSummon('C72');testChoose(target);assert.equal(hasNegativeStatus(target),false);assert.deepEqual([target.currentAtk,target.currentDef,target.currentHp],[1,0,2]);assert.equal(kanon.activeCleanseTurn===state.player.turns,false);
});
test('Kanon active cleanse spends one energy once per turn and ignores attack-used/periodic stop', () => {
  const target=testPlace('C35');const kanon=testSummon('C72');testSkip();kanon.attacked=true;kanon.status.periodicStop=1;target.status.stun=1;const energy=state.player.energy;assert.equal(canUseKanon(kanon,state.player),true);assert.equal(requestKanonCleanse(kanon,state.player),true);testChoose(target);assert.equal(target.status.stun,0);assert.equal(state.player.energy,energy-1);target.status.stun=1;assert.equal(canUseKanon(kanon,state.player),false);state.player.turns+=1;assert.equal(canUseKanon(kanon,state.player),true);
});
test('Kanon cannot actively cleanse when stunned, silenced or lacking energy; skip is free', () => {
  const target=testPlace('C35');const kanon=testSummon('C72');target.status.stun=1;kanon.status.silenced=1;assert.equal(canUseKanon(kanon,state.player),false);kanon.status.silenced=0;kanon.status.stun=1;assert.equal(canUseKanon(kanon,state.player),false);kanon.status.stun=0;state.player.energy=0;assert.equal(canUseKanon(kanon,state.player),false);state.player.energy=2;requestKanonCleanse(kanon,state.player);testSkip();assert.equal(state.player.energy,2);assert.equal(kanon.activeCleanseTurn===state.player.turns,false);
});
test('Kanon active commands are gated by phase, turn, busy and pending actions', () => {
  const target=testPlace('C35'),kanon=testPlace('C72','player','back');target.status.bind=2;assert.equal(canUseKanon(kanon,state.player),true);
  for(const [key,value] of [['busy',true],['pendingCardChoice',{}],['pendingSupport',{}],['pendingDeckChoice',{}]]){const previous=state[key];state[key]=value;assert.equal(canUseKanon(kanon,state.player),false);assert.equal(requestKanonCleanse(kanon,state.player),false);state[key]=previous;}
  state.phase='battle';assert.equal(canUseKanon(kanon,state.player),false);state.phase='main';state.current='ai';assert.equal(canUseKanon(kanon,state.player),false);state.current='player';clearAllStatuses(target);assert.equal(canUseKanon(kanon,state.player),false);
});
test('Kanon active ST counter consumes energy/use but leaves target status', () => {
  const target=testPlace('C35');const kanon=testSummon('C72');target.status.stun=1;state.ai.effectNullify=1;const energy=state.player.energy;requestKanonCleanse(kanon,state.player);testChoose(target);assert.equal(target.status.stun,1);assert.equal(state.player.energy,energy-1);assert.equal(kanon.activeCleanseTurn,state.player.turns);assert.equal(state.ai.effectNullify,0);
});
test('Kanon cleansing after start does not replay a skipped Marguerite shot', () => {
  const marg=testPlace('C51','player','back',0);marg.status.periodicStop=1;const target=testPlace('C35','ai','back');applyStartEffects(state.player);const hp=target.currentHp;const kanon=testSummon('C72','player','back',1);testChoose(marg);assert.equal(marg.status.periodicStop,0);assert.equal(target.currentHp,hp);assert.ok(kanon);
});

async function main(){
  const duel=createDuelVm();const results=[];
  for(const entry of cases){duel.run('testReset();');try{await duel.run(entry.run);results.push({name:entry.name,passed:true});}catch(error){results.push({name:entry.name,passed:false,error:String(error.stack||error)});}}
  const report={date:'2026-10-09',type:'headless unit integration',hashes:{...duel.hashes,'scripts/test-new-cards.cjs':hash(fs.readFileSync(__filename,'utf8'))},storageIsolation:'private in-memory Map',storageAudit:duel.storageAudit,total:results.length,passed:results.filter(r=>r.passed).length,failed:results.filter(r=>!r.passed).length,results,limitations:['DOM/audio/visual timing are stubbed; browser interaction and rendering are not tested.','All card rules are loaded from current production app.js and new-cards.js; no prototype rule patches are applied.']};
  const target=writeReport('new-card-tests-2026-10-09.json',report);console.log(JSON.stringify({total:report.total,passed:report.passed,failed:report.failed,report:target,failures:results.filter(r=>!r.passed)},null,2));if(report.failed)process.exitCode=1;
}
main().catch(error=>{console.error(error);process.exitCode=1;});
