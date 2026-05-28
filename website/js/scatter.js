function initScatter(data) {
  const m = {t:15, r:20, b:40, l:40}, W=400, H=300;
  const card = d3.select("#viz-scatter");
  const svg = card.append("svg").attr("viewBox", `0 0 ${W} ${H}`);
  const tooltip = d3.select("body").append("div").attr("class","tooltip");

  const x = d3.scaleLinear().domain([-1, 1]).range([m.l, W-m.r]);
  const y = d3.scaleLinear().domain(d3.extent(data, d => d.mood)).nice().range([H-m.b, m.t]);

  const categories = Array.from(new Set(data.map(d => d.category)));
  const color = d3.scaleOrdinal().domain(categories).range(d3.schemeTableau10);
  const rScale = d3.scaleSqrt().domain(d3.extent(data, d => d.recipe_count)).range([2, 8]);

  svg.append("g").attr("transform",`translate(0,${H-m.b})`).call(d3.axisBottom(x).ticks(4)).attr("font-size", 9);
  svg.append("g").attr("transform",`translate(${m.l},0)`).call(d3.axisLeft(y).ticks(4)).attr("font-size", 9);

  svg.selectAll("circle").data(data).enter().append("circle")
    .attr("cx", d => x(d.health + (Math.random() - 0.5) * 0.04))
    .attr("cy", d => y(d.mood))
    .attr("r", d => rScale(d.recipe_count))
    .attr("fill", d => color(d.category))
    .attr("opacity", 0.65)
    .attr("stroke", "white").attr("stroke-width", 0.4)
    .on("mouseenter", (event, d) => {
      tooltip.html(`<strong>${d.name}</strong><br>${d.category}<br>Mood: ${d.mood.toFixed(2)}`).style("opacity", 1);
    })
    .on("mousemove", (event) => {
      tooltip.style("left", (event.pageX + 10) + "px").style("top", (event.pageY - 40) + "px");
    })
    .on("mouseleave", () => tooltip.style("opacity", 0));
}