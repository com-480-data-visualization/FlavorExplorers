(function () {
  const palette = {
    neutral:   [248, 241, 231],
    healthy:   [239, 248, 242],
    comfort:   [252, 239, 236],
    adventure: [243, 239, 252],
    gold:      [252, 246, 230],
  };

  const map = [
    { id: 'viz-ingr-heatmap',    mood: 'healthy'   },
    { id: 'viz-recipe-scatter',  mood: 'neutral'   },
    { id: 'viz-bubble',          mood: 'gold'      },
    { id: 'viz-leaderboard',     mood: 'healthy'   },
    { id: 'viz-cat-scatter',     mood: 'neutral'   },
    { id: 'ingredient-bar-wrap', mood: 'adventure' },
    { id: 'viz-sankey',          mood: 'adventure' },
    { id: 'viz-compare-spider',  mood: 'neutral'   },
    { id: 'viz-lines',           mood: 'comfort'   },
  ];

  let current = palette.neutral.slice();
  let raf = null;

  function transitionTo(key) {
    const target = palette[key];
    if (!target) return;
    if (raf) cancelAnimationFrame(raf);
    const from = current.slice();
    const t0 = performance.now();
    (function step(now) {
      const t = Math.min((now - t0) / 900, 1);
      const e = 1 - Math.pow(1 - t, 2);
      current = target.map((v, i) => Math.round(from[i] + (v - from[i]) * e));
      document.documentElement.style.setProperty('--bg', `rgb(${current.join(',')})`);
      document.body.style.background = `rgb(${current.join(',')})`;
      if (t < 1) raf = requestAnimationFrame(step);
    })(t0);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const found = map.find(s => s.id === e.target.id);
        if (found) transitionTo(found.mood);
      }
    });
  }, { threshold: 0.35, rootMargin: '-5% 0px -5% 0px' });

  map.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });
})();
