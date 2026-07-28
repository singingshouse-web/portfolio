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

/* ================= 首頁 ================= */
function buildHome() {
  const grid = $("#workGrid");
  if (!grid) return;

  $("#tagline").textContent = SITE.tagline;
  $("#heroTitle").innerHTML = esc(SITE.heroTitle).replace(/\n/g, "<br>");
  $("#heroSub").textContent = SITE.heroSub;
  $("#otherWorks").textContent = SITE.otherWorks;
  $("#aboutTitle").textContent = SITE.about.title;
  $("#attribution").textContent = SITE.attribution;

  const mail = $("#mail");
  mail.textContent = SITE.email;
  mail.href = "mailto:" + SITE.email;

  $("#aboutText").innerHTML = SITE.about.paragraphs
    .map(p => `<p>${esc(p)}</p>`).join("");

  $("#timeline").innerHTML = SITE.about.timeline.map(t => `
    <div class="orbit-item${t.label === "NOW" ? " is-now" : ""}">
      <p class="label">${esc(t.label)}</p>
      <strong>${esc(t.name)}</strong>
      <em>${esc(t.year)}</em>
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
