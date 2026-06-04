const ELEMENT_COLORS = {
  炎: "#ff645c",
  水: "#58a6ff",
  風: "#b7f06a",
  地: "#c89c65",
  無: "#f6c85f",
};

const ROLE_LABELS = {
  AT: "アタッカー",
  GD: "ガーディアン",
  ST: "サポーター",
  SP: "スペシャル",
};

const RARITY_ORDER = {
  C: 1,
  R: 2,
  SR: 3,
  SSR: 4,
  UR: 5,
};

const CARD_POINT_VALUES = {
  C: 1,
  R: 2,
  SR: 3,
  SSR: 5,
  UR: 10,
};

const CARD_POINT_COSTS = {
  C: 50,
  R: 75,
  SR: 150,
  SSR: 300,
  UR: 500,
};

const MAX_LP = 20;
const C48_CLAIRE_BOOST = 3;
const ARCADIA_SERIES = "アルカディアパレス";
const ATTACK_IMPACT_DELAY = 390;
const IMPACT_SETTLE_DELAY = 460;
const SUMMON_OUT_DELAY = 260;
const SUMMON_IN_CLEAR_DELAY = 680;
const SUPPORT_PLAY_VISUAL_DELAY = 1600;
const SUPPORT_PLAY_VISUAL_EXIT_DELAY = 260;
const ENERGY_TURN_PULSE_MS = 1400;

const CHARACTERS = [
  {
    kind: "character",
    id: "C01",
    no: "#01",
    rarity: "UR",
    name: "緋山玲奈",
    series: "緋山玲奈は初恋を知らない",
    element: "炎",
    role: "AT",
    cost: 5,
    atk: 7,
    def: 2,
    hp: 5,
    skill: "不屈の信念",
    text: "ATK毎ターン+1（最大+3）。HP半分以下で追加攻撃可",
  },
  {
    kind: "character",
    id: "C02",
    no: "#02",
    rarity: "UR",
    name: "アズーラ",
    series: "蒼の目覚めは薔薇の香り",
    element: "風",
    role: "SP",
    cost: 6,
    atk: 4,
    def: 3,
    hp: 6,
    skill: "400年の封印解放",
    text: "場に3ターン存在で覚醒→ATK+5, DEF全回復+3, 全味方HP3回復",
    awaken: true,
  },
  {
    kind: "character",
    id: "C03",
    no: "#03",
    rarity: "UR",
    name: "フィオナ",
    series: "フィオナ姫",
    element: "地",
    role: "GD",
    cost: 5,
    atk: 3,
    def: 5,
    hp: 7,
    skill: "第一王女の守護",
    text: "受けるダメージ-1（最低1）。LP庇い時ダメージ半減。【ガード】",
    tags: ["guard"],
  },
  {
    kind: "character",
    id: "C04",
    no: "#04",
    rarity: "UR",
    name: "エヴ",
    series: "エヴとおじさまと向日葵畑",
    element: "炎",
    role: "ST",
    cost: 5,
    atk: 3,
    def: 2,
    hp: 6,
    skill: "向日葵の光",
    text: "配置時味方全体ATK+2, DEF+1。毎ターン終了時味方1体HP1回復",
  },
  {
    kind: "character",
    id: "C05",
    no: "#05",
    rarity: "UR",
    name: "ナージャ",
    series: "氷焔に咲く薄雪草",
    element: "水",
    role: "GD",
    cost: 5,
    atk: 3,
    def: 5,
    hp: 6,
    skill: "銀雪の盾",
    text: "配置時味方全体DEF+1。更にアグニアにDEF+3。毎自ターン開始時に味方1体のDEF1回復。【ガード】",
    tags: ["guard"],
  },
  {
    kind: "character",
    id: "C06",
    no: "#06",
    rarity: "UR",
    name: "アストラルノヴァ",
    series: "Astral Nova",
    element: "地",
    role: "SP",
    cost: 6,
    atk: 6,
    def: 4,
    hp: 7,
    skill: "N.E.X.U.S.起動",
    text: "覚醒するまで行動不可。3ターン目に覚醒→ATK+5, DEF+4",
    awaken: true,
    dormant: true,
  },
  {
    kind: "character",
    id: "C07",
    no: "#07",
    rarity: "UR",
    name: "ニィアル（悠久）",
    series: "悠久のニィアル",
    element: "風",
    role: "AT",
    cost: 5,
    atk: 5,
    def: 1,
    hp: 5,
    skill: "伝説の英雄",
    text: "撃破ごとにATK+3。3体撃破で相手全体5ダメージ。HP回復不可",
    noHeal: true,
  },
  {
    kind: "character",
    id: "C08",
    no: "#08",
    rarity: "SR",
    name: "柊 七海",
    series: "飛べない夏の綿毛",
    element: "風",
    role: "ST",
    cost: 4,
    atk: 3,
    def: 2,
    hp: 5,
    skill: "夏の決意",
    text: "3ターン後の開始時に自動離脱。離脱時味方1体にATK+4, HP全回復",
  },
  {
    kind: "character",
    id: "C09",
    no: "#09",
    rarity: "SR",
    name: "鷺沼 るる",
    series: "Fate Tools",
    element: "水",
    role: "SP",
    cost: 4,
    atk: 5,
    def: 1,
    hp: 4,
    skill: "辛口キャスター",
    text: "相手全体ATK-1。撤退時相手に3ダメージ（LP直撃可）",
  },
  {
    kind: "character",
    id: "C10",
    no: "#10",
    rarity: "SR",
    name: "ハナ",
    series: ARCADIA_SERIES,
    element: "地",
    role: "SP",
    cost: 4,
    atk: 2,
    def: 2,
    hp: 5,
    skill: "花屋の献身",
    text: "毎ターン味方1体にATK+1, DEF+1。味方が相手を撃破で追加ドロー",
  },
  {
    kind: "character",
    id: "C11",
    no: "#11",
    rarity: "SR",
    name: "桃瀬 杏",
    series: "11月の嘘は炎に消えた",
    element: "炎",
    role: "SP",
    cost: 3,
    atk: 3,
    def: 1,
    hp: 4,
    skill: "子犬の応援",
    text: "場にいる限り効果発動。味方アタッカーのATK+2",
  },
  {
    kind: "character",
    id: "C12",
    no: "#12",
    rarity: "SR",
    name: "神宮寺 牡丹",
    series: "11月の嘘は炎に消えた",
    element: "水",
    role: "SP",
    cost: 3,
    atk: 4,
    def: 2,
    hp: 4,
    skill: "気まぐれ淑女",
    text: "毎ターンランダム（全体2ダメ / 味方HP2回復 / 味方ATK+1 / 自傷2）",
  },
  {
    kind: "character",
    id: "C13",
    no: "#13",
    rarity: "SR",
    name: "浅葱 桔梗",
    series: "11月の嘘は炎に消えた",
    element: "水",
    role: "SP",
    cost: 4,
    atk: 3,
    def: 1,
    hp: 4,
    skill: "天才の束縛",
    text: "相手1体を束縛しATK-3（2ターン）。束縛解除時その相手に2ダメ",
  },
  {
    kind: "character",
    id: "C14",
    no: "#14",
    rarity: "SR",
    name: "アグニア",
    series: "氷焔に咲く薄雪草",
    element: "炎",
    role: "AT",
    cost: 5,
    atk: 6,
    def: 1,
    hp: 4,
    skill: "魔女の残火",
    text: "攻撃時後衛にも2ダメ（ガード貫通）。ナージャが場にいるとATK+3",
  },
  {
    kind: "character",
    id: "C15",
    no: "#15",
    rarity: "SR",
    name: "ソフィア",
    series: "義妹とのおべんきょう",
    element: "水",
    role: "SP",
    cost: 3,
    atk: 2,
    def: 1,
    hp: 4,
    skill: "才女の後押し",
    text: "次の自分ターン開始時まで場にいると、味方1体の次のスキル効果を2倍にする。前衛配置不可",
    backOnly: true,
  },
  {
    kind: "character",
    id: "C16",
    no: "#16",
    rarity: "SR",
    name: "烈 龍翔",
    series: "紫禁の檻と銀雪の愛",
    element: "水",
    role: "SP",
    cost: 4,
    atk: 4,
    def: 2,
    hp: 5,
    skill: "皇帝の気まぐれ",
    text: "攻撃時ランダムでATK+3 or ATK-4。撤退時敵味方のランダム1体に3ダメージ",
  },
  {
    kind: "character",
    id: "C17",
    no: "#17",
    rarity: "SR",
    name: "紫苑",
    series: "紫禁の檻と銀雪の愛",
    element: "風",
    role: "SP",
    cost: 4,
    atk: 4,
    def: 1,
    hp: 4,
    skill: "軍師の策略",
    text: "発動した相手のサポートカード1枚を無効化。相手手札1枚確認",
  },
  {
    kind: "character",
    id: "C18",
    no: "#18",
    rarity: "SR",
    name: "雷牙",
    series: "紫禁の檻と銀雪の愛",
    element: "地",
    role: "AT",
    cost: 4,
    atk: 3,
    def: 1,
    hp: 5,
    skill: "復讐の刃",
    text: "HP半分以下で生存するとATK+4。撤退時自身ATK分のダメージを相手1体に",
  },
  {
    kind: "character",
    id: "C19",
    no: "#19",
    rarity: "SR",
    name: "ニィアル",
    series: "勇者と村人Aの冒険",
    element: "風",
    role: "SP",
    cost: 3,
    atk: 2,
    def: 1,
    hp: 4,
    skill: "村人の冒険",
    text: "場に出た時デッキから1枚ドロー。悠久ニィアルのコスト-2",
  },
  {
    kind: "character",
    id: "C20",
    no: "#20",
    rarity: "R",
    name: "柊 日和",
    series: "飛べない夏の綿毛",
    element: "水",
    role: "SP",
    cost: 2,
    atk: 2,
    def: 1,
    hp: 3,
    skill: "姉大好き",
    text: "七海が場にいるとDEF+2。七海のコスト-1",
  },
  {
    kind: "character",
    id: "C21",
    no: "#21",
    rarity: "R",
    name: "轟 鉄平",
    series: "Fate Tools",
    element: "炎",
    role: "GD",
    cost: 3,
    atk: 2,
    def: 3,
    hp: 4,
    skill: "熱血実況",
    text: "味方が攻撃するたびATK+1（最大+3）。壁兼サブ火力。【ガード】",
    tags: ["guard"],
  },
  {
    kind: "character",
    id: "C22",
    no: "#22",
    rarity: "R",
    name: "ヴィクトル",
    series: "Fate Tools",
    element: "風",
    role: "AT",
    cost: 3,
    atk: 3,
    def: 0,
    hp: 3,
    skill: "元傭兵の戦技",
    text: "先制攻撃（配置直後に攻撃可能。この攻撃ではLPを攻撃不可）。攻撃した相手のATK-1",
    haste: true,
  },
  {
    kind: "character",
    id: "C23",
    no: "#23",
    rarity: "R",
    name: "氷室 透",
    series: "すれ違いオフィスラブコメ",
    element: "炎",
    role: "SP",
    cost: 3,
    atk: 2,
    def: 2,
    hp: 4,
    skill: "冷徹な指揮",
    text: "前衛味方全体ATK+1, DEF+1。場にいる間、相手サポートコスト+1",
  },
  {
    kind: "character",
    id: "C24",
    no: "#24",
    rarity: "R",
    name: "冬月 志津香",
    series: "すれ違いオフィスラブコメ",
    element: "風",
    role: "SP",
    cost: 2,
    atk: 1,
    def: 1,
    hp: 3,
    skill: "無表情の激推し",
    text: "氷室が場にいると受けるバフ効果2倍。2ターンに1回ドロー+1",
  },
  {
    kind: "character",
    id: "C25",
    no: "#25",
    rarity: "R",
    name: "アルベルト",
    series: "エヴとおじさまと向日葵畑",
    element: "地",
    role: "GD",
    cost: 3,
    atk: 2,
    def: 3,
    hp: 5,
    skill: "領主の自己犠牲",
    text: "味方が撃破される時、代わりにダメージを受ける。HP2以下で味方全体DEF+2。【ガード】",
    tags: ["guard"],
  },
  {
    kind: "character",
    id: "C26",
    no: "#26",
    rarity: "R",
    name: "アリュース＆ティリス",
    series: "悠久のニィアル",
    element: "風",
    role: "AT",
    cost: 3,
    atk: 4,
    def: 1,
    hp: 4,
    skill: "勇者の血筋",
    text: "攻撃後味方1体HP2回復。ニィアル（悠久）が味方場にいる限りATK+2",
  },
  {
    kind: "character",
    id: "C27",
    no: "#27",
    rarity: "C",
    name: "藤宮 沙織",
    series: "飛べない夏の綿毛",
    element: "炎",
    role: "ST",
    cost: 1,
    atk: 1,
    def: 1,
    hp: 3,
    skill: "甲斐甲斐しい母性",
    text: "毎ターン味方1体のHP1回復",
  },
  {
    kind: "character",
    id: "C28",
    no: "#28",
    rarity: "C",
    name: "天城 ルナ",
    series: "飛べない夏の綿毛",
    element: "水",
    role: "AT",
    cost: 2,
    atk: 2,
    def: 0,
    hp: 3,
    skill: "禁断の授業",
    text: "DEFを無視してHP直接ダメージ",
  },
  {
    kind: "character",
    id: "C29",
    no: "#29",
    rarity: "C",
    name: "桐谷 楓",
    series: "飛べない夏の綿毛",
    element: "風",
    role: "AT",
    cost: 2,
    atk: 3,
    def: 0,
    hp: 2,
    skill: "乙女の一閃",
    text: "配置ターンに攻撃可能（LP攻撃不可）。2ターン後自動撤退",
    haste: true,
  },
  {
    kind: "character",
    id: "C30",
    no: "#30",
    rarity: "C",
    name: "白石 凛",
    series: "飛べない夏の綿毛",
    element: "水",
    role: "GD",
    cost: 2,
    atk: 0,
    def: 3,
    hp: 4,
    skill: "禁じられた壁",
    text: "被攻撃時反撃1ダメージ。【ガード】",
    tags: ["guard"],
  },
  {
    kind: "character",
    id: "C31",
    no: "#31",
    rarity: "C",
    name: "ジャン＝ポール",
    series: "Fate Tools",
    element: "風",
    role: "SP",
    cost: 1,
    atk: 1,
    def: 0,
    hp: 2,
    skill: "変態紳士",
    text: "撤退時相手ランダム1体を1ターン行動不能に",
  },
  {
    kind: "character",
    id: "C32",
    no: "#32",
    rarity: "C",
    name: "中道 弘子",
    series: "Fate Tools",
    element: "炎",
    role: "ST",
    cost: 1,
    atk: 1,
    def: 0,
    hp: 3,
    skill: "関西のおばはん",
    text: "味方の炎属性ATK+1。場に出た時味方全体デバフ解除",
  },
  {
    kind: "character",
    id: "C33",
    no: "#33",
    rarity: "C",
    name: "花宮 ひなの",
    series: "Fate Tools",
    element: "風",
    role: "ST",
    cost: 1,
    atk: 1,
    def: 0,
    hp: 3,
    skill: "普通が一番",
    text: "場に出た時1ドロー。安定のドローソース",
  },
  {
    kind: "character",
    id: "C34",
    no: "#34",
    rarity: "C",
    name: "冴島 透",
    series: "Fate Tools",
    element: "地",
    role: "AT",
    cost: 2,
    atk: 3,
    def: 0,
    hp: 2,
    skill: "へっぽこ秀才",
    text: "場に出た時相手手札1枚確認。攻撃成功時追加1ドロー",
  },
  {
    kind: "character",
    id: "C35",
    no: "#35",
    rarity: "C",
    name: "紅城 蘭",
    series: "Fate Tools",
    element: "炎",
    role: "AT",
    cost: 2,
    atk: 3,
    def: 1,
    hp: 3,
    skill: "妖艶なる一撃",
    text: "攻撃した相手のDEF-1（永続）",
  },
  {
    kind: "character",
    id: "C36",
    no: "#36",
    rarity: "C",
    name: "姫川 きらり",
    series: "Fate Tools",
    element: "炎",
    role: "SP",
    cost: 1,
    atk: 2,
    def: 0,
    hp: 2,
    skill: "ギャルの気合",
    text: "相手全ガーディアンのDEF-2",
  },
  {
    kind: "character",
    id: "C37",
    no: "#37",
    rarity: "C",
    name: "巌 剛一",
    series: "Fate Tools",
    element: "地",
    role: "GD",
    cost: 2,
    atk: 1,
    def: 2,
    hp: 3,
    skill: "泣き虫の壁",
    text: "このキャラが撤退時味方一体のATK+2【ガード】",
    tags: ["guard"],
  },
  {
    kind: "character",
    id: "C38",
    no: "#38",
    rarity: "C",
    name: "レナ",
    series: "フィオナ姫",
    element: "水",
    role: "ST",
    cost: 1,
    atk: 1,
    def: 1,
    hp: 3,
    skill: "メイドの献身",
    text: "フィオナが場にいると自身DEF+2, HP+2。フィオナのDEF毎ターン1回復",
  },
  {
    kind: "character",
    id: "C39",
    no: "#39",
    rarity: "C",
    name: "ユイ",
    series: "蒼の目覚めは薔薇の香り",
    element: "地",
    role: "ST",
    cost: 1,
    atk: 1,
    def: 1,
    hp: 2,
    skill: "お菓子大好き",
    text: "場に出た時味方全体HP+1",
  },
  {
    kind: "character",
    id: "C40",
    no: "#40",
    rarity: "C",
    name: "木下 権三郎",
    series: "蒼の目覚めは薔薇の香り",
    element: "風",
    role: "GD",
    cost: 2,
    atk: 2,
    def: 2,
    hp: 3,
    skill: "中国拳法の達人",
    text: "被攻撃時反撃2ダメージ。【ガード】",
    tags: ["guard"],
  },
  {
    kind: "character",
    id: "C41",
    no: "#41",
    rarity: "C",
    name: "リン",
    series: ARCADIA_SERIES,
    element: "水",
    role: "AT",
    cost: 2,
    atk: 2,
    def: 0,
    hp: 3,
    skill: "スパイの潜入",
    text: "相手のドローを1ターン封じる",
  },
  {
    kind: "character",
    id: "C42",
    no: "#42",
    rarity: "C",
    name: "セドリック",
    series: "エヴとおじさまと向日葵畑",
    element: "地",
    role: "SP",
    cost: 2,
    atk: 2,
    def: 1,
    hp: 3,
    skill: "執着の影",
    text: "相手サポーター1体のスキルを1ターン封印",
  },
  {
    kind: "character",
    id: "C43",
    no: "#43",
    rarity: "C",
    name: "ガイル",
    series: "エヴとおじさまと向日葵畑",
    element: "風",
    role: "ST",
    cost: 1,
    atk: 1,
    def: 1,
    hp: 3,
    skill: "幼馴染の応援",
    text: "配置時味方1体のATK+1 or DEF+2",
  },
  {
    kind: "character",
    id: "C44",
    no: "#44",
    rarity: "C",
    name: "クラウディア",
    series: "エヴとおじさまと向日葵畑",
    element: "水",
    role: "AT",
    cost: 2,
    atk: 3,
    def: 0,
    hp: 3,
    skill: "嫉妬の刃",
    text: "サポーターへの攻撃時ATK+2",
  },
  {
    kind: "character",
    id: "C45",
    no: "#45",
    rarity: "C",
    name: "ディートリヒ",
    series: "氷焔に咲く薄雪草",
    element: "地",
    role: "AT",
    cost: 2,
    atk: 3,
    def: 1,
    hp: 3,
    skill: "元騎士の意地",
    text: "スキルなし",
  },
  {
    kind: "character",
    id: "C46",
    no: "#46",
    rarity: "UR",
    name: "カトリーナ・フォン・ハイゼンベルク",
    series: "グッドナイトワールド",
    element: "炎",
    role: "AT",
    cost: 6,
    atk: 6,
    def: 1,
    hp: 5,
    skill: "アトミックフレア",
    text: "攻撃時DEFを無視し、撤退させた時相手後衛全体に2ダメージ。このスキルは場に出てから一度しか使えない。次の攻撃に効果。",
  },
  {
    kind: "character",
    id: "C47",
    no: "#47",
    rarity: "R",
    name: "クレア",
    series: "グッドナイトワールド",
    element: "炎",
    role: "GD",
    cost: 3,
    atk: 2,
    def: 3,
    hp: 5,
    skill: "グングニル",
    text: "スキルなし。高い基礎戦闘力を持つ。【ガード】",
    tags: ["guard"],
  },
  {
    kind: "character",
    id: "C48",
    no: "#48",
    rarity: "SR",
    name: "セレナ",
    series: "グッドナイトワールド",
    element: "水",
    role: "ST",
    cost: 4,
    atk: 2,
    def: 2,
    hp: 4,
    skill: "ノブレスオブリージュ",
    text: "クレアが場にいる時、クレアのATK+3, DEF+3。場にいる間、味方撤退時LP1回復",
  },
  {
    kind: "character",
    id: "C49",
    no: "#49",
    rarity: "C",
    name: "レオン・ファルケンハイン",
    series: "好き勝手傭兵王の請求書　〜世界征服は副業で〜",
    element: "地",
    role: "GD",
    cost: 2,
    atk: 1,
    def: 2,
    hp: 3,
    skill: "不屈の片翼",
    text: "1回だけHPが0になってもHP1で耐える。【ガード】",
    tags: ["guard"],
  },
  {
    kind: "character",
    id: "C50",
    no: "#50",
    rarity: "R",
    name: "フィーネ・エールシュタイン",
    series: "好き勝手傭兵王の請求書　〜世界征服は副業で〜",
    element: "風",
    role: "SP",
    cost: 3,
    atk: 2,
    def: 1,
    hp: 4,
    skill: "清風の手当",
    text: "配置時、味方全体の状態異常を解除。味方ガーディアン全体の最大HP+2/HP+2",
  },
  {
    kind: "character",
    id: "C51",
    no: "#51",
    rarity: "SR",
    name: "マルグリット・ヴィシェール",
    series: "好き勝手傭兵王の請求書　〜世界征服は副業で〜",
    element: "水",
    role: "AT",
    cost: 3,
    atk: 2,
    def: 0,
    hp: 3,
    skill: "後衛砲撃",
    text: "後衛配置限定。自ターン開始時、相手後衛1体に2ダメージ。後衛がいなければ前衛1体に2ダメージ",
    backOnly: true,
  },
  {
    kind: "character",
    id: "C52",
    no: "#52",
    rarity: "SR",
    name: "イレーネ・セラフィム",
    series: "好き勝手傭兵王の請求書　〜世界征服は副業で〜",
    element: "地",
    role: "SP",
    cost: 4,
    atk: 2,
    def: 1,
    hp: 4,
    skill: "封印審判",
    text: "相手のサポーターのスキル、またはサポートカード効果を1回無効化する",
  },
  {
    kind: "character",
    id: "C53",
    no: "#53",
    rarity: "R",
    name: "カタリナ・ロッシ",
    series: "好き勝手傭兵王の請求書　〜世界征服は副業で〜",
    element: "風",
    role: "SP",
    cost: 3,
    atk: 2,
    def: 1,
    hp: 3,
    skill: "前線転移",
    text: "配置時、相手前衛に空きがあれば相手後衛1体を前衛へ移動",
  },
  {
    kind: "character",
    id: "C54",
    no: "#54",
    rarity: "R",
    name: "ルクレツィア・ヴァルト",
    series: "好き勝手傭兵王の請求書　〜世界征服は副業で〜",
    element: "炎",
    role: "SP",
    cost: 2,
    atk: 1,
    def: 1,
    hp: 3,
    skill: "先読み補給",
    text: "配置後、次の自ターン開始時まで生存していればエネルギー最大値+1",
  },
  {
    kind: "character",
    id: "C55",
    no: "#55",
    rarity: "SR",
    name: "ヴァネッサ・クラウツ",
    series: "好き勝手傭兵王の請求書　〜世界征服は副業で〜",
    element: "炎",
    role: "AT",
    cost: 4,
    atk: 4,
    def: 1,
    hp: 4,
    skill: "切込隊長",
    text: "配置ターンに攻撃可能（LP攻撃不可）。HPダメージを与えた時、自身ATK+1（最大+2）",
    haste: true,
  },
  {
    kind: "character",
    id: "C56",
    no: "#56",
    rarity: "R",
    name: "リノン",
    series: ARCADIA_SERIES,
    element: "炎",
    role: "AT",
    cost: 3,
    atk: 3,
    def: 1,
    hp: 4,
    skill: "スプリントガード",
    text: "配置ターンに攻撃可能（LP攻撃不可）。攻撃後、味方1体の状態異常を1つ解除",
    haste: true,
  },
  {
    kind: "character",
    id: "C57",
    no: "#57",
    rarity: "SR",
    name: "雪乃",
    series: ARCADIA_SERIES,
    element: "水",
    role: "SP",
    cost: 4,
    atk: 2,
    def: 3,
    hp: 5,
    skill: "筆頭株主の采配",
    text: "配置時、手札1枚をデッキ下に戻して1ドロー。アルカディアパレス3体以上なら味方全体DEF+1",
  },
  {
    kind: "character",
    id: "C58",
    no: "#58",
    rarity: "C",
    name: "ミム",
    series: ARCADIA_SERIES,
    element: "風",
    role: "ST",
    cost: 1,
    atk: 1,
    def: 0,
    hp: 3,
    skill: "トレンド発信",
    text: "配置時、1ドローして手札1枚をデッキ下に戻す。その後、手札のアルカディアパレス1枚のコスト-1",
  },
  {
    kind: "character",
    id: "C59",
    no: "#59",
    rarity: "SR",
    name: "キラ",
    series: ARCADIA_SERIES,
    element: "炎",
    role: "ST",
    cost: 3,
    atk: 2,
    def: 1,
    hp: 4,
    skill: "スターライトステージ",
    text: "配置時、味方全体ATK+1。アルカディアパレス3体以上なら相手前衛全体ATK-2（1ターン）",
  },
  {
    kind: "character",
    id: "C60",
    no: "#60",
    rarity: "R",
    name: "ルル",
    series: ARCADIA_SERIES,
    element: "無",
    role: "SP",
    cost: 2,
    atk: 1,
    def: 1,
    hp: 3,
    skill: "メルヘン予言",
    text: "配置時、相手手札1枚を確認し、相手ランダム1体のスキルを1ターン封印",
  },
  {
    kind: "character",
    id: "C61",
    no: "#61",
    rarity: "UR",
    name: "エレーナ",
    series: ARCADIA_SERIES,
    element: "水",
    role: "SP",
    cost: 5,
    atk: 3,
    def: 3,
    hp: 6,
    skill: "完全耐性",
    text: "配置時、相手のサポーター/サポート効果を1回無効化する構え。自身は状態異常を受けない",
    statusImmune: true,
  },
  {
    kind: "character",
    id: "C62",
    no: "#62",
    rarity: "R",
    name: "サクラ",
    series: ARCADIA_SERIES,
    element: "地",
    role: "ST",
    cost: 2,
    atk: 1,
    def: 2,
    hp: 4,
    skill: "幼馴染の祈り",
    text: "毎ターン終了時、味方1体HP1回復。ハナが場にいるなら回復量+1",
  },
  {
    kind: "character",
    id: "C63",
    no: "#63",
    rarity: "SR",
    name: "イザベラ",
    series: ARCADIA_SERIES,
    element: "地",
    role: "SP",
    cost: 4,
    atk: 3,
    def: 1,
    hp: 4,
    skill: "裏交渉",
    text: "配置時、相手後衛1体のDEFを0にする。場にいる間、相手サポートコスト+1",
  },
  {
    kind: "character",
    id: "C64",
    no: "#64",
    rarity: "SR",
    name: "シオン",
    series: ARCADIA_SERIES,
    element: "炎",
    role: "AT",
    cost: 4,
    atk: 5,
    def: 0,
    hp: 4,
    skill: "独占衝動",
    text: "相手を撤退させた時、1ターンに1回だけ追加攻撃可。自ターン終了時、自身に1ダメージ",
  },
  {
    kind: "character",
    id: "C65",
    no: "#65",
    rarity: "UR",
    name: "マリア",
    series: ARCADIA_SERIES,
    element: "風",
    role: "ST",
    cost: 5,
    atk: 2,
    def: 4,
    hp: 7,
    skill: "パレス統括",
    text: "配置時、味方全体最大HP+1/DEF+1。アルカディアパレス4体以上なら味方撤退時1回だけ手札に戻す",
  },
];

const AI_LANE_FRONT = "front";
const AI_LANE_BACK = "back";

const AI_CHARACTER_LANE_PLAN = Object.freeze({
  C01: AI_LANE_FRONT,
  C02: AI_LANE_FRONT,
  C03: AI_LANE_FRONT,
  C04: AI_LANE_BACK,
  C05: AI_LANE_FRONT,
  C06: AI_LANE_FRONT,
  C07: AI_LANE_FRONT,
  C08: AI_LANE_BACK,
  C09: AI_LANE_FRONT,
  C10: AI_LANE_BACK,
  C11: AI_LANE_BACK,
  C12: AI_LANE_FRONT,
  C13: AI_LANE_BACK,
  C14: AI_LANE_FRONT,
  C15: AI_LANE_BACK,
  C16: AI_LANE_FRONT,
  C17: AI_LANE_BACK,
  C18: AI_LANE_FRONT,
  C19: AI_LANE_BACK,
  C20: AI_LANE_BACK,
  C21: AI_LANE_FRONT,
  C22: AI_LANE_FRONT,
  C23: AI_LANE_BACK,
  C24: AI_LANE_BACK,
  C25: AI_LANE_FRONT,
  C26: AI_LANE_FRONT,
  C27: AI_LANE_BACK,
  C28: AI_LANE_FRONT,
  C29: AI_LANE_FRONT,
  C30: AI_LANE_FRONT,
  C31: AI_LANE_BACK,
  C32: AI_LANE_BACK,
  C33: AI_LANE_BACK,
  C34: AI_LANE_FRONT,
  C35: AI_LANE_FRONT,
  C36: AI_LANE_BACK,
  C37: AI_LANE_FRONT,
  C38: AI_LANE_BACK,
  C39: AI_LANE_BACK,
  C40: AI_LANE_FRONT,
  C41: AI_LANE_FRONT,
  C42: AI_LANE_BACK,
  C43: AI_LANE_BACK,
  C44: AI_LANE_FRONT,
  C45: AI_LANE_FRONT,
  C46: AI_LANE_FRONT,
  C47: AI_LANE_FRONT,
  C48: AI_LANE_BACK,
  C49: AI_LANE_FRONT,
  C50: AI_LANE_BACK,
  C51: AI_LANE_BACK,
  C52: AI_LANE_BACK,
  C53: AI_LANE_BACK,
  C54: AI_LANE_BACK,
  C55: AI_LANE_FRONT,
  C56: AI_LANE_FRONT,
  C57: AI_LANE_BACK,
  C58: AI_LANE_BACK,
  C59: AI_LANE_BACK,
  C60: AI_LANE_BACK,
  C61: AI_LANE_BACK,
  C62: AI_LANE_BACK,
  C63: AI_LANE_BACK,
  C64: AI_LANE_FRONT,
  C65: AI_LANE_BACK,
});

const AI_FRONT_PRESSURE_EFFECT_IDS = new Set(["C16", "C28", "C34", "C44", "C55", "C56", "C64"]);

const SUPPORTS = [
  {
    kind: "support",
    id: "S01",
    no: "S01",
    rarity: "R",
    name: "向日葵畑の約束",
    supportType: "インスタント",
    cost: 2,
    series: "エヴとおじさまと向日葵畑",
    element: "炎",
    skill: "全回復",
    text: "味方1体のHP全回復",
  },
  {
    kind: "support",
    id: "S02",
    no: "S02",
    rarity: "R",
    name: "Fate Toolsの招集",
    supportType: "インスタント",
    cost: 1,
    series: "Fate Tools",
    element: "風",
    skill: "招集",
    text: "デッキからFate Tools所属C/Rカード1枚を手札に加える",
  },
  {
    kind: "support",
    id: "S03",
    no: "S03",
    rarity: "R",
    name: "催眠術の誘い",
    supportType: "設置型",
    cost: 3,
    series: "フィオナ姫",
    element: "水",
    skill: "催眠",
    text: "相手前衛1体を1ターン行動不能にする（ガード効果も停止）",
  },
  {
    kind: "support",
    id: "S04",
    no: "S04",
    rarity: "R",
    name: "遠距離の絆",
    supportType: "インスタント",
    cost: 2,
    series: "すれ違いオフィスラブコメ",
    element: "風",
    skill: "絆",
    text: "次の後衛キャラのスキル効果が2倍",
  },
  {
    kind: "support",
    id: "S05",
    no: "S05",
    rarity: "SR",
    name: "封印解放の儀",
    supportType: "インスタント",
    cost: 3,
    series: "蒼の目覚めは薔薇の香り",
    element: "風",
    skill: "覚醒",
    text: "覚醒系スキルを持つキャラ1体を即座に覚醒状態にする",
  },
  {
    kind: "support",
    id: "S06",
    no: "S06",
    rarity: "R",
    name: "氷焔の双剣",
    supportType: "インスタント",
    cost: 2,
    series: "氷焔に咲く薄雪草",
    element: "水",
    skill: "双剣",
    text: "炎属性と水属性が場にいる時、相手前衛全体に2ダメージ",
  },
  {
    kind: "support",
    id: "S07",
    no: "S07",
    rarity: "C",
    name: "地下闘技場の武器",
    supportType: "インスタント",
    cost: 1,
    series: "Fate Tools",
    element: "地",
    skill: "武器",
    text: "ランダム効果（ATK+3 / DEF+3 / 自分に2ダメージ）",
  },
  {
    kind: "support",
    id: "S08",
    no: "S08",
    rarity: "SR",
    name: "紫禁の策謀",
    supportType: "カウンター",
    cost: 3,
    series: "紫禁の檻と銀雪の愛",
    element: "水",
    skill: "反計",
    text: "次の相手ターン中のみ、相手の攻撃を無効化し攻撃力分のダメージを攻撃者に返す",
  },
  {
    kind: "support",
    id: "S09",
    no: "S09",
    rarity: "SR",
    name: "N.E.X.U.S.ドライブ",
    supportType: "インスタント",
    cost: 4,
    series: "Astral Nova",
    element: "地",
    skill: "総力強化",
    text: "味方全体ATK+2, DEF+2（1ターン）",
  },
  {
    kind: "support",
    id: "S10",
    no: "S10",
    rarity: "R",
    name: "勇者の仲間集め",
    supportType: "インスタント",
    cost: 1,
    series: "勇者と村人Aの冒険",
    element: "風",
    skill: "探索",
    text: "デッキ上3枚を確認し、1枚を手札に加える（残りはデッキ下）",
  },
  {
    kind: "support",
    id: "S11",
    no: "S11",
    rarity: "SR",
    name: "悠久の時",
    supportType: "設置型",
    cost: 3,
    series: "悠久のニィアル",
    element: "風",
    skill: "悠久",
    text: "3ターン後に味方全体HP全回復 + DEF全回復",
  },
  {
    kind: "support",
    id: "S12",
    no: "S12",
    rarity: "R",
    name: "すれ違いの再会",
    supportType: "カウンター",
    cost: 1,
    series: "すれ違いオフィスラブコメ",
    element: "炎",
    skill: "再会",
    text: "次に撤退した味方1体を手札に戻す（DEFは初期値で復帰）",
  },
  {
    kind: "support",
    id: "S13",
    no: "S13",
    rarity: "R",
    name: "姉妹の絆",
    supportType: "設置型",
    cost: 2,
    series: "共通",
    element: "無",
    skill: "絆",
    text: "同作品キャラ3体以上で味方全体ATK+1, DEF+1",
  },
  {
    kind: "support",
    id: "S14",
    no: "S14",
    rarity: "R",
    name: "妖精の輪",
    supportType: "インスタント",
    cost: 2,
    series: "蒼の目覚めは薔薇の香り",
    element: "風",
    skill: "輪舞",
    text: "相手のガード持ち1体のDEFを0にする",
  },
  {
    kind: "support",
    id: "S15",
    no: "S15",
    rarity: "C",
    name: "鉄壁の修復",
    supportType: "インスタント",
    cost: 1,
    series: "共通",
    element: "地",
    skill: "修復",
    text: "味方1体のDEFを初期値まで回復",
  },
  {
    kind: "support",
    id: "S16",
    no: "S16",
    rarity: "SR",
    name: "双頭鳥の御旗",
    supportType: "設置型",
    cost: 5,
    series: "好き勝手傭兵王の請求書　〜世界征服は副業で〜",
    element: "無",
    skill: "双頭鳥の御旗",
    text: "2ターンの間、味方キャラ配置コスト-1。終了時1ドロー",
  },
];

const ALL_CARDS = [...CHARACTERS, ...SUPPORTS];
const CARD_DB = new Map(ALL_CARDS.map((card) => [card.id, card]));
const DECK_LIBRARY_FILTER_KEYS = ["rarity", "element", "type", "series"];
const DECK_LIBRARY_FILTER_LABELS = {
  rarity: "レア別",
  element: "属性別",
  type: "タイプ別",
  series: "作品別",
};

const PLAYER_DECK = [
  "C01",
  "C21",
  "C21",
  "C22",
  "C22",
  "C27",
  "C27",
  "C33",
  "C33",
  "C35",
  "S01",
  "S01",
  "S02",
  "S02",
  "S07",
  "S07",
  "S08",
  "S10",
  "S10",
  "S15",
];

const PLAYER_DECK_STORAGE_KEY = "crossover-duel-player-deck";
const PLAYER_DECK_SLOTS_STORAGE_KEY = "crossover-duel-player-deck-slots";
const PLAYER_DECK_ACTIVE_SLOT_STORAGE_KEY = "crossover-duel-player-deck-active-slot";
const PLAYER_DECK_SLOT_COUNT = 5;
const PLAYER_DECK_SIZE = PLAYER_DECK.length;
const FREEPLAY_WIN_STORAGE_KEY = "crossover-duel-freeplay-wins";
const FREEPLAY_MAX_WINS = 55;
const REWARD_CARD_COUNT = 4;
const BATTLE_BGM_STYLE_STORAGE_KEY = "crossover-duel-battle-bgm-style";
const CARD_EXCHANGE_POINT_STORAGE_KEY = "crossover-duel-card-exchange-points";
const SIGNED_EXPORT_FORMAT = "crossover-duel.signed-export";
const SIGNED_EXPORT_VERSION = 1;
const SIGNED_EXPORT_KDF_ITERATIONS = 150000;
const SIGNED_EXPORT_MIN_KEY_LENGTH = 8;
const STARTER_DECK_COUNTS = countBy(PLAYER_DECK, (id) => id);
const BATTLE_INTRO_LINES = [
  "Every story converges on a single battlefield.",
  "Creator — stake your world.",
  "Fifteen worlds collide. Only the victor's tale survives.",
  "The characters you created now bare their fangs at you.",
  "They know — they were written.",
  "One author, one justice. Settle it.",
  "— Summoning, initiated.",
  "Pit your stories to the death.",
  "All timelines, battle stations.",
  "Fates that were never meant to cross now breathe upon the cards.",
  "Someone's ending was someone else's beginning.",
  "A nameless god set the pieces.",
  "Your worlds. Their war.",
  "Deal your legacy.",
  "Every card was once someone's whole world.",
];
const FIRST_PLAYER_RESULTS = {
  player: {
    side: "表",
    face: "表",
    label: "PLAYER FIRST",
    logName: "プレイヤー",
  },
  ai: {
    side: "裏",
    face: "裏",
    label: "AI FIRST",
    logName: "AI",
  },
};

// AIデッキは高レベルでも低コスト札を残し、強さを「重さ」ではなくコンセプトで上げる。
// Update this staged list when new cards are added to the game.
const AI_DECKS = [
  {
    level: 1,
    wins: 0,
    name: "Rookie Line",
    concept: "1-2コストの基本札で、毎ターン盤面を作る練習用。",
    deck: ["C27", "C28", "C28", "C29", "C29", "C30", "C30", "C31", "C33", "C33", "C34", "C35", "C37", "C40", "C41", "S07", "S07", "S10", "S10", "S15"],
  },
  {
    level: 2,
    wins: 5,
    name: "Guard Basics",
    concept: "軽量ガードと修復で、前衛を切らさずに粘る構成。",
    deck: ["C21", "C21", "C25", "C30", "C30", "C37", "C37", "C40", "C40", "C35", "C41", "C43", "C45", "S07", "S07", "S10", "S12", "S13", "S15", "S15"],
  },
  {
    level: 3,
    wins: 10,
    name: "Fate Tools Tempo",
    concept: "招集と速攻札で、低コストの横展開から主導権を取る。",
    deck: ["C21", "C22", "C22", "C25", "C26", "C26", "C31", "C34", "C34", "C35", "C36", "C41", "S02", "S02", "S07", "S10", "S10", "S12", "S14", "S15"],
  },
  {
    level: 4,
    wins: 15,
    name: "Twin Blade Tempo",
    concept: "炎と水を低コストで揃え、氷焔の双剣を早めに通す。",
    deck: ["C12", "C14", "C16", "C20", "C21", "C22", "C23", "C30", "C30", "C32", "C35", "C41", "S03", "S06", "S06", "S07", "S08", "S10", "S12", "S15"],
  },
  {
    level: 5,
    wins: 20,
    name: "Silver Snow Trial",
    concept: "ナージャとアグニアの守攻コンボを、軽量札で支える中盤型。",
    deck: ["C05", "C14", "C14", "C16", "C18", "C21", "C25", "C30", "C30", "C32", "C35", "C45", "S03", "S06", "S06", "S07", "S08", "S11", "S14", "S15"],
  },
  {
    level: 6,
    wins: 25,
    name: "Royal Counter Wall",
    concept: "フィオナの防衛線に催眠と反計を重ねるコントロール型。",
    deck: ["C03", "C13", "C17", "C21", "C23", "C24", "C25", "C30", "C30", "C37", "C38", "C38", "C40", "S01", "S03", "S03", "S08", "S10", "S14", "S15"],
  },
  {
    level: 7,
    wins: 30,
    name: "Awakening Rose",
    concept: "軽量の支えを敷いてから、アズーラを覚醒で一気に起こす。",
    deck: ["C02", "C02", "C08", "C20", "C20", "C22", "C23", "C25", "C30", "C39", "C40", "C43", "S05", "S05", "S07", "S10", "S11", "S13", "S14", "S15"],
  },
  {
    level: 8,
    wins: 35,
    name: "NEXUS Formation",
    concept: "N.E.X.U.S.を覚醒させ、総力強化で盤面全体を押し上げる。",
    deck: ["C06", "C06", "C12", "C21", "C23", "C25", "C30", "C32", "C35", "C40", "C43", "C45", "S03", "S05", "S05", "S07", "S09", "S09", "S10", "S15"],
  },
  {
    level: 9,
    wins: 40,
    name: "Royal Lock",
    concept: "王女の防衛線を軸に、催眠と反計で相手の攻撃順を崩す。",
    deck: ["C03", "C03", "C05", "C13", "C17", "C23", "C24", "C25", "C30", "C38", "C38", "C40", "S03", "S03", "S08", "S08", "S10", "S11", "S14", "S15"],
  },
  {
    level: 10,
    wins: 50,
    name: "Final Crossover",
    concept: "URフィニッシャーを低中コストの展開札と探索で確実に着地させる。",
    deck: ["C01", "C02", "C03", "C07", "C19", "C21", "C22", "C23", "C25", "C30", "C33", "C40", "C46", "S01", "S03", "S05", "S08", "S10", "S14", "S15"],
  },
  {
    level: 11,
    wins: 55,
    name: "Arcadia Bond Guard",
    concept: "前衛ガーディアンで守りを作り、パレス支援と姉妹の絆で盤面全体を厚くする。",
    deck: ["C10", "C41", "C56", "C56", "C57", "C58", "C58", "C59", "C60", "C61", "C62", "C62", "C63", "C64", "C65", "C47", "C49", "C55", "S13", "S13"],
  },
];

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let nextInstanceId = 1;
let state = null;
let activeScreen = "title";
let deckEditorIds = [];
let activeDeckSlot = 1;
let pendingDeckSlotSwitch = null;
let deckEditorDeckHidden = false;
let deckEditorLibraryHidden = false;
let deckEditorExchangeHidden = true;
let deckEditorLibraryOwnedOnly = false;
let deckEditorLibraryFilters = createEmptyDeckEditorLibraryFilters();
let pendingDeckEditorLibraryFilters = null;
let deckEditorSkillViews = new Set();
let deckEditorLibraryDetailCardId = null;
let deckEditorPreviewSuppressedUntil = 0;
let deckEditorDetailVisibilityFrame = 0;
let pendingExchangeCardId = null;
let battleBgmStyle = "standard";
let gallerySelectedCardId = null;
let galleryMusicTrack = "title";
let lastHandTap = { index: null, instanceId: null, at: 0 };
let battleIntroRunId = 0;

const TITLE_CARD_COUNT = 10;
const HAND_DOUBLE_TAP_MS = 420;
const TITLE_CARD_SLOTS = [
  {
    left: "5%",
    top: "7%",
    width: "clamp(118px, 14vw, 226px)",
    rotate: "-13deg",
    opacity: "0.66",
    delay: "-700ms",
    mobileLeft: "-13%",
    mobileTop: "6%",
  },
  {
    right: "8%",
    top: "6%",
    width: "clamp(138px, 18vw, 286px)",
    rotate: "11deg",
    opacity: "0.68",
    delay: "-1800ms",
    mobileRight: "-15%",
    mobileTop: "11%",
  },
  {
    left: "12%",
    bottom: "6%",
    width: "clamp(138px, 17vw, 276px)",
    rotate: "8deg",
    opacity: "0.58",
    delay: "-3100ms",
    mobileLeft: "-12%",
    mobileBottom: "10%",
  },
  {
    right: "6%",
    bottom: "8%",
    width: "clamp(120px, 15vw, 246px)",
    rotate: "-9deg",
    opacity: "0.6",
    delay: "-900ms",
    mobileRight: "-13%",
    mobileBottom: "13%",
  },
  {
    left: "29%",
    top: "41%",
    width: "clamp(104px, 12vw, 198px)",
    rotate: "4deg",
    opacity: "0.38",
    delay: "-4200ms",
    mobileLeft: "13%",
    mobileTop: "46%",
  },
  {
    right: "29%",
    top: "39%",
    width: "clamp(104px, 12vw, 198px)",
    rotate: "-5deg",
    opacity: "0.36",
    delay: "-2500ms",
    mobileRight: "11%",
    mobileTop: "49%",
  },
  {
    left: "41%",
    top: "-5%",
    width: "clamp(108px, 13vw, 214px)",
    rotate: "7deg",
    opacity: "0.42",
    delay: "-5600ms",
    mobileLeft: "36%",
    mobileTop: "-5%",
  },
  {
    right: "41%",
    bottom: "-6%",
    width: "clamp(110px, 13vw, 216px)",
    rotate: "-7deg",
    opacity: "0.4",
    delay: "-1400ms",
    mobileRight: "35%",
    mobileBottom: "-6%",
  },
  {
    left: "-2%",
    top: "36%",
    width: "clamp(100px, 12vw, 196px)",
    rotate: "16deg",
    opacity: "0.42",
    delay: "-3600ms",
    mobileLeft: "-20%",
    mobileTop: "36%",
  },
  {
    right: "-3%",
    top: "32%",
    width: "clamp(100px, 12vw, 196px)",
    rotate: "-15deg",
    opacity: "0.42",
    delay: "-5100ms",
    mobileRight: "-21%",
    mobileTop: "34%",
  },
];

const BGM_TRACKS = {
  title: {
    src: "assets/audio/cross-the-line-title-theme.mp3",
    label: "タイトル",
  },
  titleJazz: {
    src: "assets/audio/cross-the-line-title-jazz.mp3",
    label: "タイトル JAZZ",
  },
  deckEdit: {
    src: "assets/audio/cross-the-line-deck-edit.mp3",
    label: "デッキ編集",
  },
  normal: {
    src: "assets/audio/cross-the-line-battle-scene.mp3",
    label: "通常戦闘",
  },
  normalJazz: {
    src: "assets/audio/cross-the-line-jazz-battle.mp3",
    label: "通常戦闘 JAZZ",
  },
  advantage: {
    src: "assets/audio/cross-the-line-gloria-victory.mp3",
    label: "優勢",
  },
  advantageJazz: {
    src: "assets/audio/cross-the-line-jazz-advantage.mp3",
    label: "優勢 JAZZ",
  },
  victory: {
    src: "assets/audio/cross-the-line-victory-theme.mp3",
    label: "勝利",
  },
  crisis: {
    src: "assets/audio/cross-the-line-crisis.mp3",
    label: "劣勢",
  },
  crisisJazz: {
    src: "assets/audio/cross-the-line-jazz-crisis.mp3",
    label: "劣勢 JAZZ",
  },
  defeat: {
    src: "assets/audio/cross-the-line-defeat-theme.mp3",
    label: "敗北",
  },
};

const GALLERY_BGM_KEYS = ["title", "titleJazz", "deckEdit", "normal", "normalJazz", "advantage", "advantageJazz", "crisis", "crisisJazz", "victory", "defeat"];
const VOICE_EVENT_FILE_NAMES = {
  summon: ["summon.mp3", "sumon.mp3"],
  attack: ["atack.mp3", "attack.mp3"],
  retreat: ["retreat.mp3"],
};
const voicePathCache = new Map();
const missingVoiceCache = new Set();

function desiredMusicTrack() {
  if (activeScreen === "title") return "title";
  if (activeScreen === "deckEdit") return "deckEdit";
  if (activeScreen === "gallery") return BGM_TRACKS[galleryMusicTrack] ? galleryMusicTrack : "title";
  if (!state) return battleMusicTrack("normal");
  if (state.gameOver) {
    if (state.ai.lp <= 0) return "victory";
    if (state.player.lp <= 0) return "defeat";
    return battleMusicTrack("normal");
  }
  if (state.ai.lp <= 5) return battleMusicTrack("advantage");
  if (state.ai.lp >= 6 && state.player.lp <= 5) return battleMusicTrack("crisis");
  return battleMusicTrack("normal");
}

function battleMusicTrack(track) {
  return battleBgmStyle === "jazz" ? `${track}Jazz` : track;
}

const audio = {
  ctx: null,
  musicAudio: null,
  voiceAudios: new Set(),
  musicTrack: null,
  bgmVolume: 0.42,
  voiceVolume: 0.86,
  musicOn: true,
  sfxOn: true,
  voiceOn: true,
  unlocked: false,
  unlock() {
    if (this.unlocked) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.ctx = new AudioContext();
      if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
    }
    this.unlocked = true;
    this.updateMusic();
  },
  updateMusic() {
    if (!this.musicOn) {
      this.stopMusic();
      return;
    }
    if (!this.unlocked) return;
    this.startMusic(desiredMusicTrack());
  },
  startMusic(track = desiredMusicTrack()) {
    if (!this.musicOn || !this.unlocked) return;
    const nextTrack = BGM_TRACKS[track] ? track : "normal";
    const config = BGM_TRACKS[nextTrack];
    if (this.musicTrack === nextTrack && this.musicAudio) {
      this.musicAudio.volume = this.bgmVolume;
      this.musicAudio.play().catch(() => {});
      return;
    }
    if (this.musicAudio) {
      this.musicAudio.pause();
      this.musicAudio.currentTime = 0;
    }
    const bgm = new Audio(config.src);
    bgm.loop = true;
    bgm.volume = this.bgmVolume;
    this.musicAudio = bgm;
    this.musicTrack = nextTrack;
    bgm.play().catch(() => {});
  },
  stopMusic() {
    if (this.musicAudio) this.musicAudio.pause();
  },
  tone(freq, duration = 0.18, type = "sine", volume = 0.08, delay = 0, endFreq = null) {
    if (!this.ctx || !this.sfxOn) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const start = this.ctx.currentTime + delay;
    const end = start + duration;
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    if (endFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFreq), end);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(start);
    osc.stop(end + 0.03);
  },
  noise(duration = 0.12, volume = 0.035, delay = 0, filterType = "bandpass", frequency = 900, q = 0.9) {
    if (!this.ctx || !this.sfxOn) return;
    const sampleRate = this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, Math.max(1, Math.floor(sampleRate * duration)), sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;
    const source = this.ctx.createBufferSource();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    const start = this.ctx.currentTime + delay;
    const end = start + duration;
    source.buffer = buffer;
    filter.type = filterType;
    filter.frequency.setValueAtTime(frequency, start);
    filter.Q.setValueAtTime(q, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);
    source.connect(filter).connect(gain).connect(this.ctx.destination);
    source.start(start);
    source.stop(end + 0.02);
  },
  elementLayer(element, delay = 0, intensity = 1) {
    const volume = 0.038 * intensity;
    switch (element) {
      case "炎":
        this.noise(0.17, volume, delay, "bandpass", 1500, 1.1);
        this.tone(185, 0.2, "sawtooth", volume * 0.95, delay + 0.015, 92);
        break;
      case "水":
        this.tone(660, 0.22, "sine", volume, delay, 880);
        this.tone(990, 0.16, "triangle", volume * 0.55, delay + 0.06, 740);
        break;
      case "風":
        this.noise(0.16, volume * 0.82, delay, "highpass", 1900, 0.7);
        this.tone(980, 0.13, "triangle", volume * 0.6, delay + 0.04, 1320);
        break;
      case "地":
        this.tone(82, 0.19, "triangle", volume * 1.25, delay, 48);
        this.noise(0.1, volume * 0.7, delay + 0.025, "lowpass", 420, 0.8);
        break;
      default:
        this.tone(520, 0.12, "triangle", volume, delay, 620);
        break;
    }
  },
  rarityLayer(rarity, delay = 0) {
    if (rarity === "UR") {
      [784, 988, 1319, 1568].forEach((freq, index) => this.tone(freq, 0.18, "triangle", 0.038, delay + index * 0.055));
      this.noise(0.18, 0.02, delay + 0.08, "highpass", 2300, 0.6);
    } else if (rarity === "SR") {
      [659, 880, 1175].forEach((freq, index) => this.tone(freq, 0.15, "triangle", 0.03, delay + index * 0.055));
    }
  },
  sfx(name, detail = {}) {
    if (!this.sfxOn) return;
    const amount = Math.max(1, Number(detail.amount || detail.total || 1));
    switch (name) {
      case "draw":
        this.noise(0.055, 0.025, 0, "highpass", 1200, 0.8);
        this.tone(660, 0.08, "triangle", 0.04, 0.02, 880);
        break;
      case "summon":
        this.tone(110, 0.16, "triangle", 0.065, 0, 70);
        this.tone(330, 0.18, "square", 0.043, 0.055, 494);
        this.elementLayer(detail.element, 0.08, detail.rarity === "UR" ? 1.35 : 1);
        this.rarityLayer(detail.rarity, 0.13);
        break;
      case "support":
        this.tone(440, 0.11, "triangle", 0.038, 0, 660);
        this.tone(880, 0.15, "sine", 0.034, 0.06, 990);
        this.elementLayer(detail.element, 0.075, 0.72);
        break;
      case "attack":
        this.noise(0.11, 0.034, 0, "highpass", 1300 + amount * 35, 0.8);
        this.tone(210 + amount * 8, 0.12, "sawtooth", 0.045, 0.035, 130);
        this.elementLayer(detail.element, 0.04, 0.7);
        break;
      case "atomic":
        this.tone(220, 0.28, "sawtooth", 0.04, 0, 660);
        this.noise(0.1, 0.035, 0.18, "bandpass", 1800, 1.2);
        this.tone(92, 0.24, "square", 0.075, 0.24, 46);
        this.noise(0.26, 0.06, 0.25, "lowpass", 520, 0.9);
        break;
      case "damage":
        this.tone(amount >= 7 ? 54 : amount >= 4 ? 72 : 98, 0.16, "square", amount >= 7 ? 0.09 : 0.065, 0, 36);
        this.noise(amount >= 4 ? 0.16 : 0.09, amount >= 7 ? 0.062 : 0.042, 0.015, "lowpass", amount >= 7 ? 620 : 980, 0.8);
        break;
      case "lpDamage":
        this.tone(70, 0.22, "sawtooth", 0.082, 0, 42);
        this.tone(140, 0.16, "square", 0.042, 0.05, 84);
        this.noise(0.2, 0.045, 0.02, "lowpass", 760, 0.7);
        break;
      case "guard":
        this.tone(310, 0.08, "square", 0.036, 0, 220);
        this.tone(620, 0.1, "triangle", 0.026, 0.025, 420);
        this.noise(0.07, 0.024, 0.01, "bandpass", 720, 1.8);
        break;
      case "heal":
        this.tone(523, 0.13, "sine", 0.035, 0, 659);
        this.tone(784, 0.16, "triangle", 0.033, 0.055, 1046);
        this.tone(1046, 0.22, "sine", 0.024, 0.12);
        break;
      case "counter":
        this.tone(980, 0.08, "square", 0.048, 0, 520);
        this.tone(1470, 0.1, "triangle", 0.034, 0.055, 740);
        this.noise(0.09, 0.034, 0.02, "highpass", 2100, 1.1);
        break;
      case "awaken":
        this.tone(130, 0.36, "sawtooth", 0.045, 0, 520);
        [523, 659, 784, 1046].forEach((freq, index) => this.tone(freq, 0.2, "triangle", 0.04, 0.11 + index * 0.075));
        this.elementLayer(detail.element, 0.16, 1.2);
        break;
      case "retreat":
        this.tone(185, 0.13, "triangle", 0.04, 0, 92);
        this.noise(0.11, 0.026, 0.02, "lowpass", 500, 0.9);
        break;
      case "reward":
        this.rarityLayer(detail.rarity, 0);
        if (detail.rarity === "UR") this.tone(196, 0.32, "triangle", 0.04, 0, 392);
        break;
      case "coin":
        this.tone(784, 0.08, "triangle", 0.032, 0, 1175);
        this.tone(1046, 0.1, "triangle", 0.028, 0.08, 1568);
        this.noise(0.07, 0.018, 0.03, "highpass", 2100, 0.8);
        break;
      case "coinResult":
        this.tone(392, 0.12, "triangle", 0.042, 0, 523);
        this.tone(784, 0.18, "sine", 0.034, 0.09);
        break;
      case "win":
        [523, 659, 784, 1046].forEach((freq, index) => this.tone(freq, 0.18, "triangle", 0.048, index * 0.075));
        break;
      case "lose":
        [220, 185, 147].forEach((freq, index) => this.tone(freq, 0.2, "sawtooth", 0.045, index * 0.09, freq * 0.72));
        break;
      case "phase":
        this.tone(392, 0.1, "triangle", 0.035, 0, 494);
        this.tone(494, 0.11, "triangle", 0.032, 0.08, 392);
        break;
      default:
        this.tone(440, 0.14, "triangle", 0.045);
        break;
    }
  },
  stopVoiceFiles() {
    this.voiceAudios.forEach((clip) => {
      clip.pause();
      clip.currentTime = 0;
    });
    this.voiceAudios.clear();
  },
  stopVoice() {
    this.stopVoiceFiles();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  },
  playVoicePath(path, fallbackText = "") {
    const clip = new Audio(path);
    clip.volume = this.voiceVolume;
    clip.preload = "auto";
    let failed = false;
    const handleFailure = () => {
      if (failed) return;
      failed = true;
      this.voiceAudios.delete(clip);
      if (fallbackText) this.speak(fallbackText);
    };
    clip.addEventListener("error", handleFailure, { once: true });
    clip.addEventListener("ended", () => {
      this.voiceAudios.delete(clip);
    }, { once: true });
    this.voiceAudios.add(clip);
    const playPromise = clip.play();
    if (playPromise) playPromise.catch(handleFailure);
  },
  tryVoiceCandidates(cacheKey, candidates, index = 0, fallbackText = "") {
    if (!this.voiceOn) return;
    if (index >= candidates.length) {
      missingVoiceCache.add(cacheKey);
      if (fallbackText) this.speak(fallbackText);
      return;
    }
    const path = candidates[index];
    const clip = new Audio(path);
    clip.volume = this.voiceVolume;
    clip.preload = "auto";
    let failed = false;
    const tryNext = () => {
      if (failed) return;
      failed = true;
      this.voiceAudios.delete(clip);
      this.tryVoiceCandidates(cacheKey, candidates, index + 1, fallbackText);
    };
    clip.addEventListener("error", tryNext, { once: true });
    clip.addEventListener("ended", () => {
      this.voiceAudios.delete(clip);
    }, { once: true });
    this.voiceAudios.add(clip);
    const playPromise = clip.play();
    if (playPromise) {
      playPromise.then(() => voicePathCache.set(cacheKey, path)).catch(tryNext);
    } else {
      voicePathCache.set(cacheKey, path);
    }
  },
  voice(card, eventName, fallbackText = "") {
    if (!this.voiceOn || !card?.id) return false;
    const cacheKey = `${card.id}:${eventName}`;
    const cachedPath = voicePathCache.get(cacheKey);
    if (missingVoiceCache.has(cacheKey)) {
      if (fallbackText) this.speak(fallbackText);
      return false;
    }
    if (cachedPath) {
      this.playVoicePath(cachedPath, fallbackText);
      return true;
    }
    const candidates = voiceCandidatePaths(card.id, eventName);
    if (!candidates.length) {
      if (fallbackText) this.speak(fallbackText);
      return false;
    }
    this.tryVoiceCandidates(cacheKey, candidates, 0, fallbackText);
    return true;
  },
  speak(text) {
    if (!this.voiceOn || !text || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 1.05;
    utterance.pitch = 1.04;
    utterance.volume = 0.82;
    window.speechSynthesis.speak(utterance);
  },
};

function voiceCandidatePaths(cardId, eventName) {
  const fileNames = VOICE_EVENT_FILE_NAMES[eventName] || [];
  return [...new Set(fileNames.map((fileName) => `assets/voice/${cardId}/${fileName}`))];
}

document.addEventListener("pointerdown", () => audio.unlock(), { once: true });

function renderTitleCards() {
  const container = qs("#titleVisuals");
  if (!container) return;
  const owned = loadOwnedCollection();
  const ownedIds = Object.entries(owned)
    .filter(([id, count]) => CARD_DB.has(id) && Number(count) > 0)
    .map(([id]) => id);
  const pool = ownedIds.length ? ownedIds : [...new Set(PLAYER_DECK)];
  const picked = shuffle(pool).slice(0, TITLE_CARD_COUNT);
  while (picked.length < TITLE_CARD_COUNT) {
    picked.push(randomItem(pool));
  }
  container.innerHTML = picked
    .map((id, index) => {
      const card = CARD_DB.get(id);
      const slot = TITLE_CARD_SLOTS[index % TITLE_CARD_SLOTS.length];
      return `<img class="title-card" src="assets/cards/${card.id}.png" alt="" style="${titleCardStyle(slot)}" />`;
    })
    .join("");
}

function titleCardStyle(slot) {
  return [
    ["--title-top", slot.top],
    ["--title-right", slot.right],
    ["--title-bottom", slot.bottom],
    ["--title-left", slot.left],
    ["--title-width", slot.width],
    ["--title-rotate", slot.rotate],
    ["--title-opacity", slot.opacity],
    ["--title-delay", slot.delay],
    ["--title-duration", slot.duration],
    ["--title-mobile-top", slot.mobileTop],
    ["--title-mobile-right", slot.mobileRight],
    ["--title-mobile-bottom", slot.mobileBottom],
    ["--title-mobile-left", slot.mobileLeft],
    ["--title-mobile-width", slot.mobileWidth],
  ]
    .filter(([, value]) => value !== undefined)
    .map(([property, value]) => `${property}:${value}`)
    .join(";");
}

function showTitleScreen() {
  activeScreen = "title";
  renderTitleCards();
  document.body.classList.add("title-active");
  qs("#titleScreen").classList.remove("is-hidden");
  audio.updateMusic();
}

function hideTitleScreen() {
  activeScreen = "duel";
  document.body.classList.remove("title-active");
  qs("#titleScreen").classList.add("is-hidden");
}

function createPlayer(key, name, deckIds) {
  return {
    key,
    name,
    lp: MAX_LP,
    energyMax: 0,
    energy: 0,
    energyPulseUntil: 0,
    deck: shuffle(deckIds.map((id) => createInstance(CARD_DB.get(id), key))),
    hand: [],
    front: [null, null, null],
    back: [null, null],
    grave: [],
    turns: 0,
    skipDraw: false,
    supportNullify: 0,
    effectNullify: 0,
    counterAttack: 0,
    reviveTrap: 0,
    nextBackSkillDouble: false,
    bannerTurns: 0,
    delayed: [],
  };
}

function createInstance(base, ownerKey = null) {
  const card = {
    ...base,
    instanceId: `inst-${nextInstanceId++}`,
    ownerKey,
  };
  if (card.kind === "character") {
    card.currentAtk = base.atk;
    card.currentDef = base.def;
    card.currentHp = base.hp;
    card.maxDef = base.def;
    card.maxHp = base.hp;
    card.originalDef = base.def;
    card.originalHp = base.hp;
    card.tempAtk = 0;
    card.tempDef = 0;
    card.status = {
      stun: 0,
      guardOff: 0,
      bind: 0,
      silenced: 0,
    };
    card.attacked = false;
    card.summonedOnTurn = 0;
    card.awakened = false;
    card.killCount = 0;
    card.renaStacks = 0;
    card.rageUsed = false;
    card.lowHpBuffed = false;
    card.extraAttackUsed = false;
    card.selfSacrificeBuffed = false;
  }
  return card;
}

async function startNewGame(aiProfileOverride = null) {
  hideSkillPopup();
  closeDeckEditor();
  closeLevelSelect();
  hideTitleScreen();
  const introRunId = ++battleIntroRunId;
  nextInstanceId = 1;
  const freeplayWins = loadFreeplayWins();
  const aiProfile = aiProfileOverride || aiProfileForWins(freeplayWins);
  const firstPlayerKey = Math.random() < 0.5 ? "player" : "ai";
  state = {
    player: createPlayer("player", "Player", loadPlayerDeckIds()),
    ai: createPlayer("ai", `AI Rival Lv.${aiProfile.level}`, aiProfile.deck),
    aiProfile,
    freeplayWins,
    firstPlayerKey,
    current: firstPlayerKey,
    phase: "intro",
    turnNumber: 1,
    selectedHandIndex: null,
    selectedField: null,
    selectedAttackerId: null,
    busy: true,
    gameOver: false,
    rewardsGiven: false,
    pendingDeckChoice: null,
    pendingSupport: null,
    summonDropId: null,
    log: [],
  };

  for (let i = 0; i < 5; i += 1) {
    drawCard(state.player, false);
    drawCard(state.ai, false);
  }

  log("デュエル開始。初期手札5枚、LP20。", "system");
  log(`AI Lv.${aiProfile.level}「${aiProfile.name}」が参戦。フリープレイ勝利数 ${freeplayWins}/${FREEPLAY_MAX_WINS}。`, "system");
  render();
  await playBattleIntro(firstPlayerKey, introRunId);
  if (!state || introRunId !== battleIntroRunId || state.gameOver) return;
  log(`コイントスは${FIRST_PLAYER_RESULTS[firstPlayerKey].side}。${FIRST_PLAYER_RESULTS[firstPlayerKey].logName}が先攻。`, "phase");
  if (firstPlayerKey === "ai") {
    await runAiTurn();
    return;
  }
  state.busy = false;
  startTurn(state.player);
  render();
}

async function playBattleIntro(firstPlayerKey, runId) {
  const overlay = qs("#battleIntroOverlay");
  const line = qs("#battleIntroLine");
  const coin = qs("#battleIntroCoin");
  const coinFace = qs("#battleIntroCoinFace");
  const result = qs("#battleIntroResult");
  if (!overlay || !line || !coin || !coinFace || !result) return;
  const firstPlayer = FIRST_PLAYER_RESULTS[firstPlayerKey] || FIRST_PLAYER_RESULTS.player;
  overlay.className = "battle-intro-overlay";
  coin.className = "intro-coin";
  line.textContent = randomItem(BATTLE_INTRO_LINES);
  coinFace.textContent = "?";
  result.textContent = "COIN TOSS";
  audio.sfx("phase");

  await sleep(1650);
  if (!isBattleIntroCurrent(runId)) return;
  overlay.classList.add("is-coin-stage");
  coin.classList.add("is-tossing");
  audio.sfx("coin");

  await sleep(1180);
  if (!isBattleIntroCurrent(runId)) return;
  coin.classList.remove("is-tossing");
  coin.classList.add(firstPlayerKey === "ai" ? "is-tails" : "is-heads");
  coinFace.textContent = firstPlayer.face;
  result.textContent = `${firstPlayer.side} / ${firstPlayer.label}`;
  result.classList.add("is-visible");
  audio.sfx("coinResult");

  await sleep(1250);
  if (!isBattleIntroCurrent(runId)) return;
  overlay.classList.add("is-leaving");

  await sleep(320);
  if (!isBattleIntroCurrent(runId)) return;
  overlay.className = "battle-intro-overlay hidden";
}

function isBattleIntroCurrent(runId) {
  return state && runId === battleIntroRunId;
}

function triggerEnergyPulse(player) {
  player.energyPulseUntil = Date.now() + ENERGY_TURN_PULSE_MS;
  window.setTimeout(() => {
    if (!state || state[player.key] !== player || Date.now() < player.energyPulseUntil) return;
    player.energyPulseUntil = 0;
    renderHud();
  }, ENERGY_TURN_PULSE_MS + 80);
}

function startTurn(player) {
  if (state.gameOver) return;
  state.current = player.key;
  state.phase = "main";
  state.selectedHandIndex = null;
  state.selectedField = null;
  state.selectedAttackerId = null;
  state.pendingSupport = null;
  clearHandTapState();
  if (player.counterAttack > 0) {
    player.counterAttack = 0;
    log(`${player.name} の紫禁の策謀は有効期限を過ぎた。`, "effect");
  }
  player.turns += 1;
  player.energyMax = Math.min(10, player.energyMax + 1);
  player.energy = player.energyMax;
  triggerEnergyPulse(player);
  boardCards(player).forEach((card) => {
    card.attacked = false;
    card.extraAttackUsed = false;
    card.sionReattackUsed = false;
  });

  audio.sfx("phase");
  audio.speak(player.key === "player" ? "あなたのターン、ドロー" : "AIのターン");
  log(`<strong>${player.name}</strong> のターン。エネルギー ${player.energy}/${player.energyMax}。`, "phase");

  tickDelayed(player);
  if (player.skipDraw) {
    player.skipDraw = false;
    log(`${player.name} はドローを封じられた。`, "effect");
  } else {
    drawCard(player);
  }
  applyStartEffects(player);
  checkGameOver();
}

function endTurn(player) {
  applyEndEffects(player);
  boardCards(player).forEach((card) => {
    if (card.tempAtk || card.tempDef) {
      card.tempAtk = 0;
      card.tempDef = 0;
    }
    decrementStatuses(card);
  });
  tickBannerEffect(player);
  player.energy = 0;
  player.energyPulseUntil = 0;
}

function drawCard(player, announce = true) {
  if (player.deck.length === 0) {
    damageLp(player, 2, "デッキ切れ");
    log(`${player.name} はデッキ切れで2ダメージ。`, "damage");
    return null;
  }
  const card = player.deck.shift();
  player.hand.push(card);
  if (announce) {
    audio.sfx("draw");
    log(`${player.name} が1枚ドロー。`, "draw");
  }
  return card;
}

function playCharacterFromHand(player, handIndex, lane, slotIndex) {
  const card = player.hand[handIndex];
  if (!card || card.kind !== "character") return false;
  if (!canPay(player, card)) return false;
  if (!isValidLane(card, lane)) {
    log(`${card.name} はその枠に配置できない。`, "warn");
    return false;
  }
  if (player[lane][slotIndex]) return false;
  hideSkillPopup();
  player.energy -= effectiveCost(card, player);
  player.hand.splice(handIndex, 1);
  card.ownerKey = player.key;
  card.summonedOnTurn = player.turns;
  player[lane][slotIndex] = card;
  state.summonDropId = card.instanceId;

  audio.sfx("summon", card);
  audio.voice(card, "summon", card.name);
  log(`${player.name} は <strong>${card.name}</strong> を${lane === "front" ? "前衛" : "後衛"}に配置。`, "summon");
  applySummonEffects(card, player, lane);
  state.selectedHandIndex = null;
  state.selectedField = { owner: player.key, lane, index: slotIndex };
  clearHandTapState();
  render();
  window.setTimeout(() => {
    if (state?.summonDropId === card.instanceId) state.summonDropId = null;
    document.querySelector(`[data-iid="${card.instanceId}"]`)?.classList.remove("summon-drop");
  }, SUMMON_IN_CLEAR_DELAY);
  checkGameOver();
  return true;
}

function applySummonEffects(card, player, lane) {
  const foe = opponentOf(player);
  if (card.status?.silenced) return;
  const scale = lane === "back" && player.nextBackSkillDouble ? 2 : 1;
  if (lane === "back" && player.nextBackSkillDouble) {
    player.nextBackSkillDouble = false;
    log(`${card.name} の後衛スキル効果が2倍になった。`, "effect");
  }

  if (hasBoardCard(player, "C11") && card.role === "AT" && card.id !== "C11") buffAtk(card, 2 * scale);
  if (hasBoardCard(player, "C32") && card.element === "炎" && card.id !== "C32") buffAtk(card, 1 * scale);
  if (card.id === "C14" && hasBoardCard(player, "C05")) buffAtk(card, 3 * scale);

  if (card.id === "C47") applySerenaBoostsToClaire(card, player);
  if (card.role === "ST" && consumeEffectNullify(card, player, `${card.name} のサポータースキル`)) return;

  switch (card.id) {
    case "C04":
      boardCards(player).forEach((ally) => {
        if (ally !== card) buffAtk(ally, 2 * scale);
        buffDef(ally, 1 * scale);
      });
      log("エヴの光で味方全体を強化。", "effect");
      break;
    case "C05":
      boardCards(player).forEach((ally) => buffDef(ally, 1 * scale));
      boardCards(player)
        .filter((ally) => ally.id === "C14")
        .forEach((ally) => buffDef(ally, 3 * scale));
      log("ナージャが銀雪の盾を展開。", "effect");
      break;
    case "C09":
      boardCards(foe).forEach((enemy) => buffAtk(enemy, -1 * scale));
      log("るるの辛口実況で相手全体ATK-1。", "effect");
      break;
    case "C11":
      boardCards(player)
        .filter((ally) => ally.role === "AT" && ally !== card)
        .forEach((ally) => buffAtk(ally, 2 * scale));
      break;
    case "C13": {
      const target = randomItem(boardCards(foe));
      if (target) {
        buffAtk(target, -3 * scale);
        if (setStatus(target, "bind", Math.max(target.status.bind, 2))) {
          log(`${target.name} は束縛され、ATK-3。`, "effect");
        }
      }
      break;
    }
    case "C15": {
      card.sophiaBoostPending = true;
      card.sophiaSkillMultiplier = 2 * scale;
      log(`${card.name} は次のターンまで場に残れば後押しを発動する。`, "effect");
      break;
    }
    case "C17":
      player.supportNullify += 1;
      revealRandomHand(foe, player);
      break;
    case "C19":
      drawCard(player);
      player.hand.forEach((handCard) => {
        if (handCard.id === "C07") handCard.costReduction = Math.max(handCard.costReduction || 0, 2);
      });
      break;
    case "C20":
      if (hasBoardCard(player, "C08")) buffDef(card, 2 * scale);
      player.hand.forEach((handCard) => {
        if (handCard.id === "C08") handCard.costReduction = Math.max(handCard.costReduction || 0, 1);
      });
      break;
    case "C23":
      player.front.filter(Boolean).forEach((ally) => {
        buffAtk(ally, 1 * scale);
        buffDef(ally, 1 * scale);
      });
      break;
    case "C32":
      boardCards(player).forEach((ally) => {
        ally.status.bind = 0;
        if (ally.currentAtk < ally.atk) ally.currentAtk = ally.atk;
        if (ally.element === "炎" && ally !== card) buffAtk(ally, 1 * scale);
      });
      break;
    case "C33":
      drawCard(player);
      break;
    case "C34":
      revealRandomHand(foe, player);
      break;
    case "C36":
      boardCards(foe)
        .filter((enemy) => enemy.role === "GD")
        .forEach((enemy) => {
          enemy.currentDef = Math.max(0, enemy.currentDef - 2 * scale);
        });
      log("相手ガーディアンのDEFを削った。", "effect");
      break;
    case "C38":
      if (hasBoardCard(player, "C03")) {
        buffDef(card, 2 * scale);
        buffMaxHp(card, 2 * scale);
      }
      break;
    case "C39":
      boardCards(player).forEach((ally) => buffMaxHp(ally, 1 * scale));
      break;
    case "C41":
      foe.skipDraw = true;
      log(`${foe.name} の次のドローを封じた。`, "effect");
      break;
    case "C42": {
      const target = boardCards(foe).find((enemy) => enemy.role === "ST");
      if (target) {
        if (setStatus(target, "silenced", Math.max(target.status.silenced, 1))) {
          log(`${target.name} のスキルを1ターン封印。`, "effect");
        }
      }
      break;
    }
    case "C43": {
      const target = randomItem(boardCards(player).filter((ally) => ally !== card)) || card;
      if (Math.random() < 0.5) {
        buffAtk(target, 1 * scale);
        log(`${target.name} にATK+1。`, "effect");
      } else {
        buffDef(target, 2 * scale);
        log(`${target.name} にDEF+2。`, "effect");
      }
      break;
    }
    case "C48":
      applySerenaBoostToClaires(player);
      break;
    case "C50":
      clearAllyStatusesAndBolsterGuards(player);
      break;
    case "C52":
      player.effectNullify += 1;
      log(`${player.name} は次のサポーター/サポート効果を1回無効化する構え。`, "effect");
      break;
    case "C53":
      moveEnemyBacklineToFront(player, foe);
      break;
    case "C57":
      cycleHandThroughDeck(player);
      if (arcadiaCount(player) >= 3) {
        boardCards(player).forEach((ally) => buffDef(ally, 1 * scale));
        log("雪乃の采配でアルカディアパレスの守りが固まった。", "effect");
      }
      break;
    case "C58":
      drawThenReturnHandToDeck(player);
      discountArcadiaInHand(player);
      break;
    case "C59":
      boardCards(player).forEach((ally) => buffAtk(ally, 1 * scale));
      if (arcadiaCount(player) >= 3) {
        foe.front.filter(Boolean).forEach((enemy) => {
          enemy.tempAtk -= 2 * scale;
        });
        log("キラのステージで相手前衛の勢いを削いだ。", "effect");
      }
      break;
    case "C60": {
      revealRandomHand(foe, player);
      const target = randomItem(boardCards(foe));
      if (target && setStatus(target, "silenced", Math.max(target.status.silenced, 1))) {
        log(`${target.name} のスキルを1ターン封印。`, "effect");
      }
      break;
    }
    case "C61":
      player.effectNullify += 1;
      log(`${card.name} が監視を開始。次のサポーター/サポート効果を1回無効化。`, "effect");
      break;
    case "C63": {
      const target = foe.back.filter(Boolean).sort((a, b) => effectiveDef(b) - effectiveDef(a))[0];
      if (target) {
        target.currentDef = 0;
        target.tempDef = 0;
        log(`${card.name} の裏交渉で${target.name}のDEFを0にした。`, "effect");
      }
      break;
    }
    case "C65":
      boardCards(player).forEach((ally) => {
        buffMaxHp(ally, 1 * scale);
        buffDef(ally, 1 * scale);
      });
      log("マリアがパレス全体を統括し、味方を補強した。", "effect");
      break;
    default:
      break;
  }
}

function applyStartEffects(player) {
  const foe = opponentOf(player);
  const cards = [...boardCards(player)];
  cards.forEach((card) => {
    if (card.status.silenced) return;
    if (card.dormant && !card.awakened) return;
    switch (card.id) {
      case "C01":
        if (card.renaStacks < 3) {
          card.renaStacks += 1;
          buffAtk(card, 1);
          log("緋山玲奈のATKが上昇。", "effect");
        }
        break;
      case "C05":
        healDef(mostDamagedDefAlly(player), 1);
        break;
      case "C12":
        randomBotanEffect(card, player, foe);
        break;
      case "C15":
        triggerSophiaBoost(card, player);
        break;
      case "C18":
        if (!card.rageUsed && card.currentHp <= Math.ceil(card.maxHp / 2)) {
          card.rageUsed = true;
          buffAtk(card, 4);
          log("雷牙の復讐の刃が発動。ATK+4。", "effect");
        }
        break;
      case "C24":
        card.drawTicker = (card.drawTicker || 0) + 1;
        if (card.drawTicker >= 2) {
          card.drawTicker = 0;
          drawCard(player);
        }
        break;
      case "C51":
        fireMargueriteBacklineShot(card, player, foe);
        break;
      case "C54":
        triggerLucreziaEnergy(card, player);
        break;
      default:
        break;
    }
  });

  boardCards(player).forEach((card) => {
    if ((card.id === "C02" || card.id === "C06") && !card.awakened) {
      const livedTurns = player.turns - card.summonedOnTurn;
      if (livedTurns >= 3) awaken(card, player);
    }
  });
}

function applyEndEffects(player) {
  const cards = [...boardCards(player)];
  cards.forEach((card) => {
    if (card.status.silenced) return;
    switch (card.id) {
      case "C04":
        if (consumeEffectNullify(card, player, `${card.name} のサポータースキル`)) break;
        healCharacter(mostDamagedAlly(player), 1);
        break;
      case "C08":
        if (consumeEffectNullify(card, player, `${card.name} のサポータースキル`)) break;
        if (player.turns - card.summonedOnTurn >= 3) {
          const target = strongestAlly(player, card);
          if (target) {
            buffAtk(target, 4);
            healCharacter(target, target.maxHp);
            log(`七海が離脱し、${target.name} に決意を託した。`, "effect");
          }
          destroyCharacter(card, opponentOf(player), { silentDamage: true });
        }
        break;
      case "C10": {
        const target = randomItem(boardCards(player));
        if (target) {
          buffAtk(target, 1);
          buffDef(target, 1);
          log(`ハナが${target.name}を育てた。`, "effect");
        }
        break;
      }
      case "C27": {
        if (consumeEffectNullify(card, player, `${card.name} のサポータースキル`)) break;
        const target = mostDamagedAlly(player);
        if (target) healCharacter(target, 1);
        break;
      }
      case "C29":
        if (player.turns - card.summonedOnTurn >= 2) {
          log("桐谷 楓は役目を終えて撤退。", "effect");
          destroyCharacter(card, opponentOf(player), { silentDamage: true });
        }
        break;
      case "C38": {
        if (consumeEffectNullify(card, player, `${card.name} のサポータースキル`)) break;
        const fiona = boardCards(player).find((ally) => ally.id === "C03");
        if (fiona) healDef(fiona, 1);
        break;
      }
      case "C62": {
        if (consumeEffectNullify(card, player, `${card.name} のサポータースキル`)) break;
        const target = mostDamagedAlly(player);
        const amount = hasBoardCard(player, "C10") ? 2 : 1;
        if (target) healCharacter(target, amount);
        break;
      }
      case "C64":
        damageCharacter(card, 1, opponentOf(player), { ignoreDef: true, silentDamage: true });
        log(`${card.name} は独占衝動で自傷した。`, "effect");
        break;
      default:
        break;
    }
  });

  boardCards(player).forEach((card) => {
    if (card.id === "C25" && !card.selfSacrificeBuffed && card.currentHp <= 2) {
      card.selfSacrificeBuffed = true;
      boardCards(player).forEach((ally) => buffDef(ally, 2));
      log("アルベルトが味方全体の守りを固めた。", "effect");
    }
  });
}

function randomBotanEffect(card, player, foe) {
  const roll = Math.floor(Math.random() * 4);
  if (roll === 0) {
    boardCards(foe).forEach((enemy) => damageCharacter(enemy, 2, player));
    log("牡丹の気まぐれ: 相手全体に2ダメージ。", "effect");
  } else if (roll === 1) {
    boardCards(player).forEach((ally) => healCharacter(ally, 2));
    log("牡丹の気まぐれ: 味方全体HP2回復。", "effect");
  } else if (roll === 2) {
    boardCards(player).forEach((ally) => buffAtk(ally, 1));
    log("牡丹の気まぐれ: 味方全体ATK+1。", "effect");
  } else {
    damageCharacter(card, 2, foe, { ignoreDef: true });
    log("牡丹の気まぐれ: 自傷2。", "effect");
  }
}

function tickDelayed(player) {
  player.delayed = player.delayed
    .map((effect) => ({ ...effect, turns: effect.turns - 1 }))
    .filter((effect) => {
      if (effect.turns > 0) return true;
      if (effect.type === "eternalTime") {
        boardCards(player).forEach((ally) => {
          healCharacter(ally, ally.maxHp);
          healDef(ally, ally.maxDef);
        });
        log("悠久の時が満ち、味方全体が全回復。", "effect");
      }
      return false;
    });
}

function tickBannerEffect(player) {
  if (!player.bannerTurns) return;
  player.bannerTurns = Math.max(0, player.bannerTurns - 1);
  if (player.bannerTurns === 0) {
    drawCard(player);
    log("双頭鳥の御旗の効果が終わり、1枚ドロー。", "effect");
  }
}

function consumeEffectNullify(card, player, label) {
  const foe = opponentOf(player);
  if (!foe?.effectNullify || card.role !== "ST") return false;
  foe.effectNullify -= 1;
  audio.sfx("counter");
  log(`${foe.name} のイレーネが${label}を無効化。`, "effect");
  return true;
}

function setStatus(card, key, value) {
  if (!card?.status || !(key in card.status)) return false;
  if (card.statusImmune) {
    log(`${card.name} は状態異常を受けない。`, "effect");
    return false;
  }
  card.status[key] = value;
  return true;
}

function arcadiaCount(player, extraCard = null) {
  return boardCards(player).filter((ally) => ally.series === ARCADIA_SERIES).length + (extraCard?.series === ARCADIA_SERIES ? 1 : 0);
}

function cycleHandThroughDeck(player) {
  if (!player.hand.length || !player.deck.length) return;
  const index = Math.floor(Math.random() * player.hand.length);
  const [sent] = player.hand.splice(index, 1);
  player.deck.push(sent);
  const drawn = drawCard(player);
  if (drawn) log(`${player.name} は手札を整えた。`, "effect");
}

function drawThenReturnHandToDeck(player) {
  const drawn = drawCard(player);
  if (!drawn || !player.hand.length) return;
  const index = Math.floor(Math.random() * player.hand.length);
  const [sent] = player.hand.splice(index, 1);
  player.deck.push(sent);
  log(`${player.name} は${sent.name}をデッキ下に戻した。`, "effect");
}

function discountArcadiaInHand(player) {
  const target = player.hand
    .filter((card) => card.kind === "character" && card.series === ARCADIA_SERIES)
    .sort((a, b) => effectiveCost(b, player) - effectiveCost(a, player))[0];
  if (!target) return;
  target.costReduction = Math.max(target.costReduction || 0, 1);
  log(`${target.name} のコストを1下げた。`, "effect");
}

function clearOneStatusFromAlly(player) {
  const target = boardCards(player).find((ally) => Object.values(ally.status || {}).some((value) => value > 0));
  if (!target) return false;
  const key = ["stun", "guardOff", "bind", "silenced"].find((statusKey) => target.status[statusKey] > 0);
  if (!key) return false;
  target.status[key] = 0;
  log(`${target.name} の状態異常を解除。`, "effect");
  return true;
}

function applySerenaBoostsToClaire(card, player) {
  const sources = boardCards(player).filter((ally) => ally.id === "C48");
  sources.forEach(() => applySerenaBoost(card));
  if (sources.length) log(`${card.name} はセレナの号令で強化された。`, "effect");
}

function triggerSophiaBoost(card, player) {
  if (!card.sophiaBoostPending || player.turns <= card.summonedOnTurn) return;
  card.sophiaBoostPending = false;
  const target = strongestAlly(player, card);
  if (!target) return;
  const multiplier = Math.max(2, card.sophiaSkillMultiplier || 2);
  delete card.sophiaSkillMultiplier;
  grantNextSkillMultiplier(target, multiplier);
  log(`${target.name} の次のスキルが${multiplier}倍予約された。`, "effect");
}

function applySerenaBoostToClaires(player) {
  const claires = boardCards(player).filter((ally) => ally.id === "C47");
  claires.forEach((claire) => applySerenaBoost(claire));
  if (claires.length) log("セレナの号令でクレアが強化された。", "effect");
}

function applySerenaBoost(card) {
  card.c48Boosts = (card.c48Boosts || 0) + 1;
  card.currentAtk += C48_CLAIRE_BOOST;
  card.maxDef += C48_CLAIRE_BOOST;
  card.currentDef += C48_CLAIRE_BOOST;
}

function removeSerenaBoostFromClaires(player) {
  boardCards(player)
    .filter((ally) => ally.id === "C47" && (ally.c48Boosts || 0) > 0)
    .forEach((claire) => {
      claire.c48Boosts -= 1;
      claire.currentAtk = Math.max(0, claire.currentAtk - C48_CLAIRE_BOOST);
      claire.maxDef = Math.max(claire.originalDef, claire.maxDef - C48_CLAIRE_BOOST);
      claire.currentDef = Math.min(claire.maxDef, Math.max(0, claire.currentDef - C48_CLAIRE_BOOST));
    });
}

function clearAllyStatusesAndBolsterGuards(player) {
  let cleared = 0;
  boardCards(player).forEach((ally) => {
    const hadStatus = Object.values(ally.status || {}).some((value) => value > 0);
    if (hadStatus) cleared += 1;
    ally.status.stun = 0;
    ally.status.guardOff = 0;
    ally.status.bind = 0;
    ally.status.silenced = 0;
    if (ally.role === "GD") buffMaxHp(ally, 2);
  });
  log(`フィーネが状態異常を解除し、ガーディアンを補強した${cleared ? `（解除${cleared}体）` : ""}。`, "effect");
}

function moveEnemyBacklineToFront(player, foe) {
  const frontIndex = foe.front.findIndex((slot) => !slot);
  const backIndex = foe.back.findIndex(Boolean);
  if (frontIndex < 0 || backIndex < 0) {
    log("前線転移は条件を満たさず不発。", "warn");
    return;
  }
  const [target] = foe.back.splice(backIndex, 1, null);
  foe.front[frontIndex] = target;
  log(`${target.name} を後衛から前衛へ移動させた。`, "effect");
}

function fireMargueriteBacklineShot(card, player, foe) {
  const target =
    foe.back.filter(Boolean).sort((a, b) => a.currentHp - b.currentHp || effectiveAtk(b) - effectiveAtk(a))[0] ||
    foe.front.filter(Boolean).sort((a, b) => a.currentHp - b.currentHp || effectiveAtk(b) - effectiveAtk(a))[0];
  if (!target) return;
  log(`${card.name} が${findCardLocation(target)?.lane === "back" ? "後衛" : "前衛"}の${target.name}を砲撃。`, "effect");
  damageCharacter(target, 2, player);
}

function triggerLucreziaEnergy(card, player) {
  if (card.energyBoosted || player.turns - card.summonedOnTurn < 1) return;
  card.energyBoosted = true;
  const before = player.energyMax;
  player.energyMax = Math.min(10, player.energyMax + 1);
  player.energy = Math.min(10, player.energy + (player.energyMax - before));
  if (player.energyMax > before) log("ルクレツィアの補給でエネルギー最大値+1。", "effect");
}

function triggerSerenaRetreatHeal(owner, fallenCard) {
  if (fallenCard.id === "C48") return;
  const serena = boardCards(owner).find((ally) => ally.id === "C48" && ally.status.silenced <= 0);
  if (!serena) return;
  if (consumeEffectNullify(serena, owner, "セレナの撤退時回復")) return;
  healLp(owner, 1, "セレナ");
}

function triggerMariaArcadiaReturn(owner, fallenCard) {
  if (fallenCard.id === "C65" || fallenCard.series !== ARCADIA_SERIES) return false;
  const maria = boardCards(owner).find((ally) => ally.id === "C65" && !ally.mariaReturnUsed && ally.status.silenced <= 0);
  if (!maria || arcadiaCount(owner, fallenCard) < 4) return false;
  if (consumeEffectNullify(maria, owner, "マリアの撤退保護")) return false;
  maria.mariaReturnUsed = true;
  owner.hand.push(createInstance(CARD_DB.get(fallenCard.id), owner.key));
  log(`マリアの統括で ${fallenCard.name} が手札に戻った。`, "effect");
  return true;
}

function useSelectedSupport() {
  if (state.current !== "player" || state.phase !== "main" || state.busy) return;
  const player = state.player;
  const card = player.hand[state.selectedHandIndex];
  if (!card || card.kind !== "support") return;
  if (!canPay(player, card)) {
    log("エネルギーが足りない。", "warn");
    render();
    return;
  }
  if (supportRequiresTarget(card)) {
    const targets = getSupportTargets(card, player, state.ai);
    if (!targets.length) {
      log(`${card.name} は今は有効な対象がない。`, "warn");
      render();
      return;
    }
    state.pendingSupport = {
      handIndex: state.selectedHandIndex,
      instanceId: card.instanceId,
    };
    state.selectedField = null;
    state.selectedAttackerId = null;
    hideSkillPopup();
    closeHandDock();
    log(`${card.name} の対象を選択してください。`, "support");
    render();
    return;
  }
  const target = chooseSupportTarget(card, player, state.ai);
  if (target === false) {
    log(`${card.name} は今は有効な対象がない。`, "warn");
    render();
    return;
  }
  hideSkillPopup();
  closeHandDock();
  resolveSupport(player, state.ai, card, target);
  player.hand.splice(state.selectedHandIndex, 1);
  state.selectedHandIndex = null;
  state.pendingSupport = null;
  clearHandTapState();
  render();
  checkGameOver();
}

function resolveSupport(player, foe, card, target) {
  player.energy -= effectiveCost(card, player);
  audio.sfx("support", card);
  audio.speak(card.name);
  log(`${player.name} はサポート <strong>${card.name}</strong> を使用。`, "support");

  if (foe.supportNullify > 0) {
    foe.supportNullify -= 1;
    audio.sfx("counter");
    log(`${foe.name} の軍師の策略がサポートを無効化。`, "effect");
    return;
  }

  if (foe.effectNullify > 0) {
    foe.effectNullify -= 1;
    audio.sfx("counter");
    log(`${foe.name} のイレーネがサポート効果を無効化。`, "effect");
    return;
  }

  switch (card.id) {
    case "S01":
      healCharacter(target, target.maxHp);
      break;
    case "S02": {
      const foundIndex = player.deck.findIndex((deckCard) => {
        const base = CARD_DB.get(deckCard.id);
        return base?.series === "Fate Tools" && ["C", "R"].includes(base.rarity);
      });
      if (foundIndex >= 0) {
        const [found] = player.deck.splice(foundIndex, 1);
        player.hand.push(found);
        log(`${found.name} を手札に加えた。`, "effect");
      }
      break;
    }
    case "S03":
      if (target) {
        const stunned = setStatus(target, "stun", Math.max(target.status.stun, 1));
        const guardOff = setStatus(target, "guardOff", Math.max(target.status.guardOff, 1));
        if (stunned || guardOff) log(`${target.name} は1ターン行動不能。ガードも停止。`, "effect");
      }
      break;
    case "S04":
      player.nextBackSkillDouble = true;
      log("次に配置する後衛キャラのスキル効果が2倍。", "effect");
      break;
    case "S05":
      if (target) awaken(target, player, true);
      break;
    case "S06": {
      const hasFire = boardCards(player).some((ally) => ally.element === "炎");
      const hasWater = boardCards(player).some((ally) => ally.element === "水");
      if (hasFire && hasWater) {
        [...foe.front].filter(Boolean).forEach((enemy) => damageCharacter(enemy, 2, player));
        log("氷焔の双剣が相手前衛全体を斬る。", "effect");
      } else {
        log("炎と水が揃わず、双剣は不発。", "warn");
      }
      break;
    }
    case "S07": {
      const ally = randomItem(boardCards(player));
      const roll = Math.floor(Math.random() * 3);
      if (!ally) break;
      if (roll === 0) {
        buffAtk(ally, 3);
        log(`${ally.name} に闘技場の武器。ATK+3。`, "effect");
      } else if (roll === 1) {
        buffDef(ally, 3);
        log(`${ally.name} に闘技場の防具。DEF+3。`, "effect");
      } else {
        damageCharacter(ally, 2, foe, { ignoreDef: true });
        log(`${ally.name} は武器に振り回され2ダメージ。`, "effect");
      }
      break;
    }
    case "S08":
      player.counterAttack += 1;
      log("次の相手ターン中のみ、攻撃を反射する策謀を構えた。", "effect");
      break;
    case "S09":
      boardCards(player).forEach((ally) => {
        ally.tempAtk += 2;
        ally.tempDef += 2;
      });
      log("味方全体が1ターン強化された。", "effect");
      break;
    case "S10": {
      const top = player.deck.splice(0, 3);
      if (top.length) {
        if (player.key === "player") {
          showDeckChoice(player, top);
        } else {
          top.sort((a, b) => RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity] || effectiveCost(b, player) - effectiveCost(a, player));
          const pick = top.shift();
          player.hand.push(pick);
          player.deck.push(...top);
          log(`${pick.name} を仲間に加えた。`, "effect");
        }
      }
      break;
    }
    case "S11":
      player.delayed.push({ type: "eternalTime", turns: 3 });
      log("3ターン後、悠久の時が味方を全回復する。", "effect");
      break;
    case "S12":
      player.reviveTrap += 1;
      log("次に撤退した味方を手札へ戻す。", "effect");
      break;
    case "S13": {
      const counts = countBy(boardCards(player), (ally) => ally.series);
      const achieved = Object.values(counts).some((count) => count >= 3);
      if (achieved) {
        boardCards(player).forEach((ally) => {
          buffAtk(ally, 1);
          buffDef(ally, 1);
        });
        log("同作品3体以上で姉妹の絆が成立。", "effect");
      } else {
        log("同作品3体が揃わず、絆は温存できなかった。", "warn");
      }
      break;
    }
    case "S14":
      if (target) {
        target.currentDef = 0;
        target.tempDef = 0;
        log(`${target.name} のDEFを0にした。`, "effect");
      }
      break;
    case "S15":
      if (target) {
        target.currentDef = target.maxDef;
        log(`${target.name} のDEFを修復。`, "effect");
      }
      break;
    case "S16":
      player.bannerTurns = Math.max(player.bannerTurns || 0, 2);
      log("双頭鳥の御旗を掲げた。2ターンの間、味方キャラ配置コスト-1。", "effect");
      break;
    default:
      break;
  }
}

function supportRequiresTarget(card) {
  return ["S01", "S03", "S05", "S14", "S15"].includes(card?.id);
}

function getSupportTargets(card, player, foe) {
  switch (card?.id) {
    case "S01":
      return boardCards(player).filter((ally) => ally.currentHp < ally.maxHp && !ally.noHeal);
    case "S03":
      return foe.front.filter(Boolean);
    case "S05":
      return boardCards(player).filter((ally) => ally.awaken && !ally.awakened);
    case "S14":
      return activeGuards(foe);
    case "S15":
      return boardCards(player).filter((ally) => ally.currentDef < ally.maxDef);
    default:
      return [];
  }
}

function getPendingSupportCard() {
  if (!state.pendingSupport) return null;
  const card = state.player.hand[state.pendingSupport.handIndex];
  if (!card || card.instanceId !== state.pendingSupport.instanceId) {
    state.pendingSupport = null;
    return null;
  }
  return card;
}

function grantNextSkillMultiplier(card, multiplier) {
  if (!card || !Number.isFinite(multiplier) || multiplier <= 1) return;
  card.nextSkillMultiplier = Math.max(card.nextSkillMultiplier || 1, multiplier);
}

function consumeNextSkillMultiplier(card) {
  if (!card) return 1;
  const multiplier = Math.max(1, card.nextSkillMultiplier || (card.doubleNextSkill ? 2 : 1));
  delete card.nextSkillMultiplier;
  delete card.doubleNextSkill;
  return multiplier;
}

function isSupportTargetable(card) {
  const support = getPendingSupportCard();
  if (!support || state.current !== "player" || state.phase !== "main" || state.busy) return false;
  return getSupportTargets(support, state.player, state.ai).includes(card);
}

function completeSupportTarget(targetCard) {
  const player = state.player;
  const support = getPendingSupportCard();
  if (!support) {
    render();
    return;
  }
  if (!canPay(player, support)) {
    state.pendingSupport = null;
    log("エネルギーが足りない。", "warn");
    render();
    return;
  }
  if (!getSupportTargets(support, player, state.ai).includes(targetCard)) {
    log("そのカードは対象にできません。", "warn");
    render();
    return;
  }
  const handIndex = state.pendingSupport.handIndex;
  hideSkillPopup();
  closeHandDock();
  resolveSupport(player, state.ai, support, targetCard);
  player.hand.splice(handIndex, 1);
  state.selectedHandIndex = null;
  state.selectedField = null;
  state.selectedAttackerId = null;
  state.pendingSupport = null;
  clearHandTapState();
  render();
  checkGameOver();
}

function chooseSupportTarget(card, player, foe) {
  const targets = getSupportTargets(card, player, foe);
  switch (card.id) {
    case "S01":
      return mostDamagedAlly(player) || false;
    case "S03":
      return targets.sort((a, b) => effectiveAtk(b) - effectiveAtk(a))[0] || false;
    case "S05":
      return targets[0] || false;
    case "S14":
      return targets.sort((a, b) => effectiveDef(b) - effectiveDef(a))[0] || false;
    case "S15":
      return targets.sort((a, b) => effectiveDef(a) - effectiveDef(b))[0] || false;
    default:
      return null;
  }
}

function awaken(card, player, forced = false) {
  if (!card.awaken || card.awakened) return;
  const skillScale = consumeNextSkillMultiplier(card);
  card.awakened = true;
  card.dormant = false;
  if (card.id === "C02") {
    buffAtk(card, 5 * skillScale);
    card.maxDef += 3 * skillScale;
    card.currentDef = card.maxDef;
    boardCards(player).forEach((ally) => healCharacter(ally, 3 * skillScale));
  }
  if (card.id === "C06") {
    buffAtk(card, 5 * skillScale);
    buffDef(card, 4 * skillScale);
  }
  if (skillScale > 1) log(`${card.name} の覚醒効果が${skillScale}倍になった。`, "effect");
  log(`${card.name} が${forced ? "即座に" : ""}覚醒した。`, "effect");
  audio.sfx("awaken", card);
}

async function performAttack(attacker, target, options = {}) {
  if ((state.busy && !options.allowWhileBusy) || state.gameOver || !target) return;
  const owner = state[attacker.ownerKey];
  const foe = opponentOf(owner);
  const legal = getLegalTargets(attacker, owner);
  const legalOk = legal.some((item) => item.type === target.type && (target.type === "lp" || item.card === target.card));
  if (!legalOk) {
    log("ガードまたは対象条件により攻撃できない。", "warn");
    render();
    return;
  }

  const previousBusy = state.busy;
  state.busy = true;
  state.selectedAttackerId = null;
  const atomicFlareReady = attacker.id === "C46" && !attacker.atomicFlareUsed;
  audio.sfx(atomicFlareReady ? "atomic" : "attack", { ...attacker, amount: effectiveAtk(attacker) });
  audio.voice(attacker, "attack");
  animateCard(attacker.instanceId, "attack-lift");
  await sleep(ATTACK_IMPACT_DELAY);

  let attackValue = effectiveAtk(attacker);
  if (attacker.id === "C16") {
    const mod = Math.random() < 0.5 ? 3 : -4;
    attackValue = Math.max(0, attackValue + mod);
    log(`烈 龍翔の気まぐれ: ATK${mod > 0 ? "+" : ""}${mod}。`, "effect");
  }
  if (target.type === "card" && attacker.id === "C44" && target.card.role === "ST") attackValue += 2;
  const atomicFlareActive = atomicFlareReady;
  if (atomicFlareActive) attacker.atomicFlareUsed = true;

  if (foe.counterAttack > 0) {
    foe.counterAttack -= 1;
    attacker.attacked = true;
    audio.sfx("counter");
    log(`${foe.name} の紫禁の策謀。攻撃を無効化し${attackValue}反射。`, "effect");
    damageCharacter(attacker, attackValue, foe, { ignoreDef: true });
    await sleep(IMPACT_SETTLE_DELAY);
    state.busy = previousBusy;
    if (checkGameOver()) return;
    render();
    return;
  }

  log(`${attacker.name} が ${target.type === "lp" ? foe.name + " LP" : target.card.name} に攻撃。`, "attack");
  let killed = false;
  let hpDamage = 0;
  if (target.type === "lp") {
    damageLp(foe, attackValue, attacker.name);
    hpDamage = attackValue;
  } else {
    const result = damageCharacter(target.card, attackValue, owner, {
      ignoreDef: attacker.id === "C28" || atomicFlareActive,
      attacker,
    });
    killed = result.killed;
    hpDamage = result.hpDamage;
    if (target.card?.id === "C30") damageCharacter(attacker, 1, foe, { ignoreDef: true });
    if (target.card?.id === "C40") damageCharacter(attacker, 2, foe, { ignoreDef: true });
    if (attacker.id === "C22" && target.card && !result.killed) buffAtk(target.card, -1);
    if (attacker.id === "C35" && target.card && !result.killed) target.card.currentDef = Math.max(0, target.card.currentDef - 1);
    if (attacker.id === "C34" && hpDamage > 0) drawCard(owner);
  }

  await sleep(IMPACT_SETTLE_DELAY);
  attacker.attacked = true;
  if (!findCardLocation(attacker)) {
    state.busy = previousBusy;
    if (checkGameOver()) return;
    render();
    return;
  }
  afterAttackEffects(attacker, owner, foe, target, killed, hpDamage, { atomicFlareActive });
  state.busy = previousBusy;
  if (checkGameOver()) return;
  render();
}

function afterAttackEffects(attacker, owner, foe, target, killed, hpDamage = 0, effects = {}) {
  boardCards(owner)
    .filter((ally) => ally.id === "C21")
    .forEach((te) => {
      if ((te.heatStacks || 0) < 3) {
        te.heatStacks = (te.heatStacks || 0) + 1;
        buffAtk(te, 1);
      }
    });

  if (attacker.id === "C14") {
    foe.back.filter(Boolean).forEach((enemy) => damageCharacter(enemy, 2, owner, { ignoreDef: false }));
    log("アグニアの残火が後衛にも届いた。", "effect");
  }

  if (attacker.id === "C26") {
    const targetAlly = mostDamagedAlly(owner);
    if (targetAlly) healCharacter(targetAlly, 2);
  }

  if (attacker.id === "C55" && hpDamage > 0 && (attacker.vanguardStacks || 0) < 2) {
    attacker.vanguardStacks = (attacker.vanguardStacks || 0) + 1;
    buffAtk(attacker, 1);
    log("ヴァネッサが切り込みを成功させ、ATK+1。", "effect");
  }

  if (attacker.id === "C56") {
    clearOneStatusFromAlly(owner);
  }

  if (killed) {
    if (attacker.id === "C46" && effects.atomicFlareActive) {
      const blastTargets = foe.back.filter(Boolean);
      blastTargets.forEach((enemy) => damageCharacter(enemy, 2, owner));
      if (blastTargets.length) log("カトリーナのアトミックフレアが着弾点を爆破。", "effect");
    }
    if (attacker.id === "C07") {
      attacker.killCount += 1;
      buffAtk(attacker, 3);
      log("悠久ニィアルが撃破でATK+3。", "effect");
      if (attacker.killCount === 3) {
        boardCards(foe).forEach((enemy) => damageCharacter(enemy, 5, owner));
        damageLp(foe, 5, attacker.name);
        log("3体撃破。伝説の英雄が相手全体へ5ダメージ。", "effect");
      }
    }
    if (attacker.id === "C64" && !attacker.sionReattackUsed) {
      attacker.sionReattackUsed = true;
      attacker.attacked = false;
      log("シオンは排除に成功し、追加攻撃可能。", "effect");
    }
    boardCards(owner)
      .filter((ally) => ally.id === "C10")
      .forEach(() => drawCard(owner));
  }

  if (attacker.id === "C01" && attacker.currentHp <= Math.ceil(attacker.maxHp / 2) && !attacker.extraAttackUsed) {
    attacker.extraAttackUsed = true;
    attacker.attacked = false;
    log("緋山玲奈はHP半分以下で追加攻撃可能。", "effect");
  }
}

function damageCharacter(card, amount, sourcePlayer, options = {}) {
  if (!card || amount <= 0 || state.gameOver) return { killed: false, hpDamage: 0, totalDamage: 0 };
  const owner = state[card.ownerKey];
  let damage = Math.max(0, amount);
  if (card.id === "C03") damage = Math.max(1, damage - 1);

  let hpDamage = 0;
  let totalDamage = 0;
  if (options.ignoreDef) {
    hpDamage = damage;
    totalDamage = hpDamage;
  } else {
    const tempAbsorb = Math.min(card.tempDef, damage);
    card.tempDef -= tempAbsorb;
    damage -= tempAbsorb;
    const defAbsorb = Math.min(card.currentDef, damage);
    card.currentDef -= defAbsorb;
    damage -= defAbsorb;
    hpDamage = damage;
    totalDamage = tempAbsorb + defAbsorb + hpDamage;
  }

  if (hpDamage > 0) {
    card.currentHp -= hpDamage;
    audio.sfx("damage", { ...card, amount: hpDamage, total: totalDamage });
    animateCard(card.instanceId, "shake", `-${hpDamage}`, false, totalDamage);
  } else {
    audio.sfx("guard", { ...card, amount: totalDamage });
    animateCard(card.instanceId, "shake", "DEF", false, totalDamage);
  }

  if (card.currentHp <= 0) {
    if (card.id === "C49" && !card.lastStandUsed) {
      card.lastStandUsed = true;
      card.currentHp = 1;
      audio.sfx("heal", { ...card, amount: 1 });
      animateCard(card.instanceId, "", "+1", true);
      log(`${card.name} は不屈の片翼でHP1になって踏みとどまった。`, "effect");
      return { killed: false, hpDamage, totalDamage };
    }
    destroyCharacter(card, sourcePlayer, options);
    return { killed: true, hpDamage, totalDamage };
  }
  return { killed: false, hpDamage, totalDamage };
}

function destroyCharacter(card, sourcePlayer, options = {}) {
  const owner = state[card.ownerKey];
  const foe = opponentOf(owner);
  const loc = findCardLocation(card);
  if (!loc) return;
  owner[loc.lane][loc.index] = null;
  owner.grave.push(card);
  if (card.id === "C48") removeSerenaBoostFromClaires(owner);
  if (!options.silentDamage) {
    audio.sfx("retreat", card);
    audio.voice(card, "retreat");
    log(`${card.name} は撤退。`, "damage");
  }

  triggerSerenaRetreatHeal(owner, card);

  const returnedByMaria = triggerMariaArcadiaReturn(owner, card);
  if (!returnedByMaria && owner.reviveTrap > 0) {
    owner.reviveTrap -= 1;
    owner.hand.push(createInstance(CARD_DB.get(card.id), owner.key));
    log(`すれ違いの再会で ${card.name} が手札に戻った。`, "effect");
  }

  switch (card.id) {
    case "C09":
      damageLp(foe, 3, card.name);
      break;
    case "C16": {
      const target = randomItem([...boardCards(owner), ...boardCards(foe)]);
      if (target) damageCharacter(target, 3, sourcePlayer || foe, { ignoreDef: true });
      break;
    }
    case "C18": {
      const target = randomItem(boardCards(foe));
      if (target) damageCharacter(target, Math.max(0, effectiveAtk(card)), owner);
      break;
    }
    case "C31": {
      const target = randomItem(boardCards(foe));
      if (target && setStatus(target, "stun", Math.max(target.status.stun, 1))) {
        log(`${target.name} は1ターン行動不能。`, "effect");
      }
      break;
    }
    case "C37": {
      const target = randomItem(boardCards(owner));
      if (target) buffAtk(target, 2);
      break;
    }
    default:
      break;
  }
}

function damageLp(player, amount, source) {
  if (amount <= 0 || state.gameOver) return;
  player.lp = Math.max(0, player.lp - amount);
  audio.sfx("lpDamage", { amount });
  log(`${player.name} LPに${amount}ダメージ${source ? `（${source}）` : ""}。`, "damage");
  const lpButton = player.key === "ai" ? qs("#opponentLpTarget") : qs("#playerLpTarget");
  if (lpButton) {
    lpButton.classList.remove("shake");
    void lpButton.offsetWidth;
    lpButton.classList.add("shake");
    addFloatingPop(lpButton, `-${amount}`, false, amount);
  }
}

function healLp(player, amount, source) {
  if (amount <= 0 || state.gameOver) return;
  const before = player.lp;
  player.lp = Math.min(MAX_LP, player.lp + amount);
  const gained = player.lp - before;
  if (gained <= 0) return;
  audio.sfx("heal", { amount: gained });
  log(`${player.name} LPを${gained}回復${source ? `（${source}）` : ""}。`, "effect");
  const lpButton = player.key === "ai" ? qs("#opponentLpTarget") : qs("#playerLpTarget");
  if (lpButton) addFloatingPop(lpButton, `+${gained}`, true);
}

function healCharacter(card, amount) {
  if (!card || card.noHeal || amount <= 0) return;
  const before = card.currentHp;
  card.currentHp = Math.min(card.maxHp, card.currentHp + amount);
  const gained = card.currentHp - before;
  if (gained > 0) {
    audio.sfx("heal", { ...card, amount: gained });
    animateCard(card.instanceId, "", `+${gained}`, true);
  }
}

function healDef(card, amount) {
  if (!card || amount <= 0) return;
  card.currentDef = Math.min(card.maxDef, card.currentDef + amount);
}

function buffAtk(card, amount) {
  if (!card || !Number.isFinite(amount)) return;
  const multiplier = card.id === "C24" && hasBoardCard(state[card.ownerKey], "C23") && amount > 0 ? 2 : 1;
  card.currentAtk = Math.max(0, card.currentAtk + amount * multiplier);
}

function buffDef(card, amount) {
  if (!card || !Number.isFinite(amount)) return;
  const multiplier = card.id === "C24" && hasBoardCard(state[card.ownerKey], "C23") && amount > 0 ? 2 : 1;
  const actual = amount * multiplier;
  if (actual > 0) card.maxDef += actual;
  card.currentDef = Math.max(0, card.currentDef + actual);
}

function buffMaxHp(card, amount) {
  if (!card || amount <= 0) return;
  const multiplier = card.id === "C24" && hasBoardCard(state[card.ownerKey], "C23") ? 2 : 1;
  card.maxHp += amount * multiplier;
  card.currentHp += amount * multiplier;
}

function decrementStatuses(card) {
  ["stun", "guardOff", "silenced"].forEach((key) => {
    if (card.status[key] > 0) card.status[key] -= 1;
  });
  if (card.status.bind > 0) {
    card.status.bind -= 1;
    if (card.status.bind === 0) {
      const source = opponentOf(state[card.ownerKey]);
      damageCharacter(card, 2, source, { ignoreDef: true });
      log(`${card.name} の束縛が解け、2ダメージ。`, "effect");
    }
  }
}

function canAttack(card, player) {
  if (!card || player.key !== state.current || state.phase !== "battle") return false;
  if (!player.front.includes(card)) return false;
  if (card.attacked || card.status.stun > 0) return false;
  if (card.dormant && !card.awakened) return false;
  if (effectiveAtk(card) <= 0) return false;
  const ready = card.haste || player.turns > card.summonedOnTurn;
  return ready && getLegalTargets(card, player).length > 0;
}

function getLegalTargets(attacker, owner) {
  const foe = opponentOf(owner);
  const guards = activeGuards(foe);
  if (guards.length) return guards.map((card) => ({ type: "card", card }));
  const targets = boardCards(foe).map((card) => ({ type: "card", card }));
  if (!isSummonTurnHasteAttack(attacker, owner)) {
    targets.push({ type: "lp", player: foe });
  }
  return targets;
}

function isSummonTurnHasteAttack(card, player) {
  return Boolean(card?.haste && player && player.turns === card.summonedOnTurn);
}

function activeGuards(player) {
  return player.front
    .filter(Boolean)
    .filter((card) => card.tags?.includes("guard") && card.status.guardOff <= 0 && card.status.stun <= 0);
}

function effectiveCost(card, player) {
  const foe = opponentOf(player);
  let cost = card.cost || 0;
  if (card.costReduction) cost -= card.costReduction;
  if (card.kind === "character" && player?.bannerTurns > 0) cost -= 1;
  if (card.kind === "support" && foe && (hasBoardCard(foe, "C23") || hasBoardCard(foe, "C63"))) cost += 1;
  return Math.max(0, cost);
}

function effectiveAtk(card) {
  return Math.max(0, (card.currentAtk || 0) + (card.tempAtk || 0) + alyusTirisNiallBonus(card));
}

function alyusTirisNiallBonus(card) {
  if (card?.id !== "C26" || card.status?.silenced > 0) return 0;
  const owner = state?.[card.ownerKey];
  if (!owner) return 0;
  return hasBoardCard(owner, "C07") ? 2 : 0;
}

function effectiveDef(card) {
  return Math.max(0, (card.currentDef || 0) + (card.tempDef || 0));
}

function isValidLane(card, lane) {
  if (card.backOnly && lane === "front") return false;
  return lane === "front" || lane === "back";
}

function canPay(player, card) {
  return player.energy >= effectiveCost(card, player);
}

function boardCards(player) {
  return [...player.front, ...player.back].filter(Boolean);
}

function hasBoardCard(player, id) {
  return boardCards(player).some((card) => card.id === id);
}

function opponentOf(player) {
  return player.key === "player" ? state.ai : state.player;
}

function findCardLocation(card) {
  const owner = state[card.ownerKey];
  for (const lane of ["front", "back"]) {
    const index = owner[lane].findIndex((candidate) => candidate === card);
    if (index >= 0) return { owner: owner.key, lane, index };
  }
  return null;
}

function findCardByInstance(instanceId) {
  return [...boardCards(state.player), ...boardCards(state.ai), ...state.player.hand, ...state.ai.hand].find(
    (card) => card.instanceId === instanceId,
  );
}

function mostDamagedAlly(player) {
  return boardCards(player)
    .filter((ally) => ally.currentHp < ally.maxHp && !ally.noHeal)
    .sort((a, b) => a.currentHp / a.maxHp - b.currentHp / b.maxHp)[0];
}

function mostDamagedDefAlly(player) {
  return boardCards(player)
    .filter((ally) => ally.currentDef < ally.maxDef)
    .sort((a, b) => a.currentDef / Math.max(1, a.maxDef) - b.currentDef / Math.max(1, b.maxDef))[0];
}

function strongestAlly(player, exclude = null) {
  return boardCards(player)
    .filter((ally) => ally !== exclude)
    .sort((a, b) => effectiveAtk(b) - effectiveAtk(a))[0];
}

function revealRandomHand(targetPlayer, viewer) {
  const card = randomItem(targetPlayer.hand);
  if (!card) return;
  const visibleName = viewer.key === "player" ? card.name : "手札1枚";
  log(`${viewer.name} は ${targetPlayer.name} の${visibleName}を確認。`, "effect");
}

function checkGameOver() {
  if (state.gameOver) return true;
  if (state.ai.lp <= 0 || state.player.lp <= 0) {
    state.gameOver = true;
    state.phase = "gameover";
    const playerWon = state.ai.lp <= 0;
    audio.sfx(playerWon ? "win" : "lose");
    audio.speak(playerWon ? "勝利" : "敗北");
    log(playerWon ? "<strong>勝利！</strong> 相手LPを0にした。" : "<strong>敗北。</strong> プレイヤーLPが0になった。", "system");
    render();
    giveRewards(playerWon);
    return true;
  }
  return false;
}

function giveRewards(playerWon) {
  if (state.rewardsGiven) return;
  state.rewardsGiven = true;
  if (playerWon) {
    const previousLevel = state.aiProfile?.level || aiProfileForWins(state.freeplayWins).level;
    const wins = addFreeplayWin();
    const nextProfile = aiProfileForWins(wins);
    state.freeplayWins = wins;
    log(`フリープレイ勝利数 ${wins}/${FREEPLAY_MAX_WINS}。`, "system");
    if (nextProfile.level > previousLevel) {
      log(`AI Lv.${nextProfile.level}「${nextProfile.name}」が次のDUEL STARTから解放。`, "system");
    }
  }
  const rewards = Array.from({ length: REWARD_CARD_COUNT }, () => randomRewardCard());
  const collection = loadCollection();
  rewards.forEach((card) => {
    collection[card.id] = (collection[card.id] || 0) + 1;
  });
  saveCollection(collection);
  qs("#rewardTitle").textContent = playerWon ? `勝利報酬 ${REWARD_CARD_COUNT}枚獲得` : `対戦報酬 ${REWARD_CARD_COUNT}枚獲得`;
  qs("#rewardCards").innerHTML = rewards.map((card) => renderCard(createInstance(card, "player"), { inReward: true })).join("");
  qs("#rewardModal").classList.remove("hidden");
  const topReward = rewards.reduce((best, card) => (RARITY_ORDER[card.rarity] > RARITY_ORDER[best.rarity] ? card : best), rewards[0]);
  if (topReward && RARITY_ORDER[topReward.rarity] >= RARITY_ORDER.SR) {
    window.setTimeout(() => audio.sfx("reward", topReward), 360);
  }
  renderHud();
  renderLog();
  renderCollectionSummary();
}

function randomRewardCard() {
  const pool = [];
  ALL_CARDS.forEach((card) => {
    const weight = { UR: 3, SR: 6, R: 14, C: 28 }[card.rarity] || 12;
    for (let i = 0; i < weight; i += 1) pool.push(card);
  });
  return randomItem(pool);
}

function loadCollection() {
  try {
    return JSON.parse(localStorage.getItem("crossover-duel-collection") || "{}");
  } catch {
    return {};
  }
}

function saveCollection(collection) {
  localStorage.setItem("crossover-duel-collection", JSON.stringify(collection));
}

function loadExchangePoints() {
  try {
    const points = Number.parseInt(localStorage.getItem(CARD_EXCHANGE_POINT_STORAGE_KEY) || "0", 10);
    return Number.isFinite(points) ? Math.max(0, points) : 0;
  } catch {
    return 0;
  }
}

function saveExchangePoints(points) {
  const normalized = Math.max(0, Number.parseInt(points, 10) || 0);
  localStorage.setItem(CARD_EXCHANGE_POINT_STORAGE_KEY, String(normalized));
  return normalized;
}

function cardPointValue(card) {
  return CARD_POINT_VALUES[card?.rarity] || 0;
}

function cardPointCost(card) {
  return CARD_POINT_COSTS[card?.rarity] || 9999;
}

function deckCopyLimitForCard(card) {
  return card?.rarity === "UR" ? 1 : 2;
}

function deckAllowedCopies(cardId, owned = loadOwnedCollection()) {
  const card = CARD_DB.get(cardId);
  if (!card) return 0;
  return Math.min(Math.max(0, Number(owned[cardId]) || 0), deckCopyLimitForCard(card));
}

function loadOwnedCollection() {
  const owned = countBy(PLAYER_DECK, (id) => id);
  const rewards = loadCollection();
  Object.entries(rewards).forEach(([id, count]) => {
    if (!CARD_DB.has(id)) return;
    owned[id] = (owned[id] || 0) + Math.max(0, Number(count) || 0);
  });
  return owned;
}

function isValidDeckIds(deckIds, owned = loadOwnedCollection()) {
  if (!Array.isArray(deckIds) || deckIds.length !== PLAYER_DECK_SIZE) return false;
  const deckCounts = countBy(deckIds, (id) => id);
  return Object.entries(deckCounts).every(([id, count]) => CARD_DB.has(id) && count <= deckAllowedCopies(id, owned));
}

function deckValidationMessage(deckIds, owned = loadOwnedCollection()) {
  if (!Array.isArray(deckIds)) return "デッキ内容を確認してください。";
  if (deckIds.length !== PLAYER_DECK_SIZE) {
    const remaining = PLAYER_DECK_SIZE - deckIds.length;
    return remaining > 0 ? `${remaining}枚追加できます。` : `${PLAYER_DECK_SIZE}枚ちょうどで保存できます。`;
  }
  const deckCounts = countBy(deckIds, (id) => id);
  for (const [id, count] of Object.entries(deckCounts)) {
    const card = CARD_DB.get(id);
    if (!card) return "登録できないカードが含まれています。";
    const ownedCount = Math.max(0, Number(owned[id]) || 0);
    if (count > ownedCount) return `${card.name} の所持枚数が足りません。`;
    const copyLimit = deckCopyLimitForCard(card);
    if (count > copyLimit) return `${card.name} はデッキに${copyLimit}枚まで入れられます。`;
  }
  return "デッキ内容を確認してください。";
}

function normalizeDeckSlot(slot) {
  const normalized = Number.parseInt(slot, 10);
  if (!Number.isFinite(normalized)) return 1;
  return Math.min(PLAYER_DECK_SLOT_COUNT, Math.max(1, normalized));
}

function buildDefaultPlayerDeckSlots() {
  return Array.from({ length: PLAYER_DECK_SLOT_COUNT }, () => [...PLAYER_DECK]);
}

function loadActiveDeckSlot() {
  try {
    return normalizeDeckSlot(localStorage.getItem(PLAYER_DECK_ACTIVE_SLOT_STORAGE_KEY) || "1");
  } catch {
    return 1;
  }
}

function saveActiveDeckSlot(slot) {
  const normalized = normalizeDeckSlot(slot);
  try {
    localStorage.setItem(PLAYER_DECK_ACTIVE_SLOT_STORAGE_KEY, String(normalized));
  } catch {
    // The active in-memory slot still works if localStorage is temporarily unavailable.
  }
  activeDeckSlot = normalized;
  return normalized;
}

function loadLegacyPlayerDeckIds(owned = loadOwnedCollection()) {
  try {
    const saved = JSON.parse(localStorage.getItem(PLAYER_DECK_STORAGE_KEY) || "null");
    if (isValidDeckIds(saved, owned)) return [...saved];
  } catch {
    // Fall back to the starter deck when local storage has stale data.
  }
  return null;
}

function normalizeStoredDeckSlots(rawSlots, owned = loadOwnedCollection()) {
  const slots = buildDefaultPlayerDeckSlots();
  let hasStoredSlots = false;
  if (Array.isArray(rawSlots)) {
    rawSlots.slice(0, PLAYER_DECK_SLOT_COUNT).forEach((deckIds, index) => {
      hasStoredSlots = true;
      if (isValidDeckIds(deckIds, owned)) slots[index] = [...deckIds];
    });
    return hasStoredSlots ? slots : null;
  }
  if (rawSlots && typeof rawSlots === "object") {
    for (let slot = 1; slot <= PLAYER_DECK_SLOT_COUNT; slot += 1) {
      const deckIds = rawSlots[String(slot)];
      if (deckIds === undefined) continue;
      hasStoredSlots = true;
      if (isValidDeckIds(deckIds, owned)) slots[slot - 1] = [...deckIds];
    }
    return hasStoredSlots ? slots : null;
  }
  return null;
}

function loadPlayerDeckSlots(owned = loadOwnedCollection()) {
  try {
    const storedSlots = normalizeStoredDeckSlots(JSON.parse(localStorage.getItem(PLAYER_DECK_SLOTS_STORAGE_KEY) || "null"), owned);
    if (storedSlots) return storedSlots;
  } catch {
    // Old or malformed slot saves fall through to the legacy single-deck save.
  }
  const slots = buildDefaultPlayerDeckSlots();
  const legacyDeck = loadLegacyPlayerDeckIds(owned);
  if (legacyDeck) slots[0] = legacyDeck;
  return slots;
}

function savePlayerDeckSlots(deckSlots, slot = activeDeckSlot) {
  const owned = loadOwnedCollection();
  const normalizedSlot = saveActiveDeckSlot(slot);
  const normalizedSlots = normalizeStoredDeckSlots(deckSlots, owned) || buildDefaultPlayerDeckSlots();
  localStorage.setItem(PLAYER_DECK_SLOTS_STORAGE_KEY, JSON.stringify(normalizedSlots));
  localStorage.setItem(PLAYER_DECK_STORAGE_KEY, JSON.stringify(normalizedSlots[normalizedSlot - 1]));
  return normalizedSlots;
}

function loadPlayerDeckIds(slot = loadActiveDeckSlot()) {
  const slots = loadPlayerDeckSlots();
  return [...slots[normalizeDeckSlot(slot) - 1]];
}

function savePlayerDeckIds(deckIds, slot = activeDeckSlot) {
  if (!isValidDeckIds(deckIds)) return false;
  const normalizedSlot = normalizeDeckSlot(slot);
  const slots = loadPlayerDeckSlots();
  slots[normalizedSlot - 1] = [...deckIds];
  savePlayerDeckSlots(slots, normalizedSlot);
  return true;
}

function maxDeckCounts(deckLists) {
  const maxCounts = {};
  deckLists.forEach((deckIds) => {
    const deckCounts = countBy(deckIds, (id) => id);
    Object.entries(deckCounts).forEach(([id, count]) => {
      maxCounts[id] = Math.max(maxCounts[id] || 0, count);
    });
  });
  return maxCounts;
}

function loadSavedDeckSlotCounts(owned = loadOwnedCollection()) {
  return maxDeckCounts(loadPlayerDeckSlots(owned));
}

function deckIdsHaveSameCounts(leftDeckIds, rightDeckIds) {
  if (!Array.isArray(leftDeckIds) || !Array.isArray(rightDeckIds) || leftDeckIds.length !== rightDeckIds.length) return false;
  const leftCounts = countBy(leftDeckIds, (id) => id);
  const rightCounts = countBy(rightDeckIds, (id) => id);
  const ids = new Set([...Object.keys(leftCounts), ...Object.keys(rightCounts)]);
  return [...ids].every((id) => leftCounts[id] === rightCounts[id]);
}

function isDeckEditorDirty() {
  return !deckIdsHaveSameCounts(deckEditorIds, loadPlayerDeckIds(activeDeckSlot));
}

function loadFreeplayWins() {
  const wins = Number.parseInt(localStorage.getItem(FREEPLAY_WIN_STORAGE_KEY) || "0", 10);
  return Number.isFinite(wins) ? Math.max(0, wins) : 0;
}

function saveFreeplayWins(wins) {
  const normalizedWins = Math.max(0, Number.parseInt(wins, 10) || 0);
  localStorage.setItem(FREEPLAY_WIN_STORAGE_KEY, String(normalizedWins));
  return normalizedWins;
}

function addFreeplayWin() {
  return saveFreeplayWins(loadFreeplayWins() + 1);
}

function loadBattleBgmStyle() {
  try {
    return localStorage.getItem(BATTLE_BGM_STYLE_STORAGE_KEY) === "jazz" ? "jazz" : "standard";
  } catch {
    return "standard";
  }
}

function saveBattleBgmStyle(style) {
  battleBgmStyle = style === "jazz" ? "jazz" : "standard";
  try {
    localStorage.setItem(BATTLE_BGM_STYLE_STORAGE_KEY, battleBgmStyle);
  } catch {
    // Storage can be unavailable in some browser privacy modes.
  }
  updateBattleBgmStyleButton();
  audio.updateMusic();
}

function toggleBattleBgmStyle() {
  saveBattleBgmStyle(battleBgmStyle === "jazz" ? "standard" : "jazz");
}

function normalizeTransferCount(value, max = 999999) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) return 0;
  return Math.min(max, Math.max(0, number));
}

function normalizeCollectionForTransfer(collection) {
  if (!collection || typeof collection !== "object" || Array.isArray(collection)) return {};
  return Object.keys(collection)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .reduce((normalized, id) => {
      const count = normalizeTransferCount(collection[id]);
      if (CARD_DB.has(id) && count > 0) normalized[id] = count;
      return normalized;
    }, {});
}

function ownedCollectionFromRewardCollection(collection) {
  const owned = countBy(PLAYER_DECK, (id) => id);
  Object.entries(collection).forEach(([id, count]) => {
    if (CARD_DB.has(id)) owned[id] = (owned[id] || 0) + normalizeTransferCount(count);
  });
  return owned;
}

function normalizeTransferDeckSlots(rawSlots, fallbackDeckIds, owned) {
  const slots = buildDefaultPlayerDeckSlots();
  let hasDeckSlots = false;
  const setSlot = (deckIds, index) => {
    hasDeckSlots = true;
    if (!isValidDeckIds(deckIds, owned)) {
      throw new Error(`デッキ${index + 1}の内容が現在のカードDB、所持カード、または投入上限と一致しません。`);
    }
    slots[index] = [...deckIds];
  };

  if (Array.isArray(rawSlots)) {
    rawSlots.slice(0, PLAYER_DECK_SLOT_COUNT).forEach((deckIds, index) => setSlot(deckIds, index));
  } else if (rawSlots && typeof rawSlots === "object") {
    for (let slot = 1; slot <= PLAYER_DECK_SLOT_COUNT; slot += 1) {
      const deckIds = rawSlots[String(slot)];
      if (deckIds !== undefined) setSlot(deckIds, slot - 1);
    }
  }

  if (!hasDeckSlots) slots[0] = [...fallbackDeckIds];
  return slots;
}

function normalizeTransferPayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("移行データの形式が正しくありません。");
  }
  const collection = normalizeCollectionForTransfer(payload.collection);
  const playerDeckIds = Array.isArray(payload.playerDeckIds) ? payload.playerDeckIds.filter((id) => typeof id === "string") : [...PLAYER_DECK];
  const owned = ownedCollectionFromRewardCollection(collection);
  if (!isValidDeckIds(playerDeckIds, owned)) {
    throw new Error("デッキ内容が現在のカードDB、所持カード、または投入上限と一致しません。");
  }
  const deckSlots = normalizeTransferDeckSlots(payload.deckSlots, playerDeckIds, owned);
  const activeSlot = normalizeDeckSlot(payload.activeDeckSlot || 1);
  return {
    storageVersion: SIGNED_EXPORT_VERSION,
    exportedFrom: typeof payload.exportedFrom === "string" ? payload.exportedFrom : "unknown",
    collection,
    exchangePoints: normalizeTransferCount(payload.exchangePoints),
    freeplayWins: normalizeTransferCount(payload.freeplayWins),
    playerDeckIds: [...deckSlots[activeSlot - 1]],
    deckSlots,
    activeDeckSlot: activeSlot,
    battleBgmStyle: payload.battleBgmStyle === "jazz" ? "jazz" : "standard",
  };
}

function buildTransferPayload() {
  return normalizeTransferPayload({
    exportedFrom: "CROSSOVER DUEL",
    collection: loadCollection(),
    exchangePoints: loadExchangePoints(),
    freeplayWins: loadFreeplayWins(),
    playerDeckIds: loadPlayerDeckIds(),
    deckSlots: loadPlayerDeckSlots(),
    activeDeckSlot: loadActiveDeckSlot(),
    battleBgmStyle: loadBattleBgmStyle(),
  });
}

function stableJsonStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((item) => stableJsonStringify(item)).join(",")}]`;
  return `{${Object.keys(value)
    .filter((key) => value[key] !== undefined)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableJsonStringify(value[key])}`)
    .join(",")}}`;
}

function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function base64ToBytes(value) {
  const binary = atob(String(value || ""));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function assertTransferCryptoAvailable() {
  if (!window.crypto?.subtle || !window.crypto?.getRandomValues) {
    throw new Error("このブラウザでは署名機能を利用できません。");
  }
}

async function deriveTransferSigningKey(passphrase, salt, iterations) {
  const encoder = new TextEncoder();
  const baseKey = await window.crypto.subtle.importKey("raw", encoder.encode(passphrase), "PBKDF2", false, ["deriveKey"]);
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-256",
    },
    baseKey,
    {
      name: "HMAC",
      hash: "SHA-256",
      length: 256,
    },
    false,
    ["sign", "verify"],
  );
}

async function signTransferObject(unsignedPackage, passphrase) {
  const salt = base64ToBytes(unsignedPackage.kdf.salt);
  const iterations = normalizeTransferCount(unsignedPackage.kdf.iterations, 1000000);
  const key = await deriveTransferSigningKey(passphrase, salt, iterations);
  const data = new TextEncoder().encode(stableJsonStringify(unsignedPackage));
  const signature = await window.crypto.subtle.sign("HMAC", key, data);
  return bytesToBase64(new Uint8Array(signature));
}

async function verifyTransferObject(packageData, passphrase) {
  if (!packageData || typeof packageData !== "object" || Array.isArray(packageData)) {
    throw new Error("移行データの形式が正しくありません。");
  }
  if (packageData.format !== SIGNED_EXPORT_FORMAT || packageData.version !== SIGNED_EXPORT_VERSION) {
    throw new Error("対応していない移行データです。");
  }
  if (packageData.algorithm !== "HMAC-SHA-256" || packageData.kdf?.name !== "PBKDF2") {
    throw new Error("署名方式が一致しません。");
  }
  const signature = base64ToBytes(packageData.signature);
  const unsignedPackage = { ...packageData };
  delete unsignedPackage.signature;
  const salt = base64ToBytes(unsignedPackage.kdf.salt);
  const iterations = normalizeTransferCount(unsignedPackage.kdf.iterations, 1000000);
  const key = await deriveTransferSigningKey(passphrase, salt, iterations);
  const data = new TextEncoder().encode(stableJsonStringify(unsignedPackage));
  const verified = await window.crypto.subtle.verify("HMAC", key, signature, data);
  if (!verified) throw new Error("署名が一致しません。ファイルまたは署名キーが違います。");
  return normalizeTransferPayload(packageData.payload);
}

async function createCardCatalogHash() {
  const catalog = ALL_CARDS.map((card) => ({
    id: card.id,
    name: card.name,
    rarity: card.rarity,
    kind: card.kind,
  }));
  const digest = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(stableJsonStringify(catalog)));
  return bytesToBase64(new Uint8Array(digest));
}

async function createSignedTransferPackage(passphrase) {
  assertTransferCryptoAvailable();
  const salt = new Uint8Array(16);
  window.crypto.getRandomValues(salt);
  const unsignedPackage = {
    format: SIGNED_EXPORT_FORMAT,
    version: SIGNED_EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    app: {
      name: "CROSSOVER DUEL",
      cardCount: ALL_CARDS.length,
      cardCatalogHash: await createCardCatalogHash(),
    },
    algorithm: "HMAC-SHA-256",
    kdf: {
      name: "PBKDF2",
      hash: "SHA-256",
      iterations: SIGNED_EXPORT_KDF_ITERATIONS,
      salt: bytesToBase64(salt),
    },
    payload: buildTransferPayload(),
  };
  return {
    ...unsignedPackage,
    signature: await signTransferObject(unsignedPackage, passphrase),
  };
}

function applyTransferPayload(payload) {
  const normalized = normalizeTransferPayload(payload);
  saveCollection(normalized.collection);
  saveExchangePoints(normalized.exchangePoints);
  saveFreeplayWins(normalized.freeplayWins);
  if (!savePlayerDeckSlots(normalized.deckSlots, normalized.activeDeckSlot)) {
    throw new Error("デッキを保存できませんでした。");
  }
  saveBattleBgmStyle(normalized.battleBgmStyle);
  return normalized;
}

function refreshAfterTransferImport() {
  activeDeckSlot = loadActiveDeckSlot();
  battleBgmStyle = loadBattleBgmStyle();
  updateBattleBgmStyleButton();
  if (!qs("#deckEditor")?.classList.contains("hidden")) {
    deckEditorIds = loadPlayerDeckIds();
    renderDeckEditor("署名を検証してインポートしました。", true);
  }
  if (!qs("#galleryView")?.classList.contains("hidden")) renderGallery();
  if (state) {
    state.freeplayWins = loadFreeplayWins();
    render();
  } else {
    renderCollectionSummary();
  }
}

function requireTransferPassphrase() {
  const passphrase = qs("#dataTransferPassphrase")?.value || "";
  if (passphrase.length < SIGNED_EXPORT_MIN_KEY_LENGTH) {
    throw new Error(`署名キーは${SIGNED_EXPORT_MIN_KEY_LENGTH}文字以上で入力してください。`);
  }
  return passphrase;
}

function setDataTransferStatus(message, kind = "") {
  const status = qs("#dataTransferStatus");
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("is-error", kind === "error");
  status.classList.toggle("is-ready", kind === "ready");
}

function setDataTransferBusy(busy) {
  ["#exportSignedDataBtn", "#importSignedDataBtn"].forEach((selector) => {
    const button = qs(selector);
    if (button) button.disabled = busy;
  });
  qs("#dataTransferModal")?.setAttribute("aria-busy", String(busy));
}

function downloadTransferPackage(packageData) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const blob = new Blob([JSON.stringify(packageData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `crossover-duel-signed-export-${timestamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function handleSignedDataExport() {
  setDataTransferBusy(true);
  try {
    const passphrase = requireTransferPassphrase();
    const packageData = await createSignedTransferPackage(passphrase);
    downloadTransferPackage(packageData);
    setDataTransferStatus("署名付きデータを書き出しました。", "ready");
  } catch (error) {
    setDataTransferStatus(error.message || "エクスポートに失敗しました。", "error");
  } finally {
    setDataTransferBusy(false);
  }
}

function handleSignedDataImportRequest() {
  try {
    assertTransferCryptoAvailable();
    requireTransferPassphrase();
    qs("#signedDataFileInput")?.click();
  } catch (error) {
    setDataTransferStatus(error.message || "インポートを開始できません。", "error");
  }
}

async function handleSignedDataImportFile(event) {
  const input = event.currentTarget;
  const file = input.files?.[0];
  if (!file) return;
  setDataTransferBusy(true);
  try {
    const passphrase = requireTransferPassphrase();
    const packageData = JSON.parse(await file.text());
    const payload = await verifyTransferObject(packageData, passphrase);
    if (!window.confirm("署名を検証したデータで現在の保存データを上書きします。")) return;
    applyTransferPayload(payload);
    refreshAfterTransferImport();
    setDataTransferStatus("インポートしました。次のDUEL STARTからデッキと進行が反映されます。", "ready");
  } catch (error) {
    setDataTransferStatus(error.message || "インポートに失敗しました。", "error");
  } finally {
    input.value = "";
    setDataTransferBusy(false);
  }
}

function updateBattleBgmStyleButton() {
  const button = qs("#battleBgmStyleBtn");
  if (!button) return;
  const jazz = battleBgmStyle === "jazz";
  button.textContent = jazz ? "JAZZ" : "STD";
  button.classList.toggle("is-on", jazz);
  button.title = jazz ? "戦闘BGM: JAZZ版" : "戦闘BGM: 通常版";
}

function aiProfileForWins(wins = loadFreeplayWins()) {
  const normalizedWins = Math.max(0, Number.parseInt(wins, 10) || 0);
  for (let index = AI_DECKS.length - 1; index >= 0; index -= 1) {
    if (normalizedWins >= AI_DECKS[index].wins) return AI_DECKS[index];
  }
  return AI_DECKS[0];
}

function unlockedAiProfiles(wins = loadFreeplayWins()) {
  const normalizedWins = Math.max(0, Number.parseInt(wins, 10) || 0);
  const unlocked = AI_DECKS.filter((profile) => normalizedWins >= profile.wins);
  return unlocked.length ? unlocked : [AI_DECKS[0]];
}

function aiProfileForLevel(level) {
  const normalizedLevel = Number.parseInt(level, 10);
  return AI_DECKS.find((profile) => profile.level === normalizedLevel) || aiProfileForWins();
}

function openLevelSelect() {
  activeScreen = "title";
  qs("#rewardModal")?.classList.add("hidden");
  renderLevelSelect();
  qs("#levelSelectModal")?.classList.remove("hidden");
}

function closeLevelSelect() {
  qs("#levelSelectModal")?.classList.add("hidden");
}

function renderLevelSelect() {
  const wins = loadFreeplayWins();
  const unlocked = unlockedAiProfiles(wins);
  const latest = unlocked[unlocked.length - 1];
  qs("#levelSelectSummary").textContent = `Wins ${Math.min(wins, FREEPLAY_MAX_WINS)}/${FREEPLAY_MAX_WINS} / Lv.${latest.level}まで選択可能`;
  qs("#levelSelectList").innerHTML = unlocked.map((profile) => renderLevelSelectButton(profile, profile.level === latest.level)).join("");
}

function renderLevelSelectButton(profile, latest = false) {
  const curve = summarizeDeckCurve(profile.deck);
  return `
    <button class="level-select-button ${latest ? "is-latest" : ""}" type="button" data-ai-level="${profile.level}">
      <span>AI Lv.${profile.level}${latest ? " / 最新" : ""}</span>
      <strong>${escapeHtml(profile.name)}</strong>
      <small class="level-select-concept">${escapeHtml(profile.concept || "")}</small>
      <span class="level-select-curve">${escapeHtml(curve)}</span>
      <small>解放条件 ${profile.wins}勝</small>
    </button>
  `;
}

function summarizeDeckCurve(deckIds) {
  const counts = deckIds.reduce(
    (acc, id) => {
      const cost = CARD_DB.get(id)?.cost || 0;
      if (cost <= 2) acc.low += 1;
      else if (cost === 3) acc.mid += 1;
      else acc.high += 1;
      return acc;
    },
    { low: 0, mid: 0, high: 0 },
  );
  return `低${counts.low} / 中${counts.mid} / 高${counts.high}`;
}

function openDeckEditor() {
  activeScreen = "deckEdit";
  activeDeckSlot = loadActiveDeckSlot();
  deckEditorIds = loadPlayerDeckIds(activeDeckSlot);
  qs("#deckEditor").classList.remove("hidden");
  renderDeckEditor();
  audio.updateMusic();
}

function closeDeckEditor() {
  if (activeScreen === "deckEdit") activeScreen = "title";
  qs("#deckEditor").classList.add("hidden");
  hideSkillPopup();
  audio.updateMusic();
}

function openGallery() {
  activeScreen = "gallery";
  galleryMusicTrack = BGM_TRACKS[audio.musicTrack] ? audio.musicTrack : galleryMusicTrack;
  qs("#galleryView").classList.remove("hidden");
  renderGallery();
  audio.updateMusic();
}

function closeGallery() {
  if (activeScreen === "gallery") activeScreen = "title";
  qs("#galleryView").classList.add("hidden");
  hideSkillPopup();
  audio.updateMusic();
}

function openOpeningMovie() {
  const modal = qs("#openingMovieModal");
  const frame = qs("#openingMovieFrame");
  audio.stopMusic();
  modal.classList.remove("hidden");
  frame.src = frame.dataset.src;
}

function closeOpeningMovie() {
  const modal = qs("#openingMovieModal");
  const frame = qs("#openingMovieFrame");
  frame.src = "";
  modal.classList.add("hidden");
  audio.updateMusic();
}

function openHowToPlay() {
  qs("#howToPlayModal")?.classList.remove("hidden");
}

function closeHowToPlay() {
  qs("#howToPlayModal")?.classList.add("hidden");
}

function openDataTransfer() {
  setDataTransferStatus("");
  qs("#dataTransferModal")?.classList.remove("hidden");
  qs("#dataTransferPassphrase")?.focus();
}

function closeDataTransfer() {
  qs("#dataTransferModal")?.classList.add("hidden");
}

function openNewGameConfirm() {
  hideSkillPopup();
  closeHandDock();
  qs("#newGameConfirmModal")?.classList.remove("hidden");
  qs("#cancelNewGameBtn")?.focus();
}

function closeNewGameConfirm() {
  qs("#newGameConfirmModal")?.classList.add("hidden");
}

function confirmNewGameRestart() {
  closeNewGameConfirm();
  qs("#rewardModal")?.classList.add("hidden");
  startNewGame(state?.aiProfile || null);
}

function ownedGalleryCards() {
  const owned = loadOwnedCollection();
  return Object.entries(owned)
    .filter(([id, count]) => CARD_DB.has(id) && Number(count) > 0)
    .map(([id, count]) => ({ card: CARD_DB.get(id), count: Number(count) || 0 }))
    .sort((a, b) => compareCards(a.card, b.card));
}

function renderGallery() {
  const ownedCards = ownedGalleryCards();
  const selected = ownedCards.find(({ card }) => card.id === gallerySelectedCardId) || ownedCards[0];
  if (selected) gallerySelectedCardId = selected.card.id;
  qs("#galleryOwnedCount").textContent = `${ownedCards.length}/${ALL_CARDS.length}`;
  qs("#galleryCardStage").innerHTML = selected ? renderGalleryStage(selected.card, selected.count) : '<p class="deck-empty">所持カードがありません。</p>';
  qs("#galleryCardGrid").innerHTML = ownedCards.map(({ card, count }) => renderGalleryCardButton(card, count, card.id === gallerySelectedCardId)).join("");
  renderGalleryBgmList();
}

function renderGalleryStage(card, count) {
  const typeLine = card.kind === "support" ? card.supportType : ROLE_LABELS[card.role];
  const statsLine =
    card.kind === "support"
      ? `Cost ${card.cost} / ${card.supportType}`
      : `Cost ${card.cost} / ATK ${card.atk} / DEF ${card.def} / HP ${card.hp}`;
  return `
    <div class="gallery-card-preview">
      <img src="assets/cards/${card.id}.png" alt="${escapeHtml(card.name)}" />
    </div>
    <div class="gallery-card-info">
      <div class="inspect-title">
        <h2>${escapeHtml(card.name)}</h2>
        <span class="tag">${card.rarity}</span>
      </div>
      <div class="inspect-meta">
        <span class="tag muted">${escapeHtml(card.no)}</span>
        <span class="tag muted">${escapeHtml(card.element || "無")}</span>
        <span class="tag muted">${escapeHtml(typeLine)}</span>
        <span class="tag muted">所持 ${count}</span>
      </div>
      <p class="inspect-text"><strong>${escapeHtml(card.skill)}</strong><br>${escapeHtml(card.text)}</p>
      <p class="inspect-text">${escapeHtml(statsLine)}</p>
    </div>
  `;
}

function renderGalleryCardButton(card, count, selected) {
  const color = ELEMENT_COLORS[card.element || "無"] || ELEMENT_COLORS.無;
  return `
    <button class="gallery-card-button ${selected ? "is-selected" : ""}" style="--element:${color}; --card-image:url('assets/cards/${card.id}.png')" data-card-id="${card.id}">
      <span>${escapeHtml(card.no)} ${card.rarity}</span>
      <strong>${escapeHtml(card.name)}</strong>
      <small>x${count}</small>
    </button>
  `;
}

function renderGalleryBgmList() {
  const list = qs("#galleryBgmList");
  if (!list) return;
  qs("#galleryMusicNow").textContent = `Now Playing: ${BGM_TRACKS[galleryMusicTrack]?.label || BGM_TRACKS.title.label}`;
  list.innerHTML = GALLERY_BGM_KEYS.map((key) => {
    const track = BGM_TRACKS[key];
    const active = key === galleryMusicTrack;
    return `
      <button class="gallery-bgm-button ${active ? "is-active" : ""}" data-track="${key}">
        <span>${escapeHtml(track.label)}</span>
        <small>${escapeHtml(track.src.split("/").pop())}</small>
      </button>
    `;
  }).join("");
}

function selectGalleryMusic(track) {
  if (!BGM_TRACKS[track]) return;
  galleryMusicTrack = track;
  audio.musicOn = true;
  qs("#musicBtn")?.classList.add("is-on");
  audio.startMusic(track);
  renderGalleryBgmList();
}

function exchangeableCardCopies(card, collection, selected, savedDeckCounts) {
  const collectionCopies = Math.max(0, Number(collection[card.id]) || 0);
  const starterCopies = STARTER_DECK_COUNTS[card.id] || 0;
  const requiredCopies = Math.max(selected[card.id] || 0, savedDeckCounts[card.id] || 0);
  const protectedCollectionCopies = Math.max(0, requiredCopies - starterCopies);
  return Math.max(0, collectionCopies - protectedCollectionCopies);
}

function trimDeckCopiesToOwnedLimit(deckIds, cardId, allowedCopies) {
  let keptCopies = 0;
  let removedCopies = 0;
  const nextDeckIds = deckIds.filter((id) => {
    if (id !== cardId) return true;
    keptCopies += 1;
    if (keptCopies <= allowedCopies) return true;
    removedCopies += 1;
    return false;
  });
  return { deckIds: nextDeckIds, removedCopies };
}

function removeExcessDeckCopiesAfterExchange(cardId) {
  const owned = loadOwnedCollection();
  const allowedCopies = deckAllowedCopies(cardId, owned);
  const current = trimDeckCopiesToOwnedLimit(deckEditorIds, cardId, allowedCopies);
  deckEditorIds = current.deckIds;
  const slots = loadPlayerDeckSlots(owned);
  let removedFromSavedSlots = 0;
  const nextSlots = slots.map((deckIds) => {
    const trimmed = trimDeckCopiesToOwnedLimit(deckIds, cardId, allowedCopies);
    removedFromSavedSlots += trimmed.removedCopies;
    return trimmed.removedCopies > 0 ? [...PLAYER_DECK] : deckIds;
  });
  savePlayerDeckSlots(nextSlots, activeDeckSlot);
  return current.removedCopies + removedFromSavedSlots;
}

function requestExchangeCardForPoints(cardId) {
  const card = CARD_DB.get(cardId);
  if (!card) return;
  const owned = loadOwnedCollection();
  const ownedCount = owned[card.id] || 0;
  if (ownedCount <= 2) {
    openExchangeConfirm(card);
    return;
  }
  exchangeCardForPoints(cardId);
}

function openExchangeConfirm(card) {
  pendingExchangeCardId = card.id;
  const owned = loadOwnedCollection();
  const ownedCount = owned[card.id] || 0;
  const points = cardPointValue(card);
  const selected = countBy(deckEditorIds, (id) => id);
  const savedDeckCounts = loadSavedDeckSlotCounts(owned);
  const deckUseCount = Math.max(selected[card.id] || 0, savedDeckCounts[card.id] || 0);
  const deckNotice = deckUseCount > 0 ? "デッキ使用枚数が所持枚数を超える場合は、交換後にデッキからも外れます。" : "";
  qs("#exchangeConfirmTitle").textContent = `${card.name} をポイント化しますか？`;
  qs("#exchangeConfirmText").textContent = `所持枚数が ${ownedCount}枚 のカードです。交換すると ${points}P を獲得し、このカードの追加所持が1枚減ります。${deckNotice}`;
  qs("#exchangeConfirmModal").classList.remove("hidden");
}

function closeExchangeConfirm() {
  pendingExchangeCardId = null;
  qs("#exchangeConfirmModal")?.classList.add("hidden");
}

function confirmPendingExchange() {
  const cardId = pendingExchangeCardId;
  closeExchangeConfirm();
  if (cardId) exchangeCardForPoints(cardId, { allowDeckUse: true });
}

function exchangeCardForPoints(cardId, options = {}) {
  const card = CARD_DB.get(cardId);
  if (!card) return;
  const collection = loadCollection();
  const selected = countBy(deckEditorIds, (id) => id);
  const savedDeckCounts = loadSavedDeckSlotCounts();
  const sellable = exchangeableCardCopies(card, collection, selected, savedDeckCounts);
  if (sellable <= 0 && !options.allowDeckUse) {
    renderDeckEditor(`${card.name} はデッキ使用分を残すためポイント化できません。`);
    return;
  }
  if (Math.max(0, Number(collection[card.id]) || 0) <= 0) {
    renderDeckEditor(`${card.name} はポイント化できる追加所持分がありません。`);
    return;
  }

  const points = cardPointValue(card);
  const nextCount = Math.max(0, (Number(collection[card.id]) || 0) - 1);
  if (nextCount > 0) collection[card.id] = nextCount;
  else delete collection[card.id];

  saveCollection(collection);
  const removedFromDeck = options.allowDeckUse ? removeExcessDeckCopiesAfterExchange(card.id) : 0;
  saveExchangePoints(loadExchangePoints() + points);
  hideSkillPopup();
  const deckNotice = removedFromDeck > 0 ? ` デッキからも${removedFromDeck}枚外しました。` : "";
  renderDeckEditor(`${card.name} を ${points}P に交換しました。${deckNotice}`, true);
  renderCollectionSummary();
  if (!qs("#galleryView")?.classList.contains("hidden")) renderGallery();
}

function buyCardWithPoints(cardId) {
  const card = CARD_DB.get(cardId);
  if (!card) return;
  const cost = cardPointCost(card);
  const points = loadExchangePoints();
  if (points < cost) {
    renderDeckEditor(`${card.name} の交換には ${cost}P 必要です。`);
    return;
  }

  const collection = loadCollection();
  collection[card.id] = (Number(collection[card.id]) || 0) + 1;
  saveCollection(collection);
  saveExchangePoints(points - cost);
  hideSkillPopup();
  renderDeckEditor(`${card.name} を ${cost}P で交換しました。`, true);
  renderCollectionSummary();
  if (!qs("#galleryView")?.classList.contains("hidden")) renderGallery();
}

function addDeckCard(cardId) {
  const owned = loadOwnedCollection();
  const selected = countBy(deckEditorIds, (id) => id);
  if (!CARD_DB.has(cardId) || deckEditorIds.length >= PLAYER_DECK_SIZE) return;
  if ((selected[cardId] || 0) >= deckAllowedCopies(cardId, owned)) return;
  suppressDeckEditorCardPreview();
  deckEditorIds.push(cardId);
  renderDeckEditor();
  hideSkillPopup();
}

function removeDeckCard(cardId) {
  const index = deckEditorIds.indexOf(cardId);
  if (index === -1) return;
  hideSkillPopup();
  deckEditorIds.splice(index, 1);
  renderDeckEditor();
}

function resetDeckEditor() {
  deckEditorIds = [...PLAYER_DECK];
  renderDeckEditor("初期デッキに戻しました。保存すると現在のデッキスロットに反映されます。");
}

function saveDeckEditor() {
  if (savePlayerDeckIds(deckEditorIds, activeDeckSlot)) {
    renderDeckEditor(`デッキ${activeDeckSlot}を保存しました。`, true);
    return;
  }
  renderDeckEditor(deckValidationMessage(deckEditorIds));
}

function renderDeckSlotButtons() {
  const slotButtons = qs("#deckSlotButtons");
  if (!slotButtons) return;
  const dirty = isDeckEditorDirty();
  slotButtons.innerHTML = Array.from({ length: PLAYER_DECK_SLOT_COUNT }, (_, index) => {
    const slot = index + 1;
    const active = slot === activeDeckSlot;
    const dirtyClass = active && dirty ? " is-dirty" : "";
    return `<button class="deck-slot-button ${active ? "is-active" : ""}${dirtyClass}" type="button" data-deck-slot="${slot}" aria-pressed="${active}" title="デッキ${slot}を呼び出す">${slot}</button>`;
  }).join("");
}

function switchDeckSlot(slot) {
  const normalizedSlot = saveActiveDeckSlot(slot);
  deckEditorIds = loadPlayerDeckIds(normalizedSlot);
  pendingDeckSlotSwitch = null;
  hideSkillPopup();
  renderDeckEditor(`デッキ${normalizedSlot}に切り替えました。`, true);
  renderCollectionSummary();
}

function requestDeckSlotSwitch(slot) {
  const normalizedSlot = normalizeDeckSlot(slot);
  if (normalizedSlot === activeDeckSlot) return;
  if (isDeckEditorDirty()) {
    pendingDeckSlotSwitch = normalizedSlot;
    qs("#deckSlotConfirmModal")?.classList.remove("hidden");
    return;
  }
  switchDeckSlot(normalizedSlot);
}

function closeDeckSlotSwitchConfirm() {
  pendingDeckSlotSwitch = null;
  qs("#deckSlotConfirmModal")?.classList.add("hidden");
}

function confirmDeckSlotSwitch() {
  const slot = pendingDeckSlotSwitch;
  closeDeckSlotSwitchConfirm();
  if (slot) switchDeckSlot(slot);
}

function toggleDeckListVisibility() {
  deckEditorDeckHidden = !deckEditorDeckHidden;
  hideSkillPopup();
  renderDeckEditor();
}

function toggleLibraryVisibility() {
  deckEditorLibraryHidden = !deckEditorLibraryHidden;
  hideSkillPopup();
  renderDeckEditor();
}

function toggleExchangeVisibility() {
  deckEditorExchangeHidden = !deckEditorExchangeHidden;
  hideSkillPopup();
  renderDeckEditor();
}

function toggleLibraryOwnedOnly() {
  deckEditorLibraryOwnedOnly = !deckEditorLibraryOwnedOnly;
  hideSkillPopup();
  renderDeckEditor();
}

function createEmptyDeckEditorLibraryFilters() {
  return DECK_LIBRARY_FILTER_KEYS.reduce((filters, key) => {
    filters[key] = [];
    return filters;
  }, {});
}

function cloneDeckEditorLibraryFilters(filters = deckEditorLibraryFilters) {
  const source = filters || {};
  return DECK_LIBRARY_FILTER_KEYS.reduce((clone, key) => {
    clone[key] = [...new Set(source[key] || [])];
    return clone;
  }, {});
}

function selectedDeckEditorLibraryFilterCount(filters = deckEditorLibraryFilters) {
  return DECK_LIBRARY_FILTER_KEYS.reduce((count, key) => count + (filters[key]?.length || 0), 0);
}

function deckEditorLibraryBaseCards(owned = loadOwnedCollection()) {
  return ALL_CARDS.filter((card) => !deckEditorLibraryOwnedOnly || (owned[card.id] || 0) > 0);
}

function deckEditorCardFilterValue(card, key) {
  if (key === "rarity") return card.rarity;
  if (key === "element") return card.element || "無";
  if (key === "type") return deckEditorTypeLabel(card);
  if (key === "series") return card.series || "共通";
  return "";
}

function deckEditorCardMatchesFilters(card, filters = deckEditorLibraryFilters) {
  return DECK_LIBRARY_FILTER_KEYS.every((key) => {
    const selectedValues = filters[key] || [];
    return !selectedValues.length || selectedValues.includes(deckEditorCardFilterValue(card, key));
  });
}

function deckEditorLibraryTargetCards(owned = loadOwnedCollection(), filters = deckEditorLibraryFilters) {
  return deckEditorLibraryBaseCards(owned).filter((card) => deckEditorCardMatchesFilters(card, filters));
}

function deckEditorLibraryFilterOptions(key) {
  const values = [...new Set(ALL_CARDS.map((card) => deckEditorCardFilterValue(card, key)))];
  if (key === "rarity") return values.sort((a, b) => (RARITY_ORDER[b] || 0) - (RARITY_ORDER[a] || 0));
  if (key === "element") {
    const order = Object.keys(ELEMENT_COLORS);
    return values.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }
  if (key === "type") {
    const order = [...Object.values(ROLE_LABELS), "インスタント", "設置型", "カウンター"];
    return values.sort((a, b) => {
      const aIndex = order.indexOf(a);
      const bIndex = order.indexOf(b);
      if (aIndex !== bIndex) return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
      return a.localeCompare(b, "ja");
    });
  }
  return values.sort((a, b) => a.localeCompare(b, "ja"));
}

function deckEditorFilterOptionCount(baseCards, filters, key, value) {
  return baseCards.filter((card) =>
    DECK_LIBRARY_FILTER_KEYS.every((filterKey) => {
      if (filterKey === key) return deckEditorCardFilterValue(card, filterKey) === value;
      const selectedValues = filters[filterKey] || [];
      return !selectedValues.length || selectedValues.includes(deckEditorCardFilterValue(card, filterKey));
    }),
  ).length;
}

function renderDeckEditorSortModal() {
  const optionsRoot = qs("#deckSortOptions");
  const targetCount = qs("#deckSortTargetCount");
  if (!optionsRoot || !targetCount) return;
  const owned = loadOwnedCollection();
  const baseCards = deckEditorLibraryBaseCards(owned);
  const filters = pendingDeckEditorLibraryFilters || deckEditorLibraryFilters;
  const targetCards = baseCards.filter((card) => deckEditorCardMatchesFilters(card, filters));
  targetCount.textContent = `${targetCards.length}/${baseCards.length}枚`;
  optionsRoot.innerHTML = DECK_LIBRARY_FILTER_KEYS.map((key) => {
    const options = deckEditorLibraryFilterOptions(key)
      .map((value) => {
        const checked = (filters[key] || []).includes(value);
        const count = deckEditorFilterOptionCount(baseCards, filters, key, value);
        return `
          <label class="deck-sort-choice ${checked ? "is-checked" : ""} ${count <= 0 ? "is-empty" : ""}">
            <input type="checkbox" data-filter-key="${key}" value="${escapeHtml(value)}" ${checked ? "checked" : ""} />
            <span>${escapeHtml(value)}</span>
            <small>${count}枚</small>
          </label>
        `;
      })
      .join("");
    return `
      <section class="deck-sort-section deck-sort-section-${key}">
        <h3>${escapeHtml(DECK_LIBRARY_FILTER_LABELS[key])}</h3>
        <div class="deck-sort-choice-grid">${options}</div>
      </section>
    `;
  }).join("");
}

function openDeckSortModal() {
  pendingDeckEditorLibraryFilters = cloneDeckEditorLibraryFilters();
  hideSkillPopup();
  renderDeckEditorSortModal();
  qs("#deckSortModal")?.classList.remove("hidden");
}

function closeDeckSortModal() {
  pendingDeckEditorLibraryFilters = null;
  qs("#deckSortModal")?.classList.add("hidden");
}

function applyDeckSortModal() {
  deckEditorLibraryFilters = cloneDeckEditorLibraryFilters(pendingDeckEditorLibraryFilters);
  closeDeckSortModal();
  clearDeckEditorLibraryDetail();
  renderDeckEditor();
}

function resetDeckSortModal() {
  pendingDeckEditorLibraryFilters = createEmptyDeckEditorLibraryFilters();
  renderDeckEditorSortModal();
}

function togglePendingDeckSortFilter(input) {
  if (!input?.dataset?.filterKey || !DECK_LIBRARY_FILTER_KEYS.includes(input.dataset.filterKey)) return;
  if (!pendingDeckEditorLibraryFilters) pendingDeckEditorLibraryFilters = cloneDeckEditorLibraryFilters();
  const key = input.dataset.filterKey;
  const nextValues = new Set(pendingDeckEditorLibraryFilters[key] || []);
  if (input.checked) nextValues.add(input.value);
  else nextValues.delete(input.value);
  pendingDeckEditorLibraryFilters[key] = [...nextValues];
  renderDeckEditorSortModal();
}

function deckEditorNow() {
  return window.performance?.now?.() || Date.now();
}

function suppressDeckEditorCardPreview(duration = 500) {
  deckEditorPreviewSuppressedUntil = deckEditorNow() + duration;
}

function isDeckEditorCardPreviewSuppressed() {
  return deckEditorNow() < deckEditorPreviewSuppressedUntil;
}

function rectsIntersect(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function findDeckEditorLibraryDetailCard() {
  if (!deckEditorLibraryDetailCardId) return null;
  return qsa("#cardLibrary .deck-edit-card[data-card-id]").find((cardButton) => cardButton.dataset.cardId === deckEditorLibraryDetailCardId) || null;
}

function isDeckEditorLibraryDetailCardVisible(cardButton) {
  const library = qs("#cardLibrary");
  if (!cardButton || !library) return false;
  const cardRect = cardButton.getBoundingClientRect();
  const libraryRect = library.getBoundingClientRect();
  const viewportRect = {
    left: 0,
    top: 0,
    right: window.innerWidth || document.documentElement.clientWidth,
    bottom: window.innerHeight || document.documentElement.clientHeight,
  };
  if (cardRect.width <= 0 || cardRect.height <= 0) return false;
  return rectsIntersect(cardRect, libraryRect) && rectsIntersect(cardRect, viewportRect);
}

function checkDeckEditorLibraryDetailVisibility() {
  deckEditorDetailVisibilityFrame = 0;
  if (!deckEditorLibraryDetailCardId) return;
  const cardButton = findDeckEditorLibraryDetailCard();
  if (!isDeckEditorLibraryDetailCardVisible(cardButton)) {
    hideSkillPopup();
    return;
  }
  const popup = qs("#skillPopup");
  if (popup && !popup.classList.contains("hidden")) positionSkillPopup(popup, cardButton);
}

function scheduleDeckEditorLibraryDetailVisibilityCheck() {
  if (!deckEditorLibraryDetailCardId || deckEditorDetailVisibilityFrame) return;
  deckEditorDetailVisibilityFrame = window.requestAnimationFrame(checkDeckEditorLibraryDetailVisibility);
}

function updateDeckEditorLibraryDetailState() {
  qsa("#cardLibrary .deck-edit-card[data-card-id]").forEach((cardButton) => {
    const active = cardButton.dataset.cardId === deckEditorLibraryDetailCardId;
    cardButton.classList.toggle("is-detail-active", active);
    cardButton.setAttribute("aria-pressed", String(active));
  });
}

function clearDeckEditorLibraryDetail() {
  if (!deckEditorLibraryDetailCardId) return;
  deckEditorLibraryDetailCardId = null;
  updateDeckEditorLibraryDetailState();
}

function showDeckEditorLibraryDetail(cardButton) {
  if (!cardButton?.dataset?.cardId || !CARD_DB.has(cardButton.dataset.cardId)) return;
  deckEditorLibraryDetailCardId = cardButton.dataset.cardId;
  showDeckCardPopup(cardButton.dataset.cardId, cardButton);
  updateDeckEditorLibraryDetailState();
  scheduleDeckEditorLibraryDetailVisibilityCheck();
}

function handleDeckEditorLibraryCardActivation(cardButton) {
  const cardId = cardButton?.dataset?.cardId;
  if (!cardId) return;
  if (deckEditorLibraryDetailCardId === cardId && cardButton.dataset.disabled !== "true") {
    addDeckCard(cardId);
    return;
  }
  showDeckEditorLibraryDetail(cardButton);
}

function deckEditorViewKey(zone, cardId) {
  return `${zone}:${cardId}`;
}

function toggleDeckEditorCardView(cardId, zone) {
  if (!CARD_DB.has(cardId)) return;
  const key = deckEditorViewKey(zone, cardId);
  if (deckEditorSkillViews.has(key)) deckEditorSkillViews.delete(key);
  else deckEditorSkillViews.add(key);
  hideSkillPopup();
  renderDeckEditor();
}

function updateDeckEditorToggleButtons() {
  const deckButton = qs("#toggleDeckListBtn");
  const libraryButton = qs("#toggleLibraryBtn");
  const exchangeButton = qs("#toggleExchangeListBtn");
  const ownedOnlyButton = qs("#ownedOnlyLibraryBtn");
  const librarySortButton = qs("#librarySortBtn");
  const deckPanel = qs("#deckPanel");
  const libraryPanel = qs("#libraryPanel");
  const exchangePanel = qs("#exchangePanel");
  const deckEditorGrid = qs(".deck-editor-grid");
  deckButton.textContent = deckEditorDeckHidden ? "表示" : "非表示";
  deckButton.title = deckEditorDeckHidden ? "デッキ内カードを表示" : "デッキ内カードを非表示";
  deckButton.setAttribute("aria-pressed", String(deckEditorDeckHidden));
  deckButton.classList.toggle("is-on", deckEditorDeckHidden);
  deckPanel?.classList.toggle("is-collapsed", deckEditorDeckHidden);
  libraryButton.textContent = deckEditorLibraryHidden ? "表示" : "非表示";
  libraryButton.title = deckEditorLibraryHidden ? "所持カード一覧を表示" : "所持カード一覧を非表示";
  libraryButton.setAttribute("aria-pressed", String(deckEditorLibraryHidden));
  libraryButton.classList.toggle("is-on", deckEditorLibraryHidden);
  libraryPanel?.classList.toggle("is-collapsed", deckEditorLibraryHidden);
  exchangeButton.textContent = deckEditorExchangeHidden ? "表示" : "非表示";
  exchangeButton.title = deckEditorExchangeHidden ? "交換所を表示" : "交換所を非表示";
  exchangeButton.setAttribute("aria-pressed", String(deckEditorExchangeHidden));
  exchangeButton.classList.toggle("is-on", deckEditorExchangeHidden);
  exchangePanel?.classList.toggle("is-collapsed", deckEditorExchangeHidden);
  deckEditorGrid?.classList.toggle("is-deck-collapsed", deckEditorDeckHidden);
  deckEditorGrid?.classList.toggle("is-library-collapsed", deckEditorLibraryHidden);
  deckEditorGrid?.classList.toggle("is-exchange-collapsed", deckEditorExchangeHidden);
  const showingAllCards = !deckEditorLibraryOwnedOnly;
  ownedOnlyButton.textContent = showingAllCards ? "全カード" : "入手済みのみ";
  ownedOnlyButton.title = showingAllCards ? "全カードを表示中" : "入手済みカードのみ表示中";
  ownedOnlyButton.setAttribute("aria-pressed", String(showingAllCards));
  ownedOnlyButton.classList.toggle("is-on", showingAllCards);
  const owned = loadOwnedCollection();
  const activeFilterCount = selectedDeckEditorLibraryFilterCount();
  const targetCardCount = deckEditorLibraryTargetCards(owned).length;
  librarySortButton.textContent = activeFilterCount ? `ソート ${targetCardCount}枚` : "ソート";
  librarySortButton.title = activeFilterCount ? `${activeFilterCount}条件 / 対象${targetCardCount}枚` : "ソート条件を開く";
  librarySortButton.classList.toggle("is-on", activeFilterCount > 0);
}

function renderDeckEditor(message = "", ready = false) {
  activeDeckSlot = loadActiveDeckSlot();
  const owned = loadOwnedCollection();
  const collection = loadCollection();
  const selected = countBy(deckEditorIds, (id) => id);
  const savedDeckCounts = loadSavedDeckSlotCounts(owned);
  const deckCount = deckEditorIds.length;
  const valid = isValidDeckIds(deckEditorIds, owned);
  const dirty = isDeckEditorDirty();
  qs("#deckCount").textContent = `${deckCount}/${PLAYER_DECK_SIZE}`;
  qs("#exchangePointBalance").textContent = `${loadExchangePoints()}P`;
  qs("#saveDeckBtn").disabled = !valid;
  renderDeckSlotButtons();
  updateDeckEditorToggleButtons();
  const status = qs("#deckEditorStatus");
  status.classList.toggle("is-ready", ready || (valid && !dirty));
  status.textContent = message || (valid ? (dirty ? `デッキ${activeDeckSlot}に未保存の変更があります。` : `デッキ${activeDeckSlot}は保存済みです。`) : deckValidationMessage(deckEditorIds, owned));

  const deckCards = Object.entries(selected)
    .sort(([idA], [idB]) => compareCards(CARD_DB.get(idA), CARD_DB.get(idB)))
    .map(([id, count]) => {
      const card = CARD_DB.get(id);
      return renderDeckEditorCard(card, count, `所持 ${owned[id] || 0} / 上限 ${deckCopyLimitForCard(card)}`, false, "deck");
    })
    .join("");
  qs("#deckList").innerHTML = deckEditorDeckHidden ? '<p class="deck-empty">デッキ内カードを非表示中です。</p>' : deckCards || '<p class="deck-empty">0枚</p>';

  const libraryCards = deckEditorLibraryBaseCards(owned)
    .filter((card) => deckEditorCardMatchesFilters(card))
    .sort(compareDeckEditorLibraryCards)
    .map((card) => {
      const ownedCount = owned[card.id] || 0;
      const usedCount = selected[card.id] || 0;
      const copyLimit = deckCopyLimitForCard(card);
      const remaining = Math.min(ownedCount, copyLimit) - usedCount;
      const disabled = remaining <= 0 || deckCount >= PLAYER_DECK_SIZE;
      return renderDeckEditorCard(card, remaining, `所持 ${ownedCount} / デッキ ${usedCount} / 上限 ${copyLimit}`, disabled, "library");
    })
    .join("");
  qs("#cardLibrary").innerHTML = deckEditorLibraryHidden
    ? '<p class="deck-empty">所持カード一覧を非表示中です。</p>'
    : libraryCards || '<p class="deck-empty">表示できるカードがありません。</p>';

  renderCardExchange(owned, collection, selected, savedDeckCounts);
}

function renderCardExchange(owned, collection, selected, savedDeckCounts) {
  const points = loadExchangePoints();
  const rates = ["C", "R", "SR", "SSR", "UR"]
    .map((rarity) => `${rarity}: ${CARD_POINT_VALUES[rarity]}P -> ${CARD_POINT_COSTS[rarity]}P`)
    .join(" / ");
  qs("#exchangeSummary").innerHTML = `
    <div class="exchange-balance">
      <strong>${points}P</strong>
      <span>${escapeHtml(rates)}</span>
    </div>
  `;
  if (deckEditorExchangeHidden) {
    qs("#exchangeList").innerHTML = "";
    return;
  }

  const exchangeCards = [...ALL_CARDS]
    .sort(compareCards)
    .map((card) => renderExchangeCard(card, owned, collection, selected, savedDeckCounts, points))
    .join("");
  qs("#exchangeList").innerHTML = exchangeCards;
}

function renderExchangeCard(card, owned, collection, selected, savedDeckCounts, points) {
  const ownedCount = owned[card.id] || 0;
  const usedCount = selected[card.id] || 0;
  const collectionCount = Math.max(0, Number(collection[card.id]) || 0);
  const sellable = exchangeableCardCopies(card, collection, selected, savedDeckCounts);
  const canSell = collectionCount > 0 && (sellable > 0 || ownedCount <= 2);
  const value = cardPointValue(card);
  const cost = cardPointCost(card);
  const canBuy = points >= cost;
  const color = ELEMENT_COLORS[card.element || "無"] || ELEMENT_COLORS.無;
  const elementLine = `${card.element || "無"}属性`;
  return `
    <div class="deck-exchange-card" style="--element:${color}; --card-image:url('assets/cards/${card.id}.png')" data-card-id="${card.id}">
      <div class="exchange-card-main">
        <span class="exchange-card-kicker">${escapeHtml(card.no)} ${card.rarity} / ${escapeHtml(elementLine)}</span>
        <strong>${escapeHtml(card.name)}</strong>
        <small>所持 ${ownedCount} / デッキ ${usedCount} / 追加分 ${collectionCount}</small>
      </div>
      <div class="exchange-card-actions">
        <button type="button" data-exchange-action="sell" data-card-id="${card.id}" ${canSell ? "" : "disabled"}>+${value}P</button>
        <button type="button" data-exchange-action="buy" data-card-id="${card.id}" ${canBuy ? "" : "disabled"}>-${cost}P</button>
      </div>
    </div>
  `;
}

function compareCards(a, b) {
  if (a.kind !== b.kind) return a.kind === "character" ? -1 : 1;
  if (RARITY_ORDER[a.rarity] !== RARITY_ORDER[b.rarity]) return RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity];
  return a.id.localeCompare(b.id, "en", { numeric: true });
}

function deckEditorTypeLabel(card) {
  return card.kind === "support" ? card.supportType : ROLE_LABELS[card.role];
}

function compareDeckEditorFilterValue(a, b, key) {
  if (key === "rarity") return (RARITY_ORDER[b.rarity] || 0) - (RARITY_ORDER[a.rarity] || 0);
  return deckEditorCardFilterValue(a, key).localeCompare(deckEditorCardFilterValue(b, key), "ja");
}

function compareDeckEditorLibraryCards(a, b) {
  const activeKeys = DECK_LIBRARY_FILTER_KEYS.filter((key) => deckEditorLibraryFilters[key]?.length);
  for (const key of activeKeys) {
    const compared = compareDeckEditorFilterValue(a, b, key);
    if (compared) return compared;
  }
  return compareCards(a, b);
}

function renderDeckEditorCard(card, count, meta, disabled, zone) {
  const color = ELEMENT_COLORS[card.element || "無"] || ELEMENT_COLORS.無;
  const image = `assets/cards/${card.id}.png`;
  const elementLine = `${card.element || "無"}属性`;
  const typeLine = deckEditorTypeLabel(card);
  const statItems =
    card.kind === "support"
      ? [`Cost ${card.cost}`, card.supportType]
      : [`Cost ${card.cost}`, `ATK ${card.atk}`, `DEF ${card.def}`, `HP ${card.hp}`];
  const statLine = statItems.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  const showingSkill = deckEditorSkillViews.has(deckEditorViewKey(zone, card.id));
  const detail = showingSkill
    ? `<span class="deck-card-skill"><strong>${escapeHtml(card.skill)}</strong><span>${escapeHtml(card.text)}</span></span>`
    : `<span class="deck-card-name">${escapeHtml(card.name)}</span>`;
  const mobileStatValues = card.kind === "support" ? ["-", "-", "-"] : [card.atk, card.def, card.hp];
  const mobileStats = mobileStatValues
    .map((value) => `<span class="deck-card-mobile-stat"><span>${escapeHtml(value)}</span></span>`)
    .join("");
  const mobileNameClass = [...card.name].length >= 8 ? " is-compact" : "";
  const cardLabel = `${card.name}、${elementLine}、${typeLine}、Cost ${card.cost}、${card.skill}。${card.text}`;
  const detailActive = zone === "library" && deckEditorLibraryDetailCardId === card.id;
  return `
    <div class="deck-edit-card deck-edit-card-${card.kind} ${count <= 0 ? "is-empty" : ""} ${disabled ? "is-unavailable" : ""} ${detailActive ? "is-detail-active" : ""}" style="--element:${color}; --card-image:url('${image}'); --deck-card-position:center 28%"
      data-card-id="${card.id}" data-zone="${zone}" data-disabled="${disabled}" aria-disabled="${disabled}" aria-pressed="${detailActive}" aria-label="${escapeHtml(cardLabel)}" role="button" tabindex="0">
      <span class="deck-edit-card-inner">
        <span class="deck-card-mobile-face" aria-hidden="true">
          <span class="deck-card-mobile-frame"></span>
          <span class="deck-card-mobile-cost">${escapeHtml(card.cost)}</span>
          <span class="deck-card-mobile-name${mobileNameClass}"><span>${escapeHtml(card.name)}</span></span>
          <span class="deck-card-mobile-type">${escapeHtml(typeLine)}</span>
          <span class="deck-card-mobile-element">${escapeHtml(card.element || "無")}</span>
          <span class="deck-card-mobile-effect">
            <strong>【${escapeHtml(card.skill)}】</strong>
            <span>${escapeHtml(card.text)}</span>
          </span>
          <span class="deck-card-mobile-stats">${mobileStats}</span>
        </span>
        <span class="deck-card-top">
          <span class="deck-card-id">${escapeHtml(card.no)} ${card.rarity}</span>
          <span class="deck-card-kind">${escapeHtml(elementLine)} / ${escapeHtml(typeLine)}</span>
          <button class="deck-card-mode-btn" type="button" data-card-id="${card.id}" data-zone="${zone}" aria-label="${escapeHtml(card.name)}の${showingSkill ? "ステータス" : "スキル"}を表示">${showingSkill ? "STATUS" : "SKILL"}</button>
        </span>
        ${detail}
        <span class="deck-card-bottom deck-card-stats">
          <span class="deck-card-stat-line">${statLine}</span>
          <span class="deck-card-count">x${count}</span>
        </span>
        <span class="deck-card-bottom deck-card-meta">${escapeHtml(meta)}</span>
      </span>
    </div>
  `;
}

function render() {
  if (!state) return;
  renderHud();
  renderRows();
  renderHand();
  renderInspector();
  renderLog();
  renderControls();
  renderCollectionSummary();
  audio.updateMusic();
}

function renderHud() {
  qs("#opponentHud").innerHTML = renderDuelistHud(state.ai, true);
  qs("#playerHud").innerHTML = renderDuelistHud(state.player, false);
}

function renderEnergyPill(player) {
  const pulseActive = player.energyPulseUntil && Date.now() < player.energyPulseUntil;
  const classes = [
    "stat-pill",
    "energy-pill",
    state.current === player.key && !state.gameOver ? "is-current-turn" : "",
    pulseActive ? "is-turn-start" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return `
    <span class="${classes}" aria-label="エネルギー ${player.energy}/${player.energyMax}">
      <span class="energy-pill-label">EN</span>
      <strong class="energy-pill-current">${player.energy}</strong>
      <span class="energy-pill-max">/${player.energyMax}</span>
    </span>
  `;
}

function renderDuelistHud(player, hiddenHand) {
  const hidden = hiddenHand
    ? `<div class="hidden-hand">${player.hand.map(() => '<div class="card-back"></div>').join("")}</div>`
    : "";
  const aiStats =
    player.key === "ai" && state.aiProfile
      ? `<span class="stat-pill">AI Lv ${state.aiProfile.level}</span><span class="stat-pill">Wins ${Math.min(state.freeplayWins, FREEPLAY_MAX_WINS)}/${FREEPLAY_MAX_WINS}</span>`
      : "";
  return `
    <div>
      <div class="duelist-name">${escapeHtml(player.name)}</div>
      <div class="duelist-stats">
        <span class="stat-pill">LP ${player.lp}</span>
        ${renderEnergyPill(player)}
        <span class="stat-pill">Deck ${player.deck.length}</span>
        <span class="stat-pill">Hand ${player.hand.length}</span>
        ${aiStats}
      </div>
    </div>
    ${hidden}
  `;
}

function renderRows() {
  qs("#opponentBack").innerHTML = renderSlotRow("ai", "back");
  qs("#opponentFront").innerHTML = renderSlotRow("ai", "front");
  qs("#playerFront").innerHTML = renderSlotRow("player", "front");
  qs("#playerBack").innerHTML = renderSlotRow("player", "back");
  qs("#opponentLpTarget").classList.toggle("targetable", isLpTargetable());
  qs("#opponentLpTarget").classList.toggle("disabled", !isLpTargetable());
  qs("#playerLpTarget").textContent = `Your LP ${state.player.lp}`;
  qs("#opponentLpTarget").textContent = `Enemy LP ${state.ai.lp}`;
}

function renderSlotRow(ownerKey, lane) {
  const player = state[ownerKey];
  return player[lane]
    .map((card, index) => {
      const label = `${ownerKey === "player" ? "自分" : "相手"} ${lane === "front" ? "前衛" : "後衛"} ${index + 1}`;
      const playable = isPlayableSlot(ownerKey, lane, index);
      return `
        <div class="slot ${playable ? "playable" : ""}" data-owner="${ownerKey}" data-lane="${lane}" data-index="${index}" data-label="${label}">
          ${card ? renderCard(card, { field: true, ownerKey, lane, index }) : ""}
        </div>
      `;
    })
    .join("");
}

function renderHand() {
  qs("#playerHand").innerHTML = state.player.hand
    .map((card, index) =>
      renderCard(card, {
        handIndex: index,
        selected: state.selectedHandIndex === index,
      }),
    )
    .join("");
  updateHandScrollProxy();
}

function updateHandScrollProxy() {
  const hand = qs("#playerHand");
  const spacer = qs("#handScrollTopSpacer");
  const topScroller = qs("#handScrollTop");
  if (!hand || !spacer || !topScroller) return;
  spacer.style.width = `${Math.max(hand.scrollWidth, hand.clientWidth)}px`;
  topScroller.scrollLeft = hand.scrollLeft;
}

function syncHandScrollFromTop() {
  const hand = qs("#playerHand");
  const topScroller = qs("#handScrollTop");
  if (!hand || !topScroller || hand.scrollLeft === topScroller.scrollLeft) return;
  hand.scrollLeft = topScroller.scrollLeft;
}

function syncHandScrollFromCards() {
  const hand = qs("#playerHand");
  const topScroller = qs("#handScrollTop");
  if (!hand || !topScroller || topScroller.scrollLeft === hand.scrollLeft) return;
  topScroller.scrollLeft = hand.scrollLeft;
}

function showDeckChoice(player, cards) {
  state.pendingDeckChoice = {
    ownerKey: player.key,
    cards,
  };
  state.busy = true;
  qs("#choiceTitle").textContent = "勇者の仲間集め: 1枚選択";
  qs("#choiceCards").innerHTML = cards
    .map(
      (card, index) => `
        <button class="choice-option" data-choice-index="${index}">
          ${renderCard(card)}
        </button>
      `,
    )
    .join("");
  qs("#choiceModal").classList.remove("hidden");
  log("デッキ上3枚から手札に加える1枚を選択。", "effect");
}

function completeDeckChoice(index) {
  const choice = state.pendingDeckChoice;
  if (!choice) return;
  const player = state[choice.ownerKey];
  const picked = choice.cards[index];
  if (!picked) return;
  const rest = choice.cards.filter((_, cardIndex) => cardIndex !== index);
  player.hand.push(picked);
  player.deck.push(...rest);
  state.pendingDeckChoice = null;
  state.busy = false;
  qs("#choiceModal").classList.add("hidden");
  qs("#choiceCards").innerHTML = "";
  log(`${picked.name} を仲間に加えた。残りはデッキ下へ。`, "effect");
  render();
}

function openHandDock() {
  qs("#handDock")?.classList.add("is-open");
  updateHandScrollProxy();
  window.setTimeout(updateHandScrollProxy, 190);
}

function closeHandDock() {
  qs("#handDock")?.classList.remove("is-open");
}

function renderCard(card, options = {}) {
  const color = ELEMENT_COLORS[card.element || "無"] || ELEMENT_COLORS.無;
  const cardImage = `assets/cards/${card.id}.png`;
  const selected = options.selected || state.selectedAttackerId === card.instanceId || isSelectedField(card);
  const targetable = options.field && (isCardTargetable(card) || isSupportTargetable(card));
  const exhausted = options.field && card.kind === "character" && (card.attacked || !canAttack(card, state[card.ownerKey]));
  const statusClass = card.status?.stun > 0 ? "is-stunned" : "";
  const typeLine = card.kind === "support" ? card.supportType : ROLE_LABELS[card.role];
  const classes = [
    options.field ? "field-card" : "game-card",
    "has-card-art",
    card.kind === "support" ? "support-card" : "",
    `rarity-${card.rarity}`,
    selected ? "selected" : "",
    targetable ? "targetable" : "",
    exhausted ? "exhausted" : "",
    options.field && state.summonDropId === card.instanceId ? "summon-drop" : "",
    statusClass,
  ]
    .filter(Boolean)
    .join(" ");

  return `
    <article class="${classes}" style="--element:${color}; --card-image:url('${cardImage}')" data-iid="${card.instanceId}" data-card-id="${card.id}"
      ${options.handIndex !== undefined ? `data-hand-index="${options.handIndex}"` : ""}
      ${options.ownerKey ? `data-owner="${options.ownerKey}" data-lane="${options.lane}" data-index="${options.index}"` : ""}>
      <div class="card-top">
        <span>${card.no} ${card.rarity}</span>
        <span class="cost-badge">${card.kind === "support" ? card.cost : effectiveCost(card, state?.[card.ownerKey] || state?.player || { key: "player" })}</span>
      </div>
      <div class="card-art">${renderSigil(card, color)}</div>
      <div class="card-body">
        <p class="card-name">${escapeHtml(card.name)}</p>
        <p class="card-skill">${escapeHtml(card.skill)} / ${escapeHtml(typeLine)}</p>
      </div>
      ${renderStats(card)}
      ${renderStatusStrip(card)}
    </article>
  `;
}

function renderStats(card) {
  if (card.kind === "support") {
    return `<div class="card-stats support-stats"><span>${escapeHtml(card.supportType)}</span></div>`;
  }
  return `
    <div class="card-stats character-stats">
      <span class="stat-atk" data-label="ATK">${effectiveAtk(card)}</span>
      <span class="stat-def" data-label="DEF">${effectiveDef(card)}</span>
      <span class="stat-hp" data-label="HP">${Math.max(0, card.currentHp)}</span>
    </div>
  `;
}

function renderStatusStrip(card) {
  if (card.kind !== "character") return "";
  const chips = [];
  if (card.tags?.includes("guard") && card.status.guardOff <= 0) chips.push("GUARD");
  if (card.status.stun > 0) chips.push("STUN");
  if (card.status.bind > 0) chips.push("BIND");
  if (card.status.silenced > 0) chips.push("SEAL");
  if (card.awakened) chips.push("AWAKE");
  if (card.dormant && !card.awakened) chips.push("SLEEP");
  return chips.length ? `<div class="status-strip">${chips.map((chip) => `<span class="status-chip">${chip}</span>`).join("")}</div>` : "";
}

function showSkillPopup(card, anchor) {
  if (!card) return;
  const popup = qs("#skillPopup");
  if (!popup) return;
  const typeLine = card.kind === "support" ? card.supportType : ROLE_LABELS[card.role];
  const statsLine =
    card.kind === "character"
      ? `ATK ${effectiveAtk(card)} / DEF ${effectiveDef(card)} / HP ${Math.max(0, card.currentHp)} / ${card.maxHp}`
      : `${card.supportType} / コスト ${card.cost}`;
  popup.innerHTML = `
    <h3>${escapeHtml(card.name)}</h3>
    <div class="popup-meta">
      <span class="popup-chip">${card.rarity}</span>
      <span class="popup-chip">${escapeHtml(card.element || "無")}</span>
      <span class="popup-chip">${escapeHtml(typeLine)}</span>
    </div>
    <p><strong>${escapeHtml(card.skill)}</strong><br>${escapeHtml(card.text)}</p>
    <p>${escapeHtml(statsLine)}</p>
  `;
  popup.classList.remove("hidden");
  positionSkillPopup(popup, anchor);
}

function showDeckCardPopup(cardId, anchor) {
  const card = CARD_DB.get(cardId);
  const popup = qs("#skillPopup");
  if (!card || !popup) return;
  const typeLine = card.kind === "support" ? card.supportType : ROLE_LABELS[card.role];
  const statsLine =
    card.kind === "character"
      ? `Cost ${card.cost} / ATK ${card.atk} / DEF ${card.def} / HP ${card.hp}`
      : `${card.supportType} / コスト ${card.cost}`;
  popup.innerHTML = `
    <h3>${escapeHtml(card.name)}</h3>
    <div class="popup-meta">
      <span class="popup-chip">${escapeHtml(card.no)}</span>
      <span class="popup-chip">${card.rarity}</span>
      <span class="popup-chip">${escapeHtml(card.element || "無")}</span>
      <span class="popup-chip">${escapeHtml(typeLine)}</span>
    </div>
    <p><strong>${escapeHtml(card.skill)}</strong><br>${escapeHtml(card.text)}</p>
    <p>${escapeHtml(statsLine)}</p>
  `;
  popup.classList.remove("hidden");
  positionSkillPopup(popup, anchor);
}

function positionSkillPopup(popup, anchor) {
  if (!anchor?.getBoundingClientRect) return;
  const rect = anchor.getBoundingClientRect();
  const gap = 10;
  const viewportWidth = window.innerWidth || 1280;
  const viewportHeight = window.innerHeight || 720;
  const popupWidth = Math.min(320, viewportWidth - 24);
  const measuredHeight = popup.offsetHeight || 145;
  let left = rect.left + rect.width / 2 - popupWidth / 2;
  let top = rect.top - measuredHeight - gap;
  if (top < 12) top = rect.bottom + gap;
  left = Math.max(12, Math.min(left, viewportWidth - popupWidth - 12));
  top = Math.max(12, Math.min(top, viewportHeight - measuredHeight - 12));
  if (!popup.style) popup.style = {};
  popup.style.left = `${left}px`;
  popup.style.top = `${top}px`;
}

function hideSkillPopup() {
  const popup = qs("#skillPopup");
  if (popup) popup.classList.add("hidden");
  clearDeckEditorLibraryDetail();
}

function renderSigil(card, color) {
  const letter = card.kind === "support" ? "S" : card.role;
  const rarity = card.rarity;
  return `
    <svg viewBox="0 0 160 64" role="img" aria-label="${escapeHtml(card.name)}">
      <rect x="0" y="0" width="160" height="64" fill="rgba(0,0,0,0.2)"></rect>
      <path d="M0 54 C34 20 47 78 82 28 C111 -14 119 62 160 12 L160 64 L0 64 Z" fill="${color}" opacity="0.45"></path>
      <circle cx="122" cy="19" r="22" fill="${color}" opacity="0.22"></circle>
      <path d="M80 8 L94 32 L80 56 L66 32 Z" fill="none" stroke="${color}" stroke-width="4"></path>
      <text x="80" y="39" text-anchor="middle" fill="#f6f2e9" font-size="20" font-weight="900">${letter}</text>
      <text x="10" y="18" fill="#f6f2e9" font-size="11" font-weight="900">${rarity}</text>
    </svg>
  `;
}

function renderInspector() {
  const panel = qs("#inspectPanel");
  const selectedHandCard = state.selectedHandIndex !== null ? state.player.hand[state.selectedHandIndex] : null;
  const selectedFieldCard = state.selectedField ? state[state.selectedField.owner]?.[state.selectedField.lane]?.[state.selectedField.index] : null;
  const card = selectedHandCard || selectedFieldCard;
  if (!card) {
    panel.innerHTML = `
      <div class="inspect-title"><h2>カード情報</h2></div>
      <p class="inspect-text">手札または場のカードを選択すると、スキルと操作が表示されます。</p>
    `;
    return;
  }

  const owner = card.ownerKey ? state[card.ownerKey] : state.player;
  const afford = canPay(state.player, card);
  const waitingForTarget = selectedHandCard && getPendingSupportCard() === selectedHandCard;
  const action =
    selectedHandCard && state.current === "player" && state.phase === "main"
      ? card.kind === "support"
        ? `<button id="useSupportBtn" ${afford && !waitingForTarget ? "" : "disabled"}>${waitingForTarget ? "対象を選択中" : "サポート使用"}</button>`
        : `<p class="inspect-text">${afford ? "空いている前衛/後衛枠をクリックして配置。" : "エネルギーが足りません。"}</p>`
      : "";

  panel.innerHTML = `
    <div class="inspect-title">
      <h2>${escapeHtml(card.name)}</h2>
      <span class="tag">${card.rarity}</span>
    </div>
    <div class="inspect-meta">
      <span class="tag muted">${escapeHtml(card.no)}</span>
      <span class="tag muted">Cost ${effectiveCost(card, owner)}</span>
      <span class="tag muted">${escapeHtml(card.element || "無")}</span>
      <span class="tag muted">${card.kind === "support" ? escapeHtml(card.supportType) : escapeHtml(ROLE_LABELS[card.role])}</span>
    </div>
    <p class="inspect-text"><strong>${escapeHtml(card.skill)}</strong><br>${escapeHtml(card.text)}</p>
    ${card.kind === "character" ? `<p class="inspect-text">ATK ${effectiveAtk(card)} / DEF ${effectiveDef(card)} / HP ${Math.max(0, card.currentHp)} / ${card.maxHp}</p>` : ""}
    ${action}
  `;
}

function renderLog() {
  qs("#battleLog").innerHTML = state.log
    .slice(-70)
    .reverse()
    .map((entry) => `<div class="log-entry">${entry}</div>`)
    .join("");
}

function renderControls() {
  const isPlayerMain = state.current === "player" && state.phase === "main" && !state.gameOver;
  const endTurnAvailable = canAcceptPlayerCommands();
  updateBattleBgmStyleButton();
  qs("#battleBtn").disabled = !isPlayerMain || state.busy;
  qs("#endTurnBtn").disabled = !endTurnAvailable;
  qs("#endTurnBtn").setAttribute("aria-disabled", String(!endTurnAvailable));
  const phaseLabel = state.phase === "gameover" ? "Game Over" : state.phase === "intro" ? "Intro" : state.phase === "battle" ? "Battle" : "Main";
  const phaseBanner =
    state.phase === "gameover"
      ? "GAME SET"
      : state.phase === "intro"
        ? "COIN TOSS"
        : state.current === "player"
          ? state.phase === "battle"
            ? "YOUR BATTLE PHASE"
            : "YOUR MAIN PHASE"
          : "AI TURN";
  qs("#turnLabel").textContent = `Turn ${state.turnNumber}`;
  qs("#phaseLabel").textContent = phaseLabel;
  qs("#phaseBanner").textContent = phaseBanner;
  qs("#hintText").textContent = hintText();
}

function canAcceptPlayerCommands() {
  return state.current === "player" && !state.gameOver && !state.busy;
}

function renderCollectionSummary() {
  const collection = loadCollection();
  const total = Object.values(collection).reduce((sum, count) => sum + count, 0);
  qs("#collectionSummary").textContent = `Collection ${total} / ${loadExchangePoints()}P`;
}

function hintText() {
  if (state.gameOver) return `ゲーム終了。報酬${REWARD_CARD_COUNT}枚を獲得しています。`;
  if (state.phase === "intro") return "コイントスで先攻を決定中です。";
  if (state.current === "ai") return "AIが思考中です。";
  const pendingSupport = getPendingSupportCard();
  if (pendingSupport) return `${pendingSupport.name} の対象を選択してください。`;
  if (state.phase === "main") return "手札を選択。もう一度タップでサポート使用、キャラは配置先選択へ。";
  const attacker = getSelectedAttacker();
  if (attacker) return "攻撃対象を選択してください。ガード持ちがいる場合はガードのみ攻撃できます。";
  return "前衛の攻撃可能なキャラを選択してください。";
}

function hasPlayableSlotForCard(player, card) {
  if (!card || card.kind !== "character") return false;
  return ["front", "back"].some((lane) => player[lane].some((slot) => !slot && isValidLane(card, lane)));
}

function isPlayableSlot(ownerKey, lane, index) {
  if (ownerKey !== "player" || state.current !== "player" || state.phase !== "main" || state.busy) return false;
  if (state.pendingSupport) return false;
  if (state.player[lane][index]) return false;
  const card = state.selectedHandIndex !== null ? state.player.hand[state.selectedHandIndex] : null;
  return Boolean(card && card.kind === "character" && canPay(state.player, card) && isValidLane(card, lane));
}

function isSelectedField(card) {
  if (!state.selectedField || !card) return false;
  const selected = state[state.selectedField.owner]?.[state.selectedField.lane]?.[state.selectedField.index];
  return selected === card;
}

function isCardTargetable(card) {
  const attacker = getSelectedAttacker();
  if (!attacker || state.phase !== "battle") return false;
  return getLegalTargets(attacker, state.player).some((target) => target.type === "card" && target.card === card);
}

function isLpTargetable() {
  const attacker = getSelectedAttacker();
  if (!attacker || state.phase !== "battle") return false;
  return getLegalTargets(attacker, state.player).some((target) => target.type === "lp");
}

function getSelectedAttacker() {
  return state.selectedAttackerId ? findCardByInstance(state.selectedAttackerId) : null;
}

async function runAiTurn() {
  if (state.gameOver) return;
  state.busy = true;
  startTurn(state.ai);
  render();
  await sleep(650);

  let playedSomething = true;
  let safety = 0;
  while (playedSomething && safety < 8 && !state.gameOver) {
    safety += 1;
    playedSomething = await aiPlayBestCard();
    if (playedSomething) {
      render();
      await sleep(520);
    }
  }

  state.phase = "battle";
  audio.sfx("phase");
  audio.speak("AI、バトルフェイズ");
  render();
  await sleep(450);

  const attackers = () => state.ai.front.filter((card) => canAttack(card, state.ai));
  while (attackers().length && !state.gameOver) {
    const action = chooseAiBattleAction(attackers());
    if (!action) {
      log("AIは紫禁の策謀を警戒し、攻撃を見送った。", "effect");
      break;
    }
    const { attacker, target } = action;
    await performAttack(attacker, target, { allowWhileBusy: true });
    await sleep(560);
  }

  if (!state.gameOver) {
    endTurn(state.ai);
    state.turnNumber += 1;
    startTurn(state.player);
    state.busy = false;
    render();
  } else {
    state.busy = false;
  }
}

async function aiPlayBestCard() {
  const ai = state.ai;
  const playableSupports = ai.hand
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => card.kind === "support" && canPay(ai, card))
    .filter(({ card }) => chooseSupportTarget(card, ai, state.player) !== false)
    .filter(({ card }) => isSupportWorthUsing(card, ai, state.player))
    .sort((a, b) => RARITY_ORDER[b.card.rarity] - RARITY_ORDER[a.card.rarity] || b.card.cost - a.card.cost);

  const playableChars = ai.hand
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => card.kind === "character" && canPay(ai, card))
    .map((entry) => ({ ...entry, slot: chooseAiSlot(entry.card) }))
    .filter((entry) => entry.slot)
    .sort((a, b) => scoreCardForAi(b.card, b.slot, ai) - scoreCardForAi(a.card, a.slot, ai));

  const needsBoardPresence = !ai.front.some(Boolean) && playableChars.length > 0;
  if (playableSupports.length && !needsBoardPresence && Math.random() < 0.42) {
    const { card, index } = playableSupports[0];
    const target = chooseSupportTarget(card, ai, state.player);
    await playAiSupportVisual(card, target);
    resolveSupport(ai, state.player, card, target);
    ai.hand.splice(index, 1);
    return true;
  }

  if (!playableChars.length) {
    if (playableSupports.length) {
      const { card, index } = playableSupports[0];
      const target = chooseSupportTarget(card, ai, state.player);
      await playAiSupportVisual(card, target);
      resolveSupport(ai, state.player, card, target);
      ai.hand.splice(index, 1);
      return true;
    }
    return false;
  }

  const { card, index, slot } = playableChars[0];
  playCharacterFromHand(ai, index, slot.lane, slot.index);
  return true;
}

async function playAiSupportVisual(card, target) {
  if (!card) return;
  const overlay = qs("#supportPlayOverlay");
  if (!overlay) {
    await sleep(SUPPORT_PLAY_VISUAL_DELAY);
    return;
  }

  const color = ELEMENT_COLORS[card.element || "無"] || ELEMENT_COLORS.無;
  const targetLine = target?.name ? `<p class="support-play-target">対象: ${escapeHtml(target.name)}</p>` : "";
  overlay.style.setProperty("--element", color);
  overlay.innerHTML = `
    <div class="support-play-panel">
      <div class="support-play-card" style="--card-image:url('assets/cards/${card.id}.png')" aria-hidden="true">
        <span class="support-play-card-top">${escapeHtml(card.no)} ${escapeHtml(card.rarity)}</span>
        <span class="support-play-cost">${effectiveCost(card, state.ai)}</span>
        <span class="support-play-type">${escapeHtml(card.supportType)}</span>
      </div>
      <div class="support-play-copy">
        <p class="support-play-kicker">AI SUPPORT CARD</p>
        <h3>${escapeHtml(card.name)}</h3>
        <p class="support-play-skill">${escapeHtml(card.skill)} / ${escapeHtml(card.supportType)}</p>
        <p class="support-play-text">${escapeHtml(card.text)}</p>
        ${targetLine}
      </div>
    </div>
  `;

  overlay.classList.remove("hidden", "is-leaving");
  overlay.classList.add("is-active");
  void overlay.offsetWidth;
  await sleep(SUPPORT_PLAY_VISUAL_DELAY);
  overlay.classList.add("is-leaving");
  await sleep(SUPPORT_PLAY_VISUAL_EXIT_DELAY);
  overlay.classList.add("hidden");
  overlay.classList.remove("is-active", "is-leaving");
  overlay.innerHTML = "";
}

function isSupportWorthUsing(card, player, foe) {
  switch (card.id) {
    case "S01":
    case "S03":
    case "S05":
    case "S14":
    case "S15":
      return getSupportTargets(card, player, foe).length > 0;
    case "S02":
      return player.deck.some((deckCard) => {
        const base = CARD_DB.get(deckCard.id);
        return base?.series === "Fate Tools" && ["C", "R"].includes(base.rarity);
      });
    case "S04":
      return !player.nextBackSkillDouble && player.back.some((slot) => !slot) && [...player.hand, ...player.deck].some((candidate) => isBackSkillCandidate(candidate));
    case "S06": {
      const ownCards = boardCards(player);
      const hasFire = ownCards.some((ally) => ally.element === "炎");
      const hasWater = ownCards.some((ally) => ally.element === "水");
      return hasFire && hasWater && foe.front.some(Boolean);
    }
    case "S07":
      return boardCards(player).length > 0;
    case "S08": {
      const threats = foe.front.filter((enemy) => enemy && enemy.status.stun <= 0 && effectiveAtk(enemy) > 0).length;
      return threats > 0 && player.counterAttack < threats;
    }
    case "S09":
      return player.front.some((ally) => canJoinUpcomingAttack(ally, player));
    case "S10":
      return player.deck.length > 0;
    case "S11":
      return boardCards(player).length > 0 && !player.delayed.some((effect) => effect.type === "eternalTime");
    case "S12":
      return boardCards(player).length > 0 && player.reviveTrap <= 0;
    case "S13": {
      const counts = countBy(boardCards(player), (ally) => ally.series);
      return Object.values(counts).some((count) => count >= 3);
    }
    case "S16":
      return !player.bannerTurns && player.hand.some((handCard) => handCard.kind === "character");
    default:
      return true;
  }
}

function isBackSkillCandidate(card) {
  return card?.kind === "character" && (card.backOnly || ["ST", "SP"].includes(card.role));
}

function canJoinUpcomingAttack(card, player) {
  if (!card || !player.front.includes(card)) return false;
  if (card.attacked || card.status.stun > 0) return false;
  if (card.dormant && !card.awakened) return false;
  if (effectiveAtk(card) <= 0) return false;
  const ready = card.haste || player.turns > card.summonedOnTurn;
  return ready && getLegalTargets(card, player).length > 0;
}

function aiLanePlanFor(card) {
  if (!card || card.kind !== "character") return AI_LANE_BACK;
  if (card.backOnly) return AI_LANE_BACK;
  const profileLane = state?.aiProfile?.lanePlan?.[card.id];
  if (profileLane === AI_LANE_FRONT || profileLane === AI_LANE_BACK) return profileLane;
  return AI_CHARACTER_LANE_PLAN[card.id] || (["AT", "GD"].includes(card.role) ? AI_LANE_FRONT : AI_LANE_BACK);
}

function isAiProfileBacklineLocked(card) {
  return Boolean(card?.id && state?.aiProfile?.lockedBackline?.includes(card.id));
}

function aiFrontPressureValue(card) {
  if (!card || card.backOnly) return 0;
  let score = effectiveAtk(card);
  if (card.haste) score += 2;
  if (card.dormant && !card.awakened) score -= 4;
  if (AI_FRONT_PRESSURE_EFFECT_IDS.has(card.id)) score += 1;
  return Math.max(0, score);
}

function shouldAiAdvanceBackPlanToFront(card, player) {
  if (!card || card.backOnly || aiLanePlanFor(card) !== AI_LANE_BACK) return false;
  if (isAiProfileBacklineLocked(card)) return false;
  if (!player.front.some((slot) => !slot)) return false;

  const pressure = aiFrontPressureValue(card);
  if (pressure < 2) return false;

  const frontCards = player.front.filter(Boolean);
  if (!frontCards.length) return true;

  const frontPressureCards = frontCards.filter((ally) => aiFrontPressureValue(ally) >= 2);
  if (!frontPressureCards.length) return true;

  const earlyBoard = player.turns <= 3;
  if (earlyBoard && frontCards.length < 2 && pressure >= 3) return true;

  const backIsFull = !player.back.some((slot) => !slot);
  return backIsFull && frontCards.length < player.front.length && pressure >= 3;
}

function chooseAiSlot(card) {
  const ai = state.ai;
  const frontOpen = ai.front.findIndex((slot) => !slot);
  const backOpen = ai.back.findIndex((slot) => !slot);
  if (card.backOnly) return backOpen >= 0 ? { lane: AI_LANE_BACK, index: backOpen } : null;

  const lanePlan = aiLanePlanFor(card);
  if (lanePlan === AI_LANE_FRONT) {
    return frontOpen >= 0 ? { lane: AI_LANE_FRONT, index: frontOpen } : null;
  }

  if (isAiProfileBacklineLocked(card)) {
    return backOpen >= 0 ? { lane: AI_LANE_BACK, index: backOpen } : null;
  }

  if (frontOpen >= 0 && shouldAiAdvanceBackPlanToFront(card, ai)) {
    return { lane: AI_LANE_FRONT, index: frontOpen };
  }
  if (backOpen >= 0) return { lane: AI_LANE_BACK, index: backOpen };
  return null;
}

function scoreCardForAi(card, slot = null, player = state.ai) {
  let score = RARITY_ORDER[card.rarity] * 10 + (card.atk || 0) + (card.def || 0) + (card.hp || 0) - card.cost * 0.4;
  if (!slot || card.kind !== "character") return score;

  const lanePlan = aiLanePlanFor(card);
  const frontCount = player.front.filter(Boolean).length;
  if (slot.lane === AI_LANE_FRONT) {
    score += aiFrontPressureValue(card) * 2;
    score += lanePlan === AI_LANE_FRONT ? 20 : -6;
    if (!frontCount) {
      score += lanePlan === AI_LANE_FRONT ? 28 : 8;
    } else if (frontCount < 2 && player.turns <= 3) {
      score += lanePlan === AI_LANE_FRONT ? 10 : 3;
    }
  } else if (slot.lane === AI_LANE_BACK) {
    score += lanePlan === AI_LANE_BACK ? 8 : -20;
    if (player.nextBackSkillDouble && isBackSkillCandidate(card)) score += 6;
  }

  return score;
}

function aiAttackValueForTarget(attacker, targetCard) {
  let attackValue = effectiveAtk(attacker);
  if (attacker.id === "C44" && targetCard?.role === "ST") attackValue += 2;
  if (targetCard?.id === "C03") attackValue = Math.max(1, attackValue - 1);
  return Math.max(0, attackValue);
}

function aiAttackIgnoresDef(attacker) {
  return attacker.id === "C28" || (attacker.id === "C46" && !attacker.atomicFlareUsed);
}

function aiPredictedDamageProfile(attacker, targetCard, availableDef = effectiveDef(targetCard)) {
  const attackValue = aiAttackValueForTarget(attacker, targetCard);
  if (aiAttackIgnoresDef(attacker)) {
    return { hpDamage: attackValue, shieldDamage: 0, totalDamage: attackValue };
  }

  const shieldDamage = Math.min(Math.max(0, availableDef), attackValue);
  const hpDamage = Math.max(0, attackValue - shieldDamage);
  return { hpDamage, shieldDamage, totalDamage: attackValue };
}

function aiCanRemoveTargetWithDamage(targetCard, hpDamage) {
  if (!targetCard || hpDamage < targetCard.currentHp) return false;
  return targetCard.id !== "C49" || targetCard.lastStandUsed;
}

function aiAttackersForTarget(targetCard) {
  return state.ai.front.filter((candidate) => {
    if (!canAttack(candidate, state.ai)) return false;
    return getLegalTargets(candidate, state.ai).some((target) => target.type === "card" && target.card === targetCard);
  });
}

function aiFocusedDamageProfile(targetCard, attackers) {
  let availableDef = effectiveDef(targetCard);
  let remainingHp = targetCard.currentHp;
  let lastStandAvailable = targetCard.id === "C49" && !targetCard.lastStandUsed;
  let removes = false;
  let hpDamage = 0;
  let shieldDamage = 0;
  attackers
    .slice()
    .sort((a, b) => aiAttackValueForTarget(b, targetCard) - aiAttackValueForTarget(a, targetCard))
    .forEach((candidate) => {
      if (removes) return;
      const profile = aiPredictedDamageProfile(candidate, targetCard, availableDef);
      hpDamage += profile.hpDamage;
      shieldDamage += profile.shieldDamage;
      if (!aiAttackIgnoresDef(candidate)) availableDef = Math.max(0, availableDef - profile.shieldDamage);
      if (profile.hpDamage >= remainingHp) {
        if (lastStandAvailable) {
          lastStandAvailable = false;
          remainingHp = 1;
        } else {
          removes = true;
        }
      } else {
        remainingHp -= profile.hpDamage;
      }
    });
  return {
    hpDamage,
    shieldDamage,
    removes,
  };
}

function isHighValueBacklineTarget(card) {
  if (!card) return false;
  return ["ST", "SP"].includes(card.role) || effectiveAtk(card) >= 4 || card.awaken || card.effectNullify > 0;
}

function aiShouldFocusFrontline(cardTargets) {
  const frontTargets = cardTargets.filter((target) => findCardLocation(target.card)?.lane === AI_LANE_FRONT);
  if (!frontTargets.length) return false;
  if (activeGuards(state.player).length) return true;

  const attackers = state.ai.front.filter((candidate) => canAttack(candidate, state.ai));
  if (attackers.length >= 2) return true;

  return frontTargets.some(({ card }) => {
    const focused = aiFocusedDamageProfile(card, aiAttackersForTarget(card));
    return focused.removes || card.tags?.includes("guard") || effectiveAtk(card) >= 3;
  });
}

function aiAttackSynergyScore(attacker, targetCard, profile, removes, location) {
  let score = 0;
  if (attacker.id === "C14" && location?.lane === AI_LANE_FRONT) score += 6;
  if (attacker.id === "C22" && !removes && effectiveAtk(targetCard) > 0) score += 4;
  if (attacker.id === "C34" && profile.hpDamage > 0) score += 5;
  if (attacker.id === "C35" && !removes && effectiveDef(targetCard) > 0) score += 3;
  if (attacker.id === "C44" && targetCard.role === "ST") score += 10;
  if (attacker.id === "C46" && removes) {
    score += location?.lane === AI_LANE_FRONT ? 12 : 4;
    if (state.player.back.some(Boolean)) score += 6;
  }
  if (attacker.id === "C64" && removes && !attacker.sionReattackUsed) score += 10;
  return score;
}

function aiCounterAttackDamage(attacker, target) {
  let attackValue = effectiveAtk(attacker);
  if (attacker.id === "C16") attackValue += 3;
  if (target?.type === "card" && attacker.id === "C44" && target.card.role === "ST") attackValue += 2;
  if (attacker.id === "C03") attackValue = Math.max(1, attackValue - 1);
  return Math.max(0, attackValue);
}

function aiCounterAttackOutcome(attacker, target) {
  const reflectedDamage = aiCounterAttackDamage(attacker, target);
  const usesLastStand = attacker.id === "C49" && !attacker.lastStandUsed && reflectedDamage >= attacker.currentHp;
  const survives = reflectedDamage < attacker.currentHp || usesLastStand;
  return {
    reflectedDamage,
    survives,
    usesLastStand,
    remainingHp: usesLastStand ? 1 : Math.max(0, attacker.currentHp - reflectedDamage),
  };
}

function chooseAiCounterBaitTarget(attacker) {
  return getLegalTargets(attacker, state.ai)
    .map((target) => ({ target, outcome: aiCounterAttackOutcome(attacker, target) }))
    .sort((a, b) => a.outcome.reflectedDamage - b.outcome.reflectedDamage)[0]?.target;
}

function isAiCounterBaitAcceptable(attacker, outcome) {
  if (!outcome.survives || outcome.usesLastStand) return false;
  if (effectiveAtk(attacker) <= 1 && outcome.reflectedDamage <= 1) return true;
  if (outcome.remainingHp < 2) return false;
  if (outcome.reflectedDamage <= 2) return true;
  return effectiveAtk(attacker) <= 3 && outcome.reflectedDamage <= Math.ceil(attacker.currentHp / 2);
}

function scoreAiCounterBait(attacker, outcome) {
  let score = outcome.reflectedDamage * 20 + effectiveAtk(attacker) * 4 + aiFrontPressureValue(attacker) * 3;
  if (outcome.remainingHp === 1) score += 12;
  if (outcome.remainingHp === 2) score += 4;
  if (attacker.id === "C16") score += 12;
  if (attacker.id === "C46" && !attacker.atomicFlareUsed) score += 28;
  if (attacker.id === "C64" && !attacker.sionReattackUsed) score += 14;
  return score;
}

function chooseAiCounterBaitAction(availableAttackers) {
  if (state.player.counterAttack <= 0) return null;
  if (availableAttackers.length <= state.player.counterAttack) return null;

  return availableAttackers
    .map((attacker) => {
      const target = chooseAiCounterBaitTarget(attacker);
      if (!target) return null;
      const outcome = aiCounterAttackOutcome(attacker, target);
      if (!isAiCounterBaitAcceptable(attacker, outcome)) return null;
      return {
        attacker,
        target,
        score: scoreAiCounterBait(attacker, outcome),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.score - b.score)[0] || null;
}

function chooseAiBattleAction(availableAttackers) {
  const counterBait = chooseAiCounterBaitAction(availableAttackers);
  if (state.player.counterAttack > 0) return counterBait;
  const attacker = availableAttackers.slice().sort((a, b) => effectiveAtk(b) - effectiveAtk(a))[0];
  return attacker ? { attacker, target: chooseAiAttackTarget(attacker) } : null;
}

function scoreAiAttackTarget(attacker, target, context) {
  const card = target.card;
  const location = findCardLocation(card);
  const profile = aiPredictedDamageProfile(attacker, card);
  const focused = aiFocusedDamageProfile(card, aiAttackersForTarget(card));
  const removesNow = aiCanRemoveTargetWithDamage(card, profile.hpDamage);
  const breaksLastStand = card.id === "C49" && !card.lastStandUsed && profile.hpDamage >= card.currentHp;
  const lowHpValue = Math.max(0, 7 - card.currentHp);
  const threatValue = effectiveAtk(card) * 1.1;
  let score = lowHpValue + threatValue + profile.hpDamage * 4 + profile.shieldDamage * 1.5;

  if (location?.lane === AI_LANE_FRONT) {
    score += context.focusFrontline ? 34 : 20;
    if (card.tags?.includes("guard")) score += 16;
    if (["AT", "GD"].includes(card.role)) score += 5;
    if (removesNow) score += 36;
    if (focused.removes) score += 24;
    if (breaksLastStand) score += 18;
    score += focused.hpDamage * 1.2 + focused.shieldDamage * 0.6;
  } else {
    score += ["ST", "SP"].includes(card.role) ? 8 : 0;
    if (removesNow) score += isHighValueBacklineTarget(card) ? 38 : 24;
    if (breaksLastStand) score += 12;
    if (context.frontExists) score -= context.focusFrontline ? 34 : 16;
    if (context.frontRemovable && !removesNow) score -= 18;
    if (removesNow && isHighValueBacklineTarget(card)) score += 18;
  }

  return score + aiAttackSynergyScore(attacker, card, profile, removesNow, location);
}

function chooseAiAttackTarget(attacker) {
  const targets = getLegalTargets(attacker, state.ai);
  const lpTarget = targets.find((target) => target.type === "lp");
  if (lpTarget && state.player.lp <= effectiveAtk(attacker)) return lpTarget;
  const cardTargets = targets.filter((target) => target.type === "card");
  if (!cardTargets.length) return lpTarget;
  const focusFrontline = aiShouldFocusFrontline(cardTargets);
  const frontTargets = cardTargets.filter((target) => findCardLocation(target.card)?.lane === AI_LANE_FRONT);
  const context = {
    focusFrontline,
    frontExists: frontTargets.length > 0,
    frontRemovable: frontTargets.some(({ card }) => aiFocusedDamageProfile(card, aiAttackersForTarget(card)).removes),
  };

  return cardTargets
    .map((target) => ({ target, score: scoreAiAttackTarget(attacker, target, context) }))
    .sort((a, b) => b.score - a.score)[0].target;
}

function getHandCardFromEvent(event) {
  const cardEl = event.target.closest(".game-card[data-hand-index]");
  if (!cardEl) return null;
  const index = Number(cardEl.dataset.handIndex);
  const card = state.player.hand[index];
  return card ? { cardEl, index, card } : null;
}

function isHandDoubleTap(found) {
  const now = window.performance?.now?.() || Date.now();
  const repeated =
    lastHandTap.index === found.index &&
    lastHandTap.instanceId === found.card.instanceId &&
    now - lastHandTap.at <= HAND_DOUBLE_TAP_MS;
  lastHandTap = {
    index: found.index,
    instanceId: found.card.instanceId,
    at: now,
  };
  return repeated;
}

function clearHandTapState() {
  lastHandTap = { index: null, instanceId: null, at: 0 };
}

function handleHandHover(event) {
  const found = getHandCardFromEvent(event);
  if (!found) return;
  openHandDock();
  showSkillPopup(found.card, found.cardEl);
}

function handleHandOut(event) {
  const fromCard = event.target.closest(".game-card[data-hand-index]");
  if (!fromCard) return;
  const toCard = event.relatedTarget?.closest?.(".game-card[data-hand-index]");
  if (toCard === fromCard) return;
  hideSkillPopup();
}

function handleDeckEditorCardPreview(event) {
  if (event.pointerType === "touch") return;
  if (isDeckEditorCardPreviewSuppressed()) return;
  const cardButton = event.target.closest(".deck-edit-card[data-card-id]");
  if (!cardButton || !qs("#deckEditor")?.contains(cardButton)) return;
  if (event.target.closest(".deck-card-mode-btn")) return;
  if (deckEditorLibraryDetailCardId) return;
  showDeckCardPopup(cardButton.dataset.cardId, cardButton);
}

function handleDeckEditorCardOut(event) {
  const fromCard = event.target.closest(".deck-edit-card[data-card-id]");
  if (!fromCard) return;
  const toCard = event.relatedTarget?.closest?.(".deck-edit-card[data-card-id]");
  if (toCard === fromCard) return;
  if (deckEditorLibraryDetailCardId) return;
  hideSkillPopup();
}

function handleHandClick(event) {
  const found = getHandCardFromEvent(event);
  openHandDock();
  if (!found || state.busy || state.current !== "player") return;
  const doubleTap = isHandDoubleTap(found);
  state.pendingSupport = null;
  state.selectedHandIndex = found.index;
  state.selectedField = null;
  state.selectedAttackerId = null;
  showSkillPopup(found.card, found.cardEl);
  audio.sfx("draw");
  if (doubleTap) {
    clearHandTapState();
    if (state.phase !== "main") {
      log("手札の使用・配置はメインフェイズ中のみ可能です。", "warn");
      render();
      return;
    }
    if (found.card.kind === "support") {
      useSelectedSupport();
      return;
    }
    if (found.card.kind === "character") {
      hideSkillPopup();
      closeHandDock();
      if (!canPay(state.player, found.card)) {
        log("エネルギーが足りない。", "warn");
      } else if (!hasPlayableSlotForCard(state.player, found.card)) {
        log(`${found.card.name} を配置できる空き枠がない。`, "warn");
      } else {
        log(`${found.card.name} の配置先を選択してください。`, "summon");
      }
      render();
      return;
    }
  }
  render();
}

async function handleFieldClick(event) {
  if (state.busy || state.current !== "player") return;
  hideSkillPopup();
  const cardEl = event.target.closest(".field-card");
  const slotEl = event.target.closest(".slot");

  if (cardEl) {
    closeHandDock();
    const owner = cardEl.dataset.owner;
    const lane = cardEl.dataset.lane;
    const index = Number(cardEl.dataset.index);
    const card = state[owner][lane][index];
    if (state.pendingSupport) {
      if (isSupportTargetable(card)) {
        completeSupportTarget(card);
      } else {
        log("そのカードは対象にできません。", "warn");
        render();
      }
      return;
    }
    if (state.phase === "battle") {
      const attacker = getSelectedAttacker();
      if (owner === "player" && lane === "front" && canAttack(card, state.player)) {
        state.selectedAttackerId = card.instanceId;
        state.selectedField = { owner, lane, index };
        state.selectedHandIndex = null;
        audio.sfx("phase");
        render();
        return;
      }
      if (owner === "ai" && attacker && isCardTargetable(card)) {
        performAttack(attacker, { type: "card", card });
        return;
      }
    }
    state.selectedField = { owner, lane, index };
    state.selectedHandIndex = null;
    state.selectedAttackerId = null;
    render();
    return;
  }

  if (state.pendingSupport) return;
  if (!slotEl || state.phase !== "main") return;
  const owner = slotEl.dataset.owner;
  const lane = slotEl.dataset.lane;
  const index = Number(slotEl.dataset.index);
  if (!isPlayableSlot(owner, lane, index)) return;
  event.stopPropagation();
  await animateHandSummonOut();
  closeHandDock();
  playCharacterFromHand(state.player, state.selectedHandIndex, lane, index);
}

async function animateHandSummonOut() {
  const handIndex = state.selectedHandIndex;
  if (handIndex === null) return;
  const handCard = document.querySelector(`.game-card[data-hand-index="${handIndex}"]`);
  if (!handCard) return;
  state.busy = true;
  renderControls();
  handCard.classList.remove("summon-out");
  void handCard.offsetWidth;
  handCard.classList.add("summon-out");
  await sleep(SUMMON_OUT_DELAY);
  state.busy = false;
}

function bindEvents() {
  qs("#startDuelBtn").addEventListener("click", () => {
    audio.unlock();
    openLevelSelect();
  });
  qs("#closeLevelSelectBtn").addEventListener("click", closeLevelSelect);
  qs("#levelSelectModal").addEventListener("click", (event) => {
    if (event.target.id === "levelSelectModal") closeLevelSelect();
  });
  qs("#levelSelectList").addEventListener("click", (event) => {
    const button = event.target.closest(".level-select-button[data-ai-level]");
    if (!button) return;
    const profile = aiProfileForLevel(button.dataset.aiLevel);
    if (!unlockedAiProfiles().some((unlocked) => unlocked.level === profile.level)) return;
    audio.unlock();
    startNewGame(profile);
  });
  qs("#openingMovieBtn").addEventListener("click", () => {
    audio.unlock();
    openOpeningMovie();
  });
  qs("#closeOpeningMovieBtn").addEventListener("click", closeOpeningMovie);
  qs("#openingMovieModal").addEventListener("click", (event) => {
    if (event.target.id === "openingMovieModal") closeOpeningMovie();
  });
  qs("#howToPlayBtn").addEventListener("click", () => {
    audio.unlock();
    openHowToPlay();
  });
  qs("#closeHowToPlayBtn").addEventListener("click", closeHowToPlay);
  qs("#howToPlayModal").addEventListener("click", (event) => {
    if (event.target.id === "howToPlayModal") closeHowToPlay();
  });
  qs("#dataTransferBtn").addEventListener("click", () => {
    audio.unlock();
    openDataTransfer();
  });
  qs("#closeDataTransferBtn").addEventListener("click", closeDataTransfer);
  qs("#dataTransferModal").addEventListener("click", (event) => {
    if (event.target.id === "dataTransferModal") closeDataTransfer();
  });
  qs("#exportSignedDataBtn").addEventListener("click", handleSignedDataExport);
  qs("#importSignedDataBtn").addEventListener("click", handleSignedDataImportRequest);
  qs("#signedDataFileInput").addEventListener("change", handleSignedDataImportFile);
  qs("#deckEditBtn").addEventListener("click", () => {
    audio.unlock();
    openDeckEditor();
  });
  qs("#closeDeckEditorBtn").addEventListener("click", closeDeckEditor);
  qs("#galleryBtn").addEventListener("click", () => {
    audio.unlock();
    openGallery();
  });
  qs("#closeGalleryBtn").addEventListener("click", closeGallery);
  qs("#galleryCardGrid").addEventListener("click", (event) => {
    const button = event.target.closest(".gallery-card-button[data-card-id]");
    if (!button) return;
    gallerySelectedCardId = button.dataset.cardId;
    hideSkillPopup();
    renderGallery();
  });
  qs("#galleryBgmList").addEventListener("click", (event) => {
    const button = event.target.closest(".gallery-bgm-button[data-track]");
    if (!button) return;
    audio.unlock();
    selectGalleryMusic(button.dataset.track);
  });
  qs("#galleryCardGrid").addEventListener("pointerover", (event) => {
    const button = event.target.closest(".gallery-card-button[data-card-id]");
    if (button) showDeckCardPopup(button.dataset.cardId, button);
  });
  qs("#galleryCardGrid").addEventListener("pointerout", (event) => {
    const fromCard = event.target.closest(".gallery-card-button[data-card-id]");
    if (!fromCard) return;
    const toCard = event.relatedTarget?.closest?.(".gallery-card-button[data-card-id]");
    if (toCard === fromCard) return;
    hideSkillPopup();
  });
  qs("#resetDeckBtn").addEventListener("click", resetDeckEditor);
  qs("#saveDeckBtn").addEventListener("click", saveDeckEditor);
  qs("#deckSlotButtons").addEventListener("click", (event) => {
    const button = event.target.closest(".deck-slot-button[data-deck-slot]");
    if (!button) return;
    requestDeckSlotSwitch(button.dataset.deckSlot);
  });
  qs("#cancelDeckSlotSwitchBtn").addEventListener("click", closeDeckSlotSwitchConfirm);
  qs("#confirmDeckSlotSwitchBtn").addEventListener("click", confirmDeckSlotSwitch);
  qs("#deckSlotConfirmModal").addEventListener("click", (event) => {
    if (event.target.id === "deckSlotConfirmModal") closeDeckSlotSwitchConfirm();
  });
  qs("#toggleDeckListBtn").addEventListener("click", toggleDeckListVisibility);
  qs("#toggleLibraryBtn").addEventListener("click", toggleLibraryVisibility);
  qs("#toggleExchangeListBtn").addEventListener("click", toggleExchangeVisibility);
  qs("#ownedOnlyLibraryBtn").addEventListener("click", toggleLibraryOwnedOnly);
  qs("#librarySortBtn").addEventListener("click", openDeckSortModal);
  qs("#cancelDeckSortBtn").addEventListener("click", closeDeckSortModal);
  qs("#resetDeckSortBtn").addEventListener("click", resetDeckSortModal);
  qs("#applyDeckSortBtn").addEventListener("click", applyDeckSortModal);
  qs("#deckSortOptions").addEventListener("change", (event) => {
    const input = event.target.closest("input[type='checkbox'][data-filter-key]");
    if (input) togglePendingDeckSortFilter(input);
  });
  qs("#cardLibrary").addEventListener("scroll", scheduleDeckEditorLibraryDetailVisibilityCheck, { passive: true });
  qs("#deckEditor .deck-editor-shell").addEventListener("scroll", scheduleDeckEditorLibraryDetailVisibilityCheck, { passive: true });
  document.addEventListener("click", (event) => {
    if (
      deckEditorLibraryDetailCardId &&
      !event.target.closest("#cardLibrary .deck-edit-card") &&
      !event.target.closest("#skillPopup")
    ) {
      hideSkillPopup();
    }
    if (event.target.closest("#cancelExchangeBtn")) {
      event.preventDefault();
      closeExchangeConfirm();
    }
    if (event.target.closest("#confirmExchangeBtn")) {
      event.preventDefault();
      confirmPendingExchange();
    }
  });
  qs("#exchangeConfirmModal").addEventListener("click", (event) => {
    if (event.target.id === "exchangeConfirmModal") closeExchangeConfirm();
  });
  qs("#cardLibrary").addEventListener("click", (event) => {
    const modeButton = event.target.closest(".deck-card-mode-btn[data-card-id]");
    if (modeButton) {
      toggleDeckEditorCardView(modeButton.dataset.cardId, modeButton.dataset.zone);
      return;
    }
    const cardButton = event.target.closest(".deck-edit-card[data-card-id]");
    if (!cardButton) return;
    handleDeckEditorLibraryCardActivation(cardButton);
  });
  qs("#deckList").addEventListener("click", (event) => {
    const modeButton = event.target.closest(".deck-card-mode-btn[data-card-id]");
    if (modeButton) {
      toggleDeckEditorCardView(modeButton.dataset.cardId, modeButton.dataset.zone);
      return;
    }
    const cardButton = event.target.closest(".deck-edit-card[data-card-id]");
    if (!cardButton) return;
    removeDeckCard(cardButton.dataset.cardId);
  });
  qs("#exchangeList").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-exchange-action][data-card-id]");
    if (!button || button.disabled) return;
    if (button.dataset.exchangeAction === "sell") requestExchangeCardForPoints(button.dataset.cardId);
    if (button.dataset.exchangeAction === "buy") buyCardWithPoints(button.dataset.cardId);
  });
  [qs("#cardLibrary"), qs("#deckList")].forEach((deckArea) => {
    deckArea.addEventListener("keydown", (event) => {
      if (event.target.closest(".deck-card-mode-btn")) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      const cardButton = event.target.closest(".deck-edit-card[data-card-id]");
      if (!cardButton) return;
      event.preventDefault();
      if (cardButton.dataset.zone === "library") {
        handleDeckEditorLibraryCardActivation(cardButton);
      } else {
        removeDeckCard(cardButton.dataset.cardId);
      }
    });
  });
  qs("#exchangeList").addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const button = event.target.closest("button[data-exchange-action][data-card-id]");
    if (!button || button.disabled) return;
    event.preventDefault();
    if (button.dataset.exchangeAction === "sell") requestExchangeCardForPoints(button.dataset.cardId);
    if (button.dataset.exchangeAction === "buy") buyCardWithPoints(button.dataset.cardId);
  });
  [qs("#cardLibrary"), qs("#deckList")].forEach((deckArea) => {
    deckArea.addEventListener("pointerover", handleDeckEditorCardPreview);
    deckArea.addEventListener("pointermove", handleDeckEditorCardPreview);
    deckArea.addEventListener("pointerout", handleDeckEditorCardOut);
    deckArea.addEventListener("focusin", handleDeckEditorCardPreview);
    deckArea.addEventListener("focusout", handleDeckEditorCardOut);
  });
  qs("#exchangeList").addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch") return;
    if (isDeckEditorCardPreviewSuppressed()) return;
    if (deckEditorLibraryDetailCardId) return;
    const card = event.target.closest(".deck-exchange-card[data-card-id]");
    if (card) showDeckCardPopup(card.dataset.cardId, card);
  });
  qs("#exchangeList").addEventListener("pointerout", (event) => {
    const fromCard = event.target.closest(".deck-exchange-card[data-card-id]");
    if (!fromCard) return;
    const toCard = event.relatedTarget?.closest?.(".deck-exchange-card[data-card-id]");
    if (toCard === fromCard) return;
    if (deckEditorLibraryDetailCardId) return;
    hideSkillPopup();
  });
  qs("#newGameBtn").addEventListener("click", openNewGameConfirm);
  qs("#cancelNewGameBtn").addEventListener("click", closeNewGameConfirm);
  qs("#confirmNewGameBtn").addEventListener("click", confirmNewGameRestart);
  qs("#newGameConfirmModal").addEventListener("click", (event) => {
    if (event.target.id === "newGameConfirmModal") closeNewGameConfirm();
  });
  qs("#battleBtn").addEventListener("click", () => {
    if (state.current !== "player" || state.phase !== "main" || state.busy) return;
    hideSkillPopup();
    closeHandDock();
    state.pendingSupport = null;
    state.phase = "battle";
    state.selectedHandIndex = null;
    state.selectedField = null;
    audio.sfx("phase");
    audio.speak("バトルフェイズ");
    log("バトルフェイズへ。", "phase");
    render();
  });
  qs("#endTurnBtn").addEventListener("click", () => {
    if (!canAcceptPlayerCommands()) return;
    hideSkillPopup();
    closeHandDock();
    state.pendingSupport = null;
    endTurn(state.player);
    state.turnNumber += 1;
    render();
    runAiTurn();
  });
  qs("#playerHand").addEventListener("pointerover", handleHandHover);
  qs("#playerHand").addEventListener("pointermove", handleHandHover);
  qs("#playerHand").addEventListener("pointerout", handleHandOut);
  qs("#playerHand").addEventListener("click", handleHandClick);
  qs("#playerHand").addEventListener("scroll", syncHandScrollFromCards);
  qs("#handScrollTop").addEventListener("scroll", syncHandScrollFromTop);
  qs("#handDock").addEventListener("click", (event) => {
    if (!event.target.closest(".game-card")) openHandDock();
  });
  window.addEventListener("resize", updateHandScrollProxy);
  window.addEventListener("resize", scheduleDeckEditorLibraryDetailVisibilityCheck);
  document.addEventListener("click", (event) => {
    if (event.target.closest("#handDock")) return;
    closeHandDock();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!qs("#levelSelectModal").classList.contains("hidden")) closeLevelSelect();
    if (!qs("#openingMovieModal").classList.contains("hidden")) closeOpeningMovie();
    if (!qs("#howToPlayModal").classList.contains("hidden")) closeHowToPlay();
    if (!qs("#dataTransferModal").classList.contains("hidden")) closeDataTransfer();
    if (!qs("#newGameConfirmModal").classList.contains("hidden")) closeNewGameConfirm();
    if (!qs("#deckSlotConfirmModal").classList.contains("hidden")) closeDeckSlotSwitchConfirm();
    if (!qs("#galleryView").classList.contains("hidden")) closeGallery();
  });
  qs(".field-wrap").addEventListener("click", handleFieldClick);
  qs("#inspectPanel").addEventListener("click", (event) => {
    if (event.target.id === "useSupportBtn") useSelectedSupport();
  });
  qs("#choiceCards").addEventListener("click", (event) => {
    const option = event.target.closest(".choice-option[data-choice-index]");
    if (!option) return;
    completeDeckChoice(Number(option.dataset.choiceIndex));
  });
  qs("#opponentLpTarget").addEventListener("click", () => {
    const attacker = getSelectedAttacker();
    if (!attacker || !isLpTargetable() || state.busy) return;
    performAttack(attacker, { type: "lp", player: state.ai });
  });
  qs("#nextBattleBtn").addEventListener("click", () => {
    qs("#rewardModal").classList.add("hidden");
    startNewGame(state?.aiProfile || null);
  });
  qs("#returnTitleBtn").addEventListener("click", () => {
    qs("#rewardModal").classList.add("hidden");
    hideSkillPopup();
    closeHandDock();
    showTitleScreen();
  });
  qs("#musicBtn").addEventListener("click", () => {
    audio.unlock();
    audio.musicOn = !audio.musicOn;
    qs("#musicBtn").classList.toggle("is-on", audio.musicOn);
    if (audio.musicOn) audio.startMusic();
    else audio.stopMusic();
  });
  qs("#battleBgmStyleBtn").addEventListener("click", () => {
    audio.unlock();
    toggleBattleBgmStyle();
  });
  qs("#sfxBtn").addEventListener("click", () => {
    audio.sfxOn = !audio.sfxOn;
    qs("#sfxBtn").classList.toggle("is-on", audio.sfxOn);
  });
  qs("#voiceBtn").addEventListener("click", () => {
    audio.voiceOn = !audio.voiceOn;
    qs("#voiceBtn").classList.toggle("is-on", audio.voiceOn);
    if (!audio.voiceOn) audio.stopVoice();
  });
}

function animateCard(instanceId, className = "", text = "", heal = false, amount = 0) {
  const el = document.querySelector(`[data-iid="${instanceId}"]`);
  if (!el) return;
  if (className) {
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
  }
  if (text) {
    addFloatingPop(el, text, heal, amount);
  }
}

function addFloatingPop(el, text, heal = false, amount = 0) {
  const pop = document.createElement("div");
  const tierClass = !heal ? damageTierClass(amount) : "";
  pop.className = [heal ? "heal-pop" : "damage-pop", tierClass].filter(Boolean).join(" ");
  pop.textContent = text;
  el.appendChild(pop);
  window.setTimeout(() => pop.remove(), 980);
}

function damageTierClass(amount) {
  if (amount >= 7) return "impact-high";
  if (amount >= 4) return "impact-mid";
  return "impact-low";
}

function log(message) {
  state.log.push(message);
  if (state.log.length > 140) state.log.shift();
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomItem(items) {
  if (!items.length) return null;
  return items[Math.floor(Math.random() * items.length)];
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

bindEvents();
battleBgmStyle = loadBattleBgmStyle();
updateBattleBgmStyleButton();
showTitleScreen();
