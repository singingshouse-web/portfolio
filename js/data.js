/* =========================================================
   心映好事 — 網站內容資料檔
   改文字只需要改這一個檔案。圖片放 images/，檔名照下方對應。
   ========================================================= */

const SITE = {
  brandName: "心映好事",
  brandNameEn: "SINGINGS HOUSE",
  tagline: "從自有品牌出發的設計服務",
  heroTitle: "因為自己做過品牌，\n我們知道每個畫面背後都是取捨。",
  heroSub: "心映好事既是品牌，也是設計服務。從自有產品「擁抱情緒卡」到國際品牌的數位專案，我們用同一種標準對待每一個畫面。",
  email: "singingshouse@gmail.com",
  clients: ["IKEA", "SK-II", "兆豐銀行", "桂格", "台北101", "LP SUPPORT", "BRAUN", "立頓", "TDCC", "PIMQ"],
  attribution:
    "除心映好事自有品牌外，其餘為主理設計師於品牌設計代理商任職期間參與執行之專案，僅作為個人參與經歷之呈現。",
  about: {
    title: "關於心映好事",
    paragraphs: [
      "心映好事是一個從自有產品出發的設計品牌。我們自己企劃、設計並推出「擁抱情緒卡」與線上抽牌系統——從品牌識別、產品視覺到募資頁面，完整走過一次品牌主要走的路。",
      "設計服務聚焦於網頁視覺與前端設計。主理設計師擁有二十年多媒體設計經驗，曾於品牌設計代理商參與 IKEA、SK-II、兆豐銀行、台北 101 等品牌的數位專案。",
      "帶著你的想法來，我們一起把它做成對的樣子。"
    ],
    /* 時間軸：年份請自行補上正確資訊（year 留空字串就不會顯示） */
    timeline: [
      { label: "EDUCATION", name: "文化大學 廣告系", year: "" },
      { label: "EXPERIENCE", name: "pace design", year: "" },
      { label: "EXPERIENCE", name: "MX minimax design", year: "" },
      { label: "NOW", name: "心映好事 SINGINGS HOUSE", year: "至今" }
    ]
  },
  otherWorks:
    "其他參與案例：台北101 官方網站、PIMQ 官方網站、TDCC 臺灣集中保管結算所、里山木屋、LP 運動護具官方網站、Braun 新品活動網頁、立頓英式茶館、好自在數位行銷、Bite! APP"
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
    id: "skii",
    name: "SK-II",
    nameEn: "SK-II",
    category: "數位活動",
    tags: ["互動活動", "社群平台", "促銷視覺"],
    card: "./images/skii_card.jpg",
    hero: "./images/skii_hero.jpg",
    intro:
      "參與 SK-II 年度銷售活動的數位設計，於社群平台規劃一系列互動式活動機制，提升活動曝光與消費者參與。",
    projects: [
      {
        name: "年度互動銷售活動",
        note: "在精品美妝嚴謹的視覺規範內，設計吸引參與的互動機制。",
        images: [
          "./images/skii_p1_01.jpg",
          "./images/skii_p1_02.jpg",
          "./images/skii_p1_03.jpg"
        ]
      }
    ],
    also: "另參與：SK-II 促銷活動、彩妝網站系列。"
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
  }
];
