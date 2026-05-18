(function(){

const nodecsvdata = `
"ingredient","category","num_compounds","healthy_score"
"A","Sour","9","0.966"
"B","Sweet","6","0.739"
"C","Random","3","0.078"
"D","Random","1","0.733"
"E","Sweet","4","0.121"
"F","Sour","9","0.116"
"G","Sour","6","0.748"
"H","Sweet","1","0.686"
"I","Random","9","0.255"
"J","Random","6","0.025"
`;

const edgecsvdata = `
"source","target","weight"
"H","G",5
"F","A",8
"E","J",6
"C","B",1
"F","J",8
"J","F",7
"A","I",4
"H","E",9
"F","G",6
"I","H",7
"D","G",9
"G","J",2
"D","C",6
"H","E",1
"I","G",5
"G","C",6
"G","D",1
"I","H",9
"G","J",7
"D","C",9
"G","A",7
"I","E",1
"A","I",2
"A","E",8
"D","C",10
"J","I",2
"I","B",5
"C","H",2
"H","J",6
"G","H",6
`;

const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("#ingredient-network")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

svg.attr("id", "ingredient-network-svg")

colorscale = d3.scaleLinear()
  .domain([0.0, 1.0])
  .range(["green", "red"])


const nodes = d3.csvParse(nodecsvdata.trim());
const links = d3.csvParse(edgecsvdata.trim());

const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.ingredient).distance(120))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
  .selectAll("line")
  .data(links)
  .enter()
  .append("line")
  .attr("class", "link")
  .attr("stroke-width", d => d.weight);

const node = svg.append("g")
  .selectAll("g")
  .data(nodes)
  .enter()
  .append("g")
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)
  );

node.append("circle")
  .attr("r", d => 5 + d.num_compounds * 4)
  .attr("fill", d => colorscale(d.healthy_score));

node.append("text")
  .attr("dy", 3)
  .attr("x", 10)
  .text(d => d.ingredient);

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

// debugger;

//const moodColors = {
  //warm: "#221e1e",
  //fresh: "#4ecdc4",
  //earthy: "#8d6e63",
  //sweet: "#f7b267",
  //bitter: "#6c5ce7"
//};
//
//const nodes = [
  //{id: "Garlic", mood: "earthy", compounds: ["sulfur", "umami", "pungent"]},
  //{id: "Onion", mood: "earthy", compounds: ["sulfur", "sweet", "pungent"]},
  //{id: "Tomato", mood: "fresh", compounds: ["acidic", "sweet", "umami"]},
  //{id: "Basil", mood: "fresh", compounds: ["herbal", "sweet"]},
  //{id: "Strawberry", mood: "sweet", compounds: ["sweet", "fruity"]},
  //{id: "Chocolate", mood: "bitter", compounds: ["bitter", "sweet"]},
  //{id: "Coffee", mood: "bitter", compounds: ["bitter", "roasted"]},
  //{id: "Vanilla", mood: "sweet", compounds: ["sweet", "creamy"]},
  //{id: "Lemon", mood: "fresh", compounds: ["acidic", "citrus"]},
  //{id: "Orange", mood: "fresh", compounds: ["citrus", "sweet"]},
  //{id: "Beef", mood: "earthy", compounds: ["umami", "fatty"]},
  //{id: "Mushroom", mood: "earthy", compounds: ["umami", "earthy"]},
  //{id: "Cheese", mood: "warm", compounds: ["fatty", "umami"]},
  //{id: "Butter", mood: "warm", compounds: ["fatty", "creamy"]},
  //{id: "Honey", mood: "sweet", compounds: ["sweet", "floral"]},
  //{id: "Mint", mood: "fresh", compounds: ["herbal", "cool"]},
  //{id: "Chili", mood: "warm", compounds: ["spicy", "pungent"]},
  //{id: "Pepper", mood: "warm", compounds: ["spicy", "earthy"]},
  //{id: "Carrot", mood: "sweet", compounds: ["sweet", "earthy"]},
  //{id: "Apple", mood: "fresh", compounds: ["sweet", "fruity"]}
//];
//
//// Create links
//const links = [];
//for (let i = 0; i < nodes.length; i++) {
  //for (let j = i + 1; j < nodes.length; j++) {
    //const shared = nodes[i].compounds.filter(c =>
      //nodes[j].compounds.includes(c)
    //);
    //if (shared.length > 0) {
      //links.push({ source: nodes[i].id, target: nodes[j].id });
    //}
  //}
//}
//
})();