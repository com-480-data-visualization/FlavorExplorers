function initBubble(data) {
  const m = { t: 20, r: 20, b: 50, l: 55 };
  const W = 440, H = 340;

  const card = d3.select("#viz-bubble");
  card.html("");
  const svg = card.append("svg").attr("viewBox", `0 0 ${W} ${H}`);
  const tooltip = d3.select("body").select(".tooltip");

  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.avgHealth)).nice()
    .range([m.l, W - m.r]);
  const y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.avgMood)).nice()
    .range([H - m.b, m.t]);
  const r = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.count)])
    .range([5, 32]);
  const color = d3.scaleSequential()
    .domain(d3.extent(data, d => d.avgHealth))
    .interpolator(d3.interpolateRdYlGn);

  // Reference lines
  const midY = y(d3.mean(data, d => d.avgMood));
  const midX = x(d3.mean(data, d => d.avgHealth));
  svg.append("line")
    .attr("x1", m.l).attr("x2", W - m.r)
    .attr("y1", midY).attr("y2", midY)
    .attr("stroke", "#ddd").attr("stroke-dasharray", "4,3");
  svg.append("line")
    .attr("x1", midX).attr("x2", midX)
    .attr("y1", m.t).attr("y2", H - m.b)
    .attr("stroke", "#ddd").attr("stroke-dasharray", "4,3");

  // Axes
  svg.append("g")
    .attr("transform", `translate(0,${H - m.b})`)
    .call(d3.axisBottom(x).ticks(4))
    .attr("font-size", 9);
  svg.append("g")
    .attr("transform", `translate(${m.l},0)`)
    .call(d3.axisLeft(y).ticks(4))
    .attr("font-size", 9);

  // Axis labels
  svg.append("text")
    .attr("x", W / 2).attr("y", H - 8)
    .attr("text-anchor", "middle").attr("font-size", 9).attr("fill", "#888")
    .text("← Unhealthy  ·  Health Score  ·  Healthy →");
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(H / 2)).attr("y", 13)
    .attr("text-anchor", "middle").attr("font-size", 9).attr("fill", "#888")
    .text("Mood Score →");

  // Bubbles
  svg.selectAll("circle.bubble")
    .data(data)
    .enter().append("circle")
    .attr("class", "bubble")
    .attr("cx", d => x(d.avgHealth))
    .attr("cy", d => y(d.avgMood))
    .attr("r", d => r(d.count))
    .attr("fill", d => color(d.avgHealth))
    .attr("opacity", 0.8)
    .attr("stroke", "white")
    .attr("stroke-width", 1.5)
    .on("mouseenter", (event, d) => {
      tooltip.html(
        `<strong>${d.category}</strong><br>${d.count.toLocaleString()} recipes<br>Health: ${d.avgHealth.toFixed(2)} &nbsp;·&nbsp; Mood: ${d.avgMood.toFixed(2)}`
      ).style("opacity", 1);
    })
    .on("mousemove", event => {
      tooltip.style("left", (event.pageX + 12) + "px").style("top", (event.pageY - 44) + "px");
    })
    .on("mouseleave", () => tooltip.style("opacity", 0));

  // Labels on largest bubbles
  svg.selectAll("text.bubble-lbl")
    .data(data.filter(d => d.count >= 400))
    .enter().append("text")
    .attr("class", "bubble-lbl")
    .attr("x", d => x(d.avgHealth))
    .attr("y", d => y(d.avgMood) + 3)
    .attr("text-anchor", "middle")
    .attr("font-size", 7)
    .attr("fill", "#222")
    .attr("pointer-events", "none")
    .text(d => d.category.length > 14 ? d.category.slice(0, 12) + "…" : d.category);
}
