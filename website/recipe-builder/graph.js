const gameIngredients = [{"name":"salt","healthy_score":-0.3,"mood_score":0.0,"recipe_count":24226,"healthy":"no","category":"Pantry"},{"name":"butter","healthy_score":0.2,"mood_score":0.7,"recipe_count":19189,"healthy":"no","category":"Pantry"},{"name":"egg","healthy_score":0.8,"mood_score":0.7,"recipe_count":18101,"healthy":"yes","category":"Dairy & Eggs"},{"name":"white sugar","healthy_score":-0.9,"mood_score":-1.0,"recipe_count":18000,"healthy":"no","category":"Pantry"},{"name":"all purpose flour","healthy_score":-0.7,"mood_score":-0.7,"recipe_count":14441,"healthy":"no","category":"Pantry"},{"name":"garlic","healthy_score":0.9,"mood_score":0.8,"recipe_count":13098,"healthy":"yes","category":"Produce"},{"name":"onion","healthy_score":0.9,"mood_score":0.8,"recipe_count":11541,"healthy":"yes","category":"Produce"},{"name":"vanilla extract","healthy_score":0.8,"mood_score":0.7,"recipe_count":9194,"healthy":"yes","category":"Pantry"},{"name":"olive oil","healthy_score":0.9,"mood_score":0.8,"recipe_count":8805,"healthy":"yes","category":"Pantry"},{"name":"milk","healthy_score":0.8,"mood_score":0.6,"recipe_count":8706,"healthy":"yes","category":"Dairy & Eggs"},{"name":"brown sugar","healthy_score":0.2,"mood_score":0.3,"recipe_count":7488,"healthy":"no","category":"Pantry"},{"name":"cinnamon","healthy_score":0.9,"mood_score":0.8,"recipe_count":7115,"healthy":"yes","category":"Pantry"},{"name":"vegetable oil","healthy_score":-0.7,"mood_score":-0.3,"recipe_count":6339,"healthy":"no","category":"Pantry"},{"name":"baking powder","healthy_score":0.3,"mood_score":0.0,"recipe_count":5981,"healthy":"yes","category":"Pantry"},{"name":"baking soda","healthy_score":0.8,"mood_score":0.0,"recipe_count":5364,"healthy":"yes","category":"Pantry"},{"name":"garlic powder","healthy_score":0.9,"mood_score":0.8,"recipe_count":4035,"healthy":"yes","category":"Pantry"},{"name":"carrot","healthy_score":0.9,"mood_score":0.8,"recipe_count":3675,"healthy":"yes","category":"Produce"},{"name":"lemon juice","healthy_score":0.9,"mood_score":0.8,"recipe_count":3486,"healthy":"yes","category":"Produce"},{"name":"green onion","healthy_score":0.9,"mood_score":0.8,"recipe_count":3479,"healthy":"yes","category":"Produce"},{"name":"cayenne pepper","healthy_score":0.9,"mood_score":0.8,"recipe_count":3468,"healthy":"yes","category":"Pantry"},{"name":"parsley","healthy_score":0.9,"mood_score":0.8,"recipe_count":3414,"healthy":"yes","category":"Produce"},{"name":"beef","healthy_score":0.3,"mood_score":0.8,"recipe_count":3404,"healthy":"no","category":"Protein"},{"name":"tomato","healthy_score":0.9,"mood_score":0.8,"recipe_count":3360,"healthy":"yes","category":"Produce"},{"name":"cumin","healthy_score":0.8,"mood_score":0.8,"recipe_count":3260,"healthy":"yes","category":"Pantry"},{"name":"parmesan cheese","healthy_score":0.3,"mood_score":0.7,"recipe_count":3222,"healthy":"no","category":"Dairy & Eggs"},{"name":"oregano","healthy_score":0.9,"mood_score":0.8,"recipe_count":3049,"healthy":"yes","category":"Pantry"},{"name":"nutmeg","healthy_score":0.6,"mood_score":0.7,"recipe_count":3003,"healthy":"yes","category":"Pantry"},{"name":"cheddar cheese","healthy_score":0.3,"mood_score":0.7,"recipe_count":2859,"healthy":"no","category":"Dairy & Eggs"},{"name":"paprika","healthy_score":0.8,"mood_score":0.7,"recipe_count":2854,"healthy":"yes","category":"Pantry"},{"name":"cream cheese","healthy_score":-0.3,"mood_score":0.3,"recipe_count":2849,"healthy":"no","category":"Dairy & Eggs"},{"name":"celery","healthy_score":0.9,"mood_score":0.8,"recipe_count":2783,"healthy":"yes","category":"Produce"},{"name":"sour cream","healthy_score":-0.3,"mood_score":0.3,"recipe_count":2736,"healthy":"no","category":"Dairy & Eggs"},{"name":"green bell pepper","healthy_score":0.9,"mood_score":0.8,"recipe_count":2717,"healthy":"yes","category":"Produce"},{"name":"soy sauce","healthy_score":0.3,"mood_score":0.7,"recipe_count":2641,"healthy":"no","category":"Pantry"},{"name":"ginger","healthy_score":0.9,"mood_score":0.8,"recipe_count":2625,"healthy":"yes","category":"Produce"},{"name":"cilantro","healthy_score":0.9,"mood_score":0.8,"recipe_count":2419,"healthy":"yes","category":"Produce"},{"name":"chili powder","healthy_score":0.8,"mood_score":0.8,"recipe_count":2289,"healthy":"yes","category":"Pantry"},{"name":"mayonnaise","healthy_score":-0.7,"mood_score":0.2,"recipe_count":2240,"healthy":"no","category":"Other"},{"name":"honey","healthy_score":0.7,"mood_score":0.7,"recipe_count":2227,"healthy":"yes","category":"Other"},{"name":"bacon","healthy_score":-0.8,"mood_score":0.3,"recipe_count":2150,"healthy":"no","category":"Protein"},{"name":"red bell pepper","healthy_score":0.9,"mood_score":0.8,"recipe_count":2090,"healthy":"yes","category":"Produce"},{"name":"walnut","healthy_score":0.9,"mood_score":0.9,"recipe_count":2067,"healthy":"yes","category":"Other"},{"name":"thyme","healthy_score":0.9,"mood_score":0.8,"recipe_count":1976,"healthy":"yes","category":"Pantry"},{"name":"basil","healthy_score":0.9,"mood_score":0.8,"recipe_count":1951,"healthy":"yes","category":"Pantry"},{"name":"cream","healthy_score":-0.5,"mood_score":0.3,"recipe_count":1889,"healthy":"no","category":"Dairy & Eggs"},{"name":"chicken broth","healthy_score":0.8,"mood_score":0.7,"recipe_count":1883,"healthy":"yes","category":"Other"},{"name":"red onion","healthy_score":0.8,"mood_score":0.8,"recipe_count":1786,"healthy":"yes","category":"Produce"},{"name":"mozzarella cheese","healthy_score":0.6,"mood_score":0.7,"recipe_count":1751,"healthy":"yes","category":"Dairy & Eggs"},{"name":"lemon","healthy_score":0.9,"mood_score":0.8,"recipe_count":1728,"healthy":"yes","category":"Produce"},{"name":"potato","healthy_score":0.7,"mood_score":0.3,"recipe_count":1689,"healthy":"yes","category":"Produce"},{"name":"red pepper flake","healthy_score":0.8,"mood_score":0.8,"recipe_count":1676,"healthy":"yes","category":"Pantry"},{"name":"banana","healthy_score":0.9,"mood_score":0.8,"recipe_count":1644,"healthy":"yes","category":"Produce"},{"name":"pecan","healthy_score":0.9,"mood_score":0.8,"recipe_count":1626,"healthy":"yes","category":"Other"},{"name":"cocoa powder","healthy_score":0.9,"mood_score":0.8,"recipe_count":1616,"healthy":"yes","category":"Other"},{"name":"chicken","healthy_score":0.6,"mood_score":0.7,"recipe_count":1600,"healthy":"yes","category":"Protein"},{"name":"spinach","healthy_score":0.9,"mood_score":0.8,"recipe_count":1520,"healthy":"yes","category":"Produce"},{"name":"lime","healthy_score":0.9,"mood_score":0.8,"recipe_count":1480,"healthy":"yes","category":"Produce"},{"name":"almond","healthy_score":0.9,"mood_score":0.8,"recipe_count":1450,"healthy":"yes","category":"Other"},{"name":"black bean","healthy_score":0.9,"mood_score":0.8,"recipe_count":1380,"healthy":"yes","category":"Protein"},{"name":"avocado","healthy_score":0.9,"mood_score":0.8,"recipe_count":1320,"healthy":"yes","category":"Produce"},{"name":"shrimp","healthy_score":0.8,"mood_score":0.7,"recipe_count":1300,"healthy":"yes","category":"Protein"}];

const selected = new Map();
const sliderPositions = new Map();
const QUANTITIES = [
  { key: 'pinch', label: 'pinch', weight: 0.3 },
  { key: 'some',  label: 'some',  weight: 1.0 },
  { key: 'lots',  label: 'lots',  weight: 2.5 }
];
const MAX_SELECTED = 6;
let activeCategory = 'All';
let searchQuery = '';

function valueToQtyKey(v) {
  if (v <= 0)    return null;
  if (v <= 1/3)  return 'pinch';
  if (v <= 2/3)  return 'some';
  return 'lots';
}

const QTY_MIDPOINT = { pinch: 1 / 6, some: 0.5, lots: 5 / 6 };

const categories = ['All', ...new Set(gameIngredients.map(d => d.category))].filter(c => c !== 'Other');
categories.push('Other');

function ingrDotColor(d) {
  if (d.healthy_score >= 0.7) return '#5aab6e';
  if (d.healthy_score >= 0.3) return '#e8a840';
  return '#e05c5c';
}

const tabContainer = document.getElementById('category-tabs');
categories.forEach(cat => {
  const tab = document.createElement('button');
  tab.className = 'cat-tab' + (cat === 'All' ? ' active' : '');
  tab.textContent = cat;
  tab.addEventListener('click', () => {
    activeCategory = cat;
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderGrid();
  });
  tabContainer.appendChild(tab);
});

document.getElementById('search-box').addEventListener('input', function () {
  searchQuery = this.value.toLowerCase().trim();
  renderGrid();
});

document.getElementById('clear-btn').addEventListener('click', () => {
  selected.clear();
  sliderPositions.clear();
  renderGrid();
  updateResults();
  updateCount();
});

function renderGrid() {
  const grid = document.getElementById('ingredient-grid');
  grid.innerHTML = '';

  const visible = gameIngredients.filter(d => {
    const matchCat = activeCategory === 'All' || d.category === activeCategory;
    const matchSearch = !searchQuery || d.name.includes(searchQuery);
    return matchCat && matchSearch;
  });

  const atLimit = selected.size >= MAX_SELECTED;

  visible.forEach(d => {
    const currentQty = selected.get(d.name);
    const isSel = currentQty !== undefined;
    const lockedOut = atLimit && !isSel;

    const row = document.createElement('div');
    row.className = 'ingr-row' + (isSel ? ' selected' : '') + (lockedOut ? ' disabled' : '');
    row.title = lockedOut
      ? `Limit of ${MAX_SELECTED} ingredients reached`
      : `Health: ${d.healthy_score > 0 ? '+' : ''}${d.healthy_score.toFixed(1)}  Mood: ${d.mood_score > 0 ? '+' : ''}${d.mood_score.toFixed(1)}`;

    const dot = document.createElement('span');
    dot.className = 'ingr-dot';
    dot.style.background = ingrDotColor(d);

    const label = document.createElement('span');
    label.className = 'ingr-name';
    label.textContent = d.name;

    const sliderWrap = document.createElement('div');
    sliderWrap.className = 'qty-slider-wrap';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1';
    slider.step = '0.001';
    slider.className = 'qty-slider';
    slider.disabled = lockedOut;
    const initialValue = sliderPositions.has(d.name)
      ? sliderPositions.get(d.name)
      : (isSel ? QTY_MIDPOINT[currentQty] : 0);
    slider.value = String(initialValue);
    sliderWrap.appendChild(slider);

    const qtyLabel = document.createElement('span');
    qtyLabel.className = 'qty-label';
    qtyLabel.textContent = valueToQtyKey(initialValue) ?? '—';

    slider.addEventListener('input', e => {
      qtyLabel.textContent = valueToQtyKey(parseFloat(e.target.value)) ?? '—';
    });

    slider.addEventListener('change', e => {
      const v = parseFloat(e.target.value);
      const key = valueToQtyKey(v);
      if (key === null) {
        selected.delete(d.name);
        sliderPositions.delete(d.name);
      } else {
        if (!selected.has(d.name) && selected.size >= MAX_SELECTED) {
          slider.value = '0';
          qtyLabel.textContent = '—';
          return;
        }
        selected.set(d.name, key);
        sliderPositions.set(d.name, v);
      }
      renderGrid();
      updateResults();
      updateCount();
    });

    row.appendChild(dot);
    row.appendChild(label);
    row.appendChild(sliderWrap);
    row.appendChild(qtyLabel);
    grid.appendChild(row);
  });
}

function updateCount() {
  document.getElementById('selected-count').textContent =
    `${selected.size} / ${MAX_SELECTED} ingredients selected`;
}

function qtyWeight(key) {
  const q = QUANTITIES.find(q => q.key === key);
  return q ? q.weight : 1;
}

function drawGauge(svgId, value, color) {
  const svgEl = document.getElementById(svgId);
  d3.select(svgEl).selectAll('*').remove();

  const W = 120, H = 84;
  const cx = W / 2, cy = 66;
  const r = 52;

  const svg = d3.select(svgEl)
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('width', W).attr('height', H);

  const bgArc = d3.arc()
    .innerRadius(r - 12).outerRadius(r)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2);

  svg.append('path')
    .attr('transform', `translate(${cx},${cy})`)
    .attr('d', bgArc())
    .attr('fill', '#ebebeb');

  if (value !== null) {
    const angle = (value / 2) * Math.PI;
    const fillArc = d3.arc()
      .innerRadius(r - 12).outerRadius(r)
      .startAngle(-Math.PI / 2)
      .endAngle(angle);

    svg.append('path')
      .attr('transform', `translate(${cx},${cy})`)
      .attr('d', fillArc())
      .attr('fill', color);

    const needleAngle = angle - Math.PI / 2;
    const nx = Math.cos(needleAngle) * (r - 6);
    const ny = Math.sin(needleAngle) * (r - 6);

    svg.append('line')
      .attr('x1', cx).attr('y1', cy)
      .attr('x2', cx + nx).attr('y2', cy + ny)
      .attr('stroke', '#444')
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'round');

    svg.append('circle')
      .attr('cx', cx).attr('cy', cy).attr('r', 3.5)
      .attr('fill', '#444');
  }

  svg.append('text').attr('x', 0).attr('y', H - 2)
    .attr('font-size', 9).attr('fill', '#aaa')
    .attr('text-anchor', 'start').text('−1');
  svg.append('text').attr('x', W).attr('y', H - 2)
    .attr('font-size', 9).attr('fill', '#aaa')
    .attr('text-anchor', 'end').text('+1');
}

function getResultCard(healthScore, moodScore) {
  if (healthScore === null) return { emoji: '🍳', text: 'Select some ingredients to see how your recipe scores.' };

  const h = healthScore, m = moodScore;

  if (h >= 0.6 && m >= 0.6) return { emoji: '🥗', text: '<strong>Nutritious & uplifting!</strong> Your recipe is rich in healthy ingredients that research links to better mood and wellbeing.' };
  if (h >= 0.6 && m < 0.3)  return { emoji: '💪', text: '<strong>Healthy but low mood boost.</strong> Great for the body. Consider adding mood-friendly ingredients like garlic, olive oil, or walnuts.' };
  if (h < 0.25 && m >= 0.6) return { emoji: '😋', text: '<strong>Feel-good comfort food.</strong> High mood potential but lower health score. An occasional indulgence is totally fine!' };
  if (h < 0.25 && m < 0.25) return { emoji: '🤔', text: '<strong>Room to improve.</strong> This combination scores low on both health and mood. Try swapping in more vegetables or herbs.' };
  if (h >= 0.4 && m >= 0.4) return { emoji: '🍲', text: '<strong>A balanced recipe!</strong> Good scores on both health and mood, you\'re on the right track.' };
  if (h >= 0.4)              return { emoji: '🥦', text: '<strong>Reasonably healthy.</strong> Solid health score. Add some spices, herbs, or leafy greens for a mood boost.' };
  if (m >= 0.5)              return { emoji: '🌿', text: '<strong>Mood-friendly mix.</strong> These ingredients lean positive for mood. Balance with more vegetables for a healthier combo.' };
  return { emoji: '🍽️', text: '<strong>Mixed results.</strong> A blend of healthy and indulgent ingredients. Small swaps can shift both scores upward.' };
}

function healthLabel(v) {
  if (v === null) return 'Select ingredients to start';
  if (v >= 0.7) return 'Very Healthy';
  if (v >= 0.4) return 'Healthy';
  if (v >= 0.1) return 'Somewhat Healthy';
  if (v >= -0.2) return 'Neutral';
  return 'Unhealthy';
}

function moodLabel(v) {
  if (v === null) return 'Select ingredients to start';
  if (v >= 0.7) return 'Very Mood-Boosting';
  if (v >= 0.4) return 'Mood-Positive';
  if (v >= 0.1) return 'Mildly Positive';
  if (v >= -0.2) return 'Neutral';
  return 'Mood-Negative';
}

function scoreColor(v) {
  if (v >= 0.6) return '#2e7d5e';
  if (v >= 0.3) return '#5aab6e';
  if (v >= 0)   return '#e8a840';
  return '#e05c5c';
}

const moodColor = scoreColor;

function renderBreakdown(selectedIngrs) {
  const container = document.getElementById('breakdown-chart');
  container.innerHTML = '';
  if (selectedIngrs.length === 0) return;

  const barH = 10, gap = 2, rowH = barH * 2 + gap + 6, padLeft = 130, padRight = 10;
  const W = container.clientWidth || 340;
  const chartW = W - padLeft - padRight;
  const H = selectedIngrs.length * rowH + 16;

  const xScale = d3.scaleLinear().domain([-1, 1]).range([0, chartW]);

  const svg = d3.select(container).append('svg')
    .attr('width', W).attr('height', H);

  svg.append('line')
    .attr('x1', padLeft + xScale(0)).attr('x2', padLeft + xScale(0))
    .attr('y1', 0).attr('y2', H)
    .attr('stroke', '#ddd').attr('stroke-width', 1);

  selectedIngrs.forEach((d, i) => {
    const y = i * rowH + 10;
    const g = svg.append('g');

    const labelText = d.name.length > 14 ? d.name.slice(0, 13) + '…' : d.name;
    g.append('text').attr('class', 'breakdown-name')
      .attr('x', padLeft - 6).attr('y', y + barH)
      .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
      .text(`${labelText} (${d.qtyKey})`);

    // Opacity scales with quantity so a "pinch" row is faint and "lots" is bold.
    const wOpacity = 0.35 + 0.55 * Math.min(1, d.weight / 2.5);

    const hx0 = d.healthy_score >= 0 ? xScale(0) : xScale(d.healthy_score);
    const hw  = Math.abs(xScale(d.healthy_score) - xScale(0));
    g.append('rect').attr('class', 'breakdown-bar-health')
      .attr('x', padLeft + hx0).attr('y', y)
      .attr('width', Math.max(hw, 1)).attr('height', barH)
      .attr('rx', 2)
      .attr('fill', scoreColor(d.healthy_score))
      .attr('opacity', wOpacity);

    const mx0 = d.mood_score >= 0 ? xScale(0) : xScale(d.mood_score);
    const mw  = Math.abs(xScale(d.mood_score) - xScale(0));
    g.append('rect').attr('class', 'breakdown-bar-mood')
      .attr('x', padLeft + mx0).attr('y', y + barH + gap)
      .attr('width', Math.max(mw, 1)).attr('height', barH)
      .attr('rx', 2)
      .attr('fill', moodColor(d.mood_score))
      .attr('opacity', wOpacity);

    g.append('text').attr('class', 'breakdown-val')
      .attr('x', padLeft + xScale(d.healthy_score) + (d.healthy_score >= 0 ? 3 : -3))
      .attr('y', y + barH / 2)
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', d.healthy_score >= 0 ? 'start' : 'end')
      .text((d.healthy_score > 0 ? '+' : '') + d.healthy_score.toFixed(1));

    g.append('text').attr('class', 'breakdown-val')
      .attr('x', padLeft + xScale(d.mood_score) + (d.mood_score >= 0 ? 3 : -3))
      .attr('y', y + barH + gap + barH / 2)
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', d.mood_score >= 0 ? 'start' : 'end')
      .text((d.mood_score > 0 ? '+' : '') + d.mood_score.toFixed(1));
  });

  const legG = svg.append('g').attr('transform', `translate(${padLeft},${H - 10})`);
  legG.append('rect').attr('width', 10).attr('height', 8).attr('rx', 1).attr('fill', '#5aab6e').attr('opacity', 0.85);
  legG.append('text').attr('x', 13).attr('y', 8).attr('font-size', 9).attr('fill', '#666').text('Health');
  legG.append('rect').attr('x', 60).attr('width', 10).attr('height', 8).attr('rx', 1).attr('fill', '#5b9bd5').attr('opacity', 0.85);
  legG.append('text').attr('x', 73).attr('y', 8).attr('font-size', 9).attr('fill', '#666').text('Mood');
  legG.append('text').attr('x', 110).attr('y', 8).attr('font-size', 9).attr('fill', '#aaa')
    .text('opacity = quantity');
}

function updateResults() {
  const selectedIngrs = gameIngredients
    .filter(d => selected.has(d.name))
    .map(d => {
      const qtyKey = selected.get(d.name);
      return { ...d, qtyKey, weight: qtyWeight(qtyKey) };
    });

  if (selectedIngrs.length === 0) {
    drawGauge('health-gauge', null, '#5aab6e');
    drawGauge('mood-gauge', null, '#5aab6e');
    document.getElementById('health-value').textContent = '—';
    document.getElementById('mood-value').textContent = '—';
    document.getElementById('health-sublabel').textContent = 'Select ingredients to start';
    document.getElementById('mood-sublabel').textContent = 'Select ingredients to start';
    document.getElementById('result-emoji').textContent = '🍳';
    document.getElementById('result-text').innerHTML = 'Select some ingredients to see how your recipe scores.';
    renderBreakdown([]);
    return;
  }

  const totalW = d3.sum(selectedIngrs, d => d.weight);
  const avgHealth = d3.sum(selectedIngrs, d => d.healthy_score * d.weight) / totalW;
  const avgMood   = d3.sum(selectedIngrs, d => d.mood_score   * d.weight) / totalW;

  drawGauge('health-gauge', avgHealth, scoreColor(avgHealth));
  drawGauge('mood-gauge',   avgMood,   moodColor(avgMood));

  document.getElementById('health-value').textContent = (avgHealth >= 0 ? '+' : '') + avgHealth.toFixed(2);
  document.getElementById('mood-value').textContent   = (avgMood   >= 0 ? '+' : '') + avgMood.toFixed(2);

  document.getElementById('health-value').style.color = scoreColor(avgHealth);
  document.getElementById('mood-value').style.color   = moodColor(avgMood);

  document.getElementById('health-sublabel').textContent = healthLabel(avgHealth);
  document.getElementById('mood-sublabel').textContent   = moodLabel(avgMood);

  const card = getResultCard(avgHealth, avgMood);
  document.getElementById('result-emoji').textContent = card.emoji;
  document.getElementById('result-text').innerHTML    = card.text;

  renderBreakdown(selectedIngrs);
}

renderGrid();
updateResults();
updateCount();
drawGauge('health-gauge', null, '#5aab6e');
drawGauge('mood-gauge',   null, '#5aab6e');
