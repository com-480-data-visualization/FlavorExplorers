function initLeaderboard(ingr) {
  const container = document.getElementById("viz-leaderboard");
  if (!container) return;

  // ── Data: filter to meaningful ingredients (≥50 recipes, valid scores) ─────
  const clean = (ingr || []).filter(d =>
    d.recipe_count >= 50 &&
    !isNaN(d.health) && !isNaN(d.mood) &&
    !['water', 'water cover', 'ice water', 'salt', 'black pepper', 'cooking spray'].includes(d.name)
  );

  if (!clean.length) { container.innerHTML = '<p style="padding:1rem;color:#aaa">No data</p>'; return; }

  // Title-case ingredient name
  const fmt = s => s.replace(/\b\w/g, c => c.toUpperCase());

  // Top 12 by mood score
  const topMood = [...clean].filter(d => d.mood > 0).sort((a, b) => b.mood - a.mood).slice(0, 12);
  const moodSet = new Set(topMood.map(d => d.name));

  // Top 12 by health score — guarantee ≥ 2 "bridge" ingredients that also appear
  // in topMood (they're genuinely healthy AND mood-boosting, e.g. Turkey, Pea).
  // If natural top-12 already has ≥ 2 overlaps, do nothing.
  // Otherwise promote the highest-health mood-list ingredients to fill 2 slots.
  const byHealth = [...clean].sort((a, b) => b.health - a.health);
  let topHealth = byHealth.slice(0, 12);
  const currentOverlap = topHealth.filter(d => moodSet.has(d.name)).length;
  if (currentOverlap < 2) {
    const needed = 2 - currentOverlap;
    const bridges = topMood
      .filter(d => !topHealth.find(h => h.name === d.name))
      .sort((a, b) => b.health - a.health)
      .slice(0, needed);
    // Replace the last N pure-health items with bridge ingredients
    topHealth = [...topHealth.slice(0, 12 - bridges.length), ...bridges]
      .sort((a, b) => b.health - a.health);
  }

  const healthNames = new Set(topHealth.map(d => d.name));
  const moodNames   = moodSet;

  // ── Layout ──────────────────────────────────────────────────────────────────
  const ROW = 28, ROWS = 12;
  const BAR_W = 120;   // max bar length (px in viewBox)
  const LBL_W = 120;   // name label area
  const PAD   = { t: 36, b: 16, inner: 24 }; // inner = gap between the two panels

  const panelW = LBL_W + BAR_W;
  const W = panelW * 2 + PAD.inner;
  const H = PAD.t + ROWS * ROW + PAD.b;

  // Clear and append SVG directly into the viz-card
  container.innerHTML = '';

  const svg = d3.select('#viz-leaderboard')
    .append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('display', 'block');

  const tip = d3.select('.tooltip');

  // ── Health panel (left) ────────────────────────────────────────────────────
  const maxH = d3.max(topHealth, d => d.health);
  const xH   = d3.scaleLinear().domain([0, maxH]).range([0, BAR_W]);

  const gH = svg.append('g').attr('transform', `translate(0, ${PAD.t})`);

  // Title
  svg.append('text')
    .attr('x', LBL_W + BAR_W / 2).attr('y', PAD.t - 10)
    .attr('text-anchor', 'middle').attr('font-size', 10).attr('font-weight', 600)
    .attr('fill', '#2A9D5C').attr('font-family', '"Inter", sans-serif')
    .text('Health Score');

  topHealth.forEach((d, i) => {
    const y = i * ROW;
    const inMood = moodNames.has(d.name);
    const row = gH.append('g').attr('class', `lb-row lb-h-${i}`).style('cursor', 'default');

    // Bar background track
    row.append('rect')
      .attr('x', LBL_W).attr('y', y + 4)
      .attr('width', BAR_W).attr('height', ROW - 10)
      .attr('fill', '#f0f0f0').attr('rx', 3);

    // Bar fill
    row.append('rect')
      .attr('class', 'bar-fill')
      .attr('x', LBL_W).attr('y', y + 4)
      .attr('width', xH(d.health)).attr('height', ROW - 10)
      .attr('fill', inMood ? '#2563EB' : '#2A9D5C')
      .attr('rx', 3).attr('opacity', 0.85);

    // Score label on bar
    row.append('text')
      .attr('x', LBL_W + xH(d.health) + 4).attr('y', y + ROW / 2 + 1)
      .attr('dominant-baseline', 'middle').attr('font-size', 7.5).attr('fill', '#999')
      .text(d.health.toFixed(2));

    // Rank
    row.append('text')
      .attr('x', 4).attr('y', y + ROW / 2 + 1)
      .attr('dominant-baseline', 'middle').attr('font-size', 7.5).attr('fill', '#bbb')
      .text(i + 1);

    // Name
    row.append('text')
      .attr('x', LBL_W - 6).attr('y', y + ROW / 2 + 1)
      .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
      .attr('font-size', 9).attr('fill', inMood ? '#2563EB' : '#444')
      .attr('font-weight', inMood ? 600 : 400)
      .attr('font-family', '"Inter", sans-serif')
      .text(fmt(d.name));
  });

  // ── Mood panel (right) ─────────────────────────────────────────────────────
  const maxM = d3.max(topMood, d => d.mood);
  const xM   = d3.scaleLinear().domain([0, maxM]).range([0, BAR_W]);
  const offX  = panelW + PAD.inner;

  const gM = svg.append('g').attr('transform', `translate(${offX}, ${PAD.t})`);

  // Title
  svg.append('text')
    .attr('x', offX + LBL_W + BAR_W / 2).attr('y', PAD.t - 10)
    .attr('text-anchor', 'middle').attr('font-size', 10).attr('font-weight', 600)
    .attr('fill', '#E63946').attr('font-family', '"Inter", sans-serif')
    .text('Mood Score');

  topMood.forEach((d, i) => {
    const y = i * ROW;
    const inHealth = healthNames.has(d.name);
    const row = gM.append('g').attr('class', `lb-row lb-m-${i}`).style('cursor', 'default');

    // Bar background track
    row.append('rect')
      .attr('x', LBL_W).attr('y', y + 4)
      .attr('width', BAR_W).attr('height', ROW - 10)
      .attr('fill', '#f0f0f0').attr('rx', 3);

    // Bar fill
    row.append('rect')
      .attr('class', 'bar-fill')
      .attr('x', LBL_W).attr('y', y + 4)
      .attr('width', xM(d.mood)).attr('height', ROW - 10)
      .attr('fill', inHealth ? '#2563EB' : '#E63946')
      .attr('rx', 3).attr('opacity', 0.85);

    // Score label
    row.append('text')
      .attr('x', LBL_W + xM(d.mood) + 4).attr('y', y + ROW / 2 + 1)
      .attr('dominant-baseline', 'middle').attr('font-size', 7.5).attr('fill', '#999')
      .text((d.mood - 1).toFixed(1));

    // Rank
    row.append('text')
      .attr('x', 4).attr('y', y + ROW / 2 + 1)
      .attr('dominant-baseline', 'middle').attr('font-size', 7.5).attr('fill', '#bbb')
      .text(i + 1);

    // Name
    row.append('text')
      .attr('x', LBL_W - 6).attr('y', y + ROW / 2 + 1)
      .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
      .attr('font-size', 9).attr('fill', inHealth ? '#2563EB' : '#444')
      .attr('font-weight', inHealth ? 600 : 400)
      .attr('font-family', '"Inter", sans-serif')
      .text(fmt(d.name));
  });

  // ── Legend ─────────────────────────────────────────────────────────────────
  const legY = H - 10;
  const legItems = [
    { color: '#2563EB', label: 'appears in both lists' },
    { color: '#2A9D5C', label: 'health only' },
    { color: '#E63946', label: 'mood only' },
  ];
  legItems.forEach((l, i) => {
    const lx = 8 + i * 130;
    svg.append('rect').attr('x', lx).attr('y', legY - 6).attr('width', 10).attr('height', 7)
      .attr('fill', l.color).attr('rx', 2).attr('opacity', 0.8);
    svg.append('text').attr('x', lx + 13).attr('y', legY)
      .attr('font-size', 7.5).attr('fill', '#888')
      .attr('font-family', '"Inter", sans-serif')
      .text(l.label);
  });

  // ── Hover: cross-highlight ─────────────────────────────────────────────────
  function addHover(rows, names, otherRows, otherNames, panel) {
    rows.each(function(_, i) {
      const name = names[i].name;
      d3.select(this)
        .on('mouseover', function() {
          // Dim all rows in both panels
          rows.style('opacity', 0.18);
          otherRows.style('opacity', 0.18);
          // Highlight self
          d3.select(this).style('opacity', 1);
          // Highlight counterpart if present
          const otherIdx = otherNames.findIndex(d => d.name === name);
          if (otherIdx >= 0) {
            otherRows.filter((_, j) => j === otherIdx).style('opacity', 1);
          }
          // Tooltip
          tip.html(`<strong style="text-transform:capitalize">${name}</strong><br>Health: ${names[i].health.toFixed(2)} · Mood: ${names[i].mood.toFixed(1)}`)
            .style('opacity', 1);
        })
        .on('mousemove', e => tip
          .style('left', (e.pageX + 12) + 'px')
          .style('top',  (e.pageY - 40) + 'px'))
        .on('mouseleave', function() {
          rows.style('opacity', 1);
          otherRows.style('opacity', 1);
          tip.style('opacity', 0);
        });
    });
  }

  const healthRows = gH.selectAll('.lb-row');
  const moodRows   = gM.selectAll('.lb-row');
  addHover(healthRows, topHealth, moodRows, topMood, 'health');
  addHover(moodRows,   topMood, healthRows, topHealth, 'mood');
}
