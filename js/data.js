/* =========================================================
   YENNEXT — 個人作品集內容資料檔
   改文字只需要改這一個檔案。圖片放 images/，檔名照下方對應。
   ========================================================= */

const SITE = {
  brandName: "YENNEXT",
  brandNameEn: "延序",
  titleName: "YEN作品集",   /* 瀏覽器分頁標題用的名稱 */
  tagline: "視覺設計 · 網頁前端視覺 · 品牌視覺",

  /* 作品區標題下方的說明（留空字串則不顯示） */
  workNote: "收錄任職期間參與的品牌專案（團隊作品），以及近期自有品牌與個人製作的作品。",

  /* 圖片捲動視差（false 則關閉）。手機與「減少動態效果」自動停用。 */
  parallax: true,

  /* 首頁 HELLO 與主標之間的作品串：圖片排成一條橫跨頁面、由左下往右上的斜線，
     捲動時先聚在中間再往左右展開，靠近畫面中心的放大、離開的縮小。
     順序＝由左到右；id 對應 BRANDS 的案例，圖用該案卡片圖。
     想增減張數，加減一行即可（桌機、手機都用全部）。 */
  heroCollage: [
    { id: "mx-web", img: "./images/MX_p1_01.webp" },
    { id: "lp", img: "./images/lp_p2_01.webp" },
    { id: "ikea", img: "./images/ikea_p1_02.webp" },
    { id: "pimq", img: "./images/pimq_p1_01.webp" },
    { id: "cf-embrace", img: "./images/cf-embrace_p2_01.webp" },
    { id: "singsingshouse", img: "./images/singsingshouse_p1_05.webp" },
    { id: "yennext", img: "./images/yennext_p1_01.webp" },
    { id: "fm-dayplus", img: "./images/fm-dayplus_p1_07.webp" },
    { id: "fm-goods-b", img: "./images/fm-goods-b_p1_05.webp" },
    { id: "fm-plass", img: "./images/fm-plass_p1_05.webp" },
    { id: "cosmoship", img: "./images/cosmoship_p1_01.webp" },
    { id: "starbucks", img: "./images/starbucks_p1_01.webp" },
    { id: "plass-coldbrew", img: "./images/plass-coldbrew_p1_03.webp" },
  ],

  /* 作品區版型："bento" 類別入口格 ／ "grid" 三欄列表 */
  workLayout: "bento",

  /* 類別順序（決定篩選列與便當格順序） */
  categories: ["網頁與介面", "募資專案", "品牌識別", "包裝設計", "插畫與動態"],
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

  /* Hero 主標（第一人稱）。備選：
     「我相信，**美感**本身就是最大的品牌競爭力。」
     「先是品牌主，\n然後才是**設計師**。」
     「每個畫面，\n都是一次**取捨**。」                  */
  heroTitle: "從設計稿到交付，\n我習慣**多想一步**。",
  heroSub: "從網頁、廣告到品牌視覺，累積二十多年的設計實務經驗。除了畫面設計，也習慣透過動態示範與開發端溝通，讓設計想法順利進入實際製作。近年也運用 AI 工具，完成影像素材與線上互動產品。",
  /* Contact 區標題。備選：
     「想聊聊的話，\n從一封信開始。」
     「有想解決的問題，\n我們從那裡開始。」              */
  contactTitle: "正在找能把設計\n顧到交付的人，歡迎來信聊聊。",
  email: "hello@yennext.com",
  clients: ["IKEA", "SK-II", "P&G", "KFC", "Intel", "LG", "PUMA", "EPSON", "Yahoo!",
    "Dove", "OLAY", "PANTENE", "Gillette", "Oral-B", "ARIEL", "好自在 whisper",
    "海倫仙度絲", "飛柔 PERT", "Neutrogena", "VS SASSOON", "白蘭氏 BRAND'S",
    "立頓 Lipton", "兆豐銀行", "桂格", "台北101", "全家 FamilyMart", "威秀影城",
    "SYSTEX", "Apacer", "LP SUPPORT", "PIMQ", "INFINI", "COSMOSHIP", "HMM", "TDCC"],

  /* 品牌列是否使用跑馬燈（false 則為靜態排列） */
  clientsMarquee: true,
  attribution:
    "除自有品牌「心映好事」外，其餘為我於品牌設計代理商任職期間參與執行之團隊專案，僅作為個人參與經歷之呈現。",
  /* 主理人資訊。cvUrl 留空字串則不顯示下載連結；
     要放 CV 的話，把 PDF 放進專案根目錄並填 "./cv.pdf" */
  profile: {
    name: "郭俊彥",
    nameEn: "YEN KUO",
    role: "視覺設計 · 網頁前端視覺 · 品牌視覺",
    photo: "./images/profile.webp",
    cvUrl: ""
  },

  about: {
    title: "關於我",
    paragraphs: [
      "我做設計二十多年，從多媒體、平面一路走到網頁與動態。在品牌設計代理商任職期間，參與過 P&G、SK-II、台北 101、IKEA、兆豐銀行、桂格等品牌的相關專案，主要負責網頁前端視覺與廣告媒體設計。",
      "在網站專案中，遇到較複雜的互動效果，我習慣先製作動態示範，再與開發人員討論實際呈現方式。我在意的不只是設計稿，也包括後續製作與交付。",
      "這兩年我和夥伴創立品牌「心映好事」，負責品牌識別、募資頁視覺與數位內容等視覺工作。《擁抱情緒牌卡》在嘖嘖以 NT$100,000 為目標上線，最終募得 NT$1,032,197、669 位支持者，達成率 1,032%；線上抽牌系統則由我運用 AI Vibe Coding 獨立完成。",
      "當過品牌主之後，我看設計稿的角度變了——以前先看這一版好不好看，現在會先問這一頁要讓人做什麼。美感仍然是我的底線，但它要為結果服務。"
    ],
    /* 數據列上方的歸屬說明（留空字串則不顯示） */
    statsNote: "個人職涯累計",

    /* 數據列。請確認數字後再上線（note 可留空字串） */
    stats: [
      { num: "20+", label: "年設計經驗" },
      { num: "50+", label: "參與品牌專案" },
      { num: "60+", label: "數位專案" }
    ],

    /* 時間軸：year 與 note 留空字串則不顯示 */
    timeline: [
      { label: "EDUCATION", name: "文化大學 廣告系", year: "", note: "廣告與傳播訓練，奠定從訊息出發思考視覺的習慣。" },
      { label: "EXPERIENCE", name: "MX minimax design", year: "", note: "任職期間負責網頁前端視覺與廣告媒體設計，服務國際品牌與金融客戶。" },
      { label: "NOW", name: "近期自主專案", year: "近期", note: "自有品牌「心映好事」的視覺與數位內容製作，包含募資頁視覺與線上抽牌系統。" }
    ]
  },
  otherWorks:
    "其他參與案例：TDCC 臺灣集中保管結算所、里山木屋、Braun 新品活動網頁、立頓英式茶館、好自在數位行銷、Bite! APP"
};

/* ---------------------------------------------------------
   品牌案例：卡片＝品牌，點入品牌詳頁
   圖片檔名規則：品牌代號_card / _hero / _p1_01…
--------------------------------------------------------- */
const BRANDS = [
  {
    id: "singings",
    scope: "自有專案",
    role: "功能需求、操作流程與視覺介面設計、測試與上線（程式由 AI 協同完成）",
    name: "擁抱情緒牌卡 數位系統開發",
    nameEn: "EMBRACE YOUR FEELINGS CARDS",
    category: "網頁與介面",
    tags: ["互動系統", "AI Vibe Coding", "網頁設計"],
    card: "./images/singings_card.webp",
    hero: "./images/singings_hero.webp",
    intro:
      "「擁抱情緒牌卡」的線上抽牌系統。運用 AI Vibe Coding 獨立完成：由我主導功能需求、操作流程、視覺介面、AI 協作開發、測試與上線，程式由 AI 協作產生。把一套實體牌卡延伸成隨時能使用的數位體驗。",
    projects: [
      {
        name: "線上抽牌系統",
        note: "以情緒陪伴為核心的互動體驗——抽牌的節奏、動效與畫面鋪陳，都為了讓使用者慢下來。",
        images: [
          "./images/singings_p1_01.webp",
          "./images/singings_p1_02.webp",
          "./images/singings_p1_03.webp",
          "./images/singings_p1_04.webp"
        ]
      }
    ],
    also: ""
  },
  {
    id: "mx-web",
    scope: "任職期間專案",
    role: "網頁視覺設計、動態示範",
    name: "MX 官方網站",
    nameEn: "MX MINIMAX DESIGN",
    category: "網頁與介面",
    tags: ["官方網站", "響應式設計", "動態視覺"],
    card: "./images/MX_card.webp",
    hero: "./images/MX_hero.webp",
    intro:
      "設計公司自己的官方網站改版。客戶名單夠硬，但真正要被看見的是判斷力，不是 logo 牆——所以整站走深色、用線條動態取代大圖，把注意力留給作品本身。作品列表依 Film／Digital／Animation／Campaign 分頁，桌機、平板與手機各自重排。",
    projects: [
      {
        name: "首頁與作品列表",
        note: "首頁不放代表作，只留一片會呼吸的線條與一段說明——先讓人慢下來，再進作品。列表用分類頁籤取代長捲軸，讓不同需求的訪客各走各的路。",
        images: [
          "./images/MX_p1_01.webp",
          "./images/MX_p1_02.webp",
          "./images/MX_p1_04.webp"
        ]
      },
      {
        name: "客戶與聯絡",
        note: "客戶頁把 logo 統一成單色金，深色底上只留輪廓——避免各家品牌色在同一頁互相打架。聯絡頁反過來翻成亮底，收在一個安靜的句點上。",
        images: [
          "./images/MX_p1_03.webp",
          "./images/MX_p1_05.webp"
        ]
      }
    ],
    also: ""
  },
  {
    id: "megabank",
    scope: "任職期間專案",
    role: "網頁前端視覺設計",
    name: "兆豐銀行",
    nameEn: "MEGA BANK",
    category: "網頁與介面",
    tags: ["官方網站", "活動網站", "網路銀行"],
    card: "./images/megabank_card.webp",
    hero: "./images/megabank_hero.webp",
    intro:
      "長期參與兆豐銀行數位專案，範圍涵蓋全球版官方網站的設計與改版更新、各波段財富管理活動網站，以及網路銀行平台的前端設計。",
    projects: [
      {
        name: "全球版官方網站",
        note: "金融官網的難處是資訊量大又不能出錯。以明確的層級與留白，讓使用者在法遵規範的密集文字中仍找得到路。",
        images: ["./images/megabank_p1_01.webp", "./images/megabank_p1_02.webp"]
      },
      {
        name: "財富管理活動網站系列",
        note: "波段活動要快速產出，所以先把版型模組化——每一波只換內容與色彩，系列一致性自然維持住。",
        images: ["./images/megabank_p2_01.webp", "./images/megabank_p2_02.webp"]
      },
      {
        name: "網路銀行平台",
        note: "個人網銀的介面設計，以功能分群與圖示化降低操作門檻。",
        images: ["./images/megabank_p3_01.webp", "./images/megabank_p3_02.webp"]
      }
    ],
    also: ""
  },
  {
    id: "lp",
    scope: "任職期間專案",
    role: "網頁前端視覺設計",
    name: "LP SUPPORT",
    nameEn: "LP SUPPORT",
    category: "網頁與介面",
    tags: ["官方網站", "UI / UX", "新品活動頁"],
    card: "./images/lp_card.webp",
    hero: "./images/lp_hero.webp",
    intro:
      "連續多年為全球運動護具品牌 LP Support 設計官方網站，並定期更新網站內容與頁面設計，範圍涵蓋官網改版與新產品系列活動頁。",
    projects: [
      {
        name: "官方網站設計",
        note: "產品線龐雜的運動護具品牌，以身體部位與使用情境建立導覽邏輯，讓消費者能快速找到對應產品。",
        images: [
          "./images/lp_p1_01.webp",
          "./images/lp_p1_02.webp",
          "./images/lp_p1_03.webp"
        ]
      },
      {
        name: "EmbioZ 新產品系列",
        note: "新品系列需要自己的個性，又不能脫離母品牌。用獨立的活動頁語言處理這個張力。",
        images: ["./images/lp_p2_01.webp", "./images/lp_p2_02.webp"]
      }
    ],
    also: ""
  },
  {
    id: "ikea",
    scope: "任職期間專案",
    role: "網頁與 eDM 視覺設計",
    name: "IKEA",
    nameEn: "IKEA TAIWAN",
    category: "網頁與介面",
    tags: ["檔期活動網頁","eDM"],
    card: "./images/ikea_card.webp",
    hero: "./images/ikea_hero.webp",
    intro:
      "連續數年參與 IKEA 數位設計項目，包含每月定期檔期活動網頁，以及會員 eDM 與官網主頁的促銷視覺。",
    projects: [
      {
        name: "每月檔期活動網頁",
        note: "每月固定產出的壓力下，靠可重複套用的版面邏輯守住品牌一致性，把時間留給真正需要判斷的部分。",
        images: ["./images/ikea_p1_01.webp", "./images/ikea_p1_02.webp"]
      },
      {
        name: "會員 eDM 系列",
        note: "email 環境的技術限制遠多於網頁，在能用的元素裡把促銷訊息做出品牌該有的質感。",
        images: ["./images/ikea_p2_01.webp","./images/ikea_p2_02.webp", "./images/ikea_p2_03.webp"]
      }
    ],
    also: ""
  },
  {
    id: "sf",
    scope: "任職期間專案",
    role: "網頁前端視覺設計",
    name: "桂格",
    nameEn: "STANDARD FOODS",
    category: "網頁與介面",
    tags: ["官網改版", "前端視覺"],
    card: "./images/sf_card.webp",
    hero: "./images/sf_hero.webp",
    intro: "參與桂格企業官網改版專案，負責前端視覺設計。",
    projects: [
      {
        name: "企業官網改版",
        note: "企業集團的多品牌架構容易讓官網變成目錄。重整視覺層級與導覽動線，讓訪客先看懂集團、再找到品牌。",
        images: [
          "./images/sf_p1_01.webp",
          "./images/sf_p1_02.webp",
          "./images/sf_p1_03.webp"
        ]
      }
    ],
    also: ""
  },
  {
    id: "pimq",
    scope: "任職期間專案",
    role: "網頁視覺設計、動態示範",
    name: "PIMQ",
    nameEn: "PIMQ",
    category: "網頁與介面",
    tags: ["官方網站", "UI / UX", "介面動態"],
    card: "./images/pimq_card.webp",
    hero: "./images/pimq_hero.webp",
    intro:
      "為智能化工業軟體新創品牌 PIMQ 設計中英文版官方網站，將新品牌識別的視覺風格與調性延伸至各頁面，以清晰的資訊架構呈現其產品與服務。",
    projects: [
      {
        name: "首頁設計",
        note: "從進場動態、輪播主視覺到四大主題介紹區塊，用一條連貫的視覺動線帶出品牌的核心訴求。",
        images: [
          "./images/pimq_p1_01.webp",
          "./images/pimq_p1_02.webp",
          "./images/pimq_p1_03.webp"
        ]
      },
      {
        name: "內頁與介面動態",
        note: "產品與服務、公司訊息等內頁的版面規劃，並為分頁切換設計一致的過場動態，讓瀏覽過程不斷裂。難以用靜態稿說明的互動，先製作動態示範，再與開發廠商討論實作。",
        images: [
          "./images/pimq_p2_01.webp",
          "./images/pimq_p2_02.webp",
          "./images/pimq_p2_03.webp",
          "./images/pimq_p2_04.webp",
          "./images/pimq_p2_05.webp"
        ]
      }
    ],
    also: ""
  },


  {
    id: "hscare",
    scope: "任職期間專案",
    role: "台灣與香港版網頁前端視覺設計",
    name: "海倫仙度絲",
    nameEn: "HEAD & SHOULDERS",
    category: "網頁與介面",
    tags: ["官方網站", "產品導覽", "前端視覺"],
    card: "./images/hscare_card.webp",
    hero: "./images/hscare_hero.webp",
    intro:
      "海倫仙度絲台灣與香港官方網站，目前皆在線上。官網的整體概念與視覺在台灣製作；產品詳情頁則以中國版的內容架構為基礎重新整理，並針對台灣與香港調整文字用法與產品名稱，兩版的頁面設計相近。產品內頁以銷售頁的形式呈現。",
    projects: [
      {
        name: "台灣官方網站",
        note: "以台灣版首頁為例：從主視覺、依頭皮屬性分類的產品選擇，到專家推薦、頭皮健康百科與購買通路，依序排出瀏覽動線。",
        images: [
          "./images/hscare_p1_01.webp",
          "./images/hscare_p1_02.webp",
          "./images/hscare_p1_03.webp",
          "./images/hscare_p1_04.webp",
          "./images/hscare_p1_05.webp"
        ]
      }
    ],
    also: ""
  },

  /* ═══════════ 募資專案 ═══════════
     之後每個新的募資案，複製下面整個 { } 區塊、改 id 與內容即可。
     累積到三件以上時，可比照 digital/ 的做法獨立成 crowdfunding/ 專頁。 */
  {
    id: "cf-embrace",
    scope: "自有專案",
    role: "募資頁視覺統合與編排、產品示意素材合成、募資影片製作；牌卡局部繪製、Layout 與完稿（頁面文案由合作夥伴負責）",
    name: "擁抱情緒牌卡",
    nameEn: "EMBRACE YOUR FEELINGS CARDS",
    category: "募資專案",
    tags: ["募資影片", "募資頁面", "專案視覺", "行銷素材"],
    card: "./images/cf-embrace_card.webp",
    hero: "./images/cf-embrace_hero.webp",
    intro:
      "自有品牌《擁抱情緒牌卡》的群眾募資專案。以 NT$100,000 為目標在嘖嘖上線，最終募得 NT$1,032,197、669 位支持者，達成率 1,032%。實體產品尚未完成時，我先規劃募資頁的視覺與版面，再以 AI 影像工具生成產品示意素材完成合成；整體節奏切成募資前、募資中（三波廣告）與募資後三個階段推進。",
    projects: [
      {
        name: "募資影片",
        note: "影片要在前十秒回答「這是給誰的」。先讓人認出自己正在經歷的情緒，產品的說明才有落腳的地方。我的角色：影片由我獨立製作完成。",
        images: [
          { src: "./images/cf-embrace_p1_01.mp4",
            poster: "./images/cf-embrace_p1_01.webp",
            controls: true }
        ]
      },
      {
        name: "募資頁面設計",
        note: "募資頁的難處不在版面而在順序——先讓人認得自己的情緒，才有後面的支持理由。整頁的節奏都是照這個邏輯排的，同一套視覺也延伸到數位月曆桌布等回饋，讓支持者在專案結束之後仍然接得住品牌。我的角色：募資頁版面編排、視覺統合與產品示意素材合成；牌卡局部繪製、Layout 與完稿；頁面文案由合作夥伴負責。",
        images: [
          "./images/cf-embrace_p2_01.webp",
          "./images/cf-embrace_p2_02.webp",
          "./images/cf-embrace_p2_03.webp",
          "./images/cf-embrace_p2_04.webp",
          "./images/cf-embrace_p2_05.webp",
          "./images/cf-embrace_p2_06.webp",
          "./images/cf-embrace_p2_07.webp",
          "./images/cf-embrace_p2_08.webp",
          "./images/cf-embrace_p2_09.webp",
          "./images/cf-embrace_p2_10.webp",
          "./images/cf-embrace_p3_01.mp4"
        ]
      }
    ],
    also: ""
  },

  /* ═══════════ 品牌識別 ═══════════ */
  {
    id: "singsingshouse",
    scope: "自有專案",
    role: "品牌識別設計與延伸應用",
    name: "心映好事",
    nameEn: "SINGINGHOUSE",
    category: "品牌識別",
    tags: ["品牌識別", "標誌設計", "視覺系統", "應用延伸"],
    card: "./images/singsingshouse_card.webp",
    hero: "./images/singsingshouse_hero.webp",
    intro:
      "自有品牌「心映好事」的識別系統，從標誌、字體、色彩到名片、官網與周邊一次做完。品牌談的是潛意識與情緒，識別就不能用喊的——所有決定都朝同一個方向收：安靜、但站得住。",
    projects: [
      {
        name: "標誌與結構",
        note: "標誌疊了三個元素——字母 H 是 House，中間的聲波是引導的聲音，星芒是被照亮的那一刻。中英文橫式、直式與單標都從同一組格線推導，縮到名片大小仍然讀得出來。",
        images: [
          "./images/singsingshouse_p1_01.webp",
          "./images/singsingshouse_p1_02.webp",
          "./images/singsingshouse_p1_03.webp",
          "./images/singsingshouse_p1_04.webp",
          "./images/singsingshouse_p1_05.webp"
        ]
      },
      {
        name: "字體與色彩",
        note: "主字選 jf open 粉圓，圓角但不幼稚；襯線的 Newsreader 負責留白處的敘事。牌卡與印刷品另用「淚體」，筆畫末端那一點垂墜剛好是情緒的形狀。主色 Dusty Rose 取自黃昏的海面——不是粉紅色的甜，是光快要收掉時的那種暖。",
        images: [
          "./images/singsingshouse_p1_06.webp",
          "./images/singsingshouse_p1_07.webp"
        ]
      },
      {
        name: "應用延伸",
        note: "官網、名片到帆布袋。名片用壓凸不印色，讓標誌在光線下才浮出來——這個品牌的訊息本來就不該一眼看完。",
        images: [
          "./images/singsingshouse_p1_08.webp",
          "./images/singsingshouse_p1_09.webp",
          "./images/singsingshouse_p1_10.webp"
        ]
      }
    ],
    also: ""
  },
  {
    id: "yennext",
    scope: "個人專案",
    role: "品牌識別設計",
    name: "YENnext",
    nameEn: "PERSONAL BRAND IDENTITY",
    category: "品牌識別",
    tags: ["品牌識別", "字標設計", "字級系統", "自有品牌"],
    card: "./images/yennext_card.webp",
    hero: "./images/yennext_hero.webp",
    intro:
      "自己的個人品牌識別。Yennext 取自「延序」——延展與接續，所以一開始就不想把字標釘死成一個樣子。先做了一版游標驅動的可變字標，再把它收回來，變成一套能天天用的三階系統。",
    projects: [
      {
        name: "字軸實驗，與放棄它的理由",
        note: "第一版做成游標驅動的可變字標，字母會隨游標加粗與撐寬。概念成立，但導覽列不能每次長得都不一樣——所以收成三階：Display 可動、Nav 鎖死、16px 以下只留一個 Y。",
        images: [
          "./images/yennext_p1_01.webp",
          "./images/yennext_p1_02.webp",
          "./images/yennext_p1_03.webp",
          "./images/yennext_p1_04.webp"
        ]
      },
      {
        name: "輔助圖形",
        note: "同一條互動規則放大到整個畫面：游標靠近，網格被推開再彈回。字標講「字會回應」，這裡講「空間會回應」——同一套系統的兩個尺度。",
        images: [
          "./images/yennext_p2_01.mp4"
        ]
      },
      {
        name: "應用",
        cols: 2,
        note: "同一組設定換底不換字。Mark 只留 Y，是整套唯一會轉外框修字的一格。",
        images: [
          "./images/yennext_p3_01.webp",
          "./images/yennext_p3_02.webp"
        ]
      }
    ],
    also: ""
  },
  {
    id: "fm-dayplus",
    scope: "任職期間專案",
    role: "品牌識別與延伸設計",
    name: "DAYPLUS",
    nameEn: "FAMILYMART ONLINESTORE",
    category: "品牌識別",
    tags: ["品牌識別", "視覺系統", "提案"],
    card: "./images/fm-dayplus_card.webp",
    hero: "./images/fm-dayplus_hero.webp",
    intro:
      "全家網路商店自有品牌開發案，五個命名與識別方向之一。DAY＋PLUS，是「每一天，多一點」。字標用纖細的線條，上方一道弧線中央落著一顆四芒星，像日常裡多出來的那一點光；搭配標語 DO MORE, BE MORE，把平常的補貨變成有點期待的小事。",
    projects: [
      { name: "識別與應用",
        note: "名字講「每天」，所以識別要經得起天天看：深紫色為主、珊瑚紅點綴，細線字標放在深色底上，讓生鮮與即食的商品照自己發光，標誌只在角落輕輕落款。包裝、海報與戶外看板都照這個原則收斂。",
        images: [
          "./images/fm-dayplus_p1_01.webp", 
          "./images/fm-dayplus_p1_02.webp", 
          "./images/fm-dayplus_p1_03.webp", 
          "./images/fm-dayplus_p1_04.webp",
          "./images/fm-dayplus_p1_05.webp", 
          "./images/fm-dayplus_p1_06.webp", 
          "./images/fm-dayplus_p1_07.webp", 
          "./images/fm-dayplus_p1_08.webp"
        ] 
      }
    ],
    also: ""
  },
  {
    id: "fm-goods-a",
    scope: "任職期間專案",
    role: "品牌識別與延伸設計",
    name: "the good GOODs｜方向 A",
    nameEn: "TODAY IS A GOOD DAY",
    category: "品牌識別",
    tags: ["品牌識別", "模組化系統", "廣告應用"],
    card: "./images/fm-goods-a_card.webp",
    hero: "./images/fm-goods-a_hero.webp",
    intro:
      "全家網路商店自有品牌開發案，五個命名與識別方向之一。名字有兩層意思：good 是好，goods 是商品。方向 A 取 The Good Goods 的縮寫 T、G、G，各做成一個圓角方塊，拼成一枚可以重組的標誌——一個方塊一件好東西，拼在一起，就是標語說的 TODAY IS A GOOD DAY。",
    projects: [
      {
        name: "識別與應用",
        note: "方塊是這套識別的最小單位：標誌用它組成，海報角落的勾勾也用它拼出來。廣告版面再放大成商品重複排列的圖形，搭配高彩度底色與珊瑚紅面板，不需要另外設計主視覺，一路延伸到提袋與通路看板。",
        images: [
          "./images/fm-goods-a_p1_01.webp",
          "./images/fm-goods-a_p1_02.webp",
          "./images/fm-goods-a_p1_03.webp",
          "./images/fm-goods-a_p1_04.webp",
          "./images/fm-goods-a_p1_05.webp",
          "./images/fm-goods-a_p1_06.webp",
          "./images/fm-goods-a_p1_07.webp",
          "./images/fm-goods-a_p1_08.webp"
        ]
      }
    ],
    also: ""
  },
  {
    id: "fm-goods-b",
    scope: "任職期間專案",
    role: "品牌識別與延伸設計",
    name: "the good GOODs｜方向 B",
    nameEn: "GOOD THINGS ARE COMING",
    category: "品牌識別",
    tags: ["品牌識別", "標誌設計", "副品牌延伸"],
    card: "./images/fm-goods-b_card.webp",
    hero: "./images/fm-goods-b_hero.webp",
    intro:
      "同一個品牌名的另一種解法。把名字直接做成商品的容器：the good 用輕的字、GOODs 用粗的字，兩個 O 連成橫向的無限符號，呼應「多元」，裡面放進零食、泡麵、生鮮等圖示。同一個標誌能長出各品類的副品牌，不必為每個品類另外設計一套。",
    projects: [
      {
        name: "識別與應用",
        note: "O 裡的圖示換一個，就是新的副品牌；字標本身完全不動。標語 GOOD THINGS ARE COMING 搭配整齊排列的食材攝影，讓海報看起來像「好東西正在上架」，並延伸到包裝與店頭傳達物。",
        images: [
          "./images/fm-goods-b_p1_01.webp",
          "./images/fm-goods-b_p1_02.webp",
          "./images/fm-goods-b_p1_03.webp",
          "./images/fm-goods-b_p1_04.webp",
          "./images/fm-goods-b_p1_05.webp",
          "./images/fm-goods-b_p1_06.webp",
          "./images/fm-goods-b_p1_07.webp"
        ]
      }
    ],
    also: ""
  },
  {
    id: "fm-plus",
    scope: "任職期間專案",
    role: "品牌識別與延伸設計（含動態版本）",
    name: "PLUS",
    nameEn: "FAMILYMART ONLINESTORE",
    category: "品牌識別",
    tags: ["品牌識別", "通路視覺", "包裝"],
    card: "./images/fm-plus_card.webp",
    hero: "./images/fm-plus_hero.webp",
    intro:
      "全家網路商店自有品牌開發案，五個命名與識別方向之一。PLUS 是「多加一點」，所以字標做成圓潤的方塊字，P 和 U 各有一張小臉，S 上多出一顆閃爍的星芒。網購最期待的是拆開箱子的那一刻，這套識別就想像成從箱子裡探出頭來打招呼的那一點驚喜。",
    projects: [
      { name: "識別與應用",
        note: "字標有動態版本：小臉會眨眼，星芒閃爍後變成愛心，讓數位通路上的標誌也有表情。靜態應用則放在紙箱上，與探頭的貓咪一起傳達開箱的樂趣。（更多應用圖整理中）",
        images: [
          "./images/fm-plus_p1_01.webp", 
          "./images/fm-plus_p1_02.webp",
          "./images/fm-plus_p1_03.webp",
          "./images/fm-plus_p1_08.gif"
        ] 
      }
    ],
    also: ""
  },

  {
    id: "fm-plass",
    scope: "任職期間專案",
    role: "品牌識別與延伸設計",
    name: "PLASS",
    nameEn: "FAMILYMART ONLINESTORE",
    category: "品牌識別",
    tags: ["品牌識別", "包裝應用", "廣告視覺"],
    card: "./images/fm-plass_card.webp",
    hero: "./images/fm-plass_hero.webp",
    intro:
      "全家網路商店自有品牌開發案，五個命名與識別方向之一。以「MORE & LESS」為核心：字標用鏤空的模板字形做出「少」，刪去多餘的筆畫與留白；中間那個拉高的 A 做出「多」，多出來的一筆就是品牌想給的那一點。搭配標語 DO MORE, BE MORE，與水晶般的幾何切面質感。",
    projects: [
      {
        name: "品牌識別",
        note: "鏤空的字形在單色與彩色底上都清楚好認，從提袋、包材到戶外看板都能直接沿用，不必為每個媒材重畫一次。淺藍、青綠的色彩，加上水晶切面的背景攝影，讓「少而精」的感覺落在食材與商品上。",
        images: [
          "./images/fm-plass_p1_01.webp",
          "./images/fm-plass_p1_02.webp",
          "./images/fm-plass_p1_03.webp",
          "./images/fm-plass_p1_04.webp",
          "./images/fm-plass_p1_05.webp",
          "./images/fm-plass_p1_06.webp",
          "./images/fm-plass_p1_07.webp",
          "./images/fm-plass_p1_08.webp"
        ]
      },
    ],
    also: ""
  },

  /* ═══════════ 包裝設計 ═══════════ */
  {
    id: "cosmoship",
    scope: "任職期間專案",
    role: "包裝設計",
    name: "COSMOSHIP",
    nameEn: "COSMOSHIP PACKAGE",
    category: "包裝設計",
    tags: ["包裝設計", "禮盒", "系列視覺"],
    card: "./images/cosmoship_card.webp",
    hero: "./images/cosmoship_hero.webp",
    intro: "宇宙小艇聯名禮盒包裝設計，以系列化的圖樣語言區分口味，同時維持整體的一致性。",
    projects: [
      { name: "禮盒包裝",
        note: "三款圖樣共用同一套構成邏輯——並排陳列時是完整系列，單獨拿出來又各有個性。",
        images: [
          "./images/cosmoship_p1_01.webp", 
          "./images/cosmoship_p1_02.webp", 
          "./images/cosmoship_p1_03.webp", 
          "./images/cosmoship_p1_04.webp", 
          "./images/cosmoship_p1_05.webp"
        ]
       }
    ],
    also: ""
  },
  {
    id: "taipei101",
    scope: "任職期間專案",
    role: "包裝設計",
    name: "台北 101 月餅禮盒",
    nameEn: "TAIPEI 101 MOONCAKE",
    category: "包裝設計",
    tags: ["包裝設計", "節慶禮盒", "插畫應用"],
    card: "./images/taipei101_card.webp",
    hero: "./images/taipei101_hero.webp",
    intro: "台北 101 中秋節禮盒包裝設計，將地標意象與節慶花卉結合成具辨識度的節慶視覺。",
    projects: [
      { name: "禮盒包裝與延伸",
        note: "地標意象容易流於具象。改以節慶花卉為主、建築為輔，讓禮盒先是美的，其次才認得出是台北 101。",
        images: [
          "./images/taipei101_p1_01.webp", 
          "./images/taipei101_p1_02.webp", 
          "./images/taipei101_p1_03.webp", 
          "./images/taipei101_p1_04.webp", 
          "./images/taipei101_p1_05.webp"
        ] 
      }
    ],
    also: ""
  },

  /* ═══════════ 插畫 ═══════════ */
  {
    id: "starbucks",
    scope: "任職期間專案",
    role: "包裝風格提案與插畫",
    name: "STARBUCKS 蘇門答臘",
    nameEn: "STARBUCKS STYLE REDESIGN",
    category: "插畫與動態",
    tags: ["插畫", "包裝應用", "風格改造"],
    card: "./images/starbucks_card.webp",
    hero: "./images/starbucks_hero.webp",
    intro: "星巴克單品咖啡包裝的風格改造提案，以產區生態為題繪製熱帶叢林插畫。",
    projects: [
      { name: "包裝插畫",
        note: "以層疊的葉形與產區動物構成畫面，讓產地故事成為包裝本身，而不是背面那段沒人讀的說明文字。",
        images: [
          "./images/starbucks_p1_01.webp", 
          "./images/starbucks_p1_02.webp",
          "./images/starbucks_p1_03.webp",
          "./images/starbucks_p1_04.webp",
          "./images/starbucks_p1_05.webp", 
          "./images/starbucks_p1_06.webp"
        ] 
      }
    ],
    also: ""
  },
  {
    id: "plass-coldbrew",
    scope: "任職期間專案",
    role: "包裝插畫",
    name: "PLASS 冷萃咖啡",
    nameEn: "PLASS COLD BREW COFFEE",
    category: "插畫與動態",
    tags: ["插畫", "包裝設計", "新品視覺"],
    card: "./images/plass-coldbrew_card.webp",
    hero: "./images/plass-coldbrew_hero.webp",
    intro: "PLASS 品牌旗下新品冷萃咖啡的包裝插畫，以細緻線繪呈現果香風味的差異。",
    projects: [
      { name: "瓶身插畫與系列視覺", note: "三種風味以同一種線繪語言區分，兼顧系列感與單瓶識別度。",
        images: [
          "./images/plass-coldbrew_p1_01.webp", 
          "./images/plass-coldbrew_p1_02.webp", 
          "./images/plass-coldbrew_p1_03.webp", 
          "./images/plass-coldbrew_p1_04.webp", 
          "./images/plass-coldbrew_p1_05.webp", 
          "./images/plass-coldbrew_p1_06.webp"
        ] 
      }
    ],
    also: ""
  },

  /* ═══════════ 動態設計 ═══════════ */
  {
    id: "ecard",
    scope: "任職期間專案",
    role: "動態電子卡設計",
    name: "節慶動態電子卡",
    nameEn: "FESTIVAL E-CARD",
    category: "插畫與動態",
    tags: ["動態設計", "節慶視覺", "社群素材"],
    card: "./images/ecard_card.webp",
    hero: "./images/ecard_hero.webp",
    intro: "歷年年節與節慶的動態電子卡設計，每年以不同的視覺語言重新詮釋節慶題材。",
    projects: [
      { name: "年節系列", cols: 4,
        note: "每年更換表現手法——角色插畫、像素遊戲、粒子動畫——但識別的存在感維持不變，讓系列有延續也有新鮮感。",
        images: [
          "./images/ecard_p1_01.gif",
          "./images/ecard_p1_02.gif",
          "./images/ecard_p1_03.gif",
          "./images/ecard_p1_04.gif",
          "./images/ecard_p1_05.gif",
          "./images/ecard_p1_06.gif",
          "./images/ecard_p1_07.gif",
          "./images/ecard_p1_08.gif",
          "./images/ecard_p1_09.gif",
          "./images/ecard_p1_10.gif",
          "./images/ecard_p1_11.gif",
          "./images/ecard_p1_12.gif"
        ]
      }
    ],
    also: ""
  },
  {
    id: "hmm-banner",
    scope: "任職期間專案",
    role: "動態廣告設計",
    name: "hmm 促銷網路廣告",
    nameEn: "HMM BANNER",
    category: "插畫與動態",
    tags: ["動態設計", "Banner", "促銷素材"],
    card: "./images/hmm-banner_card.webp",
    hero: "./images/hmm-banner_hero.webp",
    intro: "hmm 週年慶促銷網路廣告的動態設計，以等距插畫與倒數節奏帶動點擊。",
    projects: [
      { name: "動態 Banner 系列", cols: 4, note: "在極短的秒數內完成訊息傳達，構圖與節奏都為了讓重點停留在畫面最後一幀。",
        images: [
          "./images/hmm-banner_p1_01.webp",
          "./images/hmm-banner_p1_02.webp",
          "./images/hmm-banner_p1_03.webp",
          "./images/hmm-banner_p1_04.webp",
          "./images/hmm-banner_p1_05.webp",
          "./images/hmm-banner_p1_06.webp",
          "./images/hmm-banner_p1_07.webp"
        ]
      }
    ],
    also: ""
  },
  {
    id: "mx-logo",
    scope: "任職期間專案",
    role: "標誌動態設計",
    name: "MX 識別動畫",
    nameEn: "MX LOGO ANIMATION",
    category: "插畫與動態",
    tags: ["動態設計", "識別動畫", "動態標誌"],
    card: "./images/mx-logo_card.webp",
    hero: "./images/mx-logo_hero.webp",
    intro: "公司識別標誌的動態化設計，以幾何元素的聚合過程演繹標誌的構成邏輯。",
    projects: [
      { name: "標誌動態", cols: 3, note: "動畫本身就是標誌結構的說明——線條如何成形，品牌個性就在那幾秒裡。",
        images: [
          "./images/mx-logo_p1_01.gif",
          "./images/mx-logo_p1_02.gif",
          "./images/mx-logo_p1_03.gif"
        ]
      }
    ],
    also: ""
  }
];
