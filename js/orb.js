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
  const SPEED = 0.0022;     // 自轉速度
  const TILT = 0.42;        // 傾角
  const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    const cs = Math.cos(rot), sn = Math.sin(rot);
    const ct = Math.cos(TILT), st = Math.sin(TILT);

    for (const p of pts) {
      const x = p.x * cs - p.z * sn;
      const z = p.x * sn + p.z * cs;
      const y = p.y * ct - z * st;
      const zz = p.y * st + z * ct;

      const depth = (zz + 1) / 2;                 // 0 遠 → 1 近
      const px = cx + x * R;
      const py = cy + y * R;
      const size = 0.5 + depth * 1.5;
      const alpha = 0.07 + depth * 0.42;

      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(51,51,51,${alpha.toFixed(3)})`;
      ctx.fill();
    }
  }

  function loop() {
    if (visible) {
      rot += SPEED;
      draw();
    }
    raf = requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener("resize", () => { resize(); draw(); });

  /* 捲出畫面時停止運算 */
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(es => { visible = es[0].isIntersecting; },
      { threshold: 0 }).observe(canvas);
  }

  if (REDUCE) { draw(); return; }   // 減少動態效果：靜態呈現
  loop();
})();
