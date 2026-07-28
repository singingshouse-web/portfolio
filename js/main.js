/* 心映好事 — main.js  (內容請改 js/data.js，此檔通常不需要動) */

const $ = (s, r = document) => r.querySelector(s);
const esc = (t) => String(t ?? "").replace(/[&<>"]/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* 年份 */
const yr = $("#yr");
if (yr) yr.textContent = new Date().getFullYear();

/* 捲動顯現 */
function initReveal() {
  const items = document.querySelectorAll(".rv");
  if (!items.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(el => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
  items.forEach(el => io.observe(el));
}

/* ========== 互動大字（滑鼠靠近字會變粗變寬） ========== */
function initPressure() {
  const root = $("#pressure");
  if (!root || !SITE.pressureText) return;

  /* 載入設定的可變字型 */
  const F = SITE.pressureFont || {};
  if (F.url) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = F.url;
    document.head.appendChild(link);
  }
  const WGHT = F.wght || [100, 900];
  const WDTH = F.wdth || [75, 125];
  const SLNT = F.slnt || null;

  const chars = [...SITE.pressureText];
  const title = document.createElement("div");
  title.className = "pressure-title";
  const spans = chars.map(c => {
    const el = document.createElement("span");
    el.textContent = c === " " ? "\u00A0" : c;
    title.appendChild(el);
    return el;
  });
  if (F.family) title.style.fontFamily = `"${F.family}", sans-serif`;
  root.appendChild(title);

  /* 字級隨容器寬度調整 */
  const MIN = 60, MAX = 420;
  const setSize = () => {
    const w = root.getBoundingClientRect().width;
    /* 字級：讓字母橫向剛好填滿版面 */
    title.style.fontSize = Math.max(MIN, Math.min(MAX, w / (chars.length / 2))) + "px";

    /* 高度：以垂直拉伸達成，避免橫向溢出 */
    title.style.transform = "none";
    root.style.height = "";
    const target = Math.min(SITE.pressureHeight || 0, window.innerHeight * 0.6);
    const natural = title.getBoundingClientRect().height;
    if (target > 0 && natural > 0) {
      title.style.transform = `scale(1, ${(target / natural).toFixed(3)})`;
      root.style.height = target + "px";
    }
  };
  setSize();
  let t;
  window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(setSize, 120); });

  /* 距離越近 → 字越粗、越寬、越斜 */
  const attr = (d, max, min, top) => Math.max(min, top - Math.abs((top * d) / max) + min);

  function render(px, py) {
    const box = title.getBoundingClientRect();
    const maxDist = box.width / 2 || 1;
    for (const sp of spans) {
      const b = sp.getBoundingClientRect();
      const dx = px - (b.left + b.width / 2);
      const dy = py - (b.top + b.height / 2);
      const d = Math.sqrt(dx * dx + dy * dy);
      const wght = Math.round(attr(d, maxDist, WGHT[0], WGHT[1]));
      const wdth = Math.round(attr(d, maxDist, WDTH[0], WDTH[1]) * 10) / 10;
      let v = `"wght" ${wght}, "wdth" ${wdth}`;
      if (SLNT) v += `, "slnt" ${-(attr(d, maxDist, 0, Math.abs(SLNT[0]))).toFixed(1)}`;
      sp.style.fontVariationSettings = v;
    }
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const box0 = title.getBoundingClientRect();
  const cursor = { x: box0.left + box0.width / 2, y: box0.top + box0.height / 2 };
  const mouse = { x: cursor.x, y: cursor.y };

  const onMove = (e) => {
    const p = e.touches ? e.touches[0] : e;
    cursor.x = p.clientX;
    cursor.y = p.clientY;
    /* 系統開啟「減少動態效果」時：不做緩動，直接反應 */
    if (reduce) render(cursor.x, cursor.y);
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("touchmove", onMove, { passive: true });

  if (reduce) {
    render(cursor.x, cursor.y);
    return;
  }

  (function loop() {
    mouse.x += (cursor.x - mouse.x) / 12;
    mouse.y += (cursor.y - mouse.y) / 12;
    render(mouse.x, mouse.y);
    requestAnimationFrame(loop);
  })();
}

/* ================= 首頁 ================= */
function buildHome() {
  const grid = $("#workGrid");
  if (!grid) return;

  $("#tagline").textContent = SITE.tagline;
  $("#heroTitle").innerHTML = esc(SITE.heroTitle).replace(/\n/g, "<br>");
  $("#heroSub").textContent = SITE.heroSub;
  $("#otherWorks").textContent = SITE.otherWorks;
  $("#aboutTitle").textContent = SITE.about.title;
  $("#contactTitle").innerHTML = esc(SITE.contactTitle).replace(/\n/g, "<br>");
  $("#attribution").textContent = SITE.attribution;

  const mail = $("#mail");
  mail.textContent = SITE.email;
  mail.href = "mailto:" + SITE.email;

  $("#aboutText").innerHTML = SITE.about.paragraphs
    .map(p => `<p>${esc(p)}</p>`).join("");

  const stats = $("#stats");
  if (stats && SITE.about.stats) {
    stats.innerHTML = SITE.about.stats.map(s => `
      <div class="stat">
        <strong>${esc(s.num)}</strong>
        <span>${esc(s.label)}</span>
      </div>`).join("");
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

  $("#clients").innerHTML = SITE.clients
    .map(c => `<span>${esc(c)}</span>`).join("");

  grid.innerHTML = BRANDS.map(b => `
    <a class="card rv${b.id === "singings" ? " is-own" : ""}" href="./brand.html?id=${esc(b.id)}">
      <div class="card-img"><img src="${esc(b.card)}" alt="${esc(b.name)} 案例縮圖" loading="lazy"></div>
      <div class="card-body">
        <h3>${esc(b.name)}</h3>
        <p class="card-tags">${esc(b.tags.join("　·　"))}</p>
      </div>
    </a>`).join("");

  initPressure();
  initReveal();
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

  const hero = $("#bHero");
  hero.src = b.hero;
  hero.alt = `${b.name} 主視覺`;

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
            <figure class="rv"><img src="${esc(src)}" alt="${esc(p.name)}" loading="lazy"></figure>
          `).join("")}
        </div>
      </div>
    </section>`).join("");

  const also = $("#bAlso");
  if (b.also) also.textContent = b.also; else also.style.display = "none";

  const prev = BRANDS[(i - 1 + BRANDS.length) % BRANDS.length];
  const next = BRANDS[(i + 1) % BRANDS.length];
  $("#prevLink").href = `./brand.html?id=${prev.id}`;
  $("#prevLink").textContent = `← ${prev.name}`;
  $("#nextLink").href = `./brand.html?id=${next.id}`;
  $("#nextLink").textContent = `${next.name} →`;

  initReveal();
}

buildHome();
buildBrand();
