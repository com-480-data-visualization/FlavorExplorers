(function(){

const nodecsvdata = `
ingredient,category,num_compounds,healthy_score
beef,meat,199,0.3
strawberry,fruit,196,0.9
apple,fruit,195,0.9
parmesan cheese,dairy,178,0.3
cheddar cheese,dairy,151,0.3
tomato,vegetable,150,0.9
peanut butter,plant derivative,145,0.8
swiss cheese,dairy,145,0.3
mango,fruit,141,0.9
butter,dairy,140,0.2
provolone cheese,dairy,139,0.2
mozzarella cheese,dairy,132,0.6
cottage cheese,dairy,131,0.8
raspberry,fruit,130,0.9
feta cheese,dairy,130,0.3
orange,fruit,128,0.9
chicken,meat,123,0.8
milk,dairy,118,0.8
mushroom,vegetable,117,0.8
pork,meat,115,0.3
cream cheese,dairy,130,-0.3
bacon,meat,120,-0.8
pork sausage,meat,119,-0.7
white bread,cereal/crop,59,-0.3
ham,meat,47,-0.7
cream,dairy,29,-0.5
coconut oil,plant derivative,18,-0.3
egg noodle,cereal/crop,4,-0.3
`;

const edgecsvdata = `
source,target,weight
beef,strawberry,62
beef,apple,60
beef,parmesan cheese,93
beef,cheddar cheese,85
beef,tomato,72
beef,peanut butter,99
beef,swiss cheese,78
beef,mango,53
beef,butter,80
beef,provolone cheese,73
beef,mozzarella cheese,74
beef,cottage cheese,76
beef,raspberry,54
beef,feta cheese,74
beef,orange,42
beef,chicken,98
beef,milk,75
beef,mushroom,64
beef,pork,97
beef,cream cheese,76
beef,bacon,102
beef,pork sausage,101
beef,white bread,45
beef,ham,47
beef,cream,22
beef,coconut oil,9
beef,egg noodle,4
strawberry,apple,114
strawberry,parmesan cheese,80
strawberry,cheddar cheese,79
strawberry,tomato,72
strawberry,peanut butter,51
strawberry,swiss cheese,76
strawberry,mango,82
strawberry,butter,64
strawberry,provolone cheese,66
strawberry,mozzarella cheese,67
strawberry,cottage cheese,66
strawberry,raspberry,89
strawberry,feta cheese,69
strawberry,orange,69
strawberry,chicken,49
strawberry,milk,52
strawberry,mushroom,53
strawberry,pork,45
strawberry,cream cheese,66
strawberry,bacon,45
strawberry,pork sausage,45
strawberry,white bread,30
strawberry,ham,24
strawberry,cream,15
strawberry,coconut oil,13
apple,parmesan cheese,88
apple,cheddar cheese,79
apple,tomato,65
apple,peanut butter,46
apple,swiss cheese,79
apple,mango,64
apple,butter,62
apple,provolone cheese,75
apple,mozzarella cheese,73
apple,cottage cheese,73
apple,raspberry,66
apple,feta cheese,75
apple,orange,67
apple,chicken,43
apple,milk,53
apple,mushroom,52
apple,pork,40
apple,cream cheese,73
apple,bacon,41
apple,pork sausage,40
apple,white bread,31
apple,ham,19
apple,cream,12
apple,coconut oil,8
parmesan cheese,cheddar cheese,134
parmesan cheese,tomato,66
parmesan cheese,peanut butter,74
parmesan cheese,swiss cheese,129
parmesan cheese,mango,64
parmesan cheese,butter,79
parmesan cheese,provolone cheese,129
parmesan cheese,mozzarella cheese,127
parmesan cheese,cottage cheese,130
parmesan cheese,raspberry,54
parmesan cheese,feta cheese,127
parmesan cheese,orange,50
parmesan cheese,chicken,72
parmesan cheese,milk,79
parmesan cheese,mushroom,65
parmesan cheese,pork,63
parmesan cheese,cream cheese,130
parmesan cheese,bacon,67
parmesan cheese,pork sausage,67
parmesan cheese,white bread,44
parmesan cheese,ham,35
parmesan cheese,cream,24
parmesan cheese,coconut oil,13
parmesan cheese,egg noodle,4
cheddar cheese,tomato,57
cheddar cheese,peanut butter,64
cheddar cheese,swiss cheese,136
cheddar cheese,mango,52
cheddar cheese,butter,71
cheddar cheese,provolone cheese,130
cheddar cheese,mozzarella cheese,127
cheddar cheese,cottage cheese,131
cheddar cheese,raspberry,55
cheddar cheese,feta cheese,129
cheddar cheese,orange,43
cheddar cheese,chicken,68
cheddar cheese,milk,76
cheddar cheese,mushroom,57
cheddar cheese,pork,61
cheddar cheese,cream cheese,130
cheddar cheese,bacon,65
cheddar cheese,pork sausage,65
cheddar cheese,white bread,45
cheddar cheese,ham,35
cheddar cheese,cream,28
cheddar cheese,coconut oil,13
cheddar cheese,egg noodle,4
tomato,peanut butter,58
tomato,swiss cheese,56
tomato,mango,57
tomato,butter,54
tomato,provolone cheese,52
tomato,mozzarella cheese,52
tomato,cottage cheese,51
tomato,raspberry,58
tomato,feta cheese,52
tomato,orange,47
tomato,chicken,45
tomato,milk,43
tomato,mushroom,50
tomato,pork,49
tomato,cream cheese,51
tomato,bacon,49
tomato,pork sausage,49
tomato,white bread,30
tomato,ham,23
tomato,cream,7
tomato,coconut oil,8
peanut butter,swiss cheese,63
peanut butter,mango,44
peanut butter,butter,69
peanut butter,provolone cheese,60
peanut butter,mozzarella cheese,60
peanut butter,cottage cheese,62
peanut butter,raspberry,39
peanut butter,feta cheese,60
peanut butter,orange,33
peanut butter,chicken,72
peanut butter,milk,59
peanut butter,mushroom,49
peanut butter,pork,70
peanut butter,cream cheese,62
peanut butter,bacon,72
peanut butter,pork sausage,72
peanut butter,white bread,37
peanut butter,ham,36
peanut butter,cream,19
peanut butter,coconut oil,6
peanut butter,egg noodle,2
swiss cheese,mango,50
swiss cheese,butter,72
swiss cheese,provolone cheese,127
swiss cheese,mozzarella cheese,129
swiss cheese,cottage cheese,127
swiss cheese,raspberry,52
swiss cheese,feta cheese,129
swiss cheese,orange,40
swiss cheese,chicken,64
swiss cheese,milk,73
swiss cheese,mushroom,57
swiss cheese,pork,61
swiss cheese,cream cheese,127
swiss cheese,bacon,62
swiss cheese,pork sausage,62
swiss cheese,white bread,41
swiss cheese,ham,34
swiss cheese,cream,27
swiss cheese,coconut oil,13
mango,butter,52
mango,provolone cheese,46
mango,mozzarella cheese,47
mango,cottage cheese,45
mango,raspberry,61
mango,feta cheese,46
mango,orange,59
mango,chicken,41
mango,milk,42
mango,mushroom,43
mango,pork,39
mango,cream cheese,45
mango,bacon,39
mango,pork sausage,39
mango,white bread,21
mango,ham,19
mango,cream,12
mango,coconut oil,8
butter,provolone cheese,63
butter,mozzarella cheese,65
butter,cottage cheese,62
butter,raspberry,52
butter,feta cheese,63
butter,orange,40
butter,chicken,63
butter,milk,74
butter,mushroom,51
butter,pork,61
butter,cream cheese,62
butter,bacon,61
butter,pork sausage,61
butter,white bread,30
butter,ham,31
butter,cream,22
butter,coconut oil,12
provolone cheese,mozzarella cheese,127
provolone cheese,cottage cheese,128
provolone cheese,raspberry,48
provolone cheese,feta cheese,127
provolone cheese,orange,41
provolone cheese,chicken,60
provolone cheese,milk,69
provolone cheese,mushroom,52
provolone cheese,pork,57
provolone cheese,cream cheese,127
provolone cheese,bacon,58
provolone cheese,pork sausage,58
provolone cheese,white bread,41
provolone cheese,ham,33
provolone cheese,cream,24
provolone cheese,coconut oil,12
mozzarella cheese,cottage cheese,127
mozzarella cheese,raspberry,49
mozzarella cheese,feta cheese,127
mozzarella cheese,orange,40
mozzarella cheese,chicken,60
mozzarella cheese,milk,68
mozzarella cheese,mushroom,52
mozzarella cheese,pork,58
mozzarella cheese,cream cheese,127
mozzarella cheese,bacon,59
mozzarella cheese,pork sausage,59
mozzarella cheese,white bread,41
mozzarella cheese,ham,33
mozzarella cheese,cream,23
mozzarella cheese,coconut oil,11
cottage cheese,raspberry,48
cottage cheese,feta cheese,127
cottage cheese,orange,39
cottage cheese,chicken,63
cottage cheese,milk,68
cottage cheese,mushroom,52
cottage cheese,pork,57
cottage cheese,cream cheese,130
cottage cheese,bacon,61
cottage cheese,pork sausage,61
cottage cheese,white bread,43
cottage cheese,ham,34
cottage cheese,cream,24
cottage cheese,coconut oil,11
cottage cheese,egg noodle,4
raspberry,feta cheese,49
raspberry,orange,55
raspberry,chicken,41
raspberry,milk,48
raspberry,mushroom,37
raspberry,pork,42
raspberry,cream cheese,48
raspberry,bacon,42
raspberry,pork sausage,42
raspberry,white bread,26
raspberry,ham,23
raspberry,cream,11
raspberry,coconut oil,9
feta cheese,orange,39
feta cheese,chicken,60
feta cheese,milk,68
feta cheese,mushroom,52
feta cheese,pork,57
feta cheese,cream cheese,127
feta cheese,bacon,58
feta cheese,pork sausage,58
feta cheese,white bread,40
feta cheese,ham,33
feta cheese,cream,24
feta cheese,coconut oil,11
orange,chicken,29
orange,milk,36
orange,mushroom,34
orange,pork,26
orange,cream cheese,39
orange,bacon,26
orange,pork sausage,26
orange,white bread,18
orange,ham,13
orange,cream,7
orange,coconut oil,3
chicken,milk,61
chicken,mushroom,55
chicken,pork,80
chicken,cream cheese,63
chicken,bacon,84
chicken,pork sausage,84
chicken,white bread,35
chicken,ham,47
chicken,cream,17
chicken,coconut oil,11
chicken,egg noodle,4
milk,mushroom,47
milk,pork,55
milk,cream cheese,67
milk,bacon,55
milk,pork sausage,55
milk,white bread,29
milk,ham,31
milk,cream,23
milk,coconut oil,9
mushroom,pork,47
mushroom,cream cheese,52
mushroom,bacon,47
mushroom,pork sausage,47
mushroom,white bread,28
mushroom,ham,27
mushroom,cream,10
mushroom,coconut oil,5
pork,cream cheese,57
pork,bacon,115
pork,pork sausage,115
pork,white bread,32
pork,ham,45
pork,cream,12
pork,coconut oil,8
cream cheese,bacon,61
cream cheese,pork sausage,61
cream cheese,white bread,43
cream cheese,ham,34
cream cheese,cream,23
cream cheese,coconut oil,11
cream cheese,egg noodle,4
bacon,pork sausage,119
bacon,white bread,37
bacon,ham,47
bacon,cream,13
bacon,coconut oil,8
bacon,egg noodle,4
pork sausage,white bread,36
pork sausage,ham,47
pork sausage,cream,13
pork sausage,coconut oil,8
pork sausage,egg noodle,4
white bread,ham,23
white bread,cream,11
white bread,coconut oil,4
white bread,egg noodle,4
ham,cream,9
ham,coconut oil,4
ham,egg noodle,2
cream,coconut oil,5
`;

//config
const width = window.innerWidth;
const height = window.innerHeight;
const dim = Math.sqrt(width * width + height * height)

const link_scale = 0.00001 * dim;
const circle_scale = 0.0001 * dim;
const circle_min_radius = 5;
const circle_max_radius = 10;
const disabled_node = 0.15;
const disabled_edge = 0.3;

const shorter_length = d3.min([width, height]) / 2;
const radius = Math.sqrt(2 * shorter_length * shorter_length) * 0.5;

const stroke_default_opacity = 0.8;
const stroke_default_color = "#999";
const stroke_selected_color = "#000000";
const stroke_deselected_color = "#ddd";

//canvas
const svg = d3.select("#ingredient-network")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

svg.attr("id", "ingredient-network-svg")

//color
const colorscale = (i => {
  return d3.interpolateRdYlGn((i + 1) / 2 + 0.5);
});

//prepare data
const nodes = d3.csvParse(nodecsvdata.trim()).sort(
  (a, b) => parseFloat(b.healthy_score) - parseFloat(a.healthy_score)
);
const links = d3.csvParse(edgecsvdata.trim());


const center_x = width / 2;
const center_y = height / 2;

nodes.forEach( (node, i) => {
  const angle = 2 * Math.PI * (i / nodes.length) - (Math.PI / 2);
  node.fx = center_x + radius * Math.cos(angle);
  node.fy = center_y + radius * Math.sin(angle);
});


//add data
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
  .attr("stroke-width", d => d.weight * link_scale)
  .attr("stroke", stroke_default_color)
  .attr("stroke-opacity", stroke_default_opacity);

const node = svg.append("g")
  .selectAll("g")
  .data(nodes)
  .enter()
  .append("g")
  .on("mouseover", highlight)
  .on("mouseout", reset)
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)
  );

node.append("circle")
  .attr("r", d => d3.min([d3.max([d.num_compounds * circle_scale, circle_min_radius]), circle_max_radius]))
  .attr("fill", d => colorscale(d.healthy_score));

const label = node.append("text")
  .attr("dy", 3)
  .attr("x", 0)
  .attr('transform', (n, i, texts) => {
    const angle = 2 * Math.PI * (i / nodes.length) - (Math.PI / 2);
    const angle_degrees = (angle / (2 * Math.PI)) * 360;


    let rotate = "";
    const bbox = texts[i].getBBox();

    let cx = bbox.x + bbox.width / 2;
    let cy = bbox.y + bbox.height / 2;
    if(angle_degrees >= 180){
      cx = bbox.x + bbox.width / 2;
      cy = bbox.y + bbox.height / 2;

      rotate = ``;
    }

    return `rotate(${angle_degrees}) ${rotate}`;
  })
  .attr("class", "font")
  .text(d => d.ingredient);


// hover highlight functionality
function isConnected(a, b){
  return links.some(d => (d.source == a) && (d.target == b)) || a == b;
}

function highlight(event, hoveredNode) {
  node.attr("opacity", d =>
    isConnected(hoveredNode, d) ? 1 : disabled_node
  );

  label.attr("opacity", d =>
    isConnected(hoveredNode, d) ? 1 : disabled_node
  );

  link
    .attr("stroke", d => {
      return d.source.ingredient === hoveredNode.ingredient
        ? stroke_selected_color
        : stroke_deselected_color;
    }
    )
    .attr("stroke-opacity", d =>
      d.source.ingredient === hoveredNode.ingredient
        ? 1
        : disabled_edge
    );
}

function reset() {
  node.attr("opacity", 1);

  label.attr("opacity", 1);

  link
    .attr("stroke", stroke_default_color)
    .attr("stroke-opacity", stroke_default_opacity)
    .attr("stroke-width", d => d.weight * link_scale);
}

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
})();