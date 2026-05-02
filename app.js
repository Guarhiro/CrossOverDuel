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
  UR: 4,
};

const ATTACK_IMPACT_DELAY = 390;
const IMPACT_SETTLE_DELAY = 460;
const SUMMON_OUT_DELAY = 260;
const SUMMON_IN_CLEAR_DELAY = 680;

const CHARACTERS = [
  {
    kind: "character",
    id: "C01",
    no: "#01",
    rarity: "UR",
    name: "緋山玲奈",
    series: "H",
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
    series: "A",
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
    series: "E",
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
    series: "U",
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
    series: "Y",
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
    series: "T",
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
    series: "F",
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
    series: "P",
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
    series: "J",
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
    series: "J",
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
    series: "J",
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
    series: "U",
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
    text: "味方1体の次のスキル効果を2倍にする。前衛配置不可",
    backOnly: true,
  },
  {
    kind: "character",
    id: "C16",
    no: "#16",
    rarity: "SR",
    name: "烈 龍翔",
    series: "O",
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
    series: "O",
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
    series: "O",
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
    series: "T",
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
    series: "F",
    element: "炎",
    role: "GD",
    cost: 3,
    atk: 2,
    def: 3,
    hp: 4,
    skill: "熱血実況",
    text: "味方が攻撃するたびATK+1（最大+5）。壁兼火力。【ガード】",
    tags: ["guard"],
  },
  {
    kind: "character",
    id: "C22",
    no: "#22",
    rarity: "R",
    name: "ヴィクトル",
    series: "F",
    element: "風",
    role: "AT",
    cost: 3,
    atk: 4,
    def: 0,
    hp: 3,
    skill: "元傭兵の戦技",
    text: "先制攻撃（配置直後に攻撃可能）。攻撃した相手のATK-1",
    haste: true,
  },
  {
    kind: "character",
    id: "C23",
    no: "#23",
    rarity: "R",
    name: "氷室 透",
    series: "S",
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
    series: "S",
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
    series: "E",
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
    series: "Y",
    element: "風",
    role: "AT",
    cost: 3,
    atk: 4,
    def: 1,
    hp: 4,
    skill: "勇者の血筋",
    text: "攻撃後味方1体HP2回復。ニィアルが場にいるとATK+2",
  },
  {
    kind: "character",
    id: "C27",
    no: "#27",
    rarity: "C",
    name: "藤宮 沙織",
    series: "T",
    element: "炎",
    role: "ST",
    cost: 1,
    atk: 1,
    def: 1,
    hp: 3,
    skill: "甲斐甲斐しい母性",
    text: "毎ターン味方1体のHP2回復",
  },
  {
    kind: "character",
    id: "C28",
    no: "#28",
    rarity: "C",
    name: "天城 ルナ",
    series: "T",
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
    series: "T",
    element: "風",
    role: "AT",
    cost: 2,
    atk: 3,
    def: 0,
    hp: 2,
    skill: "乙女の一閃",
    text: "配置ターンに攻撃可能。2ターン後自動撤退",
    haste: true,
  },
  {
    kind: "character",
    id: "C30",
    no: "#30",
    rarity: "C",
    name: "白石 凛",
    series: "T",
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
    series: "F",
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
    series: "F",
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
    series: "F",
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
    series: "F",
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
    series: "F",
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
    series: "F",
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
    series: "F",
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
    series: "A",
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
    series: "A",
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
    series: "P",
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
    series: "E",
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
    series: "E",
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
    series: "E",
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
    series: "U",
    element: "地",
    role: "AT",
    cost: 2,
    atk: 3,
    def: 2,
    hp: 3,
    skill: "元騎士の意地",
    text: "スキルなし",
  },
];

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
    text: "炎属性と水属性が場にいる時、相手前衛全体に3ダメージ",
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
    text: "撤退した味方1体を手札に戻す（DEFは初期値で復帰）",
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
    cost: 2,
    series: "共通",
    element: "地",
    skill: "修復",
    text: "味方1体のDEFを初期値まで回復",
  },
];

const ALL_CARDS = [...CHARACTERS, ...SUPPORTS];
const CARD_DB = new Map(ALL_CARDS.map((card) => [card.id, card]));

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
const PLAYER_DECK_SIZE = PLAYER_DECK.length;
const FREEPLAY_WIN_STORAGE_KEY = "crossover-duel-freeplay-wins";
const FREEPLAY_MAX_WINS = 50;
const BATTLE_BGM_STYLE_STORAGE_KEY = "crossover-duel-battle-bgm-style";

// Update this staged list when new cards are added to the game.
const AI_DECKS = [
  {
    level: 1,
    wins: 0,
    name: "Rookie Line",
    deck: ["C28", "C28", "C29", "C29", "C30", "C30", "C31", "C32", "C33", "C34", "C35", "C37", "C38", "C40", "C41", "S07", "S07", "S10", "S15", "S15"],
  },
  {
    level: 2,
    wins: 5,
    name: "Guard Basics",
    deck: ["C21", "C21", "C25", "C30", "C30", "C35", "C35", "C41", "C42", "C43", "C44", "C45", "S07", "S07", "S10", "S10", "S12", "S13", "S15", "S15"],
  },
  {
    level: 3,
    wins: 10,
    name: "Fate Tools Tempo",
    deck: ["C20", "C20", "C22", "C22", "C26", "C26", "C31", "C36", "C41", "C44", "C45", "S02", "S02", "S07", "S07", "S10", "S10", "S12", "S15", "S15"],
  },
  {
    level: 4,
    wins: 15,
    name: "Counter Wall",
    deck: ["C21", "C21", "C25", "C25", "C30", "C30", "C40", "C40", "C14", "C16", "C18", "C35", "S03", "S03", "S06", "S06", "S08", "S10", "S14", "S15"],
  },
  {
    level: 5,
    wins: 20,
    name: "Silver Snow Trial",
    deck: ["C05", "C14", "C14", "C16", "C16", "C18", "C18", "C30", "C30", "C45", "S03", "S03", "S06", "S06", "S08", "S14", "S14", "S15", "S11", "S07"],
  },
  {
    level: 6,
    wins: 25,
    name: "Twin Blade Guard",
    deck: ["C05", "C05", "C14", "C14", "C16", "C16", "C18", "C18", "C30", "C40", "S03", "S03", "S06", "S06", "S08", "S08", "S11", "S14", "S14", "S15"],
  },
  {
    level: 7,
    wins: 30,
    name: "Awakening Rose",
    deck: ["C02", "C02", "C05", "C08", "C14", "C16", "C18", "C23", "C25", "C30", "S03", "S05", "S05", "S06", "S08", "S10", "S11", "S14", "S14", "S15"],
  },
  {
    level: 8,
    wins: 35,
    name: "NEXUS Control",
    deck: ["C06", "C06", "C05", "C14", "C16", "C18", "C21", "C23", "C25", "C30", "S03", "S05", "S08", "S09", "S09", "S11", "S13", "S14", "S14", "S15"],
  },
  {
    level: 9,
    wins: 40,
    name: "Royal Lock",
    deck: ["C03", "C03", "C05", "C05", "C06", "C14", "C16", "C18", "C23", "C25", "S03", "S03", "S05", "S08", "S08", "S09", "S11", "S13", "S14", "S15"],
  },
  {
    level: 10,
    wins: 50,
    name: "Final Crossover",
    deck: ["C01", "C02", "C03", "C05", "C06", "C07", "C14", "C16", "C18", "C23", "S01", "S03", "S05", "S08", "S09", "S09", "S11", "S13", "S14", "S15"],
  },
];

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let nextInstanceId = 1;
let state = null;
let activeScreen = "title";
let deckEditorIds = [];
let battleBgmStyle = "standard";
let gallerySelectedCardId = null;
let galleryMusicTrack = "title";
let lastHandTap = { index: null, instanceId: null, at: 0 };

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
  musicTrack: null,
  bgmVolume: 0.42,
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
  tone(freq, duration = 0.18, type = "sine", volume = 0.08) {
    if (!this.ctx || !this.sfxOn && volume > 0.04) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(volume, this.ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration + 0.02);
  },
  sfx(name) {
    if (!this.sfxOn) return;
    const pattern = {
      draw: [660, 880],
      summon: [220, 330, 494],
      support: [440, 660, 990],
      attack: [180, 120],
      damage: [90, 70],
      heal: [520, 660, 784],
      win: [523, 659, 784, 1046],
      lose: [220, 185, 147],
      phase: [392, 494],
    }[name] || [440];
    pattern.forEach((freq, index) => {
      window.setTimeout(() => this.tone(freq, 0.16, index % 2 ? "triangle" : "square", 0.075), index * 75);
    });
  },
  speak(text) {
    if (!this.voiceOn || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 1.05;
    utterance.pitch = 1.04;
    utterance.volume = 0.82;
    window.speechSynthesis.speak(utterance);
  },
};

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
    lp: 20,
    energyMax: 0,
    energy: 0,
    deck: shuffle(deckIds.map((id) => createInstance(CARD_DB.get(id), key))),
    hand: [],
    front: [null, null, null],
    back: [null, null],
    grave: [],
    turns: 0,
    skipDraw: false,
    supportNullify: 0,
    counterAttack: 0,
    reviveTrap: 0,
    nextBackSkillDouble: false,
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

function startNewGame() {
  hideSkillPopup();
  closeDeckEditor();
  hideTitleScreen();
  nextInstanceId = 1;
  const freeplayWins = loadFreeplayWins();
  const aiProfile = aiProfileForWins(freeplayWins);
  state = {
    player: createPlayer("player", "Player", loadPlayerDeckIds()),
    ai: createPlayer("ai", `AI Rival Lv.${aiProfile.level}`, aiProfile.deck),
    aiProfile,
    freeplayWins,
    current: "player",
    phase: "main",
    turnNumber: 1,
    selectedHandIndex: null,
    selectedField: null,
    selectedAttackerId: null,
    busy: false,
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
  startTurn(state.player);
  render();
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
  boardCards(player).forEach((card) => {
    card.attacked = false;
    card.extraAttackUsed = false;
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
  player.energy = 0;
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

  audio.sfx("summon");
  audio.speak(card.name);
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
  if (card.id === "C26" && boardCards(player).some((ally) => ally.id === "C07" || ally.id === "C19")) buffAtk(card, 2 * scale);

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
        target.status.bind = Math.max(target.status.bind, 2);
        log(`${target.name} は束縛され、ATK-3。`, "effect");
      }
      break;
    }
    case "C15": {
      const target = strongestAlly(player, card);
      if (target) {
        target.doubleNextSkill = true;
        log(`${target.name} の次のスキルが2倍予約された。`, "effect");
      }
      break;
    }
    case "C17":
      foe.supportNullify += 1;
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
    case "C26":
      if (boardCards(player).some((ally) => ally.id === "C07" || ally.id === "C19")) buffAtk(card, 2 * scale);
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
        target.status.silenced = Math.max(target.status.silenced, 1);
        log(`${target.name} のスキルを1ターン封印。`, "effect");
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
        healCharacter(mostDamagedAlly(player), 1);
        break;
      case "C08":
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
        const target = mostDamagedAlly(player);
        if (target) healCharacter(target, 2);
        break;
      }
      case "C29":
        if (player.turns - card.summonedOnTurn >= 2) {
          log("桐谷 楓は役目を終えて撤退。", "effect");
          destroyCharacter(card, opponentOf(player), { silentDamage: true });
        }
        break;
      case "C38": {
        const fiona = boardCards(player).find((ally) => ally.id === "C03");
        if (fiona) healDef(fiona, 1);
        break;
      }
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
  audio.sfx("support");
  audio.speak(card.name);
  log(`${player.name} はサポート <strong>${card.name}</strong> を使用。`, "support");

  if (foe.supportNullify > 0) {
    foe.supportNullify -= 1;
    log(`${foe.name} の軍師の策略がサポートを無効化。`, "effect");
    return;
  }

  switch (card.id) {
    case "S01":
      healCharacter(target, target.maxHp);
      break;
    case "S02": {
      const foundIndex = player.deck.findIndex((deckCard) => {
        const base = CARD_DB.get(deckCard.id);
        return base?.series === "F" && ["C", "R"].includes(base.rarity);
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
        target.status.stun = Math.max(target.status.stun, 1);
        target.status.guardOff = Math.max(target.status.guardOff, 1);
        log(`${target.name} は1ターン行動不能。ガードも停止。`, "effect");
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
        [...foe.front].filter(Boolean).forEach((enemy) => damageCharacter(enemy, 3, player));
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
      return boardCards(player);
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
  card.awakened = true;
  card.dormant = false;
  if (card.id === "C02") {
    buffAtk(card, 5);
    card.maxDef += 3;
    card.currentDef = card.maxDef;
    boardCards(player).forEach((ally) => healCharacter(ally, 3));
  }
  if (card.id === "C06") {
    buffAtk(card, 5);
    buffDef(card, 4);
  }
  log(`${card.name} が${forced ? "即座に" : ""}覚醒した。`, "effect");
  audio.sfx("win");
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
  audio.sfx("attack");
  animateCard(attacker.instanceId, "attack-lift");
  await sleep(ATTACK_IMPACT_DELAY);

  let attackValue = effectiveAtk(attacker);
  if (attacker.id === "C16") {
    const mod = Math.random() < 0.5 ? 3 : -4;
    attackValue = Math.max(0, attackValue + mod);
    log(`烈 龍翔の気まぐれ: ATK${mod > 0 ? "+" : ""}${mod}。`, "effect");
  }
  if (target.type === "card" && attacker.id === "C44" && target.card.role === "ST") attackValue += 2;

  if (foe.counterAttack > 0) {
    foe.counterAttack -= 1;
    attacker.attacked = true;
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
      ignoreDef: attacker.id === "C28",
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
  afterAttackEffects(attacker, owner, foe, target, killed, hpDamage);
  state.busy = previousBusy;
  if (checkGameOver()) return;
  render();
}

function afterAttackEffects(attacker, owner, foe, target, killed) {
  boardCards(owner)
    .filter((ally) => ally.id === "C21")
    .forEach((te) => {
      if ((te.heatStacks || 0) < 5) {
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

  if (killed) {
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
    audio.sfx("damage");
    animateCard(card.instanceId, "shake", `-${hpDamage}`, false, totalDamage);
  } else {
    animateCard(card.instanceId, "shake", "DEF", false, totalDamage);
  }

  if (card.currentHp <= 0) {
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
  if (!options.silentDamage) log(`${card.name} は撤退。`, "damage");

  if (owner.reviveTrap > 0) {
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
      if (target) {
        target.status.stun = Math.max(target.status.stun, 1);
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
  audio.sfx("damage");
  log(`${player.name} LPに${amount}ダメージ${source ? `（${source}）` : ""}。`, "damage");
  const lpButton = player.key === "ai" ? qs("#opponentLpTarget") : qs("#playerLpTarget");
  if (lpButton) {
    lpButton.classList.remove("shake");
    void lpButton.offsetWidth;
    lpButton.classList.add("shake");
    addFloatingPop(lpButton, `-${amount}`, false, amount);
  }
}

function healCharacter(card, amount) {
  if (!card || card.noHeal || amount <= 0) return;
  const before = card.currentHp;
  card.currentHp = Math.min(card.maxHp, card.currentHp + amount);
  const gained = card.currentHp - before;
  if (gained > 0) {
    audio.sfx("heal");
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
  return card.haste || player.turns > card.summonedOnTurn;
}

function getLegalTargets(attacker, owner) {
  const foe = opponentOf(owner);
  const guards = activeGuards(foe);
  if (guards.length) return guards.map((card) => ({ type: "card", card }));
  const targets = boardCards(foe).map((card) => ({ type: "card", card }));
  targets.push({ type: "lp", player: foe });
  return targets;
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
  if (card.kind === "support" && foe && hasBoardCard(foe, "C23")) cost += 1;
  return Math.max(0, cost);
}

function effectiveAtk(card) {
  return Math.max(0, (card.currentAtk || 0) + (card.tempAtk || 0));
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
  const rewards = [randomRewardCard(), randomRewardCard(), randomRewardCard()];
  const collection = loadCollection();
  rewards.forEach((card) => {
    collection[card.id] = (collection[card.id] || 0) + 1;
  });
  saveCollection(collection);
  qs("#rewardTitle").textContent = playerWon ? "勝利報酬 3枚獲得" : "対戦報酬 3枚獲得";
  qs("#rewardCards").innerHTML = rewards.map((card) => renderCard(createInstance(card, "player"), { inReward: true })).join("");
  qs("#rewardModal").classList.remove("hidden");
  renderHud();
  renderLog();
  renderCollectionSummary();
}

function randomRewardCard() {
  const pool = [];
  ALL_CARDS.forEach((card) => {
    const weight = { UR: 2, SR: 6, R: 14, C: 28 }[card.rarity] || 12;
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
  return Object.entries(deckCounts).every(([id, count]) => CARD_DB.has(id) && count <= (owned[id] || 0));
}

function loadPlayerDeckIds() {
  try {
    const saved = JSON.parse(localStorage.getItem(PLAYER_DECK_STORAGE_KEY) || "null");
    if (isValidDeckIds(saved)) return [...saved];
  } catch {
    // Fall back to the starter deck when local storage has stale data.
  }
  return [...PLAYER_DECK];
}

function savePlayerDeckIds(deckIds) {
  if (!isValidDeckIds(deckIds)) return false;
  localStorage.setItem(PLAYER_DECK_STORAGE_KEY, JSON.stringify(deckIds));
  return true;
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

function openDeckEditor() {
  activeScreen = "deckEdit";
  deckEditorIds = loadPlayerDeckIds();
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

function addDeckCard(cardId) {
  const owned = loadOwnedCollection();
  const selected = countBy(deckEditorIds, (id) => id);
  if (!CARD_DB.has(cardId) || deckEditorIds.length >= PLAYER_DECK_SIZE) return;
  if ((selected[cardId] || 0) >= (owned[cardId] || 0)) return;
  hideSkillPopup();
  deckEditorIds.push(cardId);
  renderDeckEditor();
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
  renderDeckEditor("初期デッキに戻しました。");
}

function saveDeckEditor() {
  if (savePlayerDeckIds(deckEditorIds)) {
    renderDeckEditor("デッキを保存しました。", true);
    return;
  }
  renderDeckEditor("20枚ちょうどで保存できます。");
}

function renderDeckEditor(message = "", ready = false) {
  const owned = loadOwnedCollection();
  const selected = countBy(deckEditorIds, (id) => id);
  const deckCount = deckEditorIds.length;
  const valid = isValidDeckIds(deckEditorIds, owned);
  qs("#deckCount").textContent = `${deckCount}/${PLAYER_DECK_SIZE}`;
  qs("#saveDeckBtn").disabled = !valid;
  const status = qs("#deckEditorStatus");
  status.classList.toggle("is-ready", ready || valid);
  status.textContent = message || (valid ? "保存できます。" : `${PLAYER_DECK_SIZE - deckCount}枚追加できます。`);

  const deckCards = Object.entries(selected)
    .sort(([idA], [idB]) => compareCards(CARD_DB.get(idA), CARD_DB.get(idB)))
    .map(([id, count]) => renderDeckEditorCard(CARD_DB.get(id), count, `所持 ${owned[id] || 0}`, false, "deck"))
    .join("");
  qs("#deckList").innerHTML = deckCards || '<p class="deck-empty">0枚</p>';

  qs("#cardLibrary").innerHTML = [...ALL_CARDS]
    .sort(compareCards)
    .map((card) => {
      const ownedCount = owned[card.id] || 0;
      const usedCount = selected[card.id] || 0;
      const remaining = ownedCount - usedCount;
      const disabled = remaining <= 0 || deckCount >= PLAYER_DECK_SIZE;
      return renderDeckEditorCard(card, remaining, `所持 ${ownedCount} / デッキ ${usedCount}`, disabled, "library");
    })
    .join("");
}

function compareCards(a, b) {
  if (a.kind !== b.kind) return a.kind === "character" ? -1 : 1;
  if (RARITY_ORDER[a.rarity] !== RARITY_ORDER[b.rarity]) return RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity];
  return a.id.localeCompare(b.id, "en", { numeric: true });
}

function renderDeckEditorCard(card, count, meta, disabled, zone) {
  const color = ELEMENT_COLORS[card.element || "無"] || ELEMENT_COLORS.無;
  const image = `assets/cards/${card.id}.png`;
  const typeLine = card.kind === "support" ? card.supportType : ROLE_LABELS[card.role];
  const statLine =
    card.kind === "support"
      ? `Cost ${card.cost} / ${card.supportType}`
      : `Cost ${card.cost} / ATK ${card.atk} / DEF ${card.def} / HP ${card.hp}`;
  return `
    <button class="deck-edit-card ${count <= 0 ? "is-empty" : ""} ${disabled ? "is-unavailable" : ""}" style="--element:${color}; --card-image:url('${image}'); --deck-card-position:center 28%"
      data-card-id="${card.id}" data-zone="${zone}" data-disabled="${disabled}" aria-disabled="${disabled}">
      <span class="deck-edit-card-inner">
        <span class="deck-card-top">
          <span>${escapeHtml(card.no)} ${card.rarity}</span>
          <span>${escapeHtml(typeLine)}</span>
        </span>
        <span class="deck-card-name">${escapeHtml(card.name)}</span>
        <span class="deck-card-bottom">
          <span>${escapeHtml(statLine)}</span>
          <span class="deck-card-count">x${count}</span>
        </span>
        <span class="deck-card-bottom">${escapeHtml(meta)}</span>
      </span>
    </button>
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
        <span class="stat-pill">EN ${player.energy}/${player.energyMax}</span>
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
  qs("#turnLabel").textContent = `Turn ${state.turnNumber}`;
  qs("#phaseLabel").textContent = state.phase === "gameover" ? "Game Over" : state.phase === "battle" ? "Battle" : "Main";
  qs("#phaseBanner").textContent =
    state.phase === "gameover"
      ? "GAME SET"
      : state.current === "player"
        ? state.phase === "battle"
          ? "YOUR BATTLE PHASE"
          : "YOUR MAIN PHASE"
        : "AI TURN";
  qs("#hintText").textContent = hintText();
}

function canAcceptPlayerCommands() {
  return state.current === "player" && !state.gameOver && !state.busy;
}

function renderCollectionSummary() {
  const collection = loadCollection();
  const total = Object.values(collection).reduce((sum, count) => sum + count, 0);
  qs("#collectionSummary").textContent = `Collection ${total}`;
}

function hintText() {
  if (state.gameOver) return "ゲーム終了。報酬3枚を獲得しています。";
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
    playedSomething = aiPlayBestCard();
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
    const attacker = attackers().sort((a, b) => effectiveAtk(b) - effectiveAtk(a))[0];
    const target = chooseAiAttackTarget(attacker);
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

function aiPlayBestCard() {
  const ai = state.ai;
  const playableSupports = ai.hand
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => card.kind === "support" && canPay(ai, card))
    .filter(({ card }) => chooseSupportTarget(card, ai, state.player) !== false)
    .sort((a, b) => RARITY_ORDER[b.card.rarity] - RARITY_ORDER[a.card.rarity] || b.card.cost - a.card.cost);

  if (playableSupports.length && Math.random() < 0.42) {
    const { card, index } = playableSupports[0];
    const target = chooseSupportTarget(card, ai, state.player);
    resolveSupport(ai, state.player, card, target);
    ai.hand.splice(index, 1);
    return true;
  }

  const playableChars = ai.hand
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => card.kind === "character" && canPay(ai, card))
    .map((entry) => ({ ...entry, slot: chooseAiSlot(entry.card) }))
    .filter((entry) => entry.slot)
    .sort((a, b) => scoreCardForAi(b.card) - scoreCardForAi(a.card));

  if (!playableChars.length) {
    if (playableSupports.length) {
      const { card, index } = playableSupports[0];
      const target = chooseSupportTarget(card, ai, state.player);
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

function chooseAiSlot(card) {
  const ai = state.ai;
  const frontOpen = ai.front.findIndex((slot) => !slot);
  const backOpen = ai.back.findIndex((slot) => !slot);
  if (card.backOnly) return backOpen >= 0 ? { lane: "back", index: backOpen } : null;
  if (["GD", "AT"].includes(card.role) && frontOpen >= 0) return { lane: "front", index: frontOpen };
  if (["ST", "SP"].includes(card.role) && backOpen >= 0) return { lane: "back", index: backOpen };
  if (frontOpen >= 0) return { lane: "front", index: frontOpen };
  if (backOpen >= 0) return { lane: "back", index: backOpen };
  return null;
}

function scoreCardForAi(card) {
  return RARITY_ORDER[card.rarity] * 10 + (card.atk || 0) + (card.def || 0) + (card.hp || 0) - card.cost * 0.4;
}

function chooseAiAttackTarget(attacker) {
  const targets = getLegalTargets(attacker, state.ai);
  const lpTarget = targets.find((target) => target.type === "lp");
  if (lpTarget && state.player.lp <= effectiveAtk(attacker)) return lpTarget;
  const cardTargets = targets.filter((target) => target.type === "card");
  if (!cardTargets.length) return lpTarget;
  return cardTargets.sort((a, b) => {
    const guardA = a.card.tags?.includes("guard") ? 5 : 0;
    const guardB = b.card.tags?.includes("guard") ? 5 : 0;
    const scoreA = guardA + (8 - a.card.currentHp) + effectiveAtk(a.card) * 0.25;
    const scoreB = guardB + (8 - b.card.currentHp) + effectiveAtk(b.card) * 0.25;
    return scoreB - scoreA;
  })[0];
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
  const cardButton = event.target.closest(".deck-edit-card[data-card-id]");
  if (!cardButton || !qs("#deckEditor")?.contains(cardButton)) return;
  showDeckCardPopup(cardButton.dataset.cardId, cardButton);
}

function handleDeckEditorCardOut(event) {
  const fromCard = event.target.closest(".deck-edit-card[data-card-id]");
  if (!fromCard) return;
  const toCard = event.relatedTarget?.closest?.(".deck-edit-card[data-card-id]");
  if (toCard === fromCard) return;
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
    qs("#rewardModal").classList.add("hidden");
    startNewGame();
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
  qs("#cardLibrary").addEventListener("click", (event) => {
    const cardButton = event.target.closest(".deck-edit-card[data-card-id]");
    if (!cardButton || cardButton.dataset.disabled === "true") return;
    addDeckCard(cardButton.dataset.cardId);
  });
  qs("#deckList").addEventListener("click", (event) => {
    const cardButton = event.target.closest(".deck-edit-card[data-card-id]");
    if (!cardButton) return;
    removeDeckCard(cardButton.dataset.cardId);
  });
  [qs("#cardLibrary"), qs("#deckList")].forEach((deckArea) => {
    deckArea.addEventListener("pointerover", handleDeckEditorCardPreview);
    deckArea.addEventListener("pointermove", handleDeckEditorCardPreview);
    deckArea.addEventListener("pointerout", handleDeckEditorCardOut);
    deckArea.addEventListener("focusin", handleDeckEditorCardPreview);
    deckArea.addEventListener("focusout", handleDeckEditorCardOut);
  });
  qs("#newGameBtn").addEventListener("click", () => {
    qs("#rewardModal").classList.add("hidden");
    startNewGame();
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
  qs("#handDock").addEventListener("click", (event) => {
    if (!event.target.closest(".game-card")) openHandDock();
  });
  document.addEventListener("click", (event) => {
    if (event.target.closest("#handDock")) return;
    closeHandDock();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!qs("#openingMovieModal").classList.contains("hidden")) closeOpeningMovie();
    if (!qs("#howToPlayModal").classList.contains("hidden")) closeHowToPlay();
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
    startNewGame();
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
    if (!audio.voiceOn && "speechSynthesis" in window) window.speechSynthesis.cancel();
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
