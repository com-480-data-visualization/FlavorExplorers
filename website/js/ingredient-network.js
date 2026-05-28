function initNetwork() {
  const container = document.getElementById("ingredient-network");
  if (!container) return;
  const width  = container.clientWidth  || 620;
  const height = container.clientHeight || 500;

  d3.select("#ingredient-network").select("svg").remove();

  // ── Data from milestone-3 molecular-network ──────────────────────────────
  const nodeRows = [
    { ingredient: "beef",             category: "meat",              num_compounds: 199, healthy_score:  0.3 },
    { ingredient: "strawberry",       category: "fruit",             num_compounds: 196, healthy_score:  0.9 },
    { ingredient: "apple",            category: "fruit",             num_compounds: 195, healthy_score:  0.9 },
    { ingredient: "parmesan cheese",  category: "dairy",             num_compounds: 178, healthy_score:  0.3 },
    { ingredient: "cheddar cheese",   category: "dairy",             num_compounds: 151, healthy_score:  0.3 },
    { ingredient: "tomato",           category: "vegetable",         num_compounds: 150, healthy_score:  0.9 },
    { ingredient: "peanut butter",    category: "plant derivative",  num_compounds: 145, healthy_score:  0.8 },
    { ingredient: "swiss cheese",     category: "dairy",             num_compounds: 145, healthy_score:  0.3 },
    { ingredient: "mango",            category: "fruit",             num_compounds: 141, healthy_score:  0.9 },
    { ingredient: "butter",           category: "dairy",             num_compounds: 140, healthy_score:  0.2 },
    { ingredient: "provolone cheese", category: "dairy",             num_compounds: 139, healthy_score:  0.2 },
    { ingredient: "mozzarella cheese",category: "dairy",             num_compounds: 132, healthy_score:  0.6 },
    { ingredient: "cottage cheese",   category: "dairy",             num_compounds: 131, healthy_score:  0.8 },
    { ingredient: "raspberry",        category: "fruit",             num_compounds: 130, healthy_score:  0.9 },
    { ingredient: "feta cheese",      category: "dairy",             num_compounds: 130, healthy_score:  0.3 },
    { ingredient: "orange",           category: "fruit",             num_compounds: 128, healthy_score:  0.9 },
    { ingredient: "chicken",          category: "meat",              num_compounds: 123, healthy_score:  0.8 },
    { ingredient: "milk",             category: "dairy",             num_compounds: 118, healthy_score:  0.8 },
    { ingredient: "mushroom",         category: "vegetable",         num_compounds: 117, healthy_score:  0.8 },
    { ingredient: "pork",             category: "meat",              num_compounds: 115, healthy_score:  0.3 },
    { ingredient: "cream cheese",     category: "dairy",             num_compounds: 130, healthy_score: -0.3 },
    { ingredient: "bacon",            category: "meat",              num_compounds: 120, healthy_score: -0.8 },
    { ingredient: "pork sausage",     category: "meat",              num_compounds: 119, healthy_score: -0.7 },
    { ingredient: "white bread",      category: "cereal/crop",       num_compounds:  59, healthy_score: -0.3 },
    { ingredient: "ham",              category: "meat",              num_compounds:  47, healthy_score: -0.7 },
    { ingredient: "cream",            category: "dairy",             num_compounds:  29, healthy_score: -0.5 },
    { ingredient: "coconut oil",      category: "plant derivative",  num_compounds:  18, healthy_score: -0.3 },
    { ingredient: "egg noodle",       category: "cereal/crop",       num_compounds:   4, healthy_score: -0.3 },
  ];

  // Only keep edges with shared-compound weight ≥ 40 to avoid clutter
  const MIN_WEIGHT = 40;
  const edgeRows = [
    ["beef","strawberry",62],["beef","apple",60],["beef","parmesan cheese",93],
    ["beef","cheddar cheese",85],["beef","tomato",72],["beef","peanut butter",99],
    ["beef","swiss cheese",78],["beef","mango",53],["beef","butter",80],
    ["beef","provolone cheese",73],["beef","mozzarella cheese",74],
    ["beef","cottage cheese",76],["beef","raspberry",54],["beef","feta cheese",74],
    ["beef","orange",42],["beef","chicken",98],["beef","milk",75],
    ["beef","mushroom",64],["beef","pork",97],["beef","cream cheese",76],
    ["beef","bacon",102],["beef","pork sausage",101],["beef","ham",47],
    ["strawberry","apple",114],["strawberry","parmesan cheese",80],
    ["strawberry","cheddar cheese",79],["strawberry","tomato",72],
    ["strawberry","swiss cheese",76],["strawberry","mango",82],
    ["strawberry","butter",64],["strawberry","provolone cheese",66],
    ["strawberry","mozzarella cheese",67],["strawberry","cottage cheese",66],
    ["strawberry","raspberry",89],["strawberry","feta cheese",69],
    ["strawberry","orange",69],["strawberry","chicken",49],
    ["strawberry","milk",52],["strawberry","mushroom",53],
    ["apple","parmesan cheese",88],["apple","cheddar cheese",79],
    ["apple","tomato",65],["apple","swiss cheese",79],["apple","mango",64],
    ["apple","butter",62],["apple","provolone cheese",75],
    ["apple","mozzarella cheese",73],["apple","cottage cheese",73],
    ["apple","raspberry",66],["apple","feta cheese",75],["apple","orange",67],
    ["apple","chicken",43],["apple","milk",53],["apple","mushroom",52],
    ["apple","cream cheese",73],["apple","bacon",41],
    ["parmesan cheese","cheddar cheese",134],["parmesan cheese","tomato",66],
    ["parmesan cheese","peanut butter",74],["parmesan cheese","swiss cheese",129],
    ["parmesan cheese","mango",64],["parmesan cheese","butter",79],
    ["parmesan cheese","provolone cheese",129],["parmesan cheese","mozzarella cheese",127],
    ["parmesan cheese","cottage cheese",130],["parmesan cheese","feta cheese",127],
    ["parmesan cheese","chicken",72],["parmesan cheese","milk",79],
    ["parmesan cheese","mushroom",65],["parmesan cheese","pork",63],
    ["parmesan cheese","cream cheese",130],["parmesan cheese","bacon",67],
    ["parmesan cheese","pork sausage",67],["parmesan cheese","ham",35],
    ["cheddar cheese","tomato",57],["cheddar cheese","peanut butter",64],
    ["cheddar cheese","swiss cheese",136],["cheddar cheese","mango",52],
    ["cheddar cheese","butter",71],["cheddar cheese","provolone cheese",130],
    ["cheddar cheese","mozzarella cheese",127],["cheddar cheese","cottage cheese",131],
    ["cheddar cheese","raspberry",55],["cheddar cheese","feta cheese",129],
    ["cheddar cheese","chicken",68],["cheddar cheese","milk",76],
    ["cheddar cheese","mushroom",57],["cheddar cheese","pork",61],
    ["cheddar cheese","cream cheese",130],["cheddar cheese","bacon",65],
    ["cheddar cheese","pork sausage",65],["cheddar cheese","ham",35],
    ["tomato","peanut butter",58],["tomato","swiss cheese",56],
    ["tomato","mango",57],["tomato","butter",54],["tomato","provolone cheese",52],
    ["tomato","mozzarella cheese",52],["tomato","cottage cheese",51],
    ["tomato","raspberry",58],["tomato","feta cheese",52],["tomato","orange",47],
    ["tomato","chicken",45],["tomato","milk",43],["tomato","mushroom",50],
    ["tomato","pork",49],["tomato","cream cheese",51],["tomato","bacon",49],
    ["tomato","pork sausage",49],
    ["peanut butter","swiss cheese",63],["peanut butter","butter",69],
    ["peanut butter","provolone cheese",60],["peanut butter","mozzarella cheese",60],
    ["peanut butter","cottage cheese",62],["peanut butter","feta cheese",60],
    ["peanut butter","chicken",72],["peanut butter","milk",59],
    ["peanut butter","mushroom",49],["peanut butter","pork",70],
    ["peanut butter","cream cheese",62],["peanut butter","bacon",72],
    ["peanut butter","pork sausage",72],["peanut butter","ham",36],
    ["swiss cheese","mango",50],["swiss cheese","butter",72],
    ["swiss cheese","provolone cheese",127],["swiss cheese","mozzarella cheese",129],
    ["swiss cheese","cottage cheese",127],["swiss cheese","raspberry",52],
    ["swiss cheese","feta cheese",129],["swiss cheese","chicken",64],
    ["swiss cheese","milk",73],["swiss cheese","mushroom",57],["swiss cheese","pork",61],
    ["swiss cheese","cream cheese",127],["swiss cheese","bacon",62],
    ["swiss cheese","pork sausage",62],["swiss cheese","ham",34],
    ["mango","butter",52],["mango","provolone cheese",46],
    ["mango","mozzarella cheese",47],["mango","cottage cheese",45],
    ["mango","raspberry",61],["mango","feta cheese",46],["mango","orange",59],
    ["mango","mushroom",43],["mango","cream cheese",45],
    ["butter","provolone cheese",63],["butter","mozzarella cheese",65],
    ["butter","cottage cheese",62],["butter","raspberry",52],
    ["butter","feta cheese",63],["butter","chicken",63],["butter","milk",74],
    ["butter","mushroom",51],["butter","pork",61],["butter","cream cheese",62],
    ["butter","bacon",61],["butter","pork sausage",61],["butter","ham",31],
    ["provolone cheese","mozzarella cheese",127],["provolone cheese","cottage cheese",128],
    ["provolone cheese","raspberry",48],["provolone cheese","feta cheese",127],
    ["provolone cheese","chicken",60],["provolone cheese","milk",69],
    ["provolone cheese","mushroom",52],["provolone cheese","pork",57],
    ["provolone cheese","cream cheese",127],["provolone cheese","bacon",58],
    ["provolone cheese","pork sausage",58],["provolone cheese","ham",33],
    ["mozzarella cheese","cottage cheese",127],["mozzarella cheese","raspberry",49],
    ["mozzarella cheese","feta cheese",127],["mozzarella cheese","chicken",60],
    ["mozzarella cheese","milk",68],["mozzarella cheese","mushroom",52],
    ["mozzarella cheese","pork",58],["mozzarella cheese","cream cheese",127],
    ["mozzarella cheese","bacon",59],["mozzarella cheese","pork sausage",59],
    ["mozzarella cheese","ham",33],
    ["cottage cheese","raspberry",48],["cottage cheese","feta cheese",127],
    ["cottage cheese","chicken",63],["cottage cheese","milk",68],
    ["cottage cheese","mushroom",52],["cottage cheese","pork",57],
    ["cottage cheese","cream cheese",130],["cottage cheese","bacon",61],
    ["cottage cheese","pork sausage",61],["cottage cheese","ham",34],
    ["raspberry","orange",55],["raspberry","cream cheese",48],
    ["feta cheese","chicken",60],["feta cheese","milk",68],["feta cheese","mushroom",52],
    ["feta cheese","pork",57],["feta cheese","cream cheese",127],
    ["feta cheese","bacon",58],["feta cheese","pork sausage",58],
    ["chicken","milk",61],["chicken","mushroom",55],["chicken","pork",80],
    ["chicken","cream cheese",63],["chicken","bacon",84],["chicken","pork sausage",84],
    ["chicken","ham",47],
    ["milk","mushroom",47],["milk","pork",55],["milk","cream cheese",67],
    ["milk","bacon",55],["milk","pork sausage",55],["milk","ham",31],
    ["mushroom","pork",47],["mushroom","cream cheese",52],["mushroom","bacon",47],
    ["mushroom","pork sausage",47],["mushroom","ham",27],
    ["pork","cream cheese",57],["pork","bacon",115],["pork","pork sausage",115],
    ["pork","ham",45],
    ["cream cheese","bacon",61],["cream cheese","pork sausage",61],["cream cheese","ham",34],
    ["bacon","pork sausage",119],["bacon","ham",47],
    ["pork sausage","ham",47],
  ].filter(e => e[2] >= MIN_WEIGHT)
   .map(e => ({ source: e[0], target: e[1], weight: e[2] }));

  // ── Helpers ───────────────────────────────────────────────────────────────
  const healthScore = id => nodeRows.find(n => n.ingredient === id)?.healthy_score ?? 0;

  function edgeColor(s, t) {
    const sh = typeof s === "object" ? s.healthy_score : healthScore(s);
    const th = typeof t === "object" ? t.healthy_score : healthScore(t);
    const sH = sh > 0.5, tH = th > 0.5;
    if (sH && tH)   return "#2A9D5C"; // healthy ↔ healthy
    if (!sH && !tH) return "#E63946"; // unhealthy ↔ unhealthy
    return "#F4A261";                  // bridge edge (key highlight)
  }

  // Color nodes by health score
  const nodeColor = d3.scaleSequential(d3.interpolateRdYlGn)
    .domain([-1, 1]);

  // ── SVG ───────────────────────────────────────────────────────────────────
  const svg = d3.select("#ingredient-network")
    .append("svg")
    .attr("width", "100%").attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const tooltip = d3.select(".tooltip");

  // ── Simulation ────────────────────────────────────────────────────────────
  const nodes = nodeRows.map(d => ({ ...d, id: d.ingredient }));
  const links = edgeColor
    ? edgeRows.map(d => ({ ...d }))
    : edgeRows;

  const wScale = d3.scaleLinear()
    .domain([MIN_WEIGHT, 140])
    .range([0.5, 4]);

  const simulation = d3.forceSimulation(nodes)
    .force("link",   d3.forceLink(edgeRows).id(d => d.ingredient).distance(d => 160 - d.weight * 0.5))
    .force("charge", d3.forceManyBody().strength(-220))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide(18));

  const link = svg.append("g")
    .selectAll("line")
    .data(edgeRows)
    .enter().append("line")
    .attr("stroke-width", d => wScale(d.weight))
    .attr("stroke-opacity", 0.65);

  const node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .enter().append("g")
    .call(d3.drag()
      .on("start", (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on("drag",  (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on("end",   (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; })
    );

  node.append("circle")
    .attr("r", d => 5 + Math.sqrt(d.num_compounds) * 0.35)
    .attr("fill", d => nodeColor(d.healthy_score))
    .attr("stroke", "white").attr("stroke-width", 1.2);

  node.append("text")
    .attr("dy", 3).attr("x", d => 7 + Math.sqrt(d.num_compounds) * 0.35)
    .attr("font-size", 9).attr("fill", "#444").attr("pointer-events", "none")
    .text(d => d.ingredient);

  node
    .on("mouseenter", (event, d) => {
      tooltip.html(
        `<strong>${d.ingredient}</strong><br>` +
        `${d.category} · ${d.num_compounds} compounds<br>` +
        `Health score: ${d.healthy_score}`
      ).style("opacity", 1);
      // Dim unconnected nodes
      node.attr("opacity", n => edgeRows.some(e =>
        (e.source === d || e.source.ingredient === d.ingredient) ||
        (e.target === d || e.target.ingredient === d.ingredient) ||
        n.ingredient === d.ingredient
      ) ? 1 : 0.12);
      link.attr("opacity", e =>
        (e.source === d || e.source.ingredient === d.ingredient) ||
        (e.target === d || e.target.ingredient === d.ingredient) ? 1 : 0.06
      );
    })
    .on("mousemove", event => {
      tooltip.style("left", (event.pageX + 12) + "px").style("top", (event.pageY - 44) + "px");
    })
    .on("mouseleave", () => {
      tooltip.style("opacity", 0);
      node.attr("opacity", 1);
      link.attr("opacity", 0.65);
    });

  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x).attr("y2", d => d.target.y)
      .attr("stroke", d => edgeColor(d.source, d.target));

    node.attr("transform", d => `translate(${d.x},${d.y})`);
  });

  // ── Legend ────────────────────────────────────────────────────────────────
  const legendData = [
    { color: "#2A9D5C", label: "Healthy ↔ Healthy" },
    { color: "#F4A261", label: "Bridge (healthy ↔ unhealthy)" },
    { color: "#E63946", label: "Unhealthy ↔ Unhealthy" },
  ];
  const lg = svg.append("g").attr("transform", `translate(12, ${height - legendData.length * 16 - 10})`);
  legendData.forEach((d, i) => {
    lg.append("line").attr("x1", 0).attr("y1", i * 16 + 6).attr("x2", 18).attr("y2", i * 16 + 6)
      .attr("stroke", d.color).attr("stroke-width", 2.5).attr("stroke-linecap", "round");
    lg.append("text").attr("x", 22).attr("y", i * 16 + 10)
      .attr("font-size", 9).attr("fill", "#555").text(d.label);
  });
}
