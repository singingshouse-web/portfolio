/* =========================================================
   心映好事 — 網站內容資料檔
   改文字只需要改這一個檔案。圖片放 images/，檔名照下方對應。
   ========================================================= */

const SITE = {
  brandName: "心映好事",
  brandNameEn: "SINGINGS HOUSE",
  tagline: "從自有品牌出發的設計服務",
  /* 大字互動效果的文字（留空字串就不顯示） */
  pressureText: "Hello!",

  /* 大字高度（px）。字寬固定填滿版面，用垂直拉伸控制高度。
     建議 400–650；設 0 則不拉伸，維持字型原始比例。 */
  pressureHeight: 560,

  /* 大字使用的可變字型。換字型 = 整組換掉下面這一塊。
     ── 其他選擇（複製貼上取代即可）──────────────────

     Anybody（方正帶科技感，寬度落差最大、效果最戲劇化）
     { family: "Anybody", url: "https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,100..900&display=swap",
       wdth: [50, 150], wght: [100, 900], slnt: null }

     Saira（方正偏工業風）
     { family: "Saira", url: "https://fonts.googleapis.com/css2?family=Saira:wdth,wght@50..125,100..900&display=swap",
       wdth: [50, 125], wght: [100, 900], slnt: null }

     Martian Mono（等寬字，極度方正、技術感）
     { family: "Martian Mono", url: "https://fonts.googleapis.com/css2?family=Martian+Mono:wdth,wght@75..112.5,100..800&display=swap",
       wdth: [75, 112.5], wght: [100, 800], slnt: null }

     Roboto Flex（範圍最寬但個性中性）
     { family: "Roboto Flex", url: "https://fonts.googleapis.com/css2?family=Roboto+Flex:slnt,wdth,wght@-10..0,25..151,100..1000&display=swap",
       wdth: [25, 151], wght: [100, 1000], slnt: [-10, 0] }
     ──────────────────────────────────────────── */
  pressureFont: {
    family: "Archivo",
    url: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap",
    wdth: [62, 125],
    wght: [100, 900],
    slnt: null
  },

  /* Hero 主標。備選：
     「先是品牌主，然後才是設計服務。」
     「每個畫面，都是一次取捨。」                        */
  heroTitle: "我們自己做品牌，\n也替品牌做設計。",
  heroSub: "心映好事既是品牌，也是設計服務。從自有產品「擁抱情緒卡」到國際品牌的數位專案，我們用同一種標準對待每一個畫面。",
  /* Contact 區標題。備選：
     「有想做的東西，寫信給我們。」
     「從一封信開始。」                                  */
  contactTitle: "說說你想解決的問題，\n我們從那裡開始。",
  email: "singingshouse@gmail.com",
  clients: ["IKEA", "SK-II", "兆豐銀行", "桂格", "台北101", "LP SUPPORT", "BRAUN", "立頓", "TDCC", "PIMQ"],
  attribution:
    "除心映好事自有品牌外，其餘為主理設計師於品牌設計代理商任職期間參與執行之專案，僅作為個人參與經歷之呈現。",
  about: {
    title: "關於心映好事",
    paragraphs: [
      "心映好事是一個從自有產品出發的設計品牌。我們自己企劃、設計並推出「擁抱情緒卡」與線上抽牌系統——從品牌識別、產品視覺到募資頁面，完整走過一次品牌主要走的路。",
      "設計服務聚焦於網頁視覺與前端設計。主理設計師擁有二十年多媒體設計經驗，曾於品牌設計代理商參與 IKEA、SK-II、兆豐銀行、台北 101 等品牌的數位專案。",
      "從自有產品到客戶委託，我們用同一種標準對待每一個畫面。"
    ],
    /* 數據列。請確認數字後再上線（note 可留空字串） */
    stats: [
      { num: "20+", label: "年設計經驗" },
      { num: "10+", label: "合作品牌" },
      { num: "15+", label: "數位專案" }
    ],

    /* 時間軸：year 與 note 留空字串則不顯示 */
    timeline: [
      { label: "EDUCATION", name: "文化大學 廣告系", year: "", note: "廣告與傳播訓練，奠定從訊息出發思考視覺的習慣。" },
      { label: "EXPERIENCE", name: "pace design", year: "", note: "設計生涯起點，接觸品牌視覺與印刷實務。" },
      { label: "EXPERIENCE", name: "MX minimax design", year: "", note: "長期擔任數位設計主力，服務國際品牌與金融客戶。" },
      { label: "NOW", name: "心映好事 SINGINGS HOUSE", year: "至今", note: "自有產品與設計服務並行，從品牌主的角度做設計。" }
    ]
  },
  otherWorks:
    "其他參與案例：SK-II 年度銷售活動與彩妝網站、台北101 官方網站、TDCC 臺灣集中保管結算所、里山木屋、Braun 新品活動網頁、立頓英式茶館、好自在數位行銷、Bite! APP"
};

/* ---------------------------------------------------------
   品牌案例：卡片＝品牌，點入品牌詳頁
   圖片檔名規則：品牌代號_card / _hero / _p1_01…
--------------------------------------------------------- */
const BRANDS = [
  {
    id: "singings",
    name: "心映好事",
    nameEn: "SINGINGS HOUSE",
    category: "自有品牌",
    tags: ["產品視覺", "網頁設計", "互動系統", "募資頁面"],
    card: "./images/singings_card.jpg",
    hero: "./images/singings_hero.jpg",
    intro:
      "心映好事的自有產品線。從「擁抱情緒卡」的產品視覺、募資頁面到線上抽牌系統，完整執行一個品牌從零到上線的所有數位介面。",
    projects: [
      {
        name: "線上抽牌系統",
        note: "以情緒陪伴為核心的互動體驗——抽牌的節奏、動效與畫面鋪陳，都為了讓使用者慢下來。",
        images: [
          "./images/singings_p1_01.jpg",
          "./images/singings_p1_02.jpg",
          "./images/singings_p1_03.jpg",
          "./images/singings_p1_04.jpg"
        ]
      },
      {
        name: "募資頁與行銷素材",
        note: "從敘事結構到視覺節奏一手設計，支撐擁抱情緒卡的群眾募資上線。",
        images: ["./images/singings_p2_01.jpg", "./images/singings_p2_02.jpg"]
      }
    ],
    also: ""
  },
  {
    id: "megabank",
    name: "兆豐銀行",
    nameEn: "MEGA BANK",
    category: "數位網站",
    tags: ["官方網站", "活動網站", "網路銀行"],
    card: "./images/megabank_card.jpg",
    hero: "./images/megabank_hero.jpg",
    intro:
      "長期參與兆豐銀行數位專案，範圍涵蓋全球版官方網站的設計與改版更新、各波段財富管理活動網站，以及網路銀行平台的前端設計。",
    projects: [
      {
        name: "全球版官方網站",
        note: "在金融業的資訊層級與法遵限制下，維持清晰易讀的介面秩序。",
        images: ["./images/megabank_p1_01.jpg", "./images/megabank_p1_02.jpg"]
      },
      {
        name: "財富管理活動網站系列",
        note: "波段性活動在既有識別下快速產出，同時保持系列一致性。",
        images: ["./images/megabank_p2_01.jpg", "./images/megabank_p2_02.jpg"]
      },
      {
        name: "網路銀行平台",
        note: "個人網路銀行平台的前端視覺設計。",
        images: ["./images/megabank_p3_01.jpg", "./images/megabank_p3_02.jpg"]
      }
    ],
    also: ""
  },
  {
    id: "lp",
    name: "LP SUPPORT",
    nameEn: "LP SUPPORT",
    category: "數位網站",
    tags: ["官方網站", "UI / UX", "新品活動頁"],
    card: "./images/lp_card.jpg",
    hero: "./images/lp_hero.jpg",
    intro:
      "連續多年為全球運動護具品牌 LP Support 設計官方網站，並定期更新網站內容與頁面設計，範圍涵蓋官網改版與新產品系列活動頁。",
    projects: [
      {
        name: "官方網站設計",
        note: "產品線龐雜的運動護具品牌，以身體部位與使用情境建立導覽邏輯，讓消費者能快速找到對應產品。",
        images: [
          "./images/lp_p1_01.jpg",
          "./images/lp_p1_02.jpg",
          "./images/lp_p1_03.jpg"
        ]
      },
      {
        name: "EmbioZ 新產品系列",
        note: "新品系列的獨立活動頁，在既有品牌識別下建立系列專屬的視覺語言。",
        images: ["./images/lp_p2_01.jpg", "./images/lp_p2_02.jpg"]
      }
    ],
    also: ""
  },
  {
    id: "ikea",
    name: "IKEA",
    nameEn: "IKEA TAIWAN",
    category: "數位網站",
    tags: ["檔期活動網頁", "企業入口網站", "eDM"],
    card: "./images/ikea_card.jpg",
    hero: "./images/ikea_hero.jpg",
    intro:
      "連續數年參與 IKEA 數位設計項目，包含每月定期檔期活動網頁、企業客戶入口網站，以及會員 eDM 與官網主頁的促銷視覺。",
    projects: [
      {
        name: "每月檔期活動網頁",
        note: "高頻率產出下維持品牌一致性，建立可重複套用的版面邏輯。",
        images: ["./images/ikea_p1_01.jpg", "./images/ikea_p1_02.jpg"]
      },
      {
        name: "企業客戶入口網站",
        note: "B2B 入口的資訊架構與消費端截然不同，以效率與清晰為先。",
        images: ["./images/ikea_p2_01.jpg", "./images/ikea_p2_02.jpg"]
      },
      {
        name: "會員 eDM 系列",
        note: "在 email 環境的技術限制下，讓促銷訊息保持品牌質感。",
        images: ["./images/ikea_p3_01.jpg", "./images/ikea_p3_02.jpg"]
      }
    ],
    also: ""
  },
  {
    id: "sf",
    name: "桂格",
    nameEn: "STANDARD FOODS",
    category: "數位網站",
    tags: ["官網改版", "前端視覺"],
    card: "./images/sf_card.jpg",
    hero: "./images/sf_hero.jpg",
    intro: "參與桂格企業官網改版專案，負責前端視覺設計。",
    projects: [
      {
        name: "企業官網改版",
        note: "在企業集團的多品牌架構下，重整官網的視覺層級與導覽動線。",
        images: [
          "./images/sf_p1_01.jpg",
          "./images/sf_p1_02.jpg",
          "./images/sf_p1_03.jpg"
        ]
      }
    ],
    also: ""
  },
  {
    id: "pimq",
    name: "PIMQ",
    nameEn: "PIMQ",
    category: "數位網站",
    tags: ["官方網站", "UI / UX", "介面動態"],
    card: "./images/pimq_card.jpg",
    hero: "./images/pimq_hero.jpg",
    intro:
      "為智能化工業軟體新創品牌 PIMQ 設計中英文版官方網站，將新品牌識別的視覺風格與調性延伸至各頁面，以清晰的資訊架構呈現其產品與服務。",
    projects: [
      {
        name: "首頁設計",
        note: "從進場動態、輪播主視覺到四大主題介紹區塊，用一條連貫的視覺動線帶出品牌的核心訴求。",
        images: [
          "./images/pimq_p1_01.jpg",
          "./images/pimq_p1_02.jpg",
          "./images/pimq_p1_03.jpg"
        ]
      },
      {
        name: "內頁與介面動態",
        note: "產品與服務、公司訊息等內頁的版面規劃，並為分頁切換設計一致的過場動態。",
        images: [
          "./images/pimq_p2_01.jpg",
          "./images/pimq_p2_02.jpg",
          "./images/pimq_p2_03.jpg"
        ]
      }
    ],
    also: ""
  }
];
