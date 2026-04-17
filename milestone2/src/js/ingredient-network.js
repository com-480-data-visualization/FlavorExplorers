function initNetwork() {
  const container = document.getElementById("ingredient-network");
  const width  = container.clientWidth  || 600;
  const height = container.clientHeight || 500;

  d3.select("#ingredient-network").select("svg").remove();

  const svg = d3.select("#ingredient-network")
    .append("svg")
    .attr("id", "ingredient-network-svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const moodColors = {
    warm:   "#ff6b6b",
    fresh:  "#4ecdc4",
    earthy: "#8d6e63",
    sweet:  "#f7b267",
    bitter: "#6c5ce7"
  };

  const nodes = [
    {id: "Garlic",     mood: "earthy", compounds: ["sulfur", "umami", "pungent"]},
    {id: "Onion",      mood: "earthy", compounds: ["sulfur", "sweet", "pungent"]},
    {id: "Tomato",     mood: "fresh",  compounds: ["acidic", "sweet", "umami"]},
    {id: "Basil",      mood: "fresh",  compounds: ["herbal", "sweet"]},
    {id: "Strawberry", mood: "sweet",  compounds: ["sweet", "fruity"]},
    {id: "Chocolate",  mood: "bitter", compounds: ["bitter", "sweet"]},
    {id: "Coffee",     mood: "bitter", compounds: ["bitter", "roasted"]},
    {id: "Vanilla",    mood: "sweet",  compounds: ["sweet", "creamy"]},
    {id: "Lemon",      mood: "fresh",  compounds: ["acidic", "citrus"]},
    {id: "Orange",     mood: "fresh",  compounds: ["citrus", "sweet"]},
    {id: "Beef",       mood: "earthy", compounds: ["umami", "fatty"]},
    {id: "Mushroom",   mood: "earthy", compounds: ["umami", "earthy"]},
    {id: "Cheese",     mood: "warm",   compounds: ["fatty", "umami"]},
    {id: "Butter",     mood: "warm",   compounds: ["fatty", "creamy"]},
    {id: "Honey",      mood: "sweet",  compounds: ["sweet", "floral"]},
    {id: "Mint",       mood: "fresh",  compounds: ["herbal", "cool"]},
    {id: "Chili",      mood: "warm",   compounds: ["spicy", "pungent"]},
    {id: "Pepper",     mood: "warm",   compounds: ["spicy", "earthy"]},
    {id: "Carrot",     mood: "sweet",  compounds: ["sweet", "earthy"]},
    {id: "Apple",      mood: "fresh",  compounds: ["sweet", "fruity"]}
  ];

  const links = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const shared = nodes[i].compounds.filter(c => nodes[j].compounds.includes(c));
      if (shared.length > 0) {
        links.push({ source: nodes[i].id, target: nodes[j].id });
      }
    }
  }

  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(120))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2));

  const link = svg.append("g")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link");

  const node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .enter()
    .append("g")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag",  dragged)
      .on("end",   dragended)
    );

  node.append("circle")
    .attr("r", d => 5 + d.compounds.length * 4)
    .attr("fill", d => moodColors[d.mood]);

  node.append("text")
    .attr("dy", 3)
    .attr("x", 10)
    .text(d => d.id);

  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    node
      .attr("transform", d => `translate(${d.x},${d.y})`);
  });

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}
