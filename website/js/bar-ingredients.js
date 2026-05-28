const MOOD_COLORS = {
  "Motivated / Alert":      "#6BAA75",
  "Clear-Headed / Focused": "#4A90D9",
  "Sluggish / Foggy":       "#B0B0B0",
  "Alert / Energized":      "#F2CC8F",
  "Euphoric / Energetic":   "#E87461",
  "Anxious / Jittery":      "#9B59B6",
};

function initIngredientBar(allIngredients) {
  const moodData = allIngredients.filter(
    d => d.mood > 0 && d.dominant_mood !== "Unknown" && d.recipe_count > 20
  );
  const moods = Object.keys(MOOD_COLORS).filter(m => moodData.some(d => d.dominant_mood === m));

  const container = d3.select("#ingredient-bar-wrap");
  const controls  = container.select("#bar-controls");
  let active = "all";

  // Filter buttons
  controls.append("span").attr("class", "bar-filter-label").text("Filter: ");
  controls.append("button")
    .attr("class", "bar-btn active")
    .attr("data-mood", "all")
    .text("All");
  moods.forEach(m => {
    controls.append("button")
      .attr("class", "bar-btn")
      .attr("data-mood", m)
      .style("border-color", MOOD_COLORS[m])
      .text(m);
  });
  controls.selectAll("button").on("click", function () {
    active = this.dataset.mood;
    controls.selectAll("button").classed("active", false);
    d3.select(this).classed("active", true);
    update();
  });

  const W = 420, H = 310, pad = { t: 15, r: 15, b: 28, l: 115 };
  const iW = W - pad.l - pad.r;
  const iH = H - pad.t - pad.b;

  const svg = container.select("#bar-svg")
    .append("svg").attr("viewBox", `0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform", `translate(${pad.l},${pad.t})`);

  const x = d3.scaleLinear().range([0, iW]);
  const y = d3.scaleBand().range([0, iH]).padding(0.22);

  const xAxisG = g.append("g").attr("transform", `translate(0,${iH})`);
  const yAxisG = g.append("g");
  const tooltip = d3.select("body").select(".tooltip");

  function update() {
    const filtered = active === "all" ? moodData : moodData.filter(d => d.dominant_mood === active);
    const top = [...filtered].sort((a, b) => b.mood - a.mood).slice(0, 15);

    x.domain([0, d3.max(top, d => d.mood) * 1.05]);
    y.domain(top.map(d => d.name));

    xAxisG.transition().duration(400)
      .call(d3.axisBottom(x).ticks(4).tickFormat(d3.format(".1f")));
    xAxisG.select(".domain").remove();

    yAxisG.call(d3.axisLeft(y).tickSize(0));
    yAxisG.select(".domain").remove();
    yAxisG.selectAll("text").attr("font-size", 8.5);

    const bars = g.selectAll("rect.bar").data(top, d => d.name);

    bars.enter().append("rect").attr("class", "bar")
      .attr("y", d => y(d.name))
      .attr("height", y.bandwidth())
      .attr("x", 0).attr("width", 0)
      .attr("rx", 3)
      .attr("fill", d => MOOD_COLORS[d.dominant_mood] || "#ccc")
      .on("mouseenter", (event, d) => {
        tooltip.html(
          `<strong>${d.name}</strong><br>Mood score: ${d.mood.toFixed(2)}<br>${d.dominant_mood}<br>${d.recipe_count.toLocaleString()} recipes`
        ).style("opacity", 1);
      })
      .on("mousemove", event => {
        tooltip.style("left", (event.pageX + 12) + "px").style("top", (event.pageY - 44) + "px");
      })
      .on("mouseleave", () => tooltip.style("opacity", 0))
      .merge(bars)
      .transition().duration(500)
      .attr("y", d => y(d.name))
      .attr("height", y.bandwidth())
      .attr("width", d => x(d.mood))
      .attr("fill", d => MOOD_COLORS[d.dominant_mood] || "#ccc");

    bars.exit().transition().duration(300).attr("width", 0).remove();
  }

  update();
}
