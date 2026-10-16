// C67 regression contract. Uses real duel rules; only UI/audio/timing are stubbed.
const path = require('node:path');
const fs = require('node:fs');
const { createDuelVm, hash } = require(process.env.NOX_VM_PATH || path.join(__dirname, 'duel-vm.cjs'));
const cases=[];
function spec(name,body){cases.push({name,body});}
function paired(name,body){spec(name,'for(const sealed of [false,true]){testReset();'+body+'}');}
const fixture="testReset(); function stopped(c,yes=true){c.status.periodicStop=yes?1:0;return c;} function stats(c,atk=2,hp=30,def=0){c.currentAtk=atk;c.currentHp=c.maxHp=hp;c.currentDef=c.maxDef=def;return c;} function deck(p=state.player){p.deck=[createInstance(CARD_DB.get('C27'),p.key),createInstance(CARD_DB.get('C27'),p.key)];} function target(c){return {type:'card',card:c};}";

paired('C07 kill stacks, ATK +3 and third-kill blast stop together',
"const a=stopped(testPlace('C07'),sealed);a.killCount=2;const v=stats(testPlace('C27','ai'),1,1,0),b=stats(testPlace('C27','ai','back'),1,30,0),atk=a.currentAtk,lp=state.ai.lp;await testAttack(a,target(v));assert.equal(a.killCount,sealed?2:3);assert.equal(a.currentAtk,atk+(sealed?0:3));assert.equal(b.currentHp,sealed?30:25);assert.equal(state.ai.lp,lp-(sealed?0:5));");
paired('C21 allied attack trigger follows C21 status',
"const a=stats(testPlace('C27'),2),s=stopped(testPlace('C21','player','back'),sealed),atk=s.currentAtk;await testAttack(a,{type:'lp',player:state.ai});assert.equal(s.currentAtk,atk+(sealed?0:1));assert.equal(s.heatStacks||0,sealed?0:1);");
paired('C55 hit stacks and ATK stop',
"const a=stopped(testPlace('C55'),sealed),atk=a.currentAtk;await testAttack(a,{type:'lp',player:state.ai});assert.equal(a.currentAtk,atk+(sealed?0:1));assert.equal(a.vanguardStacks||0,sealed?0:1);");
for(const id of ['C01','C64']) paired(id+' additional attack stops without consuming its flag',
"const a=stopped(testPlace('"+id+"'),sealed);a.currentHp=1;const v=stats(testPlace('C27','ai'),1,1,0);await testAttack(a,target(v));assert.equal(a.attacked,sealed);assert.equal(Boolean(a."+(id==='C01'?'extraAttackUsed':'sionReattackUsed')+"),!sealed);");
paired('C10 allied kill draw follows C10 status',
"deck();const a=testPlace('C27'),s=stopped(testPlace('C10','player','back'),sealed),v=stats(testPlace('C27','ai'),1,1,0);await testAttack(a,target(v));assert.equal(state.player.hand.length,sealed?0:1);");
spec('stopped attacker does not silence independent C21 and C10 triggers',
"deck();const a=stopped(testPlace('C07')),s=testPlace('C21','player','back'),h=testPlace('C10','player','back',1),atk=s.currentAtk,v=stats(testPlace('C27','ai'),1,1,0);await testAttack(a,target(v));assert.equal(a.killCount,0);assert.equal(s.currentAtk,atk+1);assert.equal(state.player.hand.length,1);");
paired('C14 backline splash stops',
"const a=stopped(testPlace('C14'),sealed),v=stats(testPlace('C27','ai'),1,30,0),b=stats(testPlace('C27','ai','back'),1,30,1);await testAttack(a,target(v));assert.equal(b.currentHp+b.currentDef,sealed?31:29);");
paired('C16 random attack modifier stops',
"Math.random=()=>0;const a=stopped(stats(testPlace('C16'),4),sealed),lp=state.ai.lp;await testAttack(a,{type:'lp',player:state.ai});assert.equal(state.ai.lp,lp-(sealed?4:7));");
paired('C22 target ATK reduction stops',
"const a=stopped(stats(testPlace('C22'),1),sealed),v=stats(testPlace('C27','ai'),5,30,0);await testAttack(a,target(v));assert.equal(v.currentAtk,sealed?5:4);");
paired('C28 DEF bypass stops',
"const a=stopped(stats(testPlace('C28'),2),sealed),v=stats(testPlace('C27','ai'),1,30,5);await testAttack(a,target(v));assert.equal(v.currentHp,sealed?30:28);assert.equal(v.currentDef,sealed?3:5);");
for(const [id,n] of [['C30',1],['C40',2]]) paired(id+' defender retaliation stops',
"const a=stats(testPlace('C27'),2),v=stopped(stats(testPlace('"+id+"','ai'),1,30,0),sealed);await testAttack(a,target(v));assert.equal(a.currentHp,sealed?30:"+(30-n)+");");
paired('C34 attack draw stops',
"deck();const a=stopped(testPlace('C34'),sealed),v=stats(testPlace('C27','ai'),1,30,0);await testAttack(a,target(v));assert.equal(state.player.hand.length,sealed?0:1);");
paired('C35 extra DEF erosion stops',
"const a=stopped(stats(testPlace('C35'),2),sealed),v=stats(testPlace('C27','ai'),1,30,10);await testAttack(a,target(v));assert.equal(v.currentDef,sealed?8:7);");
paired('C44 ST bonus damage stops',
"const a=stopped(stats(testPlace('C44'),2),sealed),v=stats(testPlace('C27','ai'),1,30,0);assert.equal(v.role,'ST');await testAttack(a,target(v));assert.equal(v.currentHp,sealed?28:26);");
paired('C46 first flare bypass stops without consuming flare',
"const a=stopped(stats(testPlace('C46'),2),sealed),v=stats(testPlace('C27','ai'),1,30,5);await testAttack(a,target(v));assert.equal(v.currentHp,sealed?30:28);assert.equal(Boolean(a.atomicFlareUsed),!sealed);");
paired('C46 kill splash stops',
"const a=stopped(stats(testPlace('C46'),2),sealed),v=stats(testPlace('C27','ai'),1,1,0),b=stats(testPlace('C27','ai','back'),1,30,0);await testAttack(a,target(v));assert.equal(b.currentHp,sealed?30:28);");
paired('C49 last stand stops',
"const v=stopped(stats(testPlace('C49','ai'),1,2,0),sealed),r=damageCharacter(v,3,state.player,{ignoreDef:true,cause:'attack'});assert.equal(r.killed,sealed);assert.equal(Boolean(findCardLocation(v)),!sealed);assert.equal(Boolean(v.lastStandUsed),!sealed);");
paired('C25 sacrifice stops while guard remains',
"const s=stopped(testPlace('C25','ai'),sealed),v=stats(testPlace('C27','ai','back'),1,1,0),r=damageCharacter(v,2,state.player,{ignoreDef:true,cause:'attack'});assert.equal(r.killed,sealed);assert.equal(Boolean(s.interceptUsed),!sealed);assert.ok(activeGuards(state.ai).includes(s));");
paired('C70 skill damage transfer stops while guard remains',
"const a=testPlace('C14'),s=stopped(stats(testPlace('C70','ai'),1,30,3),sealed),v=stats(testPlace('C27','ai','back'),1,30,0);damageCharacter(v,3,state.player,{ignoreDef:true,cause:'character-skill',sourceCard:a});assert.equal(v.currentHp,sealed?27:29);assert.equal(s.currentHp,sealed?30:28);assert.ok(activeGuards(state.ai).includes(s));");
paired('C03 intrinsic reduction stops while guard remains',
"const v=stopped(stats(testPlace('C03','ai'),1,30,0),sealed);damageCharacter(v,3,state.player,{ignoreDef:true,cause:'attack'});assert.equal(v.currentHp,sealed?27:28);assert.ok(activeGuards(state.ai).includes(v));");

for(const id of ['C09','C16','C18','C31','C37']) paired(id+' retreat effect stops',
"Math.random=()=>0;const f=stopped(stats(testPlace('"+id+"'),4,1,0),sealed),a=stats(testPlace('C27','player','back'),1,30,0),e=stats(testPlace('C27','ai'),1,30,0),lp=state.ai.lp;damageCharacter(f,2,state.ai,{ignoreDef:true,cause:'attack'});assert.equal(findCardLocation(f),null);assert.ok(state.player.grave.includes(f));"+
(id==='C09'?"assert.equal(state.ai.lp,lp-(sealed?0:3));":id==='C16'?"assert.equal(a.currentHp,sealed?30:27);":id==='C18'?"assert.equal(e.currentHp,sealed?30:26);":id==='C31'?"assert.equal(e.status.stun,sealed?0:1);":"assert.equal(a.currentAtk,sealed?1:3);"));
paired('C26 own aura bonus and attack heal stop',
"const a=stopped(testPlace('C26'),sealed),n=testPlace('C07','player','back'),w=stats(testPlace('C27','player','back',1),1,30,0);w.currentHp=10;assert.equal(effectiveAtk(a),a.currentAtk+(sealed?0:2));await testAttack(a,{type:'lp',player:state.ai});assert.equal(w.currentHp,sealed?10:12);");
spec('stopped condition card C07 still enables another C26 aura',
"const a=testPlace('C26'),n=stopped(testPlace('C07','player','back'));assert.equal(effectiveAtk(a),a.currentAtk+2);");
paired('C24 own positive buff doubling stops',
"const a=stopped(testPlace('C24'),sealed),h=testPlace('C23','player','back'),atk=a.currentAtk,def=a.currentDef,hp=a.maxHp;buffAtk(a,1);buffDef(a,1);buffMaxHp(a,1);assert.equal(a.currentAtk,atk+(sealed?1:2));assert.equal(a.currentDef,def+(sealed?1:2));assert.equal(a.maxHp,hp+(sealed?1:2));");
spec('stopped condition card C23 still enables another C24 doubling',
"const a=testPlace('C24'),h=stopped(testPlace('C23','player','back')),atk=a.currentAtk;buffAtk(a,1);assert.equal(a.currentAtk,atk+2);");
for(const [id,n] of [['C11',2],['C32',1]]) paired(id+' new-ally buff stops; already applied buff remains',
"const s=testPlace('"+id+"','player','back'),old=testSummon('C01','player','front',0),atk=old.currentAtk;stopped(s,sealed);const incoming=testSummon('C01','player','front',1);assert.equal(old.currentAtk,atk);assert.equal(incoming.currentAtk,incoming.atk+(sealed?0:"+n+"));");
paired('C48 new Claire boost stops; existing boost and withdrawal cleanup remain',
"const s=testPlace('C48','player','back'),old=testSummon('C47','player','front',0),atk=old.currentAtk;stopped(s,sealed);const incoming=testSummon('C47','player','front',1);assert.equal(old.currentAtk,atk);assert.equal(incoming.currentAtk,incoming.atk+(sealed?0:3));destroyCharacter(s,state.ai,{silentDamage:true});assert.equal(old.currentAtk,old.atk);assert.equal(incoming.currentAtk,incoming.atk);");
paired('C48 retreat heal follows C48 status',
"state.player.lp=10;const s=stopped(testPlace('C48','player','back'),sealed),v=stats(testPlace('C27'),1,1,0);damageCharacter(v,2,state.ai,{ignoreDef:true,cause:'attack'});assert.equal(state.player.lp,sealed?10:11);");
for(const id of ['C23','C63']) paired(id+' support tax stops',
"const s=stopped(testPlace('"+id+"','ai','back'),sealed),c=createInstance(CARD_DB.get('S01'),'player');assert.equal(effectiveCost(c,state.player),c.cost+(sealed?0:1));");
paired('C65 new retreat return stops without consuming its once-only flag',
"const s=stopped(testPlace('C65','player','back'),sealed),v=stats(testPlace('C56'),1,1,0);testPlace('C57','player','front',1);testPlace('C58','player','back',1);damageCharacter(v,2,state.ai,{ignoreDef:true,cause:'attack'});assert.equal(state.player.hand.length,sealed?0:1);assert.equal(Boolean(s.mariaReturnUsed),!sealed);");
paired('C72 active cleanse stops without spending energy or usage',
"const s=stopped(testPlace('C72','player','back'),sealed),v=testPlace('C27');v.status.stun=1;const energy=state.player.energy;assert.equal(canUseKanon(s,state.player),!sealed);assert.equal(requestKanonCleanse(s,state.player),!sealed);if(!sealed)testChoose(v);assert.equal(v.status.stun,sealed?1:0);assert.equal(state.player.energy,energy-(sealed?0:1));assert.equal(s.activeCleanseTurn,sealed?-1:state.player.turns);");

for(const id of ['C02','C06']) for(const forced of [false,true]) paired(id+' '+(forced?'forced':'natural')+' awakening stops and resumes',
"const a=stopped(testPlace('"+id+"'),sealed);state.player.turns=4;grantNextSkillMultiplier(a,2);"+
(forced?"resolveSupport(state.player,state.ai,createInstance(CARD_DB.get('S05'),'player'),a);":"applyStartEffects(state.player);")+
"assert.equal(a.awakened,!sealed);if(sealed){assert.equal(a.nextSkillMultiplier,2);clearAllStatuses(a);"+(forced?"awaken(a,state.player,true);":"applyStartEffects(state.player);")+"assert.equal(a.awakened,true);}");
spec('C06 dormant drawback stops only while closed',
"const a=testPlace('C06');state.phase='battle';assert.equal(canAttack(a,state.player),false);stopped(a);assert.equal(canAttack(a,state.player),true);assert.equal(a.awakened,false);clearAllStatuses(a);assert.equal(canAttack(a,state.player),false);");
spec('C07 no-heal drawback stops only while closed',
"const a=testPlace('C07');a.currentHp=1;healCharacter(a,1);assert.equal(a.currentHp,1);stopped(a);healCharacter(a,1);assert.equal(a.currentHp,2);clearAllStatuses(a);healCharacter(a,1);assert.equal(a.currentHp,2);");
spec('haste stops on summon turn; normal attack returns on later turns',
"const base=CHARACTERS.find(c=>c.haste);assert.ok(base);const a=testPlace(base.id);testPlace('C27','ai');a.summonedOnTurn=state.player.turns;state.phase='battle';assert.equal(canAttack(a,state.player),true);stopped(a);assert.equal(canAttack(a,state.player),false);state.player.turns++;assert.equal(canAttack(a,state.player),true);");
spec('Nox target lanes, immunity, expiry, normal attacks and skill recovery',
"const front=testPlace('C01','ai'),back=testPlace('C07','ai','back'),immune=testPlace('C61','ai','back',1);assert.equal(immune.statusImmune,true);testSummon('C67');assert.ok(state.pendingCardChoice);assert.ok(state.pendingCardChoice.options.every(o=>o.card!==front&&o.card!==immune));testChoose(back);assert.equal(back.status.periodicStop,1);assert.equal(setStatus(immune,'periodicStop',1),false);assert.equal(immune.status.periodicStop,0);endTurn(state.player);assert.equal(back.status.periodicStop,1);state.ai.deck=[createInstance(CARD_DB.get('C27'),'ai')];startTurn(state.ai);state.ai.back[0]=null;state.ai.front[1]=back;state.phase='battle';assert.equal(canAttack(back,state.ai),true);const atk=back.currentAtk,v=stats(testPlace('C27','player'),1,1,0);await testAttack(back,target(v));assert.equal(back.currentAtk,atk);endTurn(state.ai);assert.equal(back.status.periodicStop,0);state.ai.turns++;back.attacked=false;const v2=stats(testPlace('C27','player'),1,1,0);await testAttack(back,target(v2));assert.equal(back.currentAtk,atk+3);");
spec('Aria enables front target choices even when her own skill is stopped',
"stopped(testPlace('C66','player','back'));const t=testPlace('C07','ai');testSummon('C67','player','back',1);assert.ok(state.pendingCardChoice.options.some(o=>o.card===t));testChoose(t);assert.equal(t.status.periodicStop,1);");
spec('Kanon cleanse immediately restores a stopped ally intrinsic effect',
"const s=testPlace('C72','player','back'),a=stopped(testPlace('C26')),n=testPlace('C07','player','back',1);assert.equal(effectiveAtk(a),a.currentAtk);requestKanonCleanse(s,state.player);testChoose(a);assert.equal(effectiveAtk(a),a.currentAtk+2);");
spec('existing numeric buffs, protection, route and next multiplier survive closure',
"const a=testPlace('C26');buffAtk(a,3);buffDef(a,2);a.tempAtk=2;a.tempDef=1;grantNextSkillMultiplier(a,2);a.supportProtection={expiresAfterTurn:state.ai.turns+1};a.illusionRouteTurn=state.player.turns;const before=[a.currentAtk,a.currentDef,a.maxDef,a.tempAtk,a.tempDef,a.nextSkillMultiplier];stopped(a);assert.deepEqual([a.currentAtk,a.currentDef,a.maxDef,a.tempAtk,a.tempDef,a.nextSkillMultiplier],before);assert.ok(a.supportProtection);assert.equal(a.illusionRouteTurn,state.player.turns);const g=testPlace('C70','ai'),b=testPlace('C27','ai','back');assert.ok(getLegalTargets(a,state.player).some(t=>t.card===b));resolveSupport(state.ai,state.player,createInstance(CARD_DB.get('S14'),'ai'),a);assert.equal(a.currentDef,before[1]);assert.equal(a.supportProtection,null);");
spec('reserved support and effect nullification survive source closure',
"const s=testPlace('C17','ai','back'),e=testPlace('C61','ai','back',1);applySummonEffects(s,state.ai,'back');applySummonEffects(e,state.ai,'back');stopped(s);stopped(e);const v=testPlace('C27');v.currentHp=1;resolveSupport(state.player,state.ai,createInstance(CARD_DB.get('S01'),'player'),v);assert.equal(v.currentHp,1);assert.equal(state.ai.supportNullify,0);assert.equal(state.ai.effectNullify,1);resolveSupport(state.player,state.ai,createInstance(CARD_DB.get('S01'),'player'),v);assert.equal(v.currentHp,1);assert.equal(state.ai.effectNullify,0);");
spec('existing silenced retains its previous limited attack behavior',
"const a=testPlace('C07');a.status.silenced=1;const atk=a.currentAtk,v=stats(testPlace('C27','ai'),1,1,0);await testAttack(a,target(v));assert.equal(a.currentAtk,atk+3);assert.equal(a.killCount,1);");


for(const [phase,ids] of [
  ['start',['C01','C02','C05','C06','C12','C15','C18','C24','C51','C54']],
  ['end',['C04','C08','C10','C25','C27','C29','C38','C62','C64']]
]) for(const id of ids) paired(id+' '+phase+' effect is still stopped, including state/counters',
"Math.random=()=>0;deck();state.player.turns=5;state.player.energy=3;state.player.energyMax=3;const ally=testPlace('C03'),a=stopped(testPlace('"+id+"','player','back'),sealed);ally.currentHp=1;ally.currentDef=0;a.currentHp=1;a.drawTicker=1;a.sophiaBoostPending=true;a.sophiaSkillMultiplier=2;testPlace('C27','ai','back');const before=JSON.stringify([state.player,state.ai]);"+(phase==='start'?'applyStartEffects':'applyEndEffects')+"(state.player);const after=JSON.stringify([state.player,state.ai]);if(sealed)assert.equal(after,before);else assert.notEqual(after,before);");
for(const id of ['C09','C16','C18','C31','C37']) spec(id+' remains closed during turn-ending bind death',
"Math.random=()=>0;const a=stopped(stats(testPlace('"+id+"'),4,1,0)),ally=stats(testPlace('C27','player','back'),1,30,0),enemy=stats(testPlace('C27','ai'),1,30,0),lp=state.ai.lp;a.status.bind=1;endTurn(state.player);assert.equal(findCardLocation(a),null);assert.equal(state.ai.lp,lp);assert.equal(ally.currentHp,30);assert.equal(ally.currentAtk,1);assert.equal(enemy.currentHp,30);assert.equal(enemy.status.stun,0);");
for(const sourceLane of ['front','back']) spec('C48 closure lasts through bind death when source is in '+sourceLane,
"state.player.lp=10;const source=stopped(testPlace('C48','player','"+sourceLane+"',0)),victim=stats(testPlace('C27','player','"+sourceLane+"',1),1,1,0);victim.status.bind=1;endTurn(state.player);assert.equal(findCardLocation(victim),null);assert.equal(state.player.lp,10);assert.equal(source.status.periodicStop,0);");
spec('C65 closure lasts through bind death before turn-ending status expiry',
"const source=stopped(testPlace('C65')),victim=stats(testPlace('C56','player','front',1),1,1,0);testPlace('C57','player','back');testPlace('C58','player','back',1);victim.status.bind=1;endTurn(state.player);assert.equal(findCardLocation(victim),null);assert.equal(state.player.hand.length,0);assert.equal(Boolean(source.mariaReturnUsed),false);assert.equal(source.status.periodicStop,0);");


paired('C56 attack cleanse stops without cleansing its own closure',
"const a=stopped(testPlace('C56'),sealed),ally=testPlace('C27','player','back');ally.status.stun=1;await testAttack(a,{type:'lp',player:state.ai});assert.equal(ally.status.stun,sealed?1:0);assert.equal(a.status.periodicStop,sealed?1:0);");
spec('C07 support-heal target eligibility follows temporary closure',
"const a=testPlace('C07'),support=createInstance(CARD_DB.get('S01'),'player');a.currentHp=1;assert.equal(getSupportTargets(support,state.player,state.ai).includes(a),false);stopped(a);assert.equal(getSupportTargets(support,state.player,state.ai).includes(a),true);resolveSupport(state.player,state.ai,support,a);assert.equal(a.currentHp,a.maxHp);clearAllStatuses(a);a.currentHp=1;assert.equal(getSupportTargets(support,state.player,state.ai).includes(a),false);");
spec('already awakened stats and permanent attack stacks persist through closure',
"const a=testPlace('C02'),stacked=testPlace('C07','player','back');awaken(a,state.player,true);stacked.killCount=2;buffAtk(stacked,6);const before=[a.awakened,a.currentAtk,a.currentDef,a.maxDef,stacked.killCount,stacked.currentAtk];stopped(a);stopped(stacked);applyStartEffects(state.player);assert.deepEqual([a.awakened,a.currentAtk,a.currentDef,a.maxDef,stacked.killCount,stacked.currentAtk],before);");


spec('retreat of a closed C48 never removes a different C48 source boost',
"const active=testPlace('C48','player','back'),closed=stopped(testPlace('C48','player','back',1)),claire=testSummon('C47','player','front');assert.equal(claire.currentAtk,claire.atk+3);assert.equal(claire.currentDef,claire.def+3);assert.equal(claire.c48BoostSources.length,1);destroyCharacter(closed,state.ai,{silentDamage:true});assert.equal(claire.currentAtk,claire.atk+3);assert.equal(claire.currentDef,claire.def+3);assert.equal(claire.c48BoostSources.length,1);assert.equal(claire.c48BoostSources[0].sourceId,active.instanceId);destroyCharacter(active,state.ai,{silentDamage:true});assert.equal(claire.currentAtk,claire.atk);assert.equal(claire.currentDef,claire.def);assert.equal(claire.c48BoostSources.length,0);");


spec('AI values C64 extra attack after next-turn reset despite previous use',
"const s=testPlace('C64','ai','back');s.sionReattackUsed=true;state.current='ai';assert.equal(noxSkillValue(s),-2);state.current='player';assert.equal(noxSkillValue(s),8);s.sionReattackUsed=false;state.current='ai';assert.equal(noxSkillValue(s),8);stopped(s);assert.equal(noxSkillValue(s),0);assert.equal(noxSkillValue(s,true),8);");
spec('AI actually chooses previously used C64 for Nox before its next-turn reset',
"const s=testPlace('C64','player','back');s.sionReattackUsed=true;testSummon('C67','ai','back');assert.equal(state.current,'ai');assert.equal(s.status.periodicStop,1);assert.equal(state.pendingCardChoice,null);");
for(const id of ['C28','C46']) paired('AI '+id+' DEF-bypass prediction matches stopped and active attacks',
"const a=stopped(stats(testPlace('"+id+"','ai'),2),sealed),v=stats(testPlace('C27'),1,30,5);assert.equal(aiAttackIgnoresDef(a),!sealed);const p=aiPredictedDamageProfile(a,v),f=aiFocusedDamageProfile(v,[a]);assert.deepEqual(p,{hpDamage:sealed?0:2,shieldDamage:sealed?2:0,totalDamage:2});assert.equal(f.hpDamage,p.hpDamage);assert.equal(f.shieldDamage,p.shieldDamage);assert.equal(f.removes,false);await testAttack(a,target(v));assert.equal(30-v.currentHp,p.hpDamage);assert.equal(5-v.currentDef,p.shieldDamage);");
paired('AI C44 ST bonus prediction matches stopped and active attacks',
"const a=stopped(stats(testPlace('C44','ai'),2),sealed),v=stats(testPlace('C27'),1,30,0),p=aiPredictedDamageProfile(a,v),f=aiFocusedDamageProfile(v,[a]);assert.equal(aiAttackValueForTarget(a,v),sealed?2:4);assert.equal(p.hpDamage,sealed?2:4);assert.equal(f.hpDamage,p.hpDamage);await testAttack(a,target(v));assert.equal(30-v.currentHp,p.hpDamage);");
paired('AI C03 reduction prediction matches stopped and active defenders',
"const a=stats(testPlace('C27','ai'),3),v=stopped(stats(testPlace('C03'),1,30,0),sealed),p=aiPredictedDamageProfile(a,v),f=aiFocusedDamageProfile(v,[a]);assert.equal(aiAttackValueForTarget(a,v),sealed?3:2);assert.equal(p.hpDamage,sealed?3:2);assert.equal(f.hpDamage,p.hpDamage);await testAttack(a,target(v));assert.equal(30-v.currentHp,p.hpDamage);");
paired('AI C49 last-stand removal and focused prediction match real attacks',
"const a=stats(testPlace('C27','ai'),3),v=stopped(stats(testPlace('C49'),1,2,0),sealed),p=aiPredictedDamageProfile(a,v),f=aiFocusedDamageProfile(v,[a]);assert.equal(p.hpDamage,3);assert.equal(Boolean(aiCanRemoveTargetWithDamage(v,p.hpDamage)),sealed);assert.equal(aiCanRemoveTargetWithDamage(v,1),false);assert.equal(f.removes,sealed);await testAttack(a,target(v));assert.equal(findCardLocation(v)===null,sealed);");
spec('AI focused damage correctly spends DEF across multiple stopped bypass attackers',
"const a=stopped(stats(testPlace('C28','ai'),3)),b=stopped(stats(testPlace('C46','ai','front',1),3)),v=stats(testPlace('C27'),1,1,5),f=aiFocusedDamageProfile(v,[a,b]);assert.deepEqual(f,{hpDamage:1,shieldDamage:5,removes:true});");
spec('AI C49 focus understands one active last stand needs a follow-up attack',
"const a=stats(testPlace('C27','ai'),3),b=stats(testPlace('C27','ai','front',1),1),v=stats(testPlace('C49'),1,2,0);assert.equal(aiFocusedDamageProfile(v,[a]).removes,false);assert.equal(aiFocusedDamageProfile(v,[a,b]).removes,true);v.lastStandUsed=true;assert.equal(aiCanRemoveTargetWithDamage(v,3),true);assert.equal(aiFocusedDamageProfile(v,[a]).removes,true);");
spec('AI never predicts a used C46 flare as DEF-bypass after closure ends',
"const a=testPlace('C46','ai');a.atomicFlareUsed=true;assert.equal(aiAttackIgnoresDef(a),false);stopped(a);assert.equal(aiAttackIgnoresDef(a),false);clearAllStatuses(a);assert.equal(aiAttackIgnoresDef(a),false);");

(async()=>{
  const results=[];let hashes;
  for(const item of cases){
    try{const duel=createDuelVm();hashes ||= {...duel.hashes, 'scripts/test-nox-full-seal.cjs':hash(fs.readFileSync(__filename,'utf8'))};await duel.run('(async()=>{'+fixture+item.body+'})()');results.push({name:item.name,passed:true});}
    catch(error){results.push({name:item.name,passed:false,error:error.stack||String(error)});}
  }
  const report={contract:'C67 full intrinsic-skill closure; attack and guard maintained',passed:results.every(r=>r.passed),checks:results.length,failures:results.filter(r=>!r.passed).length,hashes,results};
  console.log(JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;
})().catch(error=>{console.error(error);process.exitCode=1;});
