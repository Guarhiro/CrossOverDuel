// Run: node scripts/simulate-new-cards.cjs [repetitions-per-first=100]
// Existing deck definitions are never changed. Custom opponents are passed to startNewGame in this VM only.
const fs = require('node:fs');
const path = require('node:path');
const { ROOT, createDuelVm, writeReport, hash } = require('./duel-vm.cjs');
function replacements(deck, pairs) {
  const copy=[...deck];
  for(const [from,to] of pairs){const index=copy.indexOf(from);if(index<0)throw new Error(`cannot replace ${from}`);copy[index]=to;}
  return copy;
}
async function main(){
  const reps=Number(process.argv[2]||100);
  if(!Number.isInteger(reps)||reps<1||reps>1000)throw new Error('repetitions must be an integer from 1 to 1000');
  const duel=createDuelVm({driver:true,updatedBot:true});
  // Observation wrappers delegate unchanged to the actual functions. They do not alter rule results.
  duel.run(`
    let validationEffectMetrics={};
    const validationSummon=handleNewCardSummon;
    handleNewCardSummon=function(card,player){
      const beforeRoutes=new Map(player.front.filter(Boolean).map(c=>[c.instanceId,c.illusionRouteTurn]));
      const beforeStopped=new Map(boardCards(opponentOf(player)).map(c=>[c.instanceId,c.status.periodicStop]));
      const result=validationSummon(card,player);
      if(player.key==='player'&&card.id==='C71'&&player.front.some(c=>c&&c.illusionRouteTurn===player.turns&&beforeRoutes.get(c.instanceId)!==player.turns))validationEffectMetrics.neirasRoutesGranted++;
      if(player.key==='player'&&card.id==='C67'&&boardCards(opponentOf(player)).some(c=>c.status.periodicStop>0&&!beforeStopped.get(c.instanceId)))validationEffectMetrics.noxStopsApplied++;
      return result;
    };
    const validationAttack=performAttack;
    performAttack=async function(attacker,target,...args){
      const route=attacker.ownerKey==='player'&&attacker.illusionRouteTurn===state.player.turns;
      const rear=target.type==='card'&&findCardLocation(target.card)?.lane==='back';
      const marg=rear&&target.card.id==='C51';
      const bypass=route&&rear&&activeGuards(state.ai).length>0;
      if(route)validationEffectMetrics.neirasFirstAttacks++;
      if(route&&rear)validationEffectMetrics.neirasRearAttacks++;
      if(bypass)validationEffectMetrics.neirasGuardBypassRearAttacks++;
      const result=await validationAttack(attacker,target,...args);
      if(route&&marg&&!findCardLocation(target.card))validationEffectMetrics.neirasMargueriteRemovals++;
      if(bypass&&marg&&!findCardLocation(target.card))validationEffectMetrics.neirasGuardedMargueriteRemovals++;
      return result;
    };
  `);
  const originalDeckDefinitions=duel.run('JSON.stringify({player:PLAYER_DECK,ai:AI_DECKS})');
  const wall=Array.from(duel.run('window.__duel.decks.GUARD_WALL'));
  const chip=Array.from(duel.run('window.__duel.decks.MARG_CHIP'));
  const aggro=Array.from(duel.run('window.__duel.decks.AGGRO'));
  const seven=replacements(wall,[['C38','C66'],['C38','C67'],['C27','C68'],['S11','C69'],['C40','C70'],['C30','C71'],['S15','C72']]);
  const anti=replacements(wall,[['C38','C67'],['C38','C71']]);
  const aggroAnti=replacements(aggro,[['C11','C67'],['S09','C71']]);
  const configs=[
    {label:'Guard baseline vs Lv11',deck:wall,aiLevel:11},
    {label:'All seven vs Lv11',deck:seven,aiLevel:11},
    {label:'Guard baseline vs Marg Chip',deck:wall,aiLevel:11,opponentDeck:chip},
    {label:'Nox + Neiras vs Marg Chip',deck:anti,aiLevel:11,opponentDeck:chip},
    {label:'All seven vs Marg Chip',deck:seven,aiLevel:11,opponentDeck:chip},
    {label:'Aggro baseline vs Marg Chip',deck:aggro,aiLevel:11,opponentDeck:chip},
    {label:'Aggro Nox + Neiras vs Marg Chip',deck:aggroAnti,aiLevel:11,opponentDeck:chip},
  ];
  for(const cfg of configs){duel.context.validationDeck=cfg.deck;const valid=duel.run(`(()=>{const ids=validationDeck;const counts=countBy(ids,id=>id);return ids.length===20&&Object.entries(counts).every(([id,n])=>CARD_DB.has(id)&&n<=deckCopyLimitForCard(CARD_DB.get(id)));})()`);if(!valid)throw new Error(`invalid test deck: ${cfg.label}`);}
  const rows=[];
  for(let r=0;r<reps;r++)for(const cfg of configs)for(const first of ['player','ai']){
    // Identical to the previously saved 1,400-game baseline seed formula.
    const seed=100000+r*7919+cfg.aiLevel*97+17;
    duel.context.simulationConfig={...cfg,seed,first};
    const result=await duel.run(`(async()=>{
      Math.random=seededRandom(simulationConfig.seed);
      validationEffectMetrics={neirasRoutesGranted:0,neirasFirstAttacks:0,neirasRearAttacks:0,neirasGuardBypassRearAttacks:0,neirasMargueriteRemovals:0,neirasGuardedMargueriteRemovals:0,noxStopsApplied:0};
      window.__simulationOpponentOverride=simulationConfig.opponentDeck?{level:11,wins:55,name:'Custom Marg Chip (simulation only)',deck:simulationConfig.opponentDeck}:null;
      const result=await window.__duel.playGame({deck:simulationConfig.deck,aiLevel:simulationConfig.aiLevel,forceFirst:simulationConfig.first});
      if(state.pendingCardChoice)throw new Error('automatic card choice did not resolve');
      return {...result,effectMetrics:{...validationEffectMetrics}};
    })()`);
    rows.push({label:cfg.label,seed,...result});
  }
  if(duel.run('JSON.stringify({player:PLAYER_DECK,ai:AI_DECKS})')!==originalDeckDefinitions)throw new Error('existing deck definitions were mutated');
  const groups={};
  for(const row of rows){for(const first of [row.first,'all']){const key=`${row.label}|${first}`;const g=groups[key]??={n:0,win:0,timeout:0,rounds:0,effectMetrics:{}};g.n++;g.win+=row.winner==='player';g.timeout+=row.winner==='timeout';g.rounds+=row.rounds;for(const [metric,count] of Object.entries(row.effectMetrics))g.effectMetrics[metric]=(g.effectMetrics[metric]||0)+count;}}
  const summary=Object.entries(groups).map(([matchup,g])=>({matchup,games:g.n,playerWinRate:100*g.win/g.n,avgRounds:Math.round(100*g.rounds/g.n)/100,timeouts:g.timeout,effectMetrics:g.effectMetrics}));
  const baselineFile=path.join(ROOT,'docs/validation/current-balance-2026-10-09.json');
  let baselineReplay=null;
  if(fs.existsSync(baselineFile)){
    const old=JSON.parse(fs.readFileSync(baselineFile,'utf8'));
    const originals=new Map(old.rows.filter(r=>r.deck==='GUARD_WALL'&&r.level===11).map(r=>[`${r.seed}|${r.first}`,r]));
    const current=rows.filter(r=>r.label==='Guard baseline vs Lv11');
    const matches=current.filter(r=>originals.has(`${r.seed}|${r.first}`));
    const changes=matches.filter(r=>{const prior=originals.get(`${r.seed}|${r.first}`);return ['winner','rounds','lpP','lpA'].some(k=>r[k]!==prior[k]);});
    baselineReplay={originalHashes:{app:old.engineSHA256,driver:old.driverSHA256},pairedGames:matches.length,changedOutcomes:changes.length,changes:changes.map(r=>({seed:r.seed,first:r.first,before:originals.get(`${r.seed}|${r.first}`),after:r}))};
  }
  const report={date:'2026-10-09',type:'headless seeded AI integration',hashes:{...duel.hashes,'scripts/simulate-new-cards.cjs':hash(fs.readFileSync(__filename,'utf8'))},repetitionsPerFirst:reps,totalGames:rows.length,
    playerBot:'Existing sim-driver plus automatic new-card choices, new-card front fallback when back is full, Kanon active cleanse before each play, and route-aware backline target preference. The same bot is used for every baseline and new-card group.',
    opponentBot:'Current production AI; custom Marg Chip deck is passed as a profile override without changing AI_DECKS.',
    storageIsolation:'private in-memory VM Map; no browser data touched',storageAudit:duel.storageAudit,existingDeckDefinitionsUnchanged:true,
    decks:configs.map(({label,deck,aiLevel,opponentDeck})=>({label,deck,aiLevel,opponentDeck:opponentDeck||null})),summary,baselineReplay,rows,
    limitations:['Headless rule/AI execution; UI interactions and image rendering are not tested.','Win rates describe these explicit decks and deterministic bots, not human play or all deck matchups.','All-seven decks replace seven existing slots, so the result cannot isolate an individual card effect.','Each first-order split has 100 games at the default sample size; small win-rate differences are noisy.']};
  const target=writeReport('new-card-simulation-2026-10-09.json',report);
  console.log(JSON.stringify({totalGames:report.totalGames,summary,baselineReplay:baselineReplay&&{pairedGames:baselineReplay.pairedGames,changedOutcomes:baselineReplay.changedOutcomes},report:target},null,2));
  if(rows.some(r=>r.winner==='timeout'))process.exitCode=1;
}
main().catch(error=>{console.error(error);process.exitCode=1;});
