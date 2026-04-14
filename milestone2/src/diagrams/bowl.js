(function(){
const svg = d3.select("#bowl-svg");

// --- Data ---
const ingredients = [
{ name: "i1", health: 10, mood: 5 },
{ name: "i2", health: 5, mood: 8 },
{ name: "i3", health: 7, mood: 6 },
];

// --- Compute totals ---
const totalHealth = d3.sum(ingredients, d => d.health);
const totalMood = d3.sum(ingredients, d => d.mood);

// --- Bowl (arc) ---
const bowl = d3.arc()
.innerRadius(0)
.outerRadius(120)
.startAngle(0.5 * Math.PI)
.endAngle((3/2) * Math.PI);

svg.append("g")
.attr("transform", "translate(200,280)")
.append("path")
.attr("d", bowl)
.attr("fill", "#eee")
.attr("stroke", "black");

// --- Ingredient circles ---
const bowlGroup = svg.append("g")
.attr("transform", "translate(200,300)");

bowlGroup.selectAll("circle")
.data(ingredients)
.enter()
.append("circle")
.attr("cx", (d, i) => -60 + i * 40)
.attr("cy", 60)
.attr("r", 15)
.attr("fill", "#ccc")
.attr("stroke", "black");

bowlGroup.selectAll("text")
.data(ingredients)
.enter()
.append("text")
.attr("x", (d, i) => -60 + i * 40)
.attr("y", 60)
.attr("class", "label")
.text(d => d.name);
})();