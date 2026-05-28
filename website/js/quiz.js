(function () {
  const questions = [
    {
      q: "Your perfect comfort meal is…",
      opts: [
        { label: "🍕 Pizza, burgers, or fries",       cat: 'comfort'   },
        { label: "🥗 A fresh grain bowl or salad",    cat: 'healthy'   },
        { label: "🍜 Something exotic and spicy",     cat: 'adventure' },
        { label: "🍲 A slow-cooked family recipe",    cat: 'nostalgic' },
      ]
    },
    {
      q: "When stressed, you reach for…",
      opts: [
        { label: "🍫 Chocolate or ice cream",         cat: 'comfort'   },
        { label: "🥤 A smoothie or herbal tea",       cat: 'healthy'   },
        { label: "🌶️ Something bold and fiery",       cat: 'adventure' },
        { label: "🫕 Whatever mom used to make",      cat: 'nostalgic' },
      ]
    },
    {
      q: "Your cooking philosophy is…",
      opts: [
        { label: "🧈 Butter makes everything better", cat: 'comfort'   },
        { label: "🌈 Eat the rainbow, literally",     cat: 'healthy'   },
        { label: "🔥 No rules, just bold results",    cat: 'adventure' },
        { label: "📖 Follow the recipe exactly",      cat: 'nostalgic' },
      ]
    },
    {
      q: "Your relationship with vegetables is…",
      opts: [
        { label: "😬 A necessary evil",               cat: 'comfort'   },
        { label: "💚 The star of every plate",        cat: 'healthy'   },
        { label: "🎨 A canvas for spice and sauce",   cat: 'adventure' },
        { label: "🥕 Root veg, slow-roasted",         cat: 'nostalgic' },
      ]
    },
  ];

  const types = {
    comfort: {
      emoji: "🍫", title: "Guilty Pleasure Seeker", color: "#E63946",
      desc: "Science backs you up — mood-rich foods trigger real serotonin release. You live in the upper-left of our scatter plot: high comfort, maximum mood. 40% of all 25,000 recipes join you there.",
      bars: { Comfort: 9, Health: 3, Adventure: 5, Nostalgia: 6 },
    },
    healthy: {
      emoji: "🥗", title: "Health Champion", color: "#2A9D5C",
      desc: "You've cracked the code: healthy eating can be genuinely pleasurable. You're in the top-right quadrant of our maps — the sweet spot fewer than 15% of recipes ever reach.",
      bars: { Comfort: 3, Health: 9, Adventure: 6, Nostalgia: 5 },
    },
    adventure: {
      emoji: "🌶️", title: "Flavor Adventurer", color: "#F4A261",
      desc: "Rules? Never heard of them. You eat across all four quadrants, driven by curiosity over convention. Your personal scatter plot would have dots everywhere — no cluster, all chaos.",
      bars: { Comfort: 6, Health: 6, Adventure: 9, Nostalgia: 4 },
    },
    nostalgic: {
      emoji: "🏡", title: "Nostalgic Foodie", color: "#E9C46A",
      desc: "Food is memory for you. Studies show nostalgia-driven eating scores consistently high on mood — and your chart proves it. You sit comfortably mid-map, where tradition meets pleasure.",
      bars: { Comfort: 7, Health: 5, Adventure: 4, Nostalgia: 9 },
    },
  };

  const container = document.getElementById('quiz-container');
  if (!container) return;

  let scores = { comfort: 0, healthy: 0, adventure: 0, nostalgic: 0 };
  let step = 0;

  function render() {
    if (step < questions.length) renderQ(); else renderResult();
  }

  function renderQ() {
    const q = questions[step];
    const pct = (step / questions.length) * 100;
    container.innerHTML = `
      <div class="qz-progress"><div class="qz-progress-fill" style="width:${pct}%"></div></div>
      <p class="qz-step">${step + 1} of ${questions.length}</p>
      <h3 class="qz-question">${q.q}</h3>
      <div class="qz-opts">
        ${q.opts.map(o => `<button class="qz-opt" data-cat="${o.cat}">${o.label}</button>`).join('')}
      </div>`;
    container.querySelectorAll('.qz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        scores[btn.dataset.cat] += 2;
        btn.classList.add('chosen');
        step++;
        setTimeout(render, 280);
      });
    });
  }

  function renderResult() {
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const p = types[winner];
    container.innerHTML = `
      <div class="qz-result">
        <div class="qz-emoji">${p.emoji}</div>
        <h3 class="qz-type" style="color:${p.color}">${p.title}</h3>
        <p class="qz-desc">${p.desc}</p>
        <div id="qz-bars"></div>
        <button class="qz-retry">Try again ↺</button>
      </div>`;

    drawBars(p.bars, p.color);
    container.querySelector('.qz-retry').addEventListener('click', () => {
      scores = { comfort: 0, healthy: 0, adventure: 0, nostalgic: 0 };
      step = 0;
      render();
    });
  }

  function drawBars(data, color) {
    const el = document.getElementById('qz-bars');
    if (!el || typeof d3 === 'undefined') return;
    const entries = Object.entries(data);
    const maxVal = Math.max(...entries.map(d => d[1]));
    const W = 300, barH = 22, gap = 12;
    const H = entries.length * (barH + gap);
    const mL = 88, mR = 36;

    const svg = d3.select(el).append('svg')
      .attr('viewBox', `0 0 ${W} ${H}`)
      .style('width', '100%').style('max-width', '300px').style('margin', '1.2rem auto').style('display', 'block');

    const x = d3.scaleLinear().domain([0, 10]).range([mL, W - mR]);

    entries.forEach(([label, val], i) => {
      const y = i * (barH + gap);
      const isTop = val === maxVal;

      svg.append('text')
        .attr('x', mL - 8).attr('y', y + barH / 2)
        .attr('text-anchor', 'end').attr('font-size', 11).attr('fill', '#888')
        .attr('dominant-baseline', 'middle').text(label);

      svg.append('rect')
        .attr('x', mL).attr('y', y).attr('height', barH).attr('rx', 4)
        .attr('width', 0)
        .attr('fill', isTop ? color : '#E8E0D4')
        .transition().duration(550).delay(i * 90)
        .attr('width', x(val) - mL);

      svg.append('text')
        .attr('x', x(val) + 5).attr('y', y + barH / 2)
        .attr('font-size', 10).attr('fill', '#aaa')
        .attr('dominant-baseline', 'middle').text(val + '/10');
    });
  }

  render();
})();
