/* 心映好事 — main.js  (內容請改 js/data.js，此檔通常不需要動) */

const $ = (s, r = document) => r.querySelector(s);
const esc = (t) => String(t ?? "").replace(/[&<>"]/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* 年份 */
const yr = $("#yr");
if (yr) yr.textContent = new Date().getFullYear();

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
    stats.innerHTML = SITE.about.stats.map(s => `
      <div class="stat">
        <strong data-num="${esc(s.num)}">0</strong>
        <span>${esc(s.label)}</span>
      </div>`).join("");
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

  initPressure();
  initReveal();
  initParallax();
}

/* Hero 上排：與作品分類使用同一套名稱，點擊跳到該分類 */
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

/* 圖片或影片：副檔名為 mp4/webm 時輸出 <video>，其餘為 <img> */
function mediaHTML(src, alt) {
  if (/\.(mp4|webm)$/i.test(src)) {
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
  const sel = ".card-img img, .bento-img img, .b-hero img, .proj-flow img";
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

  document.title = `${b.name} — 心映好事 SINGINGS HOUSE`;

  const heroBox = $("#bHero").parentElement;
  heroBox.innerHTML = mediaHTML(b.hero, `${b.name} 主視覺`);

  $("#bCat").textContent = b.category;
  $("#bName").textContent = b.name;
  $("#bNameEn").textContent = b.nameEn;
  $("#bIntro").textContent = b.intro;
  $("#bTags").innerHTML = b.tags.map(t => `<span>${esc(t)}</span>`).join("");

  holder.innerHTML = b.projects.map(p => `
    <section class="proj">
      <div class="wrap">
        <div class="proj-head rv">
          <p class="label">Project</p>
          <h2>${esc(p.name)}</h2>
          <p>${esc(p.note)}</p>
        </div>
        <div class="proj-flow">
          ${p.images.map(src => `
            <figure class="rv">${mediaHTML(src, p.name)}</figure>
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
