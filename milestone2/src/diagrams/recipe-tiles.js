(function(){
const data = [
  {name: "Ratatouille", healthy: true, flavor: 0.3, mood: 0.6},
  {name: "Raw Celery", healthy: true, flavor: 0.2, mood: 0.2},
  {name: "Cheesy Nachos", healthy: false, flavor: 0.9, mood: 0.7},
  {name: "Duck butter sauce", healthy: false, flavor: 0.7, mood: 0.3}
];

const svg = d3.select("#recipe-tiles");

const cardWidth = 220;
const cardHeight = 180;
const padding = 40;

const cards = svg.selectAll(".card-group")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "card-group")
  .attr("transform", (d, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    return `translate(${padding + col * (cardWidth + padding)},
                      ${padding + row * (cardHeight + padding)})`;
  });

// Card background
cards.append("rect")
  .attr("class", "card")
  .attr("width", cardWidth)
  .attr("height", cardHeight);

// Title
cards.append("text")
  .attr("class", "title")
  .attr("x", 20)
  .attr("y", 30)
  .text(d => d.name);

// Healthy / Unhealthy tag
cards.append("rect")
  .attr("x", 20)
  .attr("y", 45)
  .attr("width", 90)
  .attr("height", 25)
  .attr("fill", d => d.healthy ? "#c6f6c6" : "#f6c6c6")
  .attr("stroke", d => d.healthy ? "green" : "red")
  .attr("rx", 5);

cards.append("text")
  .attr("class", "tag")
  .attr("x", 25)
  .attr("y", 62)
  .attr("fill", d => d.healthy ? "green" : "red")
  .text(d => d.healthy ? "Healthy" : "Unhealthy");

// Flavor label
cards.append("text")
  .attr("class", "label")
  .attr("x", 20)
  .attr("y", 95)
  .text("Flavor");

// Flavor bar background
cards.append("rect")
  .attr("x", 80)
  .attr("y", 85)
  .attr("width", 110)
  .attr("height", 6)
  .attr("fill", "#ddd");

// Flavor bar value
cards.append("rect")
  .attr("x", 80)
  .attr("y", 85)
  .attr("width", d => d.flavor * 110)
  .attr("height", 6)
  .attr("fill", "blue");

// Mood label
cards.append("text")
  .attr("class", "label")
  .attr("x", 20)
  .attr("y", 125)
  .text("Mood");

// Mood bar background
cards.append("rect")
  .attr("x", 80)
  .attr("y", 115)
  .attr("width", 110)
  .attr("height", 6)
  .attr("fill", "#ddd");

// Mood bar value
cards.append("rect")
  .attr("x", 80)
  .attr("y", 115)
  .attr("width", d => d.mood * 110)
  .attr("height", 6)
  .attr("fill", "orange");
})();