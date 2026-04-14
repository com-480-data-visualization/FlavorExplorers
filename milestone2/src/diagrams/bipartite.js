(function(){
const width = 900;
const height = 600;

const svg = d3.select("#recipe-compound");

// --- Data ---
const nodes = [
  // Ingredients
  { id: "spaghetti", group: "ingredient" },
  { id: "olive oil", group: "ingredient" },
  { id: "garlic", group: "ingredient" },
  { id: "red pepper flakes", group: "ingredient" },
  { id: "salt", group: "ingredient" },
  { id: "black pepper", group: "ingredient" },
  { id: "parsley", group: "ingredient" },
  { id: "parmigiano", group: "ingredient" },

  // Compounds
  { id: "starch", group: "compound" },
  { id: "oleic acid", group: "compound" },
  { id: "allicin", group: "compound" },
  { id: "capsaicin", group: "compound" },
  { id: "sodium chloride", group: "compound" },
  { id: "piperine", group: "compound" },
  { id: "myristicin", group: "compound" },
  { id: "glutamate", group: "compound" }
];

const links = [
  { source: "spaghetti", target: "starch" },
  { source: "spaghetti", target: "oleic acid" },
  { source: "spaghetti", target: "glutamate" },

  { source: "olive oil", target: "oleic acid" },

  { source: "garlic", target: "allicin" },
  { source: "garlic", target: "oleic acid" },
  { source: "garlic", target: "piperine" },

  { source: "red pepper flakes", target: "capsaicin" },

  { source: "salt", target: "sodium chloride" },

  { source: "black pepper", target: "piperine" },

  { source: "parsley", target: "myristicin" },

  { source: "parmigiano", target: "glutamate" }
];

// --- Simulation ---
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id).distance(120))
  .force("charge", d3.forceManyBody().strength(-200))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("x", d3.forceX(d => d.group === "ingredient" ? 200 : 700).strength(0.5))
  .force("y", d3.forceY(height / 2).strength(0.05));

// --- Links ---
const link = svg.append("g")
  .selectAll("line")
  .data(links)
  .enter()
  .append("line")
  .attr("stroke", "#999");

// --- Nodes ---
const node = svg.append("g")
  .selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("r", 8)
  .attr("fill", d => d.group === "ingredient" ? "#1f77b4" : "#ff7f0e")
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

// --- Labels ---
const label = svg.append("g")
  .selectAll("text")
  .data(nodes)
  .enter()
  .append("text")
  .text(d => d.id)
  .attr("font-size", 12)
  .attr("dx", 10)
  .attr("dy", ".35em");

// --- Tick ---
simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

  label
    .attr("x", d => d.x)
    .attr("y", d => d.y);
});

// --- Drag functions ---
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
})();