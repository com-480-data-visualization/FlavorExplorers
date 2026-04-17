function initLineChart() {
  const container = document.getElementById("viz-lines");
  
  const width = container.offsetWidth || 450;
  const height = 300;
  const m = { t: 20, r: 100, b: 40, l: 40 };

  d3.select("#viz-lines").selectAll("*").remove();

  const svg = d3.select("#viz-lines")
    .append("svg")
    .attr("width", "100%")
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`);

  // Generate Data (1974–2024)
  const expenditure = d3.range(1974, 2025).map(y => ({
    year: y,
    ready: 5 + (y - 1974) * 0.46 + (Math.random() - 0.5) * 1.6,
    fresh: 30 - (y - 1974) * 0.16 + (Math.random() - 0.5) * 2.0,
    sugary: 8 + (y - 1974) * 0.20 + (Math.random() - 0.5) * 1.4,
    grains: 12 - (y - 1974) * 0.06 + (Math.random() - 0.5) * 1.0,
  }));

  const recessions = [[1980, 1982], [1990, 1991], [2008, 2009], [2020, 2021]];

  const x = d3.scaleLinear()
    .domain([1974, 2024])
    .range([m.l, width - m.r]);

  const y = d3.scaleLinear()
    .domain([0, 40]) 
    .range([height - m.b, m.t]);

  svg.append("g")
    .selectAll("rect")
    .data(recessions)
    .enter()
    .append("rect")
    .attr("x", d => x(d[0]))
    .attr("y", m.t)
    .attr("width", d => x(d[1]) - x(d[0]))
    .attr("height", height - m.b - m.t)
    .attr("fill", "#B0B0B0")
    .attr("opacity", 0.15);

  svg.append("g")
    .attr("transform", `translate(0,${height - m.b})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(width > 400 ? 10 : 5))
    .attr("font-size", "10px")
    .attr("color", "#888");

  svg.append("g")
    .attr("transform", `translate(${m.l},0)`)
    .call(d3.axisLeft(y).ticks(5).tickFormat(d => d + "%"))
    .attr("font-size", "10px")
    .attr("color", "#888");

  const series = [
    { k: "ready",  l: "Ready meals",   c: "#E87461" },
    { k: "fresh",  l: "Fresh produce", c: "#6BAA75" },
    { k: "sugary", l: "Sugary drinks", c: "#F2CC8F" },
    { k: "grains", l: "Whole grains",  c: "#3D405B" },
  ];

  const lineGen = d3.line()
    .x(d => x(d.year))
    .curve(d3.curveMonotoneX);

  series.forEach((s, i) => {
    lineGen.y(d => y(d[s.k]));

    svg.append("path")
      .datum(expenditure)
      .attr("fill", "none")
      .attr("stroke", s.c)
      .attr("stroke-width", 2.5)
      .attr("d", lineGen);

    const lastData = expenditure[expenditure.length - 1];
    svg.append("text")
      .attr("x", width - m.r + 8)
      .attr("y", y(lastData[s.k]))
      .attr("alignment-baseline", "middle")
      .attr("fill", s.c)
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .text(s.l);
  });
}