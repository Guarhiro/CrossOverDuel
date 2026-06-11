// ============================================================
// STORY DATA — shared between the in-game player (app.js) and the
// authoring editor (editor.html / editor.js).
//
// Scenario shape:
//   { id, title, bgm, bg, steps: [ step ] }
//   step: { bg?, cg?, bgm?, sprites?: ["charId@pos"], speaker?, text, novel?,
//           set?, branch?, battle?, choices?: [ choice ] }
//   choice: { label, goto, set?, show? }
//   State (bg / sprites / cg / bgm) carries over between steps unless a step overrides it.
//   `goto` is a 0-based step index; omitting it advances to the next step.
//   `novel: true` shows the step as a full-screen darkened "novel" page (the
//   bottom dialogue box is hidden) — use it for long narration. `\n` makes a
//   line break in novel text.
//
// Flags & branching:
//   - `set: { flagName: value }` on a step or choice records flags into the
//     playthrough (flags persist in the save and are kept on resume).
//   - `branch: [ { flag, equals?, goto } ]` on a step is evaluated when leaving
//     the step: the first condition whose flag matches wins (`equals` defaults
//     to true); if none match, fall back to the step's `goto`/next step.
//   - `choice.show: { flag, equals? }` hides the choice unless the flag matches.
//   - `battle: { winFlag?, onWin?, onLose? }` marks a battle step. When reached
//     the player shows a battle prompt; the outcome sets `winFlag` (true/false)
//     and jumps to `onWin` / `onLose` (defaults to next step). Real duel launch
//     is deferred — for now the prompt offers debug 勝利 / 敗北 buttons.
//
// Assets are placeholders for now (CSS gradients + card-art stand-ins). Real
// background / sprite / CG images can later be supplied via an `img` field on
// the relevant registry entry; the player falls back to the placeholder if the
// image fails to load.
// ============================================================

const STORY_BACKGROUNDS = {
  black: { label: "暗転", css: "#04050b" },
  city_night: {
    label: "夜の街",
    css: "linear-gradient(180deg, #0b1430 0%, #1d2c5c 45%, #3a2a52 100%)",
  },
  academy: {
    label: "学園",
    css: "linear-gradient(180deg, #243b6b 0%, #4d6bb0 60%, #cdd9f2 100%)",
  },
  arena: {
    label: "闘技場",
    css: "radial-gradient(circle at 50% 30%, #5b2230 0%, #2a1023 55%, #0c0610 100%)",
  },
  sky: {
    label: "蒼穹",
    css: "linear-gradient(180deg, #7fd0ff 0%, #cfeeff 55%, #ffe9c2 100%)",
  },
  ruins: {
    label: "遺跡",
    css: "linear-gradient(180deg, #1c1408 0%, #3c2c14 55%, #6b4d24 100%)",
  },
};

const STORY_CHARACTERS = {
  reina: { name: "緋山玲奈", color: "#ff5a4d", img: "assets/cards/C01.png" },
  azura: { name: "アズーラ", color: "#5ad1ff", img: "assets/cards/C02.png" },
  fiona: { name: "フィオナ", color: "#b98cff", img: "assets/cards/C03.png" },
};

const STORY_CG = {
  clash: {
    label: "交差する戦線",
    css: "radial-gradient(circle at 50% 45%, #ffd76a 0%, #ff6a3d 35%, #7a1530 75%, #1a0610 100%)",
  },
};

// BGM keys the editor offers in its dropdown. These mirror the playable tracks
// defined in app.js (BGM_TRACKS); keep them in sync when adding new music.
const STORY_BGM_OPTIONS = [
  { key: "title", label: "タイトル" },
  { key: "titleJazz", label: "タイトル JAZZ" },
  { key: "deckEdit", label: "デッキ編集" },
  { key: "normal", label: "通常戦闘" },
  { key: "normalJazz", label: "通常戦闘 JAZZ" },
  { key: "advantage", label: "優勢" },
  { key: "advantageJazz", label: "優勢 JAZZ" },
  { key: "crisis", label: "劣勢" },
  { key: "crisisJazz", label: "劣勢 JAZZ" },
  { key: "victory", label: "勝利" },
  { key: "defeat", label: "敗北" },
];

const STORY_SCENARIOS = {
  prologue: {
    id: "prologue",
    title: "プロローグ — 交差する戦線",
    bgm: "title",
    bg: "city_night",
    steps: [
      {
        speaker: "",
        novel: true,
        text:
          "切り札は、いつだって一枚きり。\n\n" +
          "ネオン色の雨が降る夜の街。揺らめく光の奥で、二つの戦線が静かに交差しようとしていた。\n\n" +
          "四百年の封印を経てなお、その因縁は色褪せない。今夜、すべての決着がつく——少女たちは、まだそれを知らない。",
      },
      { speaker: "", text: "夜の街に、二つの戦線が交差しようとしていた。" },
      { bg: "academy", sprites: ["reina@center"], speaker: "緋山玲奈", text: "……ここが、決闘の舞台ね。" },
      { sprites: ["reina@left", "azura@right"], speaker: "アズーラ", text: "ようやく会えたわ、緋山玲奈。あなたを待っていた。" },
      { speaker: "緋山玲奈", text: "アズーラ……四百年の封印から目覚めた、というのは本当だったのね。" },
      { speaker: "アズーラ", text: "ええ。そして今度こそ、この戦線を越えてみせる。" },
      { speaker: "緋山玲奈", text: "……どうする? ここで退くこともできる。" },
      {
        speaker: "",
        text: "あなたはどうする?",
        choices: [
          { label: "決闘を受けて立つ", goto: 8, set: { accepted: true } },
          { label: "今は退く", goto: 11, set: { accepted: false } },
        ],
      },
      { bg: "arena", cg: "clash", sprites: [], speaker: "緋山玲奈", text: "……いいでしょう。交差する戦線、その先を見せてあげる!" },
      { cg: null, sprites: ["reina@left", "azura@right"], speaker: "アズーラ", text: "その意気よ。さあ、カードを抜きなさい!" },
      { speaker: "", text: "——こうして、二人のデュエルが幕を開けた。", goto: 12 },
      { bg: "city_night", sprites: [], speaker: "緋山玲奈", text: "……今日のところは、引き分けにしておくわ。" },
      { bg: "black", sprites: [], cg: null, speaker: "", text: "（ストーリーはここまで。これから物語を作り込んでいきます。）" },
    ],
  },
  skirmish: {
    id: "skirmish",
    title: "幕間 — 小さな手合わせ",
    bgm: "normal",
    bg: "arena",
    steps: [
      { sprites: ["reina@left", "fiona@right"], speaker: "フィオナ", text: "玲奈さん、少しだけ手合わせしてくれませんか?" },
      { speaker: "緋山玲奈", text: "いいわよ。……ただし、本気でいくわ。" },
      { speaker: "", text: "——デュエル、開始。", battle: { winFlag: "beatFiona", onWin: 3, onLose: 4 } },
      { sprites: ["reina@center"], speaker: "緋山玲奈", text: "私の勝ち。まだまだね、フィオナ。", goto: 5 },
      { sprites: ["fiona@center"], speaker: "フィオナ", text: "やった、私の勝ちです! もう一回!", goto: 5 },
      {
        speaker: "",
        text: "また手合わせしますか?",
        choices: [
          { label: "もう一度デュエル", goto: 2 },
          { label: "今日はここまで", goto: 6 },
        ],
      },
      { bg: "black", sprites: [], speaker: "", text: "（幕間はここまで。）" },
    ],
  },
};
