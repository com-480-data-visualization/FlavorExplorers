(function(){
const data_barplot = [20, 1, 15, 25, 30];
const emotions = ["happiness", "anger", "sadness", "interest", "surprise"]

const svg = d3.select("#barplot-spending"),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = svg.attr("width") - margin.left - margin.right,
      height = svg.attr("height") - margin.top - margin.bottom;

const g = svg.append("g")
             .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand()
            .domain(data_barplot.map((d, i) => i))
            .range([0, width])
            .padding(0.1);

const y = d3.scaleLinear()
            .domain([0, d3.max(data_barplot)])
            .nice()
            .range([height, 0]);

// Bars
g.selectAll(".bar")
  .data(data_barplot)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d, i) => x(i))
  .attr("y", d => y(d))
  .attr("width", x.bandwidth())
  .attr("height", d => height - y(d));

// X Axis
g.append("g")
 .attr("transform", `translate(0,${height})`)
 .call(d3.axisBottom(x).tickFormat(i => `${emotions[i]}`));

// Y Axis
g.append("g")
 .call(d3.axisLeft(y));

// Axis labels
g.append("text")
.attr("x", width / 2)
.attr("y", height + 30)
.attr("text-anchor", "middle")
.text("Emotions");

g.append("text")
.attr("transform", "rotate(-90)")
.attr("x", -height / 2)
.attr("y", -25)
.attr("text-anchor", "middle")
.text("Spent (GBP)");
}())();