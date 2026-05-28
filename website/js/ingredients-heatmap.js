function initIngredientsHeatmap() {
  const container = document.getElementById("viz-ingr-heatmap");
  if (!container) return;
  container.innerHTML = "";

  // Embedded data from milestone-3/viz/ingredients-heatmap/graph.js
  // group = mood score bin, variable = health score bin, value = ingredient count
  const csvdata = `group,variable,value,ingredients
-1.0,-1.0,80,"powdered alum, decorator sugar, oreo other chocolate sandwich creme filled cooky"
-1.0,-0.8,207,"sprite, colored candy sprinkle, caramel dessert topping"
-1.0,-0.6,1,foot diameter hog casing
-1.0,-0.4,23,"refrigerated flaky sweet hawaiian biscuit, pork sausage link, tray ice"
-1.0,-0.2,1,mason lid
-1.0,0.0,60,"yellow gel food coloring, wooden, foil"
-1.0,0.2,66,"link italian chicken sausage, chicken crackling, center bacon"
-1.0,0.4,0,
-1.0,0.6,16,"cake, pumpkin gut, pumpkin syrup"
-1.0,0.8,12,"ablespoon sugar vanilla syrup, cookie butter, confectioner sugar dusting"
-0.8,-1.0,58,"sugar cheesecake flavor pudding mix, tub cool whip whipped topping, instant french vanilla pudding mix"
-0.8,-0.8,882,"cheese cracker, condensed cream shrimp soup, ramen noodle vegetable"
-0.8,-0.6,20,"little sausage, breaded chicken, red velvet emulsion"
-0.8,-0.4,271,"ravy, lemon tea cooky, jerk sauce"
-0.8,-0.2,2,"sucralose sugar substitute, hardwood pellet"
-0.8,0.0,103,"vertically onion, serving butter cooking spray, sodium chicken base"
-0.8,0.2,567,"juice concentrate flavor except citrus, cherry gelatin, crispy rice cereal square"
-0.8,0.4,4,"unwrapped milk chocolate candy kiss, racked beef rib, chocolate regular graham cracker"
-0.8,0.6,112,"capicola, cane syrup, korean pepper paste"
-0.8,0.8,39,"jet puffed miniature marshmallow, vanilla ice cream sandwich, white fondant"
-0.6,-1.0,5,"brown paper, premium vodka, black food coloring"
-0.6,-0.8,120,"all purpose flour oo, knorr fiesta sidestm spanish rice, floured cooking spray"
-0.6,-0.6,5,"american cheddar cheese blend, sauce taco, polish beef kielbasa"
-0.6,-0.4,75,"green onion dip mix, butter spread, mazola pure cooking spray"
-0.6,-0.2,0,
-0.6,0.0,54,"lil smoky, butter extract, zero calorie sweetener"
-0.6,0.2,339,"mccormick coconut flavor, sweet gherkin, jamaican rum"
-0.6,0.4,3,"white lotus paste, chocolate milk, shamrock farm whipping cream"
-0.6,0.6,102,"cheddar mozzarella cheese, cocktail peanut, orange juice concentrate"
-0.6,0.8,26,"beef standing rib roast, celery bitter, beef rib bone"
-0.4,-1.0,2,"black food coloring powder, cornstarch dissolved"
-0.4,-0.8,110,"italian pizza crust, campbell sodium thai chicken broth, rum bourbon"
-0.4,-0.6,5,"kraft mozzarella cheese, cheese spread, kraft moisture part mozzarella cheese"
-0.4,-0.4,162,"tomato sauce salt, sweet spicy seafood seasoning, bison sausage pepperoni seasoning"
-0.4,-0.2,4,"sweet cherry stem, apple hickory wood chip, rennet tablet"
-0.4,0.0,58,"tri colored spiral pasta, farfalle pasta, clear imitation vanilla extract"
-0.4,0.2,410,"corn bread mix, plantain chip, cracker"
-0.4,0.4,6,"prime rib loin roast, meaty beef short rib, roast lamb"
-0.4,0.6,143,"meaty beef short rib, thai chili sauce, spiral ham"
-0.4,0.8,55,"unpeeled, truffle oil, bone fully ham steak"
-0.2,-1.0,0,
-0.2,-0.8,6,"gold rum, pure wesson canola oil, corn chex"
-0.2,-0.6,0,
-0.2,-0.4,6,"blade roast, dark spiced rum, non dairy cream cheese"
-0.2,-0.2,0,
-0.2,0.0,13,"wooden pick, fleur de sel, salt white pepper"
-0.2,0.2,18,"rice cereal square, mezze rigatoni, gluten flour"
-0.2,0.4,0,
-0.2,0.6,5,"turkey beef meat, sour cream yogurt, cheddar"
-0.2,0.8,7,"center beef tenderloin roast, chicken drumette, bone beef prime rib roast"
0.0,-1.0,0,
0.0,-0.8,5,"honey maid graham crumb, heddar cheese powder, halloween shaped pasta"
0.0,-0.6,0,
0.0,-0.4,11,"crumbled cotija feta cheese, mixed berry cream cheese, jigger vodka"
0.0,-0.2,1,cherry stem
0.0,0.0,7,"kosher salt, pink salt, tier bamboo steamer basket lid"
0.0,0.2,23,"unpacked brown sugar, pizza dough bao, muscovado sugar"
0.0,0.4,1,ginger syrup
0.0,0.6,5,"garlic parmesan cheese sauce, block cheddar cheese, chesapeake seasoning"
0.0,0.8,4,"unbleached cane sugar, white truffle oil, swiss gruyere cheese"
0.2,-1.0,0,
0.2,-0.8,24,"agave nectar, fettucine, sargento traditional cheese mexican"
0.2,-0.6,6,"cheddar cheese colby jack, cheddar monterey cheese blend, deli style ham"
0.2,-0.4,126,"shiraz other red wine, cheese choice, tortellini pasta"
0.2,-0.2,2,"iceberg lettuce leaf, spear kosher dill pickle"
0.2,0.0,25,"rock salt, flaky sea salt, gluten elbow pasta"
0.2,0.2,291,"mild curry paste, so delicious dairy coconutmilk beverage, raspberry seltzer"
0.2,0.4,21,"rib eye roast, log montchevre honey goat cheese, spinach pesto"
0.2,0.6,197,"creme fraiche, gouda cheese, crumbled ricotta salata"
0.2,0.8,51,"shaved pecorino romano cheese, beef tongue, beef shank"
0.4,-1.0,0,
0.4,-0.8,11,"instant polenta, wheat regular flour tortilla, blue corn tortilla chip"
0.4,-0.6,0,
0.4,-0.4,40,"grain penne pasta, yellow corn meal, sweet mustard"
0.4,-0.2,0,
0.4,0.0,23,"minute tapioca, roasting, corn husk"
0.4,0.2,158,"cornmeal, original baked bean, white short grain rice"
0.4,0.4,6,"sweet potato fry, turkey lunch meat, powdered milk"
0.4,0.6,100,"emmentaler cheese, white grape juice, romano parmesan cheese"
0.4,0.8,33,"topping dark chocolate, cherry cranberry, torn iceberg lettuce"
0.6,-1.0,0,
0.6,-0.8,21,"barilla gluten spaghetti, instant polenta, wheat regular flour tortilla"
0.6,-0.6,1,vegan barbecue sauce
0.6,-0.4,128,"goat shoulder, green jackfruit brine, pureed prune food"
0.6,-0.2,3,"pickled pepperoncini pepper, natural hardwood lump charcoal, white rice vinegar"
0.6,0.0,50,"tapioca starch, white pepper, butte"
0.6,0.2,437,"wheat tortilla, dehydrated onion flake, white potato skin"
0.6,0.4,42,"doenjang, honey almond, marie creamy avocado poblano dressing"
0.6,0.6,433,"asian chile pepper sauce, chocolate almond milk, goya adobo pepper"
0.6,0.8,193,"beef rib eye steak, anchovy paste, beef round steak"
0.8,-1.0,0,
0.8,-0.8,2,"trappey red deviltm cayenne pepper sauce, white corn chipotle pepper"
0.8,-0.6,0,
0.8,-0.4,73,"loaf rye bread, rosemary the sauce, freeze cilantro"
0.8,-0.2,10,"cleaned crawfish tail, up dill, dole red onion"
0.8,0.0,80,"ear corn husk, reynold parchment paper, grind black pepper"
0.8,0.2,340,"lime powder, bay seasoningtm, fire corn"
0.8,0.4,174,"pure vanilla bean paste, each tea, pineapple orange"
0.8,0.6,801,"pectin, grained mustard, strong brewed black tea"
0.8,0.8,1618,"cucumber, fuji gala apple, cayenne pepper"`;

  const data = d3.csvParse(csvdata.trim());
  const groups    = [...new Set(data.map(d => d.group))];
  const variables = [...new Set(data.map(d => d.variable))];

  const m = { top: 40, right: 20, bottom: 50, left: 50 };
  const cellSize = 28;
  const W = groups.length * cellSize + m.left + m.right;
  const H = variables.length * cellSize + m.top + m.bottom;

  const svg = d3.select("#viz-ingr-heatmap")
    .append("svg")
    .attr("viewBox", `0 0 ${W} ${H}`)
    .style("width", "100%").style("height", "100%");

  const color = d3.scaleSequential()
    .interpolator(d3.interpolateBlues)
    .domain([0, d3.max(data, d => +d.value)]);

  const x = d3.scaleBand().range([m.left, W - m.right]).domain(groups).padding(0.04);
  const y = d3.scaleBand().range([H - m.bottom, m.top]).domain(variables).padding(0.04);

  // Axis label helpers (only show "worse mood" / "better mood" and "unhealthier" / "healthier")
  const xLabels = groups.map((g, i) =>
    i === 0 ? "← worse mood" : i === groups.length - 1 ? "better mood →" : "");
  const yLabels = variables.map((v, i) =>
    i === 0 ? "unhealthier" : i === variables.length - 1 ? "healthier" : "");

  svg.append("g")
    .attr("transform", `translate(0,${H - m.bottom})`)
    .call(d3.axisBottom(x).tickFormat((d, i) => xLabels[i]).tickSize(0))
    .call(g => g.select(".domain").remove())
    .selectAll("text").attr("font-size", 8).attr("fill", "#888");

  svg.append("g")
    .attr("transform", `translate(${m.left},0)`)
    .call(d3.axisLeft(y).tickFormat((d, i) => yLabels[i]).tickSize(0))
    .call(g => g.select(".domain").remove())
    .selectAll("text").attr("font-size", 8).attr("fill", "#888");

  // Axis titles
  svg.append("text")
    .attr("x", m.left + (W - m.left - m.right) / 2).attr("y", H - 4)
    .attr("text-anchor", "middle").attr("font-size", 9).attr("fill", "#aaa")
    .text("Mood Score Bin →");
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(m.top + (H - m.top - m.bottom) / 2)).attr("y", 12)
    .attr("text-anchor", "middle").attr("font-size", 9).attr("fill", "#aaa")
    .text("Health Score Bin →");

  const tooltip = d3.select(".tooltip");

  svg.selectAll("rect.cell")
    .data(data)
    .enter().append("rect")
    .attr("class", "cell")
    .attr("x", d => x(d.group))
    .attr("y", d => y(d.variable))
    .attr("rx", 3).attr("ry", 3)
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .attr("fill", d => +d.value === 0 ? "#f5f5f5" : color(+d.value))
    .attr("opacity", 0.88)
    .on("mouseover", function () { d3.select(this).attr("opacity", 1).attr("stroke", "#333").attr("stroke-width", 1.5); })
    .on("mousemove", (event, d) => {
      tooltip
        .html(
          `<strong>${+d.value} ingredient${+d.value !== 1 ? "s" : ""}</strong>` +
          (+d.value > 0 && d.ingredients ? `<br><span style="opacity:0.7">${d.ingredients}</span>` : "")
        )
        .style("opacity", 1)
        .style("left", (event.pageX + 12) + "px")
        .style("top",  (event.pageY - 44) + "px");
    })
    .on("mouseleave", function () {
      d3.select(this).attr("opacity", 0.88).attr("stroke", "none");
      tooltip.style("opacity", 0);
    });

  // Colour legend
  const lgW = 80, lgH = 8;
  const lg = svg.append("g").attr("transform", `translate(${W - m.right - lgW}, ${m.top - 26})`);
  const defs = svg.append("defs");
  const grad = defs.append("linearGradient").attr("id", "hm-ingr-grad");
  [0, 0.25, 0.5, 0.75, 1].forEach(t => {
    grad.append("stop").attr("offset", `${t * 100}%`).attr("stop-color", color(t * d3.max(data, d => +d.value)));
  });
  lg.append("rect").attr("width", lgW).attr("height", lgH).attr("fill", "url(#hm-ingr-grad)").attr("rx", 2);
  lg.append("text").attr("x", 0).attr("y", lgH + 10).attr("font-size", 7).attr("fill", "#999").text("0");
  lg.append("text").attr("x", lgW).attr("y", lgH + 10).attr("text-anchor", "end").attr("font-size", 7).attr("fill", "#999")
    .text(d3.max(data, d => +d.value));
  lg.append("text").attr("x", lgW / 2).attr("y", -3).attr("text-anchor", "middle").attr("font-size", 7).attr("fill", "#aaa")
    .text("# ingredients");
}
