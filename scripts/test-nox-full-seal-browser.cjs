// Browser regression checks run in a disposable context with no user browser data.
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
  const checks = [], errors = [], missingResources = [], screenshots = [], layouts = [];
  const screenshotDir = path.join(ROOT, 'docs', 'validation');
  fs.mkdirSync(screenshotDir, { recursive: true });
  try {
    browser = await chromium.launch({ executablePath: process.env.CROSSOVER_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) missingResources.push({ url: response.url(), status: response.status() }); });
    await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: 'networkidle' });
    assert.equal(await page.title(), 'CROSSOVER DUEL');
    await page.evaluate(() => {
      audio.musicOn = false; audio.sfxOn = false; audio.voiceOn = false; window.FX = null;
      window.noxBrowserFixture = () => {
        hideTitleScreen(); hideSkillPopup(); closeHandDock();
        state = { player: createPlayer('player', 'Player', []), ai: createPlayer('ai', 'AI', []), current: 'player', phase: 'main', busy: false, gameOver: false, turnNumber: 7, firstPlayerKey: 'player', selectedHandIndex: null, selectedField: null, selectedAttackerId: null, pendingCardChoice: null, pendingSupport: null, pendingDeckChoice: null, log: [] };
        state.player.turns = 4; state.ai.turns = 3;
        state.player.energy = state.player.energyMax = state.ai.energy = state.ai.energyMax = 10;
        window.noxBrowserPut = (id, owner, lane, index) => { const card = createInstance(CARD_DB.get(id), owner); card.summonedOnTurn = 1; state[owner][lane][index] = card; return card; };
        noxBrowserPut('C66', 'player', 'back', 0);
        const victim = noxBrowserPut('C33', 'player', 'front', 0); victim.currentHp = 1; victim.currentDef = 0;
        noxBrowserPut('C07', 'ai', 'front', 0);
        noxBrowserPut('C03', 'ai', 'front', 1);
        noxBrowserPut('C51', 'ai', 'back', 0);
        state.player.hand = [createInstance(CARD_DB.get('C67'), 'player')];
        render();
      };
      noxBrowserFixture();
    });
    checks.push('Actual classic-script game loads in an isolated Chrome context');

    const recordScreenshot = async name => {
      const filename = `nox-full-seal-${name}-2026-10-16.png`;
      await page.screenshot({ path: path.join(screenshotDir, filename), fullPage: true });
      screenshots.push(`docs/validation/${filename}`);
    };
    const assertFits = async (selector, width, height, label) => {
      const result = await page.locator(selector).evaluate(el => {
        const rect = el.getBoundingClientRect();
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, clientWidth: el.clientWidth, scrollWidth: el.scrollWidth, clientHeight: el.clientHeight, scrollHeight: el.scrollHeight, fontSize: getComputedStyle(el).fontSize, text: el.innerText };
      });
      assert.ok(result.x >= -1 && result.x + result.width <= width + 1, `${label} fits horizontally`);
      assert.ok(result.y >= -1 && result.y + result.height <= height + 1, `${label} fits vertically`);
      assert.ok(result.scrollWidth <= result.clientWidth + 1, `${label} has no horizontal text overflow`);
      layouts.push({ label, viewport: { width, height }, ...result });
      return result;
    };
    const summonNoxViaUi = async () => {
      await page.evaluate(() => { noxBrowserFixture(); openHandDock(); });
      await page.locator('#playerHand [data-card-id="C67"]').dblclick();
      await page.locator('#phaseBanner').click();
      await page.locator('.slot[data-owner="player"][data-lane="back"][data-index="1"]').click();
      await page.locator('#newCardChoiceModal').waitFor({ state: 'visible' });
    };

    for (const width of [1440, 390]) {
      const height = width === 1440 ? 1000 : 900;
      await page.setViewportSize({ width, height });
      await summonNoxViaUi();
      const description = await page.locator('#newCardChoiceDescription').innerText();
      assert.match(description, /全固有スキル/);
      assert.match(description, /通常攻撃・ガード・既存の強化は維持/);
      assert.equal(await page.locator('#battleBtn').isDisabled(), true);
      assert.equal(await page.locator('#endTurnBtn').isDisabled(), true);
      assert.equal(await page.locator('#newCardChoiceOptions button').filter({ hasText: 'ニィアル（悠久）' }).count(), 1);
      await assertFits('#newCardChoiceModal .modal-card', width, height, `Nox target dialog ${width}px`);
      await assertFits('#newCardChoiceDescription', width, height, `Nox target explanation ${width}px`);
      await recordScreenshot(`choice-${width}`);
      await page.locator('#newCardChoiceOptions button').filter({ hasText: 'ニィアル（悠久）' }).click();
      assert.equal(await page.evaluate(() => state.ai.front[0].status.periodicStop), 1);
      await page.locator('.slot[data-owner="player"][data-lane="back"][data-index="1"] [data-card-id="C67"]').hover();
      await page.evaluate(() => {
        const nox = state.player.back[1];
        showSkillPopup(nox, document.querySelector(`[data-iid="${nox.instanceId}"]`));
      });
      await page.locator('#skillPopup').waitFor({ state: 'visible' });
      const popup = await assertFits('#skillPopup', width, height, `Nox full card explanation ${width}px`);
      assert.match(popup.text, /相手後衛1体の全固有スキル/);
      assert.match(popup.text, /通常攻撃・ガード・既存の強化は維持/);
      assert.ok(popup.scrollHeight <= popup.clientHeight + 1, 'complete card explanation is visible');
      await recordScreenshot(`description-${width}`);
      await page.evaluate(() => hideSkillPopup());
    }
    checks.push('Real hand selection and placement with Aria can select front-row Nial at desktop and 390px; explanations state all unique skills and retained attack/guard/buffs');
    checks.push('Target dialogs, complete card explanations, and target-selection phase locks fit desktop and 390px screens');

    const stoppedAttack = await page.evaluate(async () => {
      endTurn(state.player); startTurn(state.ai); state.phase = 'battle';
      const attacker = state.ai.front[0], victim = state.player.front[0];
      const before = { atk: effectiveAtk(attacker), killCount: attacker.killCount, stop: attacker.status.periodicStop, canAttack: canAttack(attacker, state.ai) };
      await performAttack(attacker, { type: 'card', card: victim });
      return { before, after: { atk: effectiveAtk(attacker), killCount: attacker.killCount, stop: attacker.status.periodicStop, victimRemoved: !findCardLocation(victim), attacked: attacker.attacked } };
    });
    assert.deepEqual(stoppedAttack, { before: { atk: 5, killCount: 0, stop: 1, canAttack: true }, after: { atk: 5, killCount: 0, stop: 1, victimRemoved: true, attacked: true } });
    checks.push('During the next opposing turn Nial can attack and kill normally, but gains no ATK or kill credit while seal stays at 1');

    const restoredAttack = await page.evaluate(async () => {
      endTurn(state.ai);
      const stopAfterExpiry = state.ai.front[0].status.periodicStop;
      startTurn(state.player); endTurn(state.player); startTurn(state.ai); state.phase = 'battle';
      const attacker = state.ai.front[0], victim = noxBrowserPut('C33', 'player', 'front', 0);
      victim.currentHp = 1; victim.currentDef = 0;
      const before = { atk: effectiveAtk(attacker), killCount: attacker.killCount, stop: attacker.status.periodicStop, canAttack: canAttack(attacker, state.ai) };
      await performAttack(attacker, { type: 'card', card: victim });
      return { stopAfterExpiry, before, after: { atk: effectiveAtk(attacker), killCount: attacker.killCount, stop: attacker.status.periodicStop, victimRemoved: !findCardLocation(victim) } };
    });
    assert.deepEqual(restoredAttack, { stopAfterExpiry: 0, before: { atk: 5, killCount: 0, stop: 0, canAttack: true }, after: { atk: 8, killCount: 1, stop: 0, victimRemoved: true } });
    checks.push('Seal expires at the end of the opposing turn, and Nial gains ATK+3 and kill credit on the next legal kill');

    const retainedGuard = await page.evaluate(() => {
      noxBrowserFixture();
      const guard = state.ai.front[1]; guard.status.periodicStop = 1;
      const attacker = noxBrowserPut('C28', 'player', 'front', 0);
      state.phase = 'battle';
      return { canAttack: canAttack(attacker, state.player), legalTargets: getLegalTargets(attacker, state.player).map(t => t.card?.id || t.type), guardStop: guard.status.periodicStop };
    });
    assert.deepEqual(retainedGuard, { canAttack: true, legalTargets: ['C03'], guardStop: 1 });
    checks.push('A sealed guard still forces normal attacks to target that guard');

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.evaluate(() => {
      noxBrowserFixture();
      state.player.back = [null, null]; state.player.hand = [];
      noxBrowserPut('C72', 'player', 'back', 0).status.periodicStop = 1;
      noxBrowserPut('C72', 'player', 'back', 1);
      state.player.front[0].status.stun = 1;
      state.selectedField = { owner: 'player', lane: 'back', index: 0 };
      render();
    });
    assert.equal(await page.locator('#useKanonCleanseBtn').isDisabled(), true);
    assert.match(await page.locator('#kanonActionHint').innerText(), /閉律で固有スキルが停止中/);
    await page.locator('#kanonActionHint').scrollIntoViewIfNeeded();
    await recordScreenshot('kanon-stopped-desktop');
    await page.locator('.slot[data-owner="player"][data-lane="back"][data-index="1"]').click();
    assert.equal(await page.locator('#useKanonCleanseBtn').isEnabled(), true);
    await page.locator('#useKanonCleanseBtn').click();
    await page.locator('#newCardChoiceOptions button').filter({ hasText: 'カノン' }).click();
    assert.equal(await page.evaluate(() => state.player.back[0].status.periodicStop), 0);
    await page.locator('.slot[data-owner="player"][data-lane="back"][data-index="0"]').click();
    assert.equal(await page.locator('#useKanonCleanseBtn').isEnabled(), true);
    assert.match(await page.locator('#kanonActionHint').innerText(), /状態異常のある味方を選んで祓います/);
    await page.locator('#kanonActionHint').scrollIntoViewIfNeeded();
    await recordScreenshot('kanon-restored-desktop');
    checks.push('Kanon active button is disabled with an explicit Nox hint; another ally can cleanse it and restore its active button');

    assert.deepEqual(errors, []);
    assert.deepEqual(missingResources, []);
    const sourceFiles = ['app.js', 'new-cards.js', 'new-card-ui.js', 'styles.css', 'index.html', 'scripts/test-nox-full-seal-browser.cjs'];
    const hashes = Object.fromEntries(sourceFiles.map(filename => [filename, hash(fs.readFileSync(path.join(ROOT, filename)))]));
    const target = writeReport('nox-full-seal-browser-2026-10-16.json', { completedAt: new Date().toISOString(), passed: checks.length, checks, stoppedAttack, restoredAttack, retainedGuard, layouts, errors, missingResources, screenshots, hashes, storage: 'disposable Playwright browser context and temporary Chrome profile; no user save/profile opened' });
    console.log(JSON.stringify({ passed: checks.length, report: target, screenshots, errors, missingResources }, null, 2));
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error.stack); process.exitCode = 1; });
