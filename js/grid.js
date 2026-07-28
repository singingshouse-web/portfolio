/* =========================================================
   心映好事 — 背景互動網格
   滑鼠靠近會牽動網格，點擊產生漣漪。
   淺色版：線條只比背景深一點，強調色用品牌粉。
   ========================================================= */
(function () {
  const canvas = document.getElementById("kgrid");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  /* 執行模式：
     full   桌機，完整互動（游標牽引 + 點擊漣漪）
     direct 桌機且系統開啟「減少動態效果」→ 保留互動，取消緩動與漣漪
     static 手機／觸控裝置 → 只留靜態淡紋理，不互動        */
  const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SMALL  = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
  const MODE = SMALL ? "static" : (REDUCE ? "direct" : "full");

  /* ---------- 參數 ---------- */
  const CELL = 68;          // 網格間距
  const INFLUENCE = 330;    // 滑鼠影響半徑
  const MAX_WARP = 16;      // 最大牽引距離
  const DOT_SPACING = 30;   // 背景點距
  const LERP = 0.08;        // 滑鼠跟隨平滑度
  const CENTER_CLEAR = 1000;// 中央淨空寬度（px），此範圍內不顯示特效

  const css = getComputedStyle(document.documentElement);
  const ACCENT = (css.getPropertyValue("--accent").trim() || "#E986A2");
  const A = hex2rgb(ACCENT);

  const LINE_BASE = { r: 51, g: 51, b: 51, a: MODE === "static" ? 0.03 : 0.055 };
  const LINE_ON   = { r: A.r, g: A.g, b: A.b, a: 0.3 };
  const NODE_BASE = { r: 51, g: 51, b: 51, a: MODE === "static" ? 0.04 : 0.09 };
  const NODE_ON   = { r: A.r, g: A.g, b: A.b, a: 0.55 };
  const NODE_R = 1.9, NODE_R_ON = 3.8;

  function hex2rgb(h) {
    const m = h.replace("#", "");
    const n = parseInt(m.length === 3 ? m.split("").map(c => c + c).join("") : m, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  const lerp = (a, b, t) => a + (b - a) * t;
  function mix(base, on, t) {
    return `rgba(${Math.round(lerp(base.r, on.r, t))},${Math.round(lerp(base.g, on.g, t))},${Math.round(lerp(base.b, on.b, t))},${lerp(base.a, on.a, t).toFixed(3)})`;
  }

  /* ---------- 狀態 ---------- */
  let W = 0, H = 0, dpr = 1;
  const mouse = { x: -9999, y: -9999 };
  const target = { x: -9999, y: -9999 };
  const ripples = [];
  /* 首頁以大字區塊為界、內頁以主視覺大圖為界 */
  const band = document.querySelector(".pressure-band") || document.querySelector(".b-hero");

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", () => { resize(); schedule(); });

  if (MODE !== "static") {
    window.addEventListener("pointermove", e => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (MODE === "direct") { mouse.x = target.x; mouse.y = target.y; schedule(); }
    }, { passive: true });
  }

  if (MODE === "full") {
    window.addEventListener("pointerdown", e => {
      ripples.push({ x: e.clientX, y: e.clientY, radius: 0, opacity: 1, born: performance.now() });
    }, { passive: true });
  }

  window.addEventListener("scroll", () => { if (MODE !== "full") schedule(); }, { passive: true });

  /* 特效在大字下方才出現，交界處以漸層淡入 */
  function updateMask() {
    let start = 0, end = 0;
    if (band) {
      const b = band.getBoundingClientRect().bottom;
      start = Math.max(0, b - 120);
      end = Math.max(0, b + 60);
    }
    canvas.style.setProperty("--kg-start", start + "px");
    canvas.style.setProperty("--kg-end", end + "px");
  }

  /* ---------- 網格變形 ---------- */
  function warp(gx, gy, col, row, cols, rows) {
    const margin = 1.5;
    const cPin = Math.min(col / margin, (cols - 1 - col) / margin, 1);
    const rPin = Math.min(row / margin, (rows - 1 - row) / margin, 1);
    const pin = cPin * cPin * rPin * rPin;

    const dx = gx - mouse.x, dy = gy - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const prox = Math.max(0, 1 - dist / INFLUENCE) * pin;

    let rx = 0, ry = 0;
    for (const r of ripples) {
      const rdx = gx - r.x, rdy = gy - r.y;
      const rd = Math.sqrt(rdx * rdx + rdy * rdy);
      const diff = rd - r.radius;
      if (Math.abs(diff) < 55) {
        const s = (1 - Math.abs(diff) / 55) * r.opacity * 18 * pin;
        const ang = Math.atan2(rdy, rdx);
        const sign = diff < 0 ? -1 : 1;
        rx -= Math.cos(ang) * s * sign;
        ry -= Math.sin(ang) * s * sign;
      }
    }

    if (dist < INFLUENCE && dist > 0 && pin > 0) {
      const t = dist / INFLUENCE;
      const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
      const amt = eased * MAX_WARP * pin;
      const ang = Math.atan2(dy, dx);
      return { x: gx - Math.cos(ang) * amt + rx, y: gy - Math.sin(ang) * amt + ry, p: prox };
    }
    return { x: gx + rx, y: gy + ry, p: prox };
  }

  /* ---------- 繪製 ---------- */
  function draw(now) {
    ctx.clearRect(0, 0, W, H);

    /* 底層靜態點陣 */
    ctx.fillStyle = MODE === "static" ? "rgba(51,51,51,0.018)" : "rgba(51,51,51,0.028)";
    for (let x = DOT_SPACING / 2; x < W; x += DOT_SPACING) {
      for (let y = DOT_SPACING / 2; y < H; y += DOT_SPACING) {
        ctx.beginPath();
        ctx.arc(x, y, 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      const age = (now - r.born) / 1000;
      r.radius = Math.max(0, age * 400);
      r.opacity = Math.max(0, 1 - age * 1.2);
      if (r.opacity <= 0) ripples.splice(i, 1);
    }

    const cols = Math.max(2, Math.ceil(W / CELL)) + 1;
    const rows = Math.max(2, Math.ceil(H / CELL)) + 1;
    const cw = W / (cols - 1), ch = H / (rows - 1);

    const pts = [];
    for (let row = 0; row < rows; row++) {
      pts[row] = [];
      for (let col = 0; col < cols; col++) {
        pts[row][col] = warp(col * cw, row * ch, col, row, cols, rows);
      }
    }

    const seg = (p1, p2) => {
      const avg = (p1.p + p2.p) / 2;
      const t = avg * avg * (3 - 2 * avg);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = mix(LINE_BASE, LINE_ON, t);
      ctx.lineWidth = lerp(0.7, 1.5, t);
      ctx.stroke();
    };

    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols - 1; col++) seg(pts[row][col], pts[row][col + 1]);
    for (let col = 0; col < cols; col++)
      for (let row = 0; row < rows - 1; row++) seg(pts[row][col], pts[row + 1][col]);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const p = pts[row][col];
        const t = p.p * p.p * (3 - 2 * p.p);
        const r = lerp(NODE_R, NODE_R_ON, t);

        if (t > 0.3) {
          const gr = r + lerp(0, 6, (t - 0.3) / 0.7);
          const g = ctx.createRadialGradient(p.x, p.y, r * 0.5, p.x, p.y, gr);
          g.addColorStop(0, `rgba(${A.r},${A.g},${A.b},${(t * 0.14).toFixed(3)})`);
          g.addColorStop(1, `rgba(${A.r},${A.g},${A.b},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, gr, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = mix(NODE_BASE, NODE_ON, t);
        ctx.fill();
      }
    }

    for (const r of ripples) {
      ctx.beginPath();
      ctx.arc(r.x, r.y, Math.max(0, r.radius), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},${(r.opacity * 0.15).toFixed(3)})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }

    /* 中央內容區清空：特效只出現在兩側，交界以漸層淡出 */
    const cx = W / 2;
    const half = Math.min(CENTER_CLEAR / 2, W * 0.34);
    const band = 200;
    const total = (half + band) * 2;
    const g = ctx.createLinearGradient(cx - half - band, 0, cx + half + band, 0);
    const edge = band / total;
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(edge, "rgba(0,0,0,1)");
    g.addColorStop(1 - edge, "rgba(0,0,0,1)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = g;
    ctx.fillRect(cx - half - band, 0, total, H);
    ctx.restore();
  }

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(now => {
      queued = false;
      updateMask();
      draw(now || performance.now());
    });
  }

  if (MODE === "full") {
    (function loop(now) {
      if (!document.hidden) {
        mouse.x = lerp(mouse.x, target.x, LERP);
        mouse.y = lerp(mouse.y, target.y, LERP);
        updateMask();
        draw(now || performance.now());
      }
      requestAnimationFrame(loop);
    })();
  } else {
    schedule();
  }
})();
