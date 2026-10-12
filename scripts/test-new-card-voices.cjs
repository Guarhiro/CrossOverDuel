// Focused audio validation in a disposable Chrome context; no user saves are loaded.
// Run: node scripts/test-new-card-voices.cjs
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { ROOT, writeReport, hash } = require('./duel-vm.cjs');
const runtimeModules = process.env.CROSSOVER_BROWSER_MODULES || '/Users/guarhiro/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(path.join(runtimeModules, 'playwright'));
const ids = Array.from({ length: 7 }, (_, index) => `C${66 + index}`);
const events = ['summon', 'attack', 'retreat'];
const paths = ids.flatMap(id => events.map(event => `assets/voice/${id}/${event}.mp3`));
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.mp3': 'audio/mpeg', '.svg': 'image/svg+xml', '.json': 'application/json' };

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
  let browser;
  const checks = [], errors = [], missingResources = [], decoded = [], gameplay = [];
  let failure = null, browserVersion = null, gesture = null, defaultVolume = null, mutedEvents = 0;
  try {
    browser = await chromium.launch({ executablePath: process.env.CROSSOVER_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
    browserVersion = browser.version();
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) missingResources.push({ url: response.url(), status: response.status() }); });
    await page.addInitScript(() => {
      const NativeAudio = window.Audio;
      window.__voiceAudit = { records: [], trustedGesture: false };
      // Every constructed object remains a native HTMLAudioElement. Its play,
      // pause, decoding and media events are never replaced or simulated.
      function RecordingAudio(src) {
        const clip = src === undefined ? new NativeAudio() : new NativeAudio(src);
        const record = { clip, path: src ? new URL(src, location.href).pathname.slice(1) : '', native: clip instanceof NativeAudio && clip instanceof HTMLAudioElement, played: false, plays: 0, playingVolume: null, error: null };
        window.__voiceAudit.records.push(record);
        clip.addEventListener('playing', () => { record.played = true; record.plays += 1; record.playingVolume = clip.volume; });
        clip.addEventListener('error', () => { record.error = clip.error?.message || `MediaError ${clip.error?.code}`; });
        return clip;
      }
      RecordingAudio.prototype = NativeAudio.prototype;
      Object.setPrototypeOf(RecordingAudio, NativeAudio);
      window.Audio = RecordingAudio;
      window.__voiceRecordsSince = start => window.__voiceAudit.records.slice(start).map(record => ({
        path: record.path, native: record.native, played: record.played, plays: record.plays,
        playingVolume: record.playingVolume, error: record.error, duration: record.clip.duration,
        paused: record.clip.paused, currentTime: record.clip.currentTime, volume: record.clip.volume,
        readyState: record.clip.readyState,
      }));
    });
    await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: 'networkidle' });
    assert.equal(await page.title(), 'CROSSOVER DUEL');
    await page.evaluate(() => {
      audio.musicOn = false; audio.sfxOn = false; audio.stopMusic(); window.FX = null;
      window.__voiceDefaultVolume = audio.voiceVolume;
      const unlock = document.createElement('button');
      unlock.id = 'voiceValidationUnlock'; unlock.textContent = 'Unlock validation audio';
      unlock.style.cssText = 'position:fixed;z-index:2147483647;left:20px;top:20px;';
      unlock.addEventListener('click', event => { window.__voiceAudit.trustedGesture = event.isTrusted; audio.unlock(); });
      document.body.append(unlock);
    });
    await page.locator('#voiceValidationUnlock').click();
    await page.waitForFunction(() => audio.unlocked && (!audio.ctx || audio.ctx.state === 'running'));
    gesture = await page.evaluate(() => ({ trusted: __voiceAudit.trustedGesture, userActivation: navigator.userActivation.hasBeenActive, contextState: audio.ctx?.state || null }));
    assert.equal(gesture.trusted, true); assert.equal(gesture.userActivation, true);
    defaultVolume = await page.evaluate(() => __voiceDefaultVolume);
    await page.evaluate(() => document.querySelector('#voiceValidationUnlock').remove());
    checks.push({ name: 'Production scripts load; a trusted browser click unlocks native media', passed: true });

    decoded.push(...await page.evaluate(async assetPaths => {
      if (!audio.ctx) throw new Error('A native AudioContext is required for full MP3 decoding');
      return Promise.all(assetPaths.map(async assetPath => {
        const response = await fetch(assetPath);
        if (!response.ok) throw new Error(`${assetPath}: HTTP ${response.status}`);
        const bytes = await response.arrayBuffer();
        const buffer = await audio.ctx.decodeAudioData(bytes.slice(0));
        const metadata = await new Promise((resolve, reject) => {
          const clip = new Audio(assetPath);
          const timeout = setTimeout(() => reject(new Error(`${assetPath}: native metadata timeout`)), 10000);
          clip.preload = 'auto';
          clip.addEventListener('loadedmetadata', () => { clearTimeout(timeout); resolve({ duration: clip.duration, native: clip instanceof HTMLAudioElement }); }, { once: true });
          clip.addEventListener('error', () => { clearTimeout(timeout); reject(new Error(`${assetPath}: native media error ${clip.error?.code}`)); }, { once: true });
          clip.load();
        });
        let peak = 0;
        for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
          for (const sample of buffer.getChannelData(channel)) peak = Math.max(peak, Math.abs(sample));
        }
        return { path: assetPath, bytes: bytes.byteLength, decodedDuration: buffer.duration, metadataDuration: metadata.duration, sampleRate: buffer.sampleRate, channels: buffer.numberOfChannels, frames: buffer.length, peak, native: metadata.native };
      }));
    }, paths));
    assert.equal(decoded.length, 21);
    assert.ok(decoded.every(clip => clip.native && clip.bytes > 0 && clip.frames > 0 && clip.decodedDuration > 0 && clip.metadataDuration > 0 && clip.peak > 0));
    checks.push({ name: 'All 21 supplied MP3s load as native audio and fully decode to non-silent PCM', passed: true });

    const candidateCheck = await page.evaluate(() => ({
      newPaths: Array.from(NEW_CHARACTER_IDS, id => ({ id, paths: ['summon', 'attack', 'retreat'].map(event => voiceCandidatePaths(id, event)) })),
      legacyAttack: voiceCandidatePaths('C01', 'attack'),
      legacySummon: voiceCandidatePaths('C01', 'summon'),
    }));
    for (const item of candidateCheck.newPaths) {
      item.paths.forEach((candidates, index) => assert.equal(candidates[0], `assets/voice/${item.id}/${events[index]}.mp3`));
    }
    assert.deepEqual(candidateCheck.legacyAttack, ['assets/voice/C01/atack.mp3', 'assets/voice/C01/attack.mp3']);
    assert.deepEqual(candidateCheck.legacySummon, ['assets/voice/C01/summon.mp3', 'assets/voice/C01/sumon.mp3']);
    checks.push({ name: 'New voices resolve canonical paths first; legacy spelling order is preserved', passed: true });

    await page.evaluate(() => {
      window.__voiceFixture = (id, enabled = true) => {
        audio.stopVoice(); voicePathCache.clear(); missingVoiceCache.clear();
        audio.voiceOn = enabled; audio.voiceVolume = __voiceDefaultVolume; updateVoiceButtons();
        hideTitleScreen();
        state = { player: createPlayer('player', 'Player', []), ai: createPlayer('ai', 'AI', []), current: 'player', phase: 'main', busy: false, gameOver: false, turnNumber: 7, firstPlayerKey: 'player', selectedHandIndex: null, selectedField: null, selectedAttackerId: null, pendingCardChoice: null, pendingSupport: null, pendingDeckChoice: null, autoCardChoices: true, log: [] };
        state.player.turns = 4; state.ai.turns = 3; state.player.energy = 10; state.player.energyMax = 10;
        state.player.hand = [createInstance(CARD_DB.get(id), 'player')];
        render();
      };
    });
    async function expectNativePlayback(start, id, event) {
      const expectedPath = `assets/voice/${id}/${event}.mp3`;
      await page.waitForFunction(({ start, expectedPath }) => {
        const record = __voiceAudit.records.slice(start).find(item => item.path === expectedPath);
        return Boolean(record?.played && record.clip.currentTime > 0.01);
      }, { start, expectedPath });
      const records = await page.evaluate(start => __voiceRecordsSince(start), start);
      assert.equal(records.length, 1, `${id} ${event} should create exactly one audio clip`);
      const clip = records[0];
      assert.equal(clip.path, expectedPath); assert.equal(clip.native, true);
      assert.equal(clip.error, null); assert.equal(clip.played, true);
      assert.equal(clip.playingVolume, defaultVolume); assert.ok(clip.duration > 0);
      gameplay.push({ id, event, ...clip });
      await page.evaluate(() => audio.stopVoice());
      const stopped = await page.evaluate(start => ({ clips: __voiceRecordsSince(start), active: audio.voiceAudios.size }), start);
      assert.equal(stopped.active, 0); assert.ok(stopped.clips.every(item => item.paused && item.currentTime === 0));
    }
    for (const id of ids) {
      await page.evaluate(id => __voiceFixture(id), id);
      let start = await page.evaluate(() => __voiceAudit.records.length);
      const summoned = await page.evaluate(() => playCharacterFromHand(state.player, 0, 'front', 0));
      assert.equal(summoned, true); await expectNativePlayback(start, id, 'summon');
      start = await page.evaluate(() => __voiceAudit.records.length);
      const attack = await page.evaluate(async () => {
        const card = state.player.front[0]; card.summonedOnTurn = 1; state.phase = 'battle';
        if (!canAttack(card, state.player)) throw new Error('Fixture card cannot legally attack');
        const before = state.ai.lp;
        await performAttack(card, { type: 'lp', player: state.ai });
        return { attacked: card.attacked, damage: before - state.ai.lp, expected: effectiveAtk(card) };
      });
      assert.equal(attack.attacked, true); assert.equal(attack.damage, attack.expected);
      await expectNativePlayback(start, id, 'attack');
      start = await page.evaluate(() => __voiceAudit.records.length);
      const retreated = await page.evaluate(() => {
        const card = state.player.front[0]; card.currentHp = 0; destroyCharacter(card, state.ai);
        return !findCardLocation(card) && state.player.grave.includes(card);
      });
      assert.equal(retreated, true); await expectNativePlayback(start, id, 'retreat');
    }
    assert.equal(gameplay.length, 21);
    checks.push({ name: 'Every real summon, legal attack and retreat starts the correct native clip at the configured volume', passed: true });
    checks.push({ name: 'Stopping each of the 21 gameplay clips pauses and rewinds it and clears active voice tracking', passed: true });

    // C72 summon was played above; this now exercises the cached-path branch.
    const cachedStart = await page.evaluate(() => __voiceAudit.records.length);
    const cached = await page.evaluate(() => {
      const path = voicePathCache.get('C72:summon');
      audio.voiceVolume = 0.37;
      return { path, requested: audio.voice(CARD_DB.get('C72'), 'summon') };
    });
    assert.equal(cached.path, 'assets/voice/C72/summon.mp3'); assert.equal(cached.requested, true);
    await page.waitForFunction(start => __voiceAudit.records.slice(start).some(record => record.played && record.clip.currentTime > 0.01), cachedStart);
    const cachedRecords = await page.evaluate(start => __voiceRecordsSince(start), cachedStart);
    assert.equal(cachedRecords.length, 1); assert.equal(cachedRecords[0].path, cached.path); assert.equal(cachedRecords[0].playingVolume, 0.37);
    await page.evaluate(() => audio.stopVoice());
    checks.push({ name: 'Cached native playback honors a changed character voice volume', passed: true });

    await page.evaluate(() => __voiceFixture('C66'));
    const stopStart = await page.evaluate(() => __voiceAudit.records.length);
    await page.evaluate(() => playCharacterFromHand(state.player, 0, 'front', 0));
    await page.waitForFunction(start => __voiceAudit.records.slice(start).some(record => record.played && record.clip.currentTime > 0.01), stopStart);
    await page.locator('#voiceBtn').click();
    const buttonStop = await page.evaluate(start => ({ enabled: audio.voiceOn, active: audio.voiceAudios.size, clips: __voiceRecordsSince(start) }), stopStart);
    assert.equal(buttonStop.enabled, false); assert.equal(buttonStop.active, 0);
    assert.ok(buttonStop.clips.length > 0 && buttonStop.clips.every(clip => clip.paused && clip.currentTime === 0));
    checks.push({ name: 'The real Voice OFF button stops and rewinds a currently playing character clip', passed: true });

    const mutedStart = await page.evaluate(() => __voiceAudit.records.length);
    for (const id of ids) {
      await page.evaluate(async id => {
        __voiceFixture(id, false);
        if (!playCharacterFromHand(state.player, 0, 'front', 0)) throw new Error('Muted summon failed');
        const card = state.player.front[0]; card.summonedOnTurn = 1; state.phase = 'battle';
        await performAttack(card, { type: 'lp', player: state.ai });
        card.currentHp = 0; destroyCharacter(card, state.ai);
      }, id);
      mutedEvents += 3;
    }
    const mutedCount = await page.evaluate(() => __voiceAudit.records.length);
    assert.equal(mutedCount, mutedStart, 'Voice OFF must prevent native Audio construction for every event');
    checks.push({ name: 'All 21 real gameplay events remain muted while Voice is OFF', passed: true });
    assert.deepEqual(errors, []); assert.deepEqual(missingResources, []);
    checks.push({ name: 'No JavaScript errors or missing HTTP resources during decoding and playback', passed: true });
    await context.close();
  } catch (error) {
    failure = String(error.stack || error);
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
  const hashes = Object.fromEntries(['index.html', 'app.js', 'new-cards.js', 'scripts/test-new-card-voices.cjs', ...paths]
    .filter(filename => fs.existsSync(path.join(ROOT, filename)))
    .map(filename => [filename, hash(fs.readFileSync(path.join(ROOT, filename)))]));
  const report = {
    date: '2026-10-12', type: 'focused native Chrome character voice integration', root: ROOT,
    browserVersion, storageIsolation: 'fresh disposable Chrome context; no user browser profile or saves',
    recording: 'Audio constructor records real native HTMLAudioElements; play/pause and gameplay functions are not mocked',
    gesture, defaultVolume, expectedAssets: paths.length, decodedAssets: decoded.length, gameplayEvents: gameplay.length, mutedEvents,
    total: checks.length + (failure ? 1 : 0), passed: checks.filter(check => check.passed).length, failed: failure ? 1 : 0,
    checks, decoded, gameplay, errors, missingResources, failure, hashes,
    limitations: ['Confirms native decoding, playing events and advancing playback time in headless Chrome; physical speaker output and human listening are not assessed.', 'BGM, sound effects and visual effects are disabled to isolate character voices; this does not replace broader game or balance validation.'],
  };
  const target = writeReport('new-card-voices-browser-2026-10-12.json', report);
  console.log(JSON.stringify({ total: report.total, passed: report.passed, failed: report.failed, decodedAssets: report.decodedAssets, gameplayEvents: report.gameplayEvents, mutedEvents: report.mutedEvents, report: target, failure }, null, 2));
  if (failure) process.exitCode = 1;
}
main().catch(error => { console.error(error); process.exitCode = 1; });
