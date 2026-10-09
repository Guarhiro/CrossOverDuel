# CROSSOVER DUEL

Browser card battle game.

C66–C72 add Aria, Nox, Stellaria, Seraphina, Galdio, Neiras and Kanon. Their selected placement effects and Kanon's active cleanse are available in the duel UI, collection, deck editor, rewards and exchange. Rules are documented in [the performance specification](docs/new-card-performance-v1.md); reference artwork is tracked in [the art asset notes](docs/new-card-art-assets.md).

Run `node scripts/test-new-cards.cjs` for isolated rule checks and `node scripts/simulate-new-cards.cjs` for seeded automated battles. These use private in-memory storage. Browser checks use `node scripts/test-new-cards-browser.cjs` with Playwright and Chrome; set `CROSSOVER_BROWSER_MODULES` and `CROSSOVER_CHROME` to override the local dependency paths.

## Publish with GitHub Pages

1. Create a GitHub repository.
2. Upload all files in this folder to the repository root.
3. Open repository Settings.
4. Open Pages.
5. Set source to `Deploy from a branch`, branch `main`, folder `/root`.
6. Open the published GitHub Pages URL.

## Notes

- The opening movie plays from YouTube: https://youtu.be/gzPKSXQVr7s
- Local MP4 files are intentionally excluded from this package.
- Game progress, collection, exchange points, deck edit data, and free-play wins are saved in the browser's localStorage.
- Use `DATA TRANSFER` on the title screen to export/import a signed JSON package. The same signature key is required on import, and modified files are rejected.
- Card exchange rates: converting cards gives C 1P, R 2P, SR 3P, SSR 5P, UR 10P. Buying cards costs C 25P, R 50P, SR 100P, SSR 200P, UR 300P.
- `SYSTEM VOICE` lists the browser's `speechSynthesis` voices and saves the selected system voice in localStorage. The signed transfer payload also carries this setting, but another browser may require choosing a local equivalent voice.
- Custom character/system voices are not bundled yet. Add future implementations through `CUSTOM_SYSTEM_VOICE_OPTIONS` in `app.js`, while browser voice selection remains available as the fallback.
