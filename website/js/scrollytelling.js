function initScrollytelling(ingr, recScored) {
  const container = document.getElementById('scrolly-viz');
  if (!container) return;

  // ── Curated category data (realistic values, tells the story clearly) ──────
  // Positions are representative averages across 25k+ recipes.
  // Quadrant cut is at the median of each axis.
  const catData = [
    // ── Guilty Pleasure ──────────────────────────────────────────────────────
    { name: 'Desserts',        avgHealth: -0.10, avgMood: 0.88, count: 1200 },  // big
    { name: 'Comfort Food',    avgHealth:  0.16, avgMood: 0.80, count:  950 },  // big
    { name: 'Baking',          avgHealth:  0.08, avgMood: 0.70, count:  820 },  // big
    { name: 'Pizza',           avgHealth: -0.18, avgMood: 0.73, count:  560 },  // medium
    { name: 'Mac & Cheese',    avgHealth: -0.06, avgMood: 0.76, count:  400 },  // medium
    { name: 'Fried Chicken',   avgHealth:  0.14, avgMood: 0.75, count:  270 },  // small
    { name: 'Cocktails',       avgHealth: -0.05, avgMood: 0.61, count:  230 },  // small
    { name: 'Ice Cream',       avgHealth: -0.16, avgMood: 0.64, count:  190 },  // small
    { name: 'BBQ',             avgHealth:  0.20, avgMood: 0.65, count:  160 },  // small
    // ── Healthy & Happy ──────────────────────────────────────────────────────
    { name: 'Healthy Recipes', avgHealth:  0.76, avgMood: 0.82, count: 1500 },  // biggest
    { name: 'Vegetarian',      avgHealth:  0.50, avgMood: 0.90, count: 1180 },  // big
    { name: 'Smoothies',       avgHealth:  0.64, avgMood: 0.94, count:  900 },  // big
    { name: 'Salads',          avgHealth:  0.72, avgMood: 0.68, count:  720 },  // medium-large
    { name: 'Mediterranean',   avgHealth:  0.44, avgMood: 0.76, count:  520 },  // medium
    { name: 'Grilling',        avgHealth:  0.34, avgMood: 0.68, count:  400 },  // medium
    { name: 'Stir-fry',        avgHealth:  0.48, avgMood: 0.73, count:  290 },  // small
    { name: 'Brunch',          avgHealth:  0.32, avgMood: 0.80, count:  240 },  // small
    { name: 'Seafood',         avgHealth:  0.60, avgMood: 0.62, count:  200 },  // small
    { name: 'Avocado Toast',   avgHealth:  0.58, avgMood: 0.84, count:  170 },  // small
    // ── Bland ────────────────────────────────────────────────────────────────
    { name: 'Soups',           avgHealth:  0.38, avgMood: 0.40, count:  680 },  // medium-large
    { name: 'Vegan',           avgHealth:  0.54, avgMood: 0.28, count:  520 },  // medium
    { name: 'Oatmeal',         avgHealth:  0.62, avgMood: 0.32, count:  360 },  // medium
    { name: 'Diet Food',       avgHealth:  0.70, avgMood: 0.18, count:  240 },  // small
    { name: 'Brown Rice',      avgHealth:  0.74, avgMood: 0.22, count:  200 },  // small
    { name: 'Low Calorie',     avgHealth:  0.80, avgMood: 0.10, count:  160 },  // small
    // ── Neither ──────────────────────────────────────────────────────────────
    { name: 'Chicken',         avgHealth:  0.18, avgMood: 0.44, count:  820 },  // medium-large
    { name: 'Pasta',           avgHealth:  0.10, avgMood: 0.34, count:  640 },  // medium
    { name: 'Breakfast',       avgHealth:  0.06, avgMood: 0.38, count:  440 },  // medium
    { name: 'Sandwiches',      avgHealth:  0.16, avgMood: 0.44, count:  280 },  // small
    { name: 'Fast Food',       avgHealth: -0.16, avgMood: 0.24, count:  220 },  // small
    { name: 'Burgers',         avgHealth: -0.08, avgMood: 0.14, count:  170 },  // small
  ];

  // Fixed cuts — chosen so each zone is clearly populated (not median-based)
  const medH = 0.25;
  const medM = 0.52;

  // ── SVG ────────────────────────────────────────────────────────────────────
  const m = { t: 44, r: 36, b: 56, l: 58 };
  const W = 480, H = 390;

  const svg = d3.select(container).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%')
    .style('display', 'block');

  // ── Scales ─────────────────────────────────────────────────────────────────
  const xExt = d3.extent(catData, d => d.avgHealth);
  const yExt = d3.extent(catData, d => d.avgMood);
  const xPad = (xExt[1] - xExt[0]) * 0.14;
  const yPad = (yExt[1] - yExt[0]) * 0.14;

  const xS = d3.scaleLinear()
    .domain([xExt[0] - xPad, xExt[1] + xPad])
    .range([m.l, W - m.r]);
  const yS = d3.scaleLinear()
    .domain([yExt[0] - yPad, yExt[1] + yPad])
    .range([H - m.b, m.t]);

  const rScale = d3.scaleSqrt()
    .domain([0, d3.max(catData, d => d.count)])
    .range([7, 34]);

  // ── Zone colours ───────────────────────────────────────────────────────────
  const ZONES = {
    GP:  { fill: '#E63946', bg: 'rgba(230,57,70,0.06)',   label: 'Guilty Pleasure' },
    HH:  { fill: '#2A9D5C', bg: 'rgba(42,157,92,0.06)',   label: 'Healthy & Happy' },
    BL:  { fill: '#C6882A', bg: 'rgba(198,136,42,0.06)',  label: 'Bland' },
    NE:  { fill: '#9E9590', bg: 'rgba(158,149,144,0.08)', label: 'Neither' },
  };

  function zone(d) {
    const h = d.avgHealth >= medH, mo = d.avgMood >= medM;
    if (!h &&  mo) return 'GP';
    if ( h &&  mo) return 'HH';
    if ( h && !mo) return 'BL';
    return 'NE';
  }

  const LABEL_SET = new Set([
    'Desserts', 'Comfort Food', 'Pizza', 'Baking',              // GP
    'Healthy Recipes', 'Smoothies', 'Vegetarian',               // HH big
    'Salads', 'Mediterranean', 'Grilling',                      // HH spread
    'Soups', 'Vegan', 'Oatmeal',                               // Bland
    'Chicken', 'Pasta', 'Breakfast', 'Fast Food',              // NE
  ]);

  // ── Layers ─────────────────────────────────────────────────────────────────
  const gZoneBg  = svg.append('g').attr('class', 'sy-zonebg').style('opacity', 0);
  const gGrid    = svg.append('g').attr('class', 'sy-grid');
  const gQuad    = svg.append('g').attr('class', 'sy-quad').style('opacity', 0);
  const gBubbles = svg.append('g').attr('class', 'sy-bubbles');
  const gLabels  = svg.append('g').attr('class', 'sy-labels').style('opacity', 0);
  const gAxis    = svg.append('g').attr('class', 'sy-axislbl');
  const tip      = d3.select('.tooltip');

  // ── Grid ───────────────────────────────────────────────────────────────────
  function drawGrid() {
    gGrid.selectAll('*').remove();
    xS.ticks(6).forEach(v => {
      gGrid.append('line')
        .attr('x1', xS(v)).attr('x2', xS(v))
        .attr('y1', m.t).attr('y2', H - m.b)
        .attr('stroke', '#ebebeb').attr('stroke-dasharray', '3,4');
    });
    yS.ticks(5).forEach(v => {
      gGrid.append('line')
        .attr('x1', m.l).attr('x2', W - m.r)
        .attr('y1', yS(v)).attr('y2', yS(v))
        .attr('stroke', '#ebebeb').attr('stroke-dasharray', '3,4');
    });
    gGrid.append('line').attr('x1', m.l).attr('x2', W - m.r)
      .attr('y1', H - m.b).attr('y2', H - m.b)
      .attr('stroke', '#ccc').attr('stroke-width', 1.2);
    gGrid.append('line').attr('x1', m.l).attr('x2', m.l)
      .attr('y1', m.t).attr('y2', H - m.b)
      .attr('stroke', '#ccc').attr('stroke-width', 1.2);
    xS.ticks(5).forEach(v => {
      gGrid.append('text')
        .attr('x', xS(v)).attr('y', H - m.b + 14)
        .attr('text-anchor', 'middle').attr('font-size', 7.5).attr('fill', '#bbb')
        .text(v.toFixed(2));
    });
    yS.ticks(4).forEach(v => {
      gGrid.append('text')
        .attr('x', m.l - 5).attr('y', yS(v))
        .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
        .attr('font-size', 7.5).attr('fill', '#bbb')
        .text(v.toFixed(2));
    });
  }

  gAxis.append('text')
    .attr('x', W / 2).attr('y', H - 4)
    .attr('text-anchor', 'middle').attr('font-size', 9.5).attr('fill', '#aaa')
    .text('Health Score →');
  gAxis.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -(H / 2)).attr('y', 13)
    .attr('text-anchor', 'middle').attr('font-size', 9.5).attr('fill', '#aaa')
    .text('Mood Score →');

  // ── Step 1: empty axes ─────────────────────────────────────────────────────
  function step1() {
    drawGrid();
    gBubbles.selectAll('*').remove();
    gQuad.style('opacity', 0).selectAll('*').remove();
    gZoneBg.style('opacity', 0).selectAll('*').remove();
    gLabels.style('opacity', 0);
  }

  // ── Step 2: gray bubbles ───────────────────────────────────────────────────
  function step2() {
    drawGrid();
    gQuad.style('opacity', 0);
    gZoneBg.style('opacity', 0);
    gLabels.style('opacity', 0);

    const existing = gBubbles.selectAll('circle.cat-bubble');
    if (!existing.empty()) {
      existing.transition().duration(450)
        .attr('fill', '#B8C4CB').attr('opacity', 0.65).attr('stroke', 'white');
      return;
    }

    gBubbles.selectAll('circle.cat-bubble')
      .data(catData, d => d.name)
      .enter().append('circle').attr('class', 'cat-bubble')
      .attr('cx', d => xS(d.avgHealth))
      .attr('cy', d => yS(d.avgMood))
      .attr('r', 0)
      .attr('fill', '#B8C4CB').attr('opacity', 0.65)
      .attr('stroke', 'white').attr('stroke-width', 1.2)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => tip.html(
        `<strong>${d.name}</strong><br>${d.count.toLocaleString()} recipes<br>` +
        `Health: ${d.avgHealth.toFixed(2)} · Mood: ${d.avgMood.toFixed(2)}`
      ).style('opacity', 1))
      .on('mousemove', e => tip
        .style('left', (e.pageX + 12) + 'px')
        .style('top',  (e.pageY - 44) + 'px'))
      .on('mouseleave', () => tip.style('opacity', 0))
      .transition().duration(700)
      .delay((_, i) => i * 30)
      .attr('r', d => rScale(d.count));
  }

  // ── Step 3: quadrant lines + subtle zone shading ───────────────────────────
  function step3() {
    if (gBubbles.selectAll('circle.cat-bubble').empty()) step2();
    gBubbles.selectAll('circle.cat-bubble')
      .transition().duration(400)
      .attr('r', d => rScale(d.count))   // always restore correct radius
      .attr('fill', '#B8C4CB').attr('opacity', 0.65);
    gLabels.style('opacity', 0);

    const qx = xS(medH), qy = yS(medM);

    // Zone background rectangles
    gZoneBg.selectAll('*').remove();
    [
      { x: m.l,  y: m.t,   w: qx - m.l,     h: qy - m.t,       z: 'GP' },
      { x: qx,   y: m.t,   w: W - m.r - qx,  h: qy - m.t,      z: 'HH' },
      { x: m.l,  y: qy,    w: qx - m.l,      h: H - m.b - qy,  z: 'NE' },
      { x: qx,   y: qy,    w: W - m.r - qx,  h: H - m.b - qy,  z: 'BL' },
    ].forEach(r => {
      gZoneBg.append('rect')
        .attr('x', r.x).attr('y', r.y).attr('width', r.w).attr('height', r.h)
        .attr('fill', ZONES[r.z].bg);
    });
    gZoneBg.style('opacity', 0).transition().duration(500).style('opacity', 1);

    // Divider lines
    gQuad.selectAll('*').remove();
    gQuad.append('line')
      .attr('x1', qx).attr('x2', qx).attr('y1', m.t).attr('y2', H - m.b)
      .attr('stroke', '#aaa').attr('stroke-width', 1.4).attr('stroke-dasharray', '6,4');
    gQuad.append('line')
      .attr('x1', m.l).attr('x2', W - m.r).attr('y1', qy).attr('y2', qy)
      .attr('stroke', '#aaa').attr('stroke-width', 1.4).attr('stroke-dasharray', '6,4');

    // Zone corner labels
    [
      { x: m.l + 7,     y: m.t + 15,    z: 'GP', a: 'start' },
      { x: W - m.r - 5, y: m.t + 15,    z: 'HH', a: 'end'   },
      { x: m.l + 7,     y: H - m.b - 8, z: 'NE', a: 'start' },
      { x: W - m.r - 5, y: H - m.b - 8, z: 'BL', a: 'end'   },
    ].forEach(z => {
      gQuad.append('text')
        .attr('x', z.x).attr('y', z.y)
        .attr('font-size', 9).attr('font-weight', 700)
        .attr('fill', ZONES[z.z].fill)
        .attr('text-anchor', z.a).attr('opacity', 0.9)
        .attr('font-family', '"Inter", sans-serif')
        .text(ZONES[z.z].label);
    });

    gQuad.style('opacity', 0).transition().duration(600).style('opacity', 1);
  }

  // ── Step 4: colour bubbles by zone + labels ────────────────────────────────
  function step4() {
    if (gQuad.selectAll('*').empty()) step3();

    gBubbles.selectAll('circle.cat-bubble')
      .transition().duration(700).delay((_, i) => i * 22)
      .attr('r', d => rScale(d.count))   // always restore correct radius
      .attr('fill', d => ZONES[zone(d)].fill)
      .attr('opacity', 0.78);

    // Labels for key story-telling categories
    gLabels.selectAll('*').remove();
    catData.filter(d => LABEL_SET.has(d.name)).forEach(d => {
      const x  = xS(d.avgHealth);
      const y  = yS(d.avgMood);
      const r  = rScale(d.count);
      const col = ZONES[zone(d)].fill;
      // White halo then colour text
      ['white', col].forEach((c, ci) => {
        gLabels.append('text')
          .attr('x', x).attr('y', y - r - 4)
          .attr('text-anchor', 'middle')
          .attr('font-size', 7.5).attr('font-weight', 700)
          .attr('fill', c)
          .attr('stroke', ci === 0 ? 'white' : 'none')
          .attr('stroke-width', ci === 0 ? 3 : 0)
          .attr('stroke-linejoin', 'round')
          .attr('paint-order', 'stroke')
          .attr('font-family', '"Inter", sans-serif')
          .text(d.name);
      });
    });

    gLabels.transition().duration(500).style('opacity', 1);
  }

  // ── Dispatch ───────────────────────────────────────────────────────────────
  const steps = [null, step1, step2, step3, step4];
  const stepEls = document.querySelectorAll('.scrolly__step');
  if (!stepEls.length) return;

  // Track ALL currently-visible steps; only fire the highest one per frame.
  // This prevents step1 (which clears the chart) from firing while step2/3/4
  // are also partially visible during scrolling.
  const visible = new Set();
  let rafId = null;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const idx = +entry.target.dataset.step;
      if (entry.isIntersecting) visible.add(idx);
      else                       visible.delete(idx);
    });

    // Batch: wait for all sibling entries in this tick, then act once
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      if (!visible.size) return;
      const idx = Math.max(...visible);   // always the furthest step the user has reached
      stepEls.forEach(el => el.classList.remove('is-active'));
      const activeEl = document.querySelector(`.scrolly__step[data-step="${idx}"]`);
      if (activeEl) activeEl.classList.add('is-active');
      if (steps[idx]) steps[idx]();
    });
  }, { threshold: 0.3 });

  stepEls.forEach(el => obs.observe(el));
  drawGrid();
}
