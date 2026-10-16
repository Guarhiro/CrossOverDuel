// Real Chrome UI checks run against an isolated, disposable browser save.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { ROOT, hash } = require('./duel-vm.cjs');
const runtimeModules = process.env.CROSSOVER_BROWSER_MODULES || '/Users/guarhiro/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(path.join(runtimeModules, 'playwright'));
const output = path.join(ROOT, 'docs/validation/goodnight-world-cards');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg', '.svg': 'image/svg+xml', '.json': 'application/json' };

async function main() {
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const filename = path.resolve(ROOT, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!filename.startsWith(ROOT + path.sep)) { res.writeHead(403); return res.end(); }
    fs.readFile(filename, (error, content) => {
      if (error) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(content);
    });
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  fs.mkdirSync(output, { recursive: true });
  const checks = [], errors = [], missingResources = [], screenshots = [];
  let browser;
  try {
    browser = await chromium.launch({ executablePath: process.env.CROSSOVER_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    page.setDefaultTimeout(9000);
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) missingResources.push({ url: response.url(), status: response.status() }); });
    await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: 'networkidle' });
    assert.equal(await page.title(), 'CROSSOVER DUEL');
    await page.evaluate(() => {
      audio.musicOn = false; audio.sfxOn = false; audio.voiceOn = false; window.FX = null;
      window.browserPut = (id, owner, lane, index) => {
        const card = createInstance(CARD_DB.get(id), owner); card.summonedOnTurn = 1;
        state[owner][lane][index] = card; return card;
      };
      window.browserFixture = () => {
        closeGallery(); closeDeckEditor(); hideTitleScreen(); hideSkillPopup();
        document.querySelectorAll('.modal').forEach(modal => modal.classList.add('hidden'));
        state = { player: createPlayer('player', 'Player', []), ai: createPlayer('ai', 'AI', []), current: 'player', phase: 'main', busy: false, gameOver: false, turnNumber: 7, firstPlayerKey: 'player', selectedHandIndex: null, selectedField: null, selectedAttackerId: null, pendingCardChoice: null, pendingSupport: null, pendingDeckChoice: null, log: [] };
        state.player.turns = 4; state.ai.turns = 3;
        state.player.energy = 10; state.player.energyMax = 10;
        state.ai.energy = 10; state.ai.energyMax = 10;
        closeHandDock(); render();
      };
      browserFixture();
    });
    const cards = await page.evaluate(() => ['C73', 'C74'].map(id => {
      const card = CARD_DB.get(id);
      return { id: card.id, name: card.name, series: card.series, rarity: card.rarity, element: card.element, role: card.role, cost: card.cost, atk: card.atk, def: card.def, hp: card.hp };
    }));
    assert.deepEqual(cards, [
      { id: 'C73', name: 'ペルセポネ', series: 'グッドナイトワールド', rarity: 'UR', element: '無', role: 'AT', cost: 6, atk: 5, def: 2, hp: 5 },
      { id: 'C74', name: 'リナ', series: 'グッドナイトワールド', rarity: 'SR', element: '無', role: 'SP', cost: 3, atk: 2, def: 1, hp: 4 },
    ]);
    checks.push('Actual page loads both approved cards with the corrected existing series and approved stats');
    const capture = async filename => {
      await page.mouse.move(0, 0);
      await page.evaluate(async () => {
        hideSkillPopup();
        await document.fonts.ready;
        await Promise.all([...document.images].filter(image => image.offsetWidth && image.offsetHeight).map(image => image.decode().catch(() => {})));
        await Promise.all(document.getAnimations().filter(animation => Number.isFinite(animation.effect?.getComputedTiming().endTime)).map(animation => animation.finished.catch(() => {})));
      });
      const target = path.join(output, filename);
      await page.screenshot({ path: target, fullPage: true });
      screenshots.push(path.relative(ROOT, target));
    };
    const placeFromHand = async (id, lane, index) => {
      await page.evaluate(cardId => { state.player.hand = [createInstance(CARD_DB.get(cardId), 'player')]; render(); openHandDock(); }, id);
      await page.locator(`#playerHand [data-card-id="${id}"]`).dblclick();
      await page.locator('#phaseBanner').click();
      await page.locator(`.slot[data-owner="player"][data-lane="${lane}"][data-index="${index}"]`).click();
    };

    await page.evaluate(() => { browserFixture(); browserPut('C03', 'ai', 'front', 0); browserPut('C10', 'ai', 'front', 1); browserPut('C51', 'ai', 'back', 0); render(); });
    await placeFromHand('C74', 'back', 0);
    await page.locator('#newCardChoiceModal').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#newCardChoiceOptions button').count(), 2);
    assert.equal(await page.locator('#newCardChoiceOptions').textContent().then(text => text.includes('マルグリット')), false);
    assert.equal(await page.locator('#battleBtn').isDisabled(), true);
    assert.equal(await page.locator('#endTurnBtn').isDisabled(), true);
    await page.locator('#newCardChoiceOptions button').filter({ hasText: 'フィオナ' }).click();
    assert.equal(await page.locator('#newCardChoiceModal').isVisible(), false);
    assert.deepEqual(await page.evaluate(() => ({ slow: state.ai.front[0].status.slow, guard: activeGuards(state.ai).includes(state.ai.front[0]), skill: isNoxSkillStopped(state.ai.front[0]), energy: state.player.energy })), { slow: 1, guard: true, skill: false, energy: 7 });
    assert.match(await page.locator('.slot[data-owner="ai"][data-lane="front"][data-index="0"] .status-strip').textContent(), /スロー/);
    const slowAttackBlocked = await page.evaluate(() => { state.current = 'ai'; state.phase = 'battle'; const blocked = !canAttack(state.ai.front[0], state.ai); state.current = 'player'; state.phase = 'main'; render(); return blocked; });
    assert.equal(slowAttackBlocked, true);
    checks.push('Real Lina hand placement offers only enemy front targets, locks commands, applies visible Slow, and retains guard/skill');
    await page.evaluate(() => { browserFixture(); browserPut('C10', 'ai', 'front', 0); render(); });
    await placeFromHand('C74', 'back', 0);
    await page.locator('#newCardChoiceModal').waitFor({ state: 'visible' });
    await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(() => state.pendingCardChoice), null);
    assert.equal(await page.evaluate(() => state.ai.front[0].status.slow), 0);
    assert.equal(await page.locator('#battleBtn').isDisabled(), false);
    checks.push('Escape skips Lina optional choice and restores phase controls without applying Slow');

    await page.evaluate(() => { browserFixture(); browserPut('C10', 'ai', 'front', 0); browserPut('C51', 'ai', 'back', 0); render(); });
    await placeFromHand('C73', 'front', 0);
    await page.locator('#battleBtn').click();
    const ownAttacker = page.locator('.slot[data-owner="player"][data-lane="front"][data-index="0"] .field-card');
    await ownAttacker.click();
    assert.deepEqual(await page.evaluate(() => getLegalTargets(state.player.front[0], state.player).map(target => target.type)), ['card', 'card']);
    await page.locator('.slot[data-owner="ai"][data-lane="front"][data-index="0"] .field-card').click();
    await page.waitForFunction(() => !state.busy && state.player.front[0].velocityTargetId);
    assert.equal(await page.evaluate(() => state.player.front[0].velocityAttackUsed), true);
    await ownAttacker.click();
    assert.deepEqual(await page.evaluate(() => getLegalTargets(state.player.front[0], state.player).map(target => target.type === 'lp' ? 'LP' : target.card.id)), ['C10']);
    assert.equal(await page.locator('.slot[data-owner="ai"][data-lane="front"][data-index="0"] .field-card.targetable').count(), 1);
    assert.equal(await page.locator('.slot[data-owner="ai"][data-lane="back"][data-index="0"] .field-card.targetable').count(), 0);
    assert.match(await ownAttacker.locator('.status-strip').textContent(), /追撃/);
    await page.locator('.slot[data-owner="ai"][data-lane="front"][data-index="0"] .field-card').click();
    await page.waitForFunction(() => !state.busy && state.ai.front[0] === null);
    assert.equal(await page.evaluate(() => canAttack(state.player.front[0], state.player)), false);
    assert.equal(await page.evaluate(() => state.ai.lp), 20);
    checks.push('Actual Persephone summon attacks immediately without LP access, then the UI restricts one follow-up to the surviving first target');

    const artResults = await page.evaluate(async () => Promise.all(['C73', 'C74'].map(id => new Promise(resolve => {
      const image = new Image(); image.onload = () => resolve({ id, path: image.getAttribute('src'), width: image.naturalWidth, height: image.naturalHeight });
      image.onerror = () => resolve({ id, error: true }); image.src = cardArtPath(CARD_DB.get(id));
    }))));
    assert.ok(artResults.every(result => result.width > 0 && result.height > 0));
    checks.push('Both supplied image assets decode in actual Chrome');
    await page.evaluate(() => { saveCollection({ C73: 2, C74: 2 }); saveExchangePoints(1000); openDeckEditor(); });
    await page.locator('#librarySortBtn').click();
    await page.locator('#deckSortOptions label').filter({ has: page.locator('input[data-filter-key="series"][value="グッドナイトワールド"]') }).click();
    await page.locator('#applyDeckSortBtn').click();
    const seriesCards = await page.locator('#cardLibrary .deck-edit-card').evaluateAll(nodes => nodes.map(node => node.dataset.cardId));
    assert.ok(seriesCards.includes('C73') && seriesCards.includes('C74'));
    assert.equal(await page.evaluate(ids => ids.every(id => CARD_DB.get(id).series === 'グッドナイトワールド'), seriesCards), true);
    await page.locator('#toggleExchangeListBtn').click();
    assert.equal(await page.locator('#exchangeList [data-exchange-action="buy"][data-card-id="C73"]').textContent(), '-300P');
    assert.equal(await page.locator('#exchangeList [data-exchange-action="buy"][data-card-id="C74"]').textContent(), '-100P');
    checks.push('Actual series filter includes both new cards under the existing work; exchange uses UR 300P and SR 100P');
    const rewardResult = await page.evaluate(() => {
      const pool = ALL_CARDS.flatMap(card => Array({ UR: 3, SR: 6, R: 14, C: 28 }[card.rarity] || 12).fill(card));
      const originalRandom = Math.random;
      try {
        return ['C73', 'C74'].map(id => {
          const index = pool.findIndex(card => card.id === id);
          Math.random = () => (index + 0.5) / pool.length;
          return { id, drawn: randomRewardCard().id, weight: pool.filter(card => card.id === id).length };
        });
      } finally { Math.random = originalRandom; }
    });
    assert.deepEqual(rewardResult, [{ id: 'C73', drawn: 'C73', weight: 3 }, { id: 'C74', drawn: 'C74', weight: 6 }]);
    checks.push('Actual weighted reward selection can draw each new card with its existing rarity weight');
    const transferResult = await page.evaluate(async () => {
      const deck = [...PLAYER_DECK]; deck[0] = 'C73'; deck[1] = 'C74';
      if (!savePlayerDeckIds(deck, 1)) throw new Error('new card deck was rejected');
      saveActiveDeckSlot(1);
      const data = await createSignedTransferPackage('isolated-goodnight-browser-key');
      const payload = await verifyTransferObject(data, 'isolated-goodnight-browser-key');
      return { count: data.app.cardCount, owns: [payload.collection.C73, payload.collection.C74], deckIncludes: ['C73', 'C74'].map(id => payload.deckSlots[0].includes(id)) };
    });
    assert.deepEqual(transferResult, { count: 90, owns: [2, 2], deckIncludes: [true, true] });
    checks.push('Real signed transfer includes the 90-card catalog and both new ownership/deck records');

    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: width === 1440 ? 1000 : 900 });
      await page.evaluate(() => { browserFixture(); browserPut('C03', 'ai', 'front', 0); browserPut('C10', 'ai', 'front', 1); browserPut('C51', 'ai', 'back', 0); render(); });
      await placeFromHand('C74', 'back', 0);
      await page.locator('#newCardChoiceModal').waitFor({ state: 'visible' });
      const bounds = await page.locator('#newCardChoiceModal .modal-card').boundingBox();
      assert.ok(bounds.x >= -1 && bounds.x + bounds.width <= width + 1, `Slow choice fits ${width}px`);
      await capture(`slow-choice-${width}.png`);
      await page.locator('#newCardChoiceOptions button').filter({ hasText: 'フィオナ' }).click();
      await page.evaluate(() => { browserPut('C73', 'player', 'front', 0); state.phase = 'battle'; render(); });
      await page.locator('.slot[data-owner="player"][data-lane="front"][data-index="0"] .field-card').click();
      await page.locator('.slot[data-owner="ai"][data-lane="front"][data-index="0"] .field-card').click();
      await page.waitForFunction(() => !state.busy && state.player.front[0].velocityTargetId);
      await page.locator('.slot[data-owner="player"][data-lane="front"][data-index="0"] .field-card').click();
      await capture(`field-${width}.png`);
      await page.evaluate(() => { state.selectedAttackerId = null; state.selectedField = null; state.player.hand = ['C73', 'C74'].map(id => createInstance(CARD_DB.get(id), 'player')); render(); openHandDock(); });
      await page.waitForFunction(() => document.querySelector('#handDock').getBoundingClientRect().height >= (innerWidth < 600 ? 257 : 295));
      await capture(`hand-${width}.png`);
      await page.evaluate(() => { closeHandDock(); openGallery(); });
      for (const id of ['C73', 'C74']) {
        await page.locator(`#galleryCardGrid [data-card-id="${id}"]`).click();
        assert.match(await page.locator('#galleryCardStage .gallery-card-info').textContent(), id === 'C73' ? /ヴェロシティ/ : /スロー/);
        await page.evaluate(() => { document.querySelector('.gallery-shell').scrollTop = 0; });
        await capture(`gallery-${id}-${width}.png`);
      }
      await page.evaluate(() => { closeGallery(); openDeckEditor(); });
      await capture(`editor-${width}.png`);
      const cardBounds = await page.locator('#cardLibrary .deck-edit-card[data-card-id="C73"]').boundingBox();
      assert.ok(cardBounds && cardBounds.width > 0 && cardBounds.width <= width, `new deck card width fits ${width}px`);
      await page.evaluate(() => closeDeckEditor());
    }
    checks.push('Actual Slow choice, field follow-up, hand, gallery for both characters, and filtered editor render at desktop 1440px and mobile 390px');
    assert.deepEqual(errors, []);
    assert.deepEqual(missingResources, []);
    const sourceFiles = ['app.js', 'new-cards.js', 'new-card-ui.js', 'styles.css', 'index.html'];
    const report = { completedAt: new Date().toISOString(), passed: checks.length, checks, cards, errors, missingResources, artResults, rewardResult, transferResult, screenshots, hashes: Object.fromEntries(sourceFiles.map(filename => [filename, hash(fs.readFileSync(path.join(ROOT, filename)))])), storage: 'Disposable Playwright browser context; no user browser profile or save accessed' };
    const reportPath = path.join(output, 'browser-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify({ passed: checks.length, report: reportPath, screenshots }, null, 2));
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error.stack); process.exitCode = 1; });
