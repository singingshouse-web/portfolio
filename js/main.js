/* 心映好事 — main.js  (內容請改 js/data.js，此檔通常不需要動) */

const $ = (s, r = document) => r.querySelector(s);
const esc = (t) => String(t ?? "").replace(/[&<>"]/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* 年份 */
const yr = $("#yr");
if (yr) yr.textContent = new Date().getFullYear();

/* 停用開關：在 data.js 的案例加上 enabled: false，就會整筆從網站上消失
   （卡片、分類、上下篇導覽都不會出現），但資料和文案都保留著。
   要讓它回來，把那一行刪掉或改成 true 即可。 */
for (let i = BRANDS.length - 1; i >= 0; i--) {
  if (BRANDS[i].enabled === false) BRANDS.splice(i, 1);
}

/* 捲動顯現：同時進入畫面的元素依序出現，製造節奏 */
function initReveal() {
  const items = document.querySelectorAll(".rv:not(.in)");
  if (!items.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(el => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    const show = entries.filter(e => e.isIntersecting).map(e => e.target);
    show.forEach((el, i) => {
      setTimeout(() => el.classList.add("in"), i * 110);
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
  items.forEach(el => io.observe(el));
}

/* ================= 首頁 ================= */
function buildHome() {
  const grid = $("#workGrid");
  if (!grid) return;

  $("#tagline").textContent = SITE.tagline;
  $("#heroTitle").innerHTML = esc(SITE.heroTitle)
    .replace(/\n/g, "<br>")
    .replace(/\*\*(.+?)\*\*/g, '<em class="hl"><i>$1</i></em>');
  $("#heroSub").textContent = SITE.heroSub;
  const workNote = $("#workNote");
  if (workNote) {
    if (SITE.workNote) workNote.textContent = SITE.workNote;
    else workNote.style.display = "none";
  }
  $("#otherWorks").textContent = SITE.otherWorks;
  $("#aboutTitle").textContent = SITE.about.title;
  $("#contactTitle").innerHTML = esc(SITE.contactTitle).replace(/\n/g, "<br>");
  $("#attribution").textContent = SITE.attribution;

  const mail = $("#mail");
  mail.textContent = SITE.email;
  mail.href = "mailto:" + SITE.email;

  const pf = SITE.profile;
  const pfBox = $("#profile");
  if (pf && pfBox) {
    pfBox.innerHTML = `
      <img src="${esc(pf.photo)}" alt="${esc(pf.name)}">
      <div class="profile-meta">
        <strong>${esc(pf.name)}<span>${esc(pf.nameEn)}</span></strong>
        <p>${esc(pf.role)}</p>
        ${pf.cvUrl ? `<a class="cv-link" href="${esc(pf.cvUrl)}" target="_blank" rel="noopener">下載完整 CV（PDF）</a>` : ""}
      </div>`;
  }

  $("#aboutText").innerHTML = SITE.about.paragraphs
    .map(p => `<p>${esc(p)}</p>`).join("");

  const stats = $("#stats");
  if (stats && SITE.about.stats) {
    const note = SITE.about.statsNote;
    stats.innerHTML =
      (note ? `<p class="stats-note">${esc(note)}</p>` : "") +
      `<div class="stats-row">` + SITE.about.stats.map(s => `
        <div class="stat">
          <strong data-num="${esc(s.num)}">0</strong>
          <span>${esc(s.label)}</span>
        </div>`).join("") + `</div>`;
    countUp(stats);
  }

  $("#timeline").innerHTML = SITE.about.timeline.map(t => `
    <div class="orbit-item${t.label === "NOW" ? " is-now" : ""}" tabindex="0">
      <div class="orbit-row">
        <p class="label">${esc(t.label)}</p>
        <strong>${esc(t.name)}</strong>
        <em>${esc(t.year)}</em>
      </div>
      ${t.note ? `<p class="orbit-note">${esc(t.note)}</p>` : ""}
    </div>`).join("");

  buildClients();

  buildWork();
  buildHeroTags();
  buildHeroCollage();

  initPressure();
  initReveal();
  initParallax();
}

/* ---------------------------------------------------------
   大字互動（Hello!）
   每個字母是一個 span，依游標距離即時改變可變字型的
   wght / wdth。字級先算到剛好填滿版面寬度，再用 scaleY
   拉到 SITE.pressureHeight 指定的高度。
   設定都在 data.js 的 pressureText / pressureHeight /
   pressureFont，這裡不寫死任何字型或數值。
--------------------------------------------------------- */
function initPressure() {
  const host = $("#pressure");
  if (!host || !SITE.pressureText) return;

  const cfg  = SITE.pressureFont || {};
  const wdth = cfg.wdth || [62, 125];
  const wght = cfg.wght || [100, 900];
  const slnt = cfg.slnt || null;
  const REST = 0.15;                       // 沒有游標時的基礎重量，避免太淡

  /* 建立字母 */
  const title = document.createElement("h1");
  title.className = "pressure-title";
  if (cfg.family) title.style.fontFamily = `"${cfg.family}", var(--f-latin)`;
  title.innerHTML = [...SITE.pressureText]
    .map(ch => `<span>${ch === " " ? "&nbsp;" : esc(ch)}</span>`).join("");
  host.replaceChildren(title);

  const spans = [...title.querySelectorAll("span")];
  if (!spans.length) return;

  /* 字級：量出字母總寬，推算填滿容器需要的 font-size，
     再用 scaleY 拉到指定高度（CSS 的 transform-origin 是 center top） */
  function fit() {
    title.style.transform = "none";
    title.style.fontSize = "100px";
    const sum = spans.reduce((a, s) => a + s.getBoundingClientRect().width, 0);
    const box = host.clientWidth;
    if (!sum || !box) return;

    const size = 100 * (box / sum);
    title.style.fontSize = size + "px";

    const natural = title.getBoundingClientRect().height || size;
    const target  = SITE.pressureHeight || 0;
    if (target > 0) {
      title.style.transform = `scaleY(${(target / natural).toFixed(4)})`;
      host.style.height = target + "px";
    } else {
      host.style.height = natural + "px";
    }
  }

  /* 游標 */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointer = { x: -9999, y: -9999 };
  const eased   = { x: -9999, y: -9999 };
  let raf = 0, seen = false;

  function paint() {
    raf = 0;
    const falloff = Math.max(host.clientWidth * 0.42, 260);

    spans.forEach(s => {
      const r = s.getBoundingClientRect();
      const dx = eased.x - (r.left + r.width / 2);
      const dy = eased.y - (r.top + r.height / 2);
      const d  = Math.hypot(dx, dy);

      /* 距離越近越重、越寬；平方曲線讓中心更集中 */
      let t = seen ? Math.max(0, 1 - d / falloff) : 0;
      t = REST + (1 - REST) * t * t;

      let fv = `"wght" ${Math.round(wght[0] + (wght[1] - wght[0]) * t)}`
             + `, "wdth" ${(wdth[0] + (wdth[1] - wdth[0]) * t).toFixed(1)}`;
      if (slnt) fv += `, "slnt" ${(slnt[0] + (slnt[1] - slnt[0]) * t).toFixed(1)}`;
      s.style.fontVariationSettings = fv;
    });

    /* 緩動尚未追上游標就繼續跑；reduced-motion 直接到位、不續跑 */
    if (!reduce && (Math.abs(pointer.x - eased.x) > 0.5 || Math.abs(pointer.y - eased.y) > 0.5)) {
      schedule();
    }
  }

  function schedule() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      if (reduce) { eased.x = pointer.x; eased.y = pointer.y; }
      else { eased.x += (pointer.x - eased.x) * 0.18; eased.y += (pointer.y - eased.y) * 0.18; }
      paint();
    });
  }

  /* 整頁的游標都算數，不限定在大字上面。
     reduced-motion 只拿掉緩動，互動本身保留。 */
  addEventListener("pointermove", e => {
    pointer.x = e.clientX; pointer.y = e.clientY;
    if (!seen) { seen = true; eased.x = pointer.x; eased.y = pointer.y; }
    schedule();
  }, { passive: true });

  addEventListener("pointerleave", () => { seen = false; schedule(); }, { passive: true });

  addEventListener("resize", () => { fit(); schedule(); });
  addEventListener("scroll", schedule, { passive: true });

  /* 字型載入完才量得準 */
  fit();
  paint();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { fit(); paint(); });
  }
}

/* Hero 上排：與作品分類使用同一套名稱，點擊跳到該分類 */
/* HELLO 與主標之間的作品串：一條橫跨頁面寬度、由左下往右上的斜線。
   「焦點」隨捲動沿斜線由左往右移動，會停在一張上再快速換到下一張：
   焦點那張放到最大，兩側的圖往外讓開、縮得很小，所以焦點背後是乾淨的。
   只用 transform，單一 rAF。 */
function buildHeroCollage() {
  const box = $("#heroCollage");
  const list = SITE.heroCollage;
  if (!box || !list || !list.length) return;

  box.innerHTML = list.map((it, i) => {
    const b = BRANDS.find(x => x.id === it.id);
    if (!b) return "";
    return `<a class="hc-item" href="./brand.html?id=${esc(b.id)}&from=${encodeURIComponent(b.category)}"
      style="--d:${i * 90}ms" aria-label="${esc(b.name)}">
      <img src="${esc(it.img)}" alt="${esc(b.name)} 案例縮圖" width="1600" height="1200" decoding="async">
    </a>`;
  }).join("");

  const all = [...box.querySelectorAll(".hc-item")];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SC_MIN = 0.28;                     // 遠處的圖：縮到很小
  const FALL = 0.78;                       // 縮小的陡緩（以「張」為單位）：越大，兩側的圖越大、遞減越平緩
  const YIELD = 0.8;                       // 兩側讓開的範圍
  const GAP = 0.02;                        // 焦點與鄰圖之間至少留的空隙（容器寬的比例）
  let items = all, n = all.length, A = 0, rise = 0, span = 1, scMax = 2.2, narrowNow = false, ticking = false;

  /* 排版：左邊最低、右邊最高；圖做小、間距拉開。
     A＝焦點旁邊的圖要往外讓開的距離，由焦點放大後的寬度反推，讓背後不重疊 */
  function layout() {
    const small = matchMedia("(max-width: 1000px)").matches;
    const narrow = true;                              // 桌機、手機都用釘住的舞台
    narrowNow = narrow;
    items = all;                                     // 手機也用全部 8 張，作品串走得更長
    all.forEach(el => { el.style.display = items.includes(el) ? "" : "none"; });
    n = items.length;
    scMax = small ? 1.9 : 2.0;
    const cw = box.clientWidth;
    const iw = cw * (small ? 0.22 : 0.11);
    const ih = iw * 0.75;
    const off = cw * 0.12;                // 手機：斜線兩端延伸到畫面外，靠邊緣遮罩淡入淡出
    const W = cw + 2 * off;
    rise = window.innerHeight * (small ? 0.16 : 0.12);               // 左右兩端的高低差（手機壓低，縮短版面）
    const unit = 1 - Math.exp(-Math.pow(1 / YIELD, 2));          // 相鄰一張時的讓開比例
    const scN = SC_MIN + (scMax - SC_MIN) / (1 + Math.pow(1 / FALL, 2));   // 緊鄰焦點那張的大小
    const need = (iw * scMax / 2 + iw * scN / 2) / cw + GAP;     // 焦點與鄰圖中心至少相距
    const nat = (W - iw) / cw / Math.max(1, n - 1);
    const aCalc = (need - nat) / Math.max(0.2, unit - 2 / Math.max(1, n - 1));
    A = Math.max(0, Math.min(aCalc, (W - iw - cw * 0.2) / 2 / cw)) * cw;
    span = W - iw;
    const pad = narrowNow ? 0 : ih * (scMax - 1) / 2 + 12;           // 焦點放大後會超出的上下空間
    box.style.height = (rise + ih) + "px";
    box.style.margin = pad + "px 0";
    TR.cw = cw; TR.iw = iw; TR.ih = ih;
    items.forEach((el, i) => {
      const t = n > 1 ? i / (n - 1) : 0.5;           // 0＝最左、1＝最右
      el.style.width = iw + "px";
      if (narrow) { el.style.left = "0px"; el.style.top = "0px"; }
      else {
        el.style.left = (-off + A + (W - iw - 2 * A) * t) + "px";
        el.style.top = (rise * (1 - t)) + "px";
      }
    });
  }

  /* 手機：輸送帶。每張沿著右上→左下的斜線走，大小只看它離畫面正中間多遠：
     中間永遠最大、兩側小；右上角進場時最小，往左下離場時也縮到最小 */
  const TR = { cw: 0, iw: 0, ih: 0 };
  const DELTA = 0.24, UIN = 1.12, UW = 0.2;
  const trainEnd = () => (UIN + 0.12) + (n - 1) * DELTA;
  function renderTrain(q) {
    items.forEach((el, j) => {
      const u = UIN + (n - 1 - j) * DELTA - q;          // 1.12＝右上外側，-0.12＝左下外側
      const g = 1 / (1 + Math.pow((u - 0.5) / UW, 2));
      const sc = SC_MIN + (scMax - SC_MIN) * g;
      const x = TR.cw * u, y = rise * (1 - u);
      el.style.transform = `translate3d(${(x - TR.iw / 2).toFixed(1)}px,${(y - TR.ih / 2 + rise * 0.05).toFixed(1)}px,0) scale(${sc.toFixed(3)})`;
      el.style.zIndex = String(Math.round(g * 100));
    });
  }

  function render(focus) {
    items.forEach((el, i) => {
      const d = i - focus;
      const g = 1 / (1 + Math.pow(d / FALL, 2));     // 1＝焦點；往兩側一階一階遞減
      const sc = SC_MIN + (scMax - SC_MIN) * g;
      const push = A * Math.sign(d) * (1 - Math.exp(-Math.pow(d / YIELD, 2)));
      const dy = -rise * push / span;                // 沿斜線移動，線條維持筆直
      el.style.transform = `translate3d(${push.toFixed(1)}px,${dy.toFixed(1)}px,0) scale(${sc.toFixed(3)})`;
      el.style.zIndex = String(Math.round(g * 100));
    });
  }

  function update() {
    ticking = false;
    const vh = window.innerHeight;
    const r = box.getBoundingClientRect();
    /* 進度：作品串剛從畫面下緣冒出＝0，離開畫面上緣＝1；焦點由最左走到最右 */
    const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
    /* 電腦版：焦點走完整段；手機版：提早在作品串到達畫面上方、主標接上來時剛好走完 */
    const band = document.getElementById("streamBand");
    const hb = document.querySelector(".pressure-band");
    const intro = document.getElementById("intro");
    let raw, trainQ = null;
    if (narrowNow && intro && band) {
      /* 手機：釘住的舞台。t＝0→1：HELLO 淡出，作品串斜向往上浮現並走完一輪 */
      const ir = intro.getBoundingClientRect();
      const extra = Math.max(1, ir.height - intro.firstElementChild.offsetHeight);
      const t = Math.min(1, Math.max(0, -ir.top / extra));
      const c = (x) => Math.min(1, Math.max(0, x));
      /* HELLO 淡出；作品串由右上角往左下角噴射：小 → 中間最大 → 小，
         走完後整串往左下滑出並淡掉，視覺設計的文字再接上來 */
      hb.style.webkitMaskImage = ""; hb.style.maskImage = "";
      hb.style.opacity = String(1 - c(t / 0.35));
      /* 文字稍微加速往上補位：到終點時剛好貼在選單下方，中間不留空 */
      const hero = document.querySelector(".hero");
      const stageH = intro.firstElementChild.offsetHeight;
      const navB = (document.querySelector(".nav") || { offsetHeight: 74 }).offsetHeight;
      const lift = Math.max(0, stageH - extra - (navB + 30));    // 到終點時文字剛好貼在選單下方
      if (hero) {
        const lf = lift * c((t - 0.3) / 0.7);
        hero.style.transform = `translateY(${(-lf).toFixed(1)}px)`;
        hero.style.marginBottom = (-lf).toFixed(1) + "px";   // 下面的區塊跟著一起補上，不會被疊到
      }
      const out = c((t - 0.74) / 0.2);
      const op = Math.min(c((t - 0.1) / 0.08), 1 - c((t - 0.74) / 0.2));
      const cw0 = band.clientWidth;
      /* 作品串跟著文字一路往上走：永遠停在文字上方，不留大空白 */
      const heroTop = hero ? hero.getBoundingClientRect().top : vh;
      const yc = Math.min(0.38 * vh, heroTop - 0.45 * band.offsetHeight - 16);
      band.style.transform = `translate(${(-out * 0.2 * cw0).toFixed(1)}px,${(yc - band.offsetHeight / 2).toFixed(1)}px)`;
      /* 桌機：作品串快碰到選單時先淡掉，不被選單切到 */
      let opF = op;
      if (!matchMedia("(max-width: 1000px)").matches) {
        const room = (yc - 0.5 * band.offsetHeight) - navB;
        opF = Math.min(op, c((room + 40) / 100));
      }
      band.style.opacity = String(opF);
      band.style.pointerEvents = opF > 0.3 ? "" : "none";
      trainQ = c((t - 0.1) / 0.8) * trainEnd();
    } else {
      if (hb) { hb.style.webkitMaskImage = ""; hb.style.maskImage = ""; hb.style.opacity = ""; hb.style.transform = ""; { const h2 = document.querySelector(".hero"); if (h2) { h2.style.transform = ""; h2.style.marginBottom = ""; } } }
      if (band) { band.style.opacity = ""; band.style.transform = ""; band.style.pointerEvents = ""; }
      raw = Math.min(1, Math.max(0, (p - 0.12) / 0.76)) * (n - 1);
    }
    /* 讓焦點停在一張上，只在兩張之間的一小段快速換過去 */
    if (trainQ !== null) { renderTrain(trainQ); return; }
    const k = Math.floor(raw);
    const u = Math.min(1, Math.max(0, (raw - k - 0.3) / 0.4));
    render(k + u * u * (3 - 2 * u));
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };

  layout();
  if (reduce) {
    const still = () => narrowNow
      ? renderTrain(UIN - 0.5 + (n - 1 - Math.floor((n - 1) / 2)) * DELTA)
      : render(Math.floor((n - 1) / 2));            // 不動：停在中間那張放大
    still();
    addEventListener("resize", () => { layout(); still(); }, { passive: true });
    return;
  }
  update();
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", () => { layout(); onScroll(); }, { passive: true });
}

function buildHeroTags() {
  const box = $("#heroTags");
  if (!box || !SITE.categories) return;
  box.innerHTML = SITE.categories
    .map(c => `<button type="button" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  box.addEventListener("click", e => {
    const b = e.target.closest("button");
    if (b && window.setWorkCat) window.setWorkCat(b.dataset.cat);
  });
}

/* 作品卡片 */
function cardHTML(b) {
  return `
    <a class="card rv${b.id === "singings" ? " is-own" : ""}" href="./brand.html?id=${esc(b.id)}&from=${encodeURIComponent(b.category)}">
      <div class="card-img"><img src="${esc(b.card)}" alt="${esc(b.name)} 案例縮圖" loading="lazy"></div>
      <div class="card-body">
        <h3>${esc(b.name)}</h3>
        <p class="card-tags">${esc(b.tags.join("　·　"))}</p>
      </div>
    </a>`;
}

/* 作品區
   workLayout: "bento" → 便當式類別入口（每格輪播、點點指示）
   workLayout: "grid"  → 三欄作品列表                        */
function buildWork() {
  const grid = $("#workGrid");
  if (!grid) return;

  const order = SITE.categories || [];
  const cats = [...new Set(BRANDS.map(b => b.category))]
    .sort((a, b) => {
      const ia = order.indexOf(a), ib = order.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });

  const bar = $("#workFilter");
  const useBento = (SITE.workLayout || (cats.length > 1 ? "bento" : "grid")) === "bento";
  const timers = [];

  /* ---- 便當格 ---- */
  function bentoHTML() {
    /* 每次進站重新洗牌，類別位置與 hero 都會不同 */
    const shuffled = cats.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return `<div class="bento">` + shuffled.map((c, i) => {
      const list = BRANDS.filter(b => b.category === c);
      const imgs = list.map(b => b.card);
      const dots = imgs.map((_, k) =>
        `<i class="${k === 0 ? "is-on" : ""}"></i>`).join("");
      /* 只有一件作品時直接連到該作品詳頁 */
      const single = list.length === 1 ? list[0].id : "";
      const tag = single ? "a" : "button";
          const attr = single
        ? `href="./brand.html?id=${esc(single)}&from=${encodeURIComponent(c)}"`
        : `type="button"`;
      return `
        <${tag} class="bento-tile${i === 0 ? " is-hero" : ""} rv" ${attr}
                data-cat="${esc(c)}" data-single="${esc(single)}" data-imgs='${esc(JSON.stringify(imgs))}'>
          <span class="bento-img"><img src="${esc(imgs[0])}" alt=""></span>
          <span class="bento-img bento-img2"><img src="${esc(imgs[1] || imgs[0])}" alt=""></span>
          <span class="bento-meta">
            <span class="bento-name">${esc(c)}</span>
            ${imgs.length > 1 ? `<span class="bento-dots">${dots}</span>` : ""}
          </span>
        </${tag}>`;
    }).join("") + `</div>`;
  }

  /* 每格獨立輪播，起始時間錯開，避免同時切換 */
  function startLoops() {
    timers.forEach(clearInterval);
    timers.length = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    grid.querySelectorAll(".bento-tile").forEach((tile, idx) => {
      let imgs = [];
      try { imgs = JSON.parse(tile.dataset.imgs); } catch (e) { return; }
      if (imgs.length < 2) return;

      const layers = tile.querySelectorAll(".bento-img img");
      const dots = tile.querySelectorAll(".bento-dots i");
      let i = 0, top = false;

      const step = () => {
        i = (i + 1) % imgs.length;
        layers[top ? 0 : 1].src = imgs[i];
        tile.classList.toggle("swap", !top);
        top = !top;
        dots.forEach((d, k) => d.classList.toggle("is-on", k === i));
      };

      setTimeout(() => {
        step();
        timers.push(setInterval(step, 4800));
      }, idx * 900);
    });
  }

  const render = (cat) => {
    timers.forEach(clearInterval);
    timers.length = 0;

    if (useBento && cat === "all") {
      grid.innerHTML = bentoHTML();
      startLoops();
      grid.querySelectorAll(".bento-tile").forEach(t => {
        if (t.dataset.single) return;        /* <a> 自己會跳轉 */
        t.addEventListener("click", () => setCat(t.dataset.cat));
      });
    } else {
      const list = cat === "all" ? BRANDS : BRANDS.filter(b => b.category === cat);
      grid.innerHTML = `<div class="grid">${list.map(b => cardHTML(b)).join("")}</div>`;
    }
    initReveal();
    initParallax();
  };

  const setCat = (cat) => {
    if (cat !== "all") {
      const list = BRANDS.filter(b => b.category === cat);
      if (list.length === 1) {
        location.href = `./brand.html?id=${list[0].id}&from=${encodeURIComponent(cat)}`;
        return;
      }
    }
    if (bar) bar.querySelectorAll(".f-btn").forEach(b =>
      b.classList.toggle("is-on", b.dataset.cat === cat));
    render(cat);
    const head = document.querySelector("#work .section-head");
    if (head && cat !== "all") head.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* 讓頁面其他地方（如 Hero 上排標籤）也能切換分類 */
  window.setWorkCat = (cat) => {
    setCat(cat);
    const head = document.querySelector("#work .section-head");
    if (head) head.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (useBento) {
    if (bar) {
      bar.innerHTML = [`<button class="f-btn is-on" data-cat="all">全部</button>`]
        .concat(cats.map(c => `<button class="f-btn" data-cat="${esc(c)}">${esc(c)}</button>`)).join("");
      bar.addEventListener("click", e => {
        const btn = e.target.closest(".f-btn");
        if (btn) setCat(btn.dataset.cat);
      });
    }
    /* 初次載入：直接渲染，不套用「單件直跳詳頁」那條規則，
       否則從單件分類按返回會被立刻彈回作品頁 */
    const wanted = new URLSearchParams(location.search).get("cat");
    const start = cats.includes(wanted) ? wanted : "all";
    bar.querySelectorAll(".f-btn").forEach(btn =>
      btn.classList.toggle("is-on", btn.dataset.cat === start));
    render(start);
    if (start !== "all") {
      const head = document.querySelector("#work .section-head");
      if (head) head.scrollIntoView({ block: "start" });
    }
  } else {
    if (bar) bar.style.display = "none";
    grid.innerHTML = `<div class="grid">${BRANDS.map(b => cardHTML(b)).join("")}</div>`;
  }
}

/* 圖片或影片。images 陣列可以放字串，或放物件指定更多設定：
     "./images/xxx.webp"                                   一般圖片
     "./images/xxx.mp4"                                    無聲短片：自動循環、無播放器介面
     { src:"./images/xxx.mp4", poster:"./images/xxx.webp",
       controls:true }                                     有聲影片：封面圖 + 點擊播放          */
function mediaHTML(item, alt) {
  const o = (item && typeof item === "object") ? item : {};
  const src = (typeof item === "string") ? item : (o.src || "");

  if (/\.(mp4|webm)$/i.test(src)) {
    if (o.controls) {
      return `<video src="${esc(src)}" controls playsinline preload="metadata"${
        o.poster ? ` poster="${esc(o.poster)}"` : ""}></video>`;
    }
    return `<video src="${esc(src)}" autoplay loop muted playsinline preload="metadata"></video>`;
  }
  return `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`;
}

/* 參與品牌列：跑馬燈（兩列反向）或靜態排列 */
function buildClients() {
  const wrap = $("#clients");
  if (!wrap) return;
  const list = SITE.clients || [];

  if (!SITE.clientsMarquee) {
    wrap.className = "clients";
    wrap.innerHTML = list.map(c => `<span>${esc(c)}</span>`).join("");
    return;
  }

  const half = Math.ceil(list.length / 2);
  const rows = [list.slice(0, half), list.slice(half)];
  wrap.className = "clients-marquee";
  wrap.innerHTML = rows.map((row, i) => {
    /* 內容複製兩份，才能無縫接續 */
    const items = row.concat(row).map(c => `<span>${esc(c)}</span>`).join("");
    return `<div class="mq-row"><div class="mq-track${i ? " rev" : ""}">${items}</div></div>`;
  }).join("");
}

/* 數字遞增：捲到畫面時依序從 0 跑到目標值 */
function countUp(root) {
  const items = [...root.querySelectorAll(".stat")];
  if (!items.length) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const run = (item, delay) => {
    setTimeout(() => {
      item.classList.add("in");
      const el = item.querySelector("strong[data-num]");
      if (!el) return;
      const raw = el.dataset.num;
      const target = parseInt(raw, 10);
      const suffix = raw.replace(/[0-9]/g, "");
      if (isNaN(target) || reduce) { el.textContent = raw; return; }

      const dur = 1500, t0 = performance.now();
      (function tick(now) {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }, delay);
  };

  if (!("IntersectionObserver" in window)) {
    items.forEach((it, i) => run(it, i * 160));
    return;
  }
  const io = new IntersectionObserver(es => {
    if (es.some(e => e.isIntersecting)) {
      items.forEach((it, i) => run(it, i * 160));
      io.disconnect();
    }
  }, { threshold: 0.4 });
  io.observe(root);
}

/* 圖片載入後依實際比例調整：
   橫式 → 滿版裁切；方形或直式 → 置中、不放大超過原始尺寸 */
function fitMedia(root) {
  /* 詳頁主視覺：非橫式的圖改為完整顯示，不要硬裁成 21:9 */
  const heroBox = document.querySelector(".b-hero");
  const heroImg = heroBox && heroBox.querySelector("img, video");
  if (heroImg) {
    const fitHero = () => {
      const w = heroImg.naturalWidth || heroImg.videoWidth;
      const h = heroImg.naturalHeight || heroImg.videoHeight;
      if (!w || !h) return;
      if (w / h < 1.7) heroBox.classList.add("is-contain");
    };
    if (heroImg.complete || heroImg.readyState >= 1) fitHero();
    heroImg.addEventListener(
      heroImg.tagName === "VIDEO" ? "loadedmetadata" : "load", fitHero, { once: true });
  }

  const figs = (root || document).querySelectorAll(".proj-flow figure");
  figs.forEach(fig => {
    const el = fig.querySelector("img, video");
    if (!el) return;

    const apply = () => {
      const w = el.naturalWidth || el.videoWidth;
      const h = el.naturalHeight || el.videoHeight;
      if (!w || !h) return;
      const ratio = w / h;
      fig.style.setProperty("--nat-w", w + "px");
      fig.style.aspectRatio = ratio.toFixed(4);

      /* 依「比例」決定欄數，不依賴檔案實際像素大小：
           極小素材（≤300px，如 banner）→ 三欄
           方形或直式（比例 ≤ 1.15）      → 兩欄
           橫式                            → 整列滿版
         方形圖滿版在作品集裡幾乎都是錯的，所以一律排成兩欄。 */
      /* 該子案有指定欄數時，交給 CSS 處理，不套自動分類 */
      if (fig.parentElement && fig.parentElement.style.getPropertyValue("--cols")) {
        el.dataset.noParallax = "1";
        el.style.transform = "none";
        return;
      }

      if (w <= 300) {
        fig.classList.add("is-mini");
        el.dataset.noParallax = "1";
        el.style.transform = "none";
      } else if (ratio <= 1.15) {
        fig.classList.add("is-small");
        el.dataset.noParallax = "1";
        el.style.transform = "none";
      }
    };

    /* 已載入的直接套用；未載入的等 load。兩者都掛，避免競態 */
    if (el.complete || el.readyState >= 1) apply();
    el.addEventListener(el.tagName === "VIDEO" ? "loadedmetadata" : "load", apply, { once: true });
  });
}

/* 捲動視差：圖片比容器慢，產生深度。
   只處理進入視窗的元素，單一 rAF 迴圈。 */
function initParallax() {
  if (SITE.parallax === false) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) return;

  const AMOUNT = 0.06;   // 位移幅度（容器高度的比例）
  /* 案例內頁的作品圖不做視差：放大 112% 會裁掉圖片四邊，設計稿邊緣的文字與留白會被切到 */
  const sel = ".card-img img, .bento-img img, .b-hero img";
  const items = [...document.querySelectorAll(sel)];
  if (!items.length) return;

  const live = new Set();
  const io = new IntersectionObserver(es => {
    es.forEach(e => e.isIntersecting ? live.add(e.target) : live.delete(e.target));
  }, { rootMargin: "120px 0px" });

  items.forEach(img => {
    if (img.dataset.noParallax) return;
    const box = img.parentElement;
    if (box) box.style.overflow = "hidden";
    /* 先放大一點，位移時才不會露出邊緣 */
    img.style.transform = "scale(1.12)";
    io.observe(img);
  });

  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    live.forEach(img => {
      if (img.dataset.noParallax) return;
      const r = img.getBoundingClientRect();
      const mid = r.top + r.height / 2;
      const off = (mid - vh / 2) / vh;          // -1 ~ 1
      const y = -off * r.height * AMOUNT;
      img.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(1.12)`;
    });
    ticking = false;
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}

/* ================= 品牌詳頁 ================= */
function buildBrand() {
  const holder = $("#bProjects");
  if (!holder) return;

  const id = new URLSearchParams(location.search).get("id");
  const i = BRANDS.findIndex(b => b.id === id);
  const b = BRANDS[i];

  if (!b) { location.replace("./index.html#work"); return; }

  document.title = SITE.titleName || SITE.brandName;

  const heroBox = $("#bHero").parentElement;
  heroBox.innerHTML = mediaHTML(b.hero, `${b.name} 主視覺`);

  $("#bCat").textContent = b.category;
  $("#bName").textContent = b.name;
  $("#bNameEn").textContent = b.nameEn;
  $("#bIntro").textContent = b.intro;
  const roleEl = $("#bRole");
  if (b.role) {
    roleEl.textContent = (b.scope ? b.scope + "｜" : "") + "我的角色：" + b.role;
  } else {
    roleEl.style.display = "none";
  }
  $("#bTags").innerHTML = b.tags.map(t => `<span>${esc(t)}</span>`).join("");

  holder.innerHTML = b.projects.map(p => `
    <section class="proj">
      <div class="wrap">
        <div class="proj-head rv">
          <p class="label">Project</p>
          <h2>${esc(p.name)}</h2>
          <p>${esc(p.note).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')}</p>
        </div>
        <div class="proj-flow"${p.cols ? ` style="--cols:${p.cols}"` : ""}>
          ${p.images.map(item => `
            <figure class="rv">${mediaHTML(item, p.name)}</figure>
          `).join("")}
        </div>
      </div>
    </section>`).join("");

  const also = $("#bAlso");
  if (b.also) also.textContent = b.also; else also.style.display = "none";

  fitMedia();
  initParallax();

  /* 上下篇：優先在同一個分類內循環，逛完一類才是完整的一輪 */
  const from = new URLSearchParams(location.search).get("from") || "";
  const scope = from ? BRANDS.filter(x => x.category === from) : BRANDS;
  const list = scope.length > 1 ? scope : BRANDS;
  const j = list.findIndex(x => x.id === b.id);
  const prev = list[(j - 1 + list.length) % list.length];
  const next = list[(j + 1) % list.length];
  const keep = from ? `&from=${encodeURIComponent(from)}` : "";

  const setNav = (sel, item) => {
    const a = $(sel);
    a.href = `./brand.html?id=${item.id}${keep}`;
    a.querySelector(".b-nav-name").textContent = item.name;
    const t = a.querySelector(".b-nav-thumb img");
    if (t) { t.src = item.card; t.alt = item.name; }
    a.title = item.name;
  };
  setNav("#prevLink", prev);
  setNav("#nextLink", next);

  /* 返回列表：回到原本瀏覽的分類，而不是重新從全部開始 */
  const back = $("#backLink");
  if (back && from) {
    back.href = `./index.html?cat=${encodeURIComponent(from)}#work`;
    /* 只有分類入口版（首頁為便當格）才顯示分類名，數位版維持通用字樣 */
    if (SITE.workLayout === "bento") back.textContent = `回到${from}`;
  }

  initReveal();
}

buildHome();
buildBrand();
