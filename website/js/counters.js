(function () {
  const targets = [
    { sel: '.stat-num.s1', end: 25000, fmt: v => Math.round(v / 1000) + 'k+' },
    { sel: '.stat-num.s2', end: 1530,  fmt: v => Math.round(v).toLocaleString() },
    { sel: '.stat-num.s3', end: 40,    fmt: v => Math.round(v) },
  ];

  function animate(el, end, fmt, duration) {
    const start = performance.now();
    (function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(eased * end);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = fmt(end);
    })(start);
  }

  const stats = document.querySelector('.stats');
  if (!stats) return;

  let fired = false;
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !fired) {
      fired = true;
      targets.forEach(({ sel, end, fmt }, i) => {
        const el = document.querySelector(sel);
        if (el) animate(el, end, fmt, 1400 + i * 200);
      });
    }
  }, { threshold: 0.5 }).observe(stats);
})();
