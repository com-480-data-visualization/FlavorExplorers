const csvdata = `
group,variable,value
-1.0,-1.0,503
-1.0,-0.8,707
-1.0,-0.6,8
-1.0,-0.4,107
-1.0,-0.2,121
-1.0,0.0,148
-1.0,0.2,240
-1.0,0.4,0
-1.0,0.6,92
-1.0,0.8,32
-0.8,-1.0,379
-0.8,-0.8,882
-0.8,-0.6,20
-0.8,-0.4,271
-0.8,-0.2,105
-0.8,0.0,179
-0.8,0.2,567
-0.8,0.4,4
-0.8,0.6,151
-0.8,0.8,39
-0.6,-1.0,28
-0.6,-0.8,120
-0.6,-0.6,5
-0.6,-0.4,75
-0.6,-0.2,54
-0.6,0.0,122
-0.6,0.2,339
-0.6,0.4,3
-0.6,0.6,128
-0.6,0.8,26
-0.4,-1.0,27
-0.4,-0.8,116
-0.4,-0.6,5
-0.4,-0.4,168
-0.4,-0.2,69
-0.4,0.0,133
-0.4,0.2,427
-0.4,0.4,6
-0.4,0.6,209
-0.4,0.8,62
-0.2,-1.0,3
-0.2,-0.8,6
-0.2,-0.6,0
-0.2,-0.4,7
-0.2,-0.2,15
-0.2,0.0,18
-0.2,0.2,19
-0.2,0.4,0
-0.2,0.6,13
-0.2,0.8,7
0.0,-1.0,5
0.0,-0.8,18
0.0,-0.6,4
0.0,-0.4,68
0.0,-0.2,20
0.0,0.0,36
0.0,0.2,146
0.0,0.4,6
0.0,0.6,65
0.0,0.8,13
0.2,-1.0,5
0.2,-0.8,25
0.2,-0.6,6
0.2,-0.4,127
0.2,-0.2,27
0.2,0.0,56
0.2,0.2,300
0.2,0.4,21
0.2,0.6,256
0.2,0.8,52
0.4,-1.0,2
0.4,-0.8,11
0.4,-0.6,0
0.4,-0.4,40
0.4,-0.2,22
0.4,0.0,41
0.4,0.2,158
0.4,0.4,6
0.4,0.6,133
0.4,0.8,33
0.6,-1.0,5
0.6,-0.8,23
0.6,-0.6,1
0.6,-0.4,186
0.6,-0.2,100
0.6,0.0,127
0.6,0.2,678
0.6,0.4,109
0.6,0.6,1602
0.6,0.8,735
0.8,-1.0,2
0.8,-0.8,3
0.8,-0.6,0
0.8,-0.4,75
0.8,-0.2,102
0.8,0.0,103
0.8,0.2,342
0.8,0.4,174
0.8,0.6,2391
0.8,0.8,1724
`;

// set the dimensions and margins of the graph
const margin = {top: 80, right: 50, bottom: 50, left: 40},
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data


//d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function(data) {
const data = d3.csvParse(csvdata.trim())

  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  const myGroups = d3.map(data, function(d){return d.group;}).keys()
  const myVars = d3.map(data, function(d){return d.variable;}).keys()

  // debugger;

  // Build X scales and axis:
  const x = d3.scaleBand()
    .range([ 0, width ])
    .domain(myGroups)
    .padding(0.05);

  svg.append("g")
    .style("font-size", 15)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  const y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0.05);

  svg.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  const myColor = d3.scaleSequential()
    //.interpolator(d3.interpolateInferno)
    .interpolator(d3.interpolate("#6ea5ba", "#0080b3"))
    .domain([d3.min(data.map(d => d.value)), d3.max(data.map(d => d.value))])

  // const myColor = (i => {
  //   return d3.interpolateRdYlGn((i + 1) / 2 + 0.5);
  // });

  // create a tooltip
  const tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  const mousemove = function(d) {
    tooltip
      .html("The exact value of<br>this cell is: " + d.value)
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  const mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  // add the squares
  svg.selectAll()
    .data(data, function(d) {return d.group+':'+d.variable;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.group) })
      .attr("y", function(d) { return y(d.variable) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
//})

// // Add title to graph
// svg.append("text")
//         .attr("x", 0)
//         .attr("y", -50)
//         .attr("text-anchor", "left")
//         .style("font-size", "22px")
//         .text("A d3.js heatmap");

// // Add subtitle to graph
// svg.append("text")
//         .attr("x", 0)
//         .attr("y", -20)
//         .attr("text-anchor", "left")
//         .style("font-size", "14px")
//         .style("fill", "grey")
//         .style("max-width", 400)
//         .text("A short description of the take-away message of this chart.");