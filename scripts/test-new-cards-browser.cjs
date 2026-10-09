// Browser checks use a disposable Chrome profile; they never load the user's saves.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { ROOT, writeReport, hash } = require('./duel-vm.cjs');
const runtimeModules = process.env.CROSSOVER_BROWSER_MODULES || '/Users/guarhiro/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(path.join(runtimeModules, 'playwright'));
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.mp3': 'audio/mpeg', '.svg': 'image/svg+xml', '.json': 'application/json' };

async function main() {
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const filename = path.resolve(ROOT, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!filename.startsWith(ROOT + path.sep)) { res.writeHead(403); return res.end(); }
    fs.readFile(filename, (err, content) => {
      if (err) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(content);
    });
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  let browser;
  const checks = [], errors = [], missingResources = [], screenshots = [];
  try {
    browser = await chromium.launch({ executablePath: process.env.CROSSOVER_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    page.setDefaultTimeout(7000);
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => { if (response.status() >= 400) missingResources.push({ url: response.url(), status: response.status() }); });
    await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: 'networkidle' });
    assert.equal(await page.title(), 'CROSSOVER DUEL');
    checks.push('Actual HTML and classic script load without JavaScript errors');
    await page.evaluate(() => {
      audio.musicOn = false; audio.sfxOn = false; audio.voiceOn = false; window.FX = null;
      window.browserFixture = () => {
        hideTitleScreen();
        state = { player: createPlayer('player', 'Player', []), ai: createPlayer('ai', 'AI', []), current: 'player', phase: 'main', busy: false, gameOver: false, turnNumber: 7, firstPlayerKey: 'player', selectedHandIndex: null, selectedField: null, selectedAttackerId: null, pendingCardChoice: null, pendingSupport: null, pendingDeckChoice: null, log: [] };
        state.player.turns = 4; state.ai.turns = 3; state.player.energy = 10; state.player.energyMax = 10;
        window.browserPut = (id, owner, lane, index) => { const card = createInstance(CARD_DB.get(id), owner); card.summonedOnTurn = 1; state[owner][lane][index] = card; return card; };
        browserPut('C28', 'player', 'front', 0); browserPut('C70', 'player', 'front', 1); browserPut('C72', 'player', 'back', 0);
        browserPut('C21', 'ai', 'front', 0); browserPut('C51', 'ai', 'back', 0);
        render();
      };
      browserFixture();
    });
    // Click the same placement controls used in a real duel.
    await page.evaluate(() => { state.player.hand = [createInstance(CARD_DB.get('C67'), 'player')]; render(); openHandDock(); });
    await page.locator('#playerHand [data-card-id="C67"]').dblclick();
    await page.locator('#phaseBanner').click();
    await page.locator('.slot[data-owner="player"][data-lane="back"][data-index="1"]').click();
    await page.locator('#newCardChoiceModal').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#battleBtn').isDisabled(), true);
    assert.equal(await page.locator('#endTurnBtn').isDisabled(), true);
    const choiceScreenshot = path.join(ROOT, 'docs/validation/new-card-choice-desktop.png');
    await page.screenshot({ path: choiceScreenshot, fullPage: true }); screenshots.push(path.relative(ROOT, choiceScreenshot));
    await page.locator('#newCardChoiceOptions button').filter({ hasText: 'マルグリット' }).click();
    assert.equal(await page.evaluate(() => state.ai.back[0].status.periodicStop), 1);
    assert.equal(await page.locator('#newCardChoiceModal').isVisible(), false);
    checks.push('Hand click → placement → selected enemy periodic stop; phase controls locked during choice');

    await page.evaluate(() => { browserFixture(); state.player.front[0].status.bind = 2; state.selectedField = { owner: 'player', lane: 'back', index: 0 }; render(); });
    await page.locator('#newCardActions button').click();
    await page.locator('#newCardChoiceOptions button').first().click();
    assert.deepEqual(await page.evaluate(() => [state.player.front[0].status.bind, state.player.energy, state.player.back[0].activeCleanseTurn]), [0, 9, 4]);
    assert.equal(await page.locator('#newCardActions button').isDisabled(), true);
    checks.push('Kanon active button → selected cleanse → energy/use consumed and button disabled');

    await page.evaluate(() => { browserFixture(); state.player.grave = [createInstance(CARD_DB.get('C33'), 'player')]; state.player.back[1] = createInstance(CARD_DB.get('C66'), 'player'); handleNewCardSummon(state.player.back[1], state.player); render(); });
    await page.locator('#newCardChoiceOptions button').first().click();
    assert.deepEqual(await page.evaluate(() => [state.player.grave.length, state.player.hand[0].id, state.player.hand[0].currentHp]), [0, 'C33', 3]);
    checks.push('Grave choice removes the record and creates a base-state hand card');

    await page.evaluate(() => { browserFixture(); state.player.back[1] = createInstance(CARD_DB.get('C68'), 'player'); handleNewCardSummon(state.player.back[1], state.player); render(); });
    await page.locator('#newCardChoiceOptions button').filter({ hasText: '↔' }).first().click();
    assert.equal(await page.evaluate(() => state.pendingCardChoice), null);
    checks.push('Formation choice performs a swap and returns to normal controls');

    await page.evaluate(() => {
      browserFixture(); state.player.front[2] = createInstance(CARD_DB.get('C71'), 'player');
      handleNewCardSummon(state.player.front[2], state.player); render();
    });
    await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(() => state.pendingCardChoice), null);
    checks.push('Escape skips an optional placement choice');

    const artResults = await page.evaluate(async () => Promise.all(NEW_CHARACTERS.map((card) => new Promise((resolve) => {
      const img = new Image(); img.onload = () => resolve({ id: card.id, width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = () => resolve({ id: card.id, error: true }); img.src = cardArtPath(card);
    }))));
    assert.ok(artResults.every((result) => result.width > 0 && result.height > 0));
    checks.push('All seven actual image assets decode in Chrome');

    // Exercise collection/deck/exchange integration against a private browser save.
    await page.evaluate(() => { localStorage.setItem('crossover-duel-collection', JSON.stringify(Object.fromEntries(NEW_CHARACTERS.map(c => [c.id, 2])))); openDeckEditor(); });
    assert.equal(await page.locator('#cardLibrary .deck-edit-card[data-card-id="C67"]').count(), 1);
    await page.locator('#toggleExchangeListBtn').click();
    assert.equal(await page.locator('#exchangeList [data-exchange-action="buy"][data-card-id="C67"]').textContent(), '-50P');
    checks.push('New cards appear in the collection/deck library and Nox costs 50P in exchange');
    await page.evaluate(() => closeDeckEditor());
    const transferResult = await page.evaluate(async () => {
      const deck = [...PLAYER_DECK]; deck[1] = 'C67';
      if (!savePlayerDeckIds(deck, 1)) throw new Error('new card deck was rejected');
      saveActiveDeckSlot(1);
      const packageData = await createSignedTransferPackage('isolated-browser-test-key');
      const payload = await verifyTransferObject(packageData, 'isolated-browser-test-key');
      const tampered = structuredClone(packageData); tampered.payload.exchangePoints += 1;
      let tamperRejected = false;
      try { await verifyTransferObject(tampered, 'isolated-browser-test-key'); } catch { tamperRejected = true; }
      // Metadata from the old 81-card catalog remains accepted for an authentic old save.
      const legacy = structuredClone(packageData);
      delete legacy.signature; legacy.app.cardCount = 81; legacy.app.cardCatalogHash = 'old-catalog-fixture';
      legacy.payload.collection = {}; legacy.payload.playerDeckIds = [...PLAYER_DECK];
      legacy.payload.deckSlots = { '1': [...PLAYER_DECK] }; legacy.payload.activeDeckSlot = 1;
      legacy.signature = await signTransferObject(legacy, 'isolated-browser-test-key');
      const legacyPayload = await verifyTransferObject(legacy, 'isolated-browser-test-key');
      return { count: packageData.app.cardCount, ownsNox: payload.collection.C67, deckNox: payload.deckSlots[0].includes('C67'), tamperRejected, legacyCardsRetained: legacyPayload.playerDeckIds.every(id => CARD_DB.has(id)) };
    });
    assert.equal(transferResult.count, 88); assert.equal(transferResult.ownsNox, 2);
    assert.equal(transferResult.deckNox, true); assert.equal(transferResult.tamperRejected, true); assert.equal(transferResult.legacyCardsRetained, true);
    checks.push('Signed transfer retains new-card ownership/decks, rejects tampering, and accepts authentic prior catalog metadata');

    for (const width of [390, 768]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => { browserFixture(); state.player.front[2] = createInstance(CARD_DB.get('C71'), 'player'); handleNewCardSummon(state.player.front[2], state.player); render(); });
      await page.locator('#newCardChoiceModal').waitFor({ state: 'visible' });
      const bounds = await page.locator('#newCardChoiceModal .modal-card').boundingBox();
      assert.ok(bounds.x >= -1 && bounds.x + bounds.width <= width + 1, `choice dialog fits viewport ${width}`);
      const screenshot = path.join(ROOT, `docs/validation/new-card-choice-${width}.png`);
      await page.screenshot({ path: screenshot, fullPage: true }); screenshots.push(path.relative(ROOT, screenshot));
      await page.keyboard.press('Escape');
    }
    checks.push('Choice dialogs stay within 390px and 768px viewports');
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.evaluate(() => {
      browserFixture();
      state.player.front = [null, null, null]; state.player.back = [null, null];
      state.ai.front = [null, null, null]; state.ai.back = [null, null];
      ['C66', 'C67', 'C70'].forEach((id, i) => browserPut(id, 'player', 'front', i));
      ['C71', 'C72'].forEach((id, i) => browserPut(id, 'player', 'back', i));
      browserPut('C68', 'ai', 'front', 0); browserPut('C69', 'ai', 'back', 0);
      render();
    });
    await page.locator('.new-character-reference').evaluateAll(async images => Promise.all(images.map(img => img.decode())));
    const duelView = path.join(ROOT, 'docs/validation/new-cards-duel-desktop.png');
    await page.screenshot({ path: duelView, fullPage: true }); screenshots.push(path.relative(ROOT, duelView));
    await page.evaluate(() => {
      const preview = document.createElement('main');
      preview.style.cssText = 'display:grid;grid-template-columns:repeat(4,220px);gap:22px;max-width:946px;margin:32px auto;';
      NEW_CHARACTERS.forEach(base => {
        const container = document.createElement('div'); container.style.cssText = 'height:320px;min-width:0;';
        container.innerHTML = renderCard(createInstance(base, 'player')); preview.append(container);
      });
      document.body.classList.remove('title-active'); document.body.replaceChildren(preview);
    });
    await page.locator('.new-character-reference').evaluateAll(async images => Promise.all(images.map(img => img.decode())));
    const overview = path.join(ROOT, 'docs/validation/new-cards-art-overview.png');
    await page.screenshot({ path: overview, fullPage: true }); screenshots.push(path.relative(ROOT, overview));
    checks.push('All seven production card components render together for visual review');
    assert.deepEqual(errors, []);
    assert.deepEqual(missingResources, []);
    const sourceFiles = ['app.js', 'new-cards.js', 'new-card-ui.js', 'styles.css', 'index.html'];
    const hashes = Object.fromEntries(sourceFiles.map(filename => [filename, hash(fs.readFileSync(path.join(ROOT, filename)))]));
    const target = writeReport('new-cards-browser-2026-10-09.json', { completedAt: new Date().toISOString(), passed: checks.length, checks, errors, missingResources, artResults, transferResult, screenshots, hashes, storage: 'disposable Playwright browser context; no user browser profile' });
    console.log(JSON.stringify({ passed: checks.length, report: target, screenshots }, null, 2));
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error.stack); process.exitCode = 1; });
