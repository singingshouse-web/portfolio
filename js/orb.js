/* =========================================================
   心映好事 — About 粒子球
   深灰色點陣構成的球體，緩慢自轉。
   ========================================================= */
(function () {
  const canvas = document.getElementById("orb");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const N = 900;            // 點的數量
  const SPEED_BASE = 0.0022; // 自轉速度
  const TILT = 0.42;        // 傾角
  const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SPEED = REDUCE ? SPEED_BASE * 0.5 : SPEED_BASE;

  /* 費波那契球面分佈，讓點分佈均勻 */
  const pts = [];
  const GA = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = GA * i;
    pts.push({ x: Math.cos(th) * r, y: y, z: Math.sin(th) * r });
  }

  let W = 0, H = 0, R = 0, rot = 0, visible = true, raf = null;

  /* 游標互動：整體傾斜 + 靠近的點會亮起放大 */
  const ACCENT = (getComputedStyle(document.documentElement)
    .getPropertyValue("--accent").trim() || "#E986A2").replace("#", "");
  const AC = {
    r: parseInt(ACCENT.slice(0, 2), 16),
    g: parseInt(ACCENT.slice(2, 4), 16),
    b: parseInt(ACCENT.slice(4, 6), 16)
  };
  const pointer = { x: -9999, y: -9999, on: false };
  const tilt = { x: 0, y: 0 };
  const tiltTarget = { x: 0, y: 0 };

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    R = Math.min(W, H) * 0.44;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2;
    const cs = Math.cos(rot + tilt.x), sn = Math.sin(rot + tilt.x);
    const tl = TILT + tilt.y;
    const ct = Math.cos(tl), st = Math.sin(tl);

    for (const p of pts) {
      const x = p.x * cs - p.z * sn;
      const z = p.x * sn + p.z * cs;
      const y = p.y * ct - z * st;
      const zz = p.y * st + z * ct;

      const depth = (zz + 1) / 2;                 // 0 遠 → 1 近
      const px = cx + x * R;
      const py = cy + y * R;
      let size = 0.5 + depth * 1.5;
      let alpha = 0.07 + depth * 0.42;
      let col = "51,51,51";

      if (pointer.on) {
        const dx = px - pointer.x, dy = py - pointer.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          const k = (1 - d / 110) * (0.3 + depth * 0.7);
          size += k * 2.2;
          alpha = Math.min(1, alpha + k * 0.5);
          col = `${AC.r},${AC.g},${AC.b}`;
        }
      }

      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col},${alpha.toFixed(3)})`;
      ctx.fill();
    }
  }

  function loop() {
    if (visible) {
      rot += SPEED;
      tilt.x += (tiltTarget.x - tilt.x) * 0.06;
      tilt.y += (tiltTarget.y - tilt.y) * 0.06;
      draw();
    }
    raf = requestAnimationFrame(loop);
  }

  canvas.addEventListener("pointermove", e => {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
    pointer.on = true;
    tiltTarget.x = ((pointer.x / W) - 0.5) * 0.7;
    tiltTarget.y = ((pointer.y / H) - 0.5) * -0.5;
  }, { passive: true });

  canvas.addEventListener("pointerleave", () => {
    pointer.on = false;
    tiltTarget.x = 0;
    tiltTarget.y = 0;
  }, { passive: true });

  resize();
  window.addEventListener("resize", () => { resize(); draw(); });

  /* 捲出畫面時停止運算 */
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(es => { visible = es[0].isIntersecting; },
      { threshold: 0 }).observe(canvas);
  }

  /* 系統開啟「減少動態效果」時仍會轉動，只是速度放慢 */
  loop();
})();
