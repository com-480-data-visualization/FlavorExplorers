function initSankey(allIngredients) {
  // Keep only ingredients with both a category and a known mood
  const valid = allIngredients.filter(
    d => d.category && d.category !== "other" &&
         d.dominant_mood && d.dominant_mood !== "Unknown"
  );

  // Aggregate: ingredient_category → dominant_mood, weighted by recipe_count
  const linkMap = new Map();
  valid.forEach(d => {
    const key = `${d.category}||${d.dominant_mood}`;
    linkMap.set(key, (linkMap.get(key) || 0) + d.recipe_count);
  });

  // Drop very thin ribbons to keep the diagram readable
  const MIN_VAL = 200;
  const filteredLinks = Array.from(linkMap.entries())
    .filter(([, v]) => v >= MIN_VAL)
    .map(([key, value]) => {
      const [src, tgt] = key.split("||");
      return { src, tgt, value };
    });

  const activeIngCats = Array.from(new Set(filteredLinks.map(d => d.src)));
  const activeMoods   = Array.from(new Set(filteredLinks.map(d => d.tgt)));

  const nodes = [
    ...activeIngCats.map(name => ({ name, type: "ingredient" })),
    ...activeMoods.map(name   => ({ name, type: "mood" })),
  ];
  const nodeIndex = Object.fromEntries(nodes.map((n, i) => [n.name, i]));

  const links = filteredLinks.map(d => ({
    source: nodeIndex[d.src],
    target: nodeIndex[d.tgt],
    value:  d.value,
  }));

  const W = 900, H = 420;
  const card = d3.select("#viz-sankey");
  card.html("");
  const svg = card.append("svg").attr("viewBox", `0 0 ${W} ${H}`);

  const sankey = d3.sankey()
    .nodeWidth(16)
    .nodePadding(10)
    .extent([[170, 10], [730, H - 10]]);

  const { nodes: sNodes, links: sLinks } = sankey({
    nodes: nodes.map(d => ({ ...d })),
    links: links.map(d => ({ ...d })),
  });

  const ingColor = d3.scaleOrdinal(d3.schemeTableau10).domain(activeIngCats);
  const moodColor = {
    "Motivated / Alert":      "#6BAA75",
    "Clear-Headed / Focused": "#4A90D9",
    "Sluggish / Foggy":       "#B0B0B0",
    "Alert / Energized":      "#F2CC8F",
    "Euphoric / Energetic":   "#E87461",
    "Anxious / Jittery":      "#9B59B6",
  };
  const nodeColor = d => d.type === "ingredient" ? ingColor(d.name) : (moodColor[d.name] || "#ccc");

  const tooltip = d3.select("body").select(".tooltip");

  // Ribbons
  svg.append("g")
    .selectAll("path")
    .data(sLinks)
    .enter().append("path")
    .attr("d", d3.sankeyLinkHorizontal())
    .attr("stroke", d => ingColor(d.source.name))
    .attr("stroke-width", d => Math.max(1, d.width))
    .attr("fill", "none")
    .attr("stroke-opacity", 0.28)
    .on("mouseenter", function (event, d) {
      d3.select(this).attr("stroke-opacity", 0.65);
      tooltip.html(
        `<strong>${d.source.name}</strong> → <strong>${d.target.name}</strong><br>${d.value.toLocaleString()} ingredient uses`
      ).style("opacity", 1);
    })
    .on("mousemove", event => {
      tooltip.style("left", (event.pageX + 12) + "px").style("top", (event.pageY - 44) + "px");
    })
    .on("mouseleave", function () {
      d3.select(this).attr("stroke-opacity", 0.28);
      tooltip.style("opacity", 0);
    });

  // Nodes
  const nodeG = svg.append("g").selectAll("g").data(sNodes).enter().append("g");

  nodeG.append("rect")
    .attr("x", d => d.x0).attr("y", d => d.y0)
    .attr("width",  d => d.x1 - d.x0)
    .attr("height", d => Math.max(1, d.y1 - d.y0))
    .attr("fill", nodeColor)
    .attr("rx", 2);

  // Labels: ingredient categories on the left, moods on the right
  nodeG.append("text")
    .attr("x", d => d.type === "ingredient" ? d.x0 - 6 : d.x1 + 6)
    .attr("y", d => (d.y0 + d.y1) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => d.type === "ingredient" ? "end" : "start")
    .attr("font-size", 8.5)
    .attr("fill", "#333")
    .text(d => d.name);
}
