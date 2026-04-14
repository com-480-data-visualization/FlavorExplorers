(function(){
const svg = d3.select("#bar-bowl");

// --- Data ---
const ingredients = [
  { name: "i1", health: 10, mood: 5 },
  { name: "i2", health: 5, mood: 8 },
  { name: "i3", health: 7, mood: 6 },
];

// --- Compute totals ---
const totalHealth = d3.sum(ingredients, d => d.health);
const totalMood = d3.sum(ingredients, d => d.mood);

// --- Scales for bars ---
const maxVal = Math.max(totalHealth, totalMood);
const yScale = d3.scaleLinear()
  .domain([0, maxVal])
  .range([0, 200]);

// --- Health bar ---
svg.append("rect")
  .attr("x", 450)
  .attr("y", 300 - yScale(totalHealth))
  .attr("width", 60)
  .attr("height", yScale(totalHealth))
  .attr("fill", "green");

svg.append("text")
  .attr("x", 450)
  .attr("y", 320)
  .attr("class", "label")
  .text("Health");

// --- Mood bar ---
svg.append("rect")
  .attr("x", 550)
  .attr("y", 300 - yScale(totalMood))
  .attr("width", 60)
  .attr("height", yScale(totalMood))
  .attr("fill", "orange");

svg.append("text")
  .attr("x", 550)
  .attr("y", 320)
  .attr("class", "label")
  .text("Mood");
})();