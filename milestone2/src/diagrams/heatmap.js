function draw_heatmap(id, bubbles=true){
    const data = [
    { name: "Chocolate", mood: 90, health: 40, size: 20 },
    { name: "Spinach", mood: 50, health: 95, size: 15 },
    { name: "Coffee", mood: 85, health: 50, size: 18 },
    { name: "Broccoli", mood: 40, health: 90, size: 15 },
    { name: "Ice Cream", mood: 95, health: 30, size: 22 },
    { name: "Salmon", mood: 70, health: 85, size: 18 },
    { name: "Avocado", mood: 75, health: 88, size: 17 },
    { name: "Burger", mood: 80, health: 35, size: 20 },
    { name: "Blueberries", mood: 65, health: 92, size: 14 },
    { name: "Pizza", mood: 88, health: 45, size: 21 },
    { name: "Nuts", mood: 60, health: 80, size: 14 },
    { name: "Green Tea", mood: 55, health: 85, size: 13 },
    { name: "Fries", mood: 85, health: 25, size: 19 },
    { name: "Eggs", mood: 65, health: 75, size: 14 },
    { name: "Chicken", mood: 60, health: 70, size: 15 },
    { name: "Cake", mood: 92, health: 20, size: 22 },
    { name: "Apples", mood: 60, health: 85, size: 13 },
    { name: "Cheese", mood: 75, health: 55, size: 16 },
    { name: "Soda", mood: 80, health: 15, size: 18 },
    { name: "Carrots", mood: 50, health: 88, size: 13 }
    ];

    const width = 800;
    const height = 600;
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };

    const svg = d3.select(`#${id}`);

    // Scales
    const x = d3.scaleLinear()
    .domain([0, 100])
    .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]);

    // Axes
    svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x));

    svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y));

    // Axis labels
    svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 20)
    .attr("text-anchor", "middle")
    .text("Mood");

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text("Health");


    if(bubbles){
        // Bubbles
        svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.mood))
        .attr("cy", d => y(d.health))
        .attr("r", d => d.size)
        .attr("fill", "steelblue")
        .attr("opacity", 0.7);

        // Labels
        svg.selectAll("label")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => x(d.mood))
        .attr("y", d => y(d.health))
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .text(d => d.name);
    }
}