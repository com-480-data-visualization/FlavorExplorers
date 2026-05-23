const csvdata = `
group,variable,value,ingredients
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
0.8,0.8,1618,"cucumber, fuji gala apple, cayenne pepper"
`;

//prepare data
const data = d3.csvParse(csvdata.trim());

const groups = [...new Set(data.map(d => d.group))];
const variables = [...new Set(data.map(d => d.variable))];

//config
const x_label_font_size = 15;
const y_label_font_size = 15;
const tooltip_x_offset = 70;
const default_block_opacity = 0.8;
const block_stroke_width = 4;

//prepare canvas
const margin = {top: 80, right: 50, bottom: 50, left: 40},
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

const svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//create color scale
const color = d3.scaleSequential()
  .interpolator(d3.interpolate("white", "blue"))
  .domain([d3.min(data.map(d => d.value)), d3.max(data.map(d => d.value))]);

//create x scale / axis
const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(groups)
  .padding(0.05);

const x_labels = Array(groups.length).fill("");
x_labels[0] = "better mood";
x_labels[variables.length - 1] = "worse mood";

const x_axis_scale = d3.scaleBand()
  .range([ width, 0])
  .domain(x_labels)
  .padding(0.05);

svg.append("g")
  .style("font-size", x_label_font_size)
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x_axis_scale).tickSize(0))
  .select(".domain").remove();

//create y scale / axis
const y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(variables)
  .padding(0.05);

const y_labels = Array(variables.length).fill("");
y_labels[0] = "unhealthier";
y_labels[variables.length - 1] = "healthier";

const y_axis_scale = d3.scaleBand()
  .range([ height, 0])
  .domain(y_labels)
  .padding(0.05);

const y_axis = svg.append("g")
  .style("font-size", y_label_font_size)
  .call(d3.axisLeft(y_axis_scale).tickSize(0));

y_axis.select(".domain").remove();
y_axis.selectAll("text").attr("transform", "rotate(-90) translate(0, -20)");

// prepare tooltip
const tooltip = d3.select("#my_dataviz")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px");

const mouseover = function(event, d) {
  tooltip
    .style("opacity", 1);
  d3.select(this)
    .style("stroke", "black")
    .style("opacity", 1);
}
const mousemove = function(event, d) {
  const [x, y] = d3.pointer(event, this);

  tooltip
    .html(d.value + " ingredients " + (d.value > 0 ? "like " + d.ingredients : ""))
    .style("left", (x + tooltip_x_offset) + "px")
    .style("top", (y) + "px");
}

const mouseleave = function(event, d) {
  tooltip
    .style("opacity", 0);

  d3.select(this)
    .style("stroke", "none")
    .style("opacity", default_block_opacity);
}

// add data
svg.selectAll()
  .data(data, function(d) {return d.group+':'+d.variable;})
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.group); })
    .attr("y", function(d) { return y(d.variable); })
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("width", x.bandwidth() )
    .attr("height", y.bandwidth() )
    .style("fill", function(d) { return color(d.value);} )
    .style("stroke-width", block_stroke_width)
    .style("stroke", "none")
    .style("opacity", default_block_opacity)
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave);