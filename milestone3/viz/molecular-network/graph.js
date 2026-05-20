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

const svg = d3.select("#ingredient-network")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

svg.attr("id", "ingredient-network-svg")

// colorscale = d3.scaleQuantize()
//   .domain([-1.0, 1.0])
//   // .range(["red", "green"])
//   //.range(["#e7d52f","#e9d42f","#ecd22e","#eed02d","#f0ce2c","#f1cb2c","#f3c92b","#f5c72b","#f7c52a","#f8c329","#fac029","#fbbe28","#fdbc28","#feb927","#ffb727","#ffb526","#ffb226","#ffb025","#ffad25","#ffab24","#ffa824","#ffa623","#ffa323","#ffa022","#ff9e22","#ff9b21","#ff9921","#ff9621","#ff9320","#ff9020","#ff8e1f","#ff8b1f","#ff881e","#ff851e","#ff831d","#ff801d","#ff7d1d","#ff7a1c","#ff781c","#ff751b","#ff721b","#ff6f1a","#fd6c1a","#fc6a19","#fa6719","#f96418","#f76118","#f65f18","#f45c17","#f25916","#f05716","#ee5415","#ec5115","#ea4f14","#e84c14","#e64913","#e44713","#e24412","#df4212","#dd3f11","#da3d10","#d83a10","#d5380f","#d3360f","#d0330e","#ce310d","#cb2f0d","#c92d0c","#c62a0b","#c3280b","#c1260a","#be2409","#bb2309","#b92108","#b61f07","#b41d07","#b11b06","#af1a05","#ac1805","#aa1704","#a81604","#a51403","#a31302","#a11202","#9f1101","#9d1000","#9b0f00","#9a0e00","#980e00","#960d00","#950c00","#940c00","#930c00","#920c00","#910b00","#910c00","#900c00","#900c00","#900c00"])
//   .range(["#440154","#440256","#450457","#450559","#46075a","#46085c","#460a5d","#460b5e","#470d60","#470e61","#471063","#471164","#471365","#481467","#481668","#481769","#48186a","#481a6c","#481b6d","#481c6e","#481d6f","#481f70","#482071","#482173","#482374","#482475","#482576","#482677","#482878","#482979","#472a7a","#472c7a","#472d7b","#472e7c","#472f7d","#46307e","#46327e","#46337f","#463480","#453581","#453781","#453882","#443983","#443a83","#443b84","#433d84","#433e85","#423f85","#424086","#424186","#414287","#414487","#404588","#404688","#3f4788","#3f4889","#3e4989","#3e4a89","#3e4c8a","#3d4d8a","#3d4e8a","#3c4f8a","#3c508b","#3b518b","#3b528b","#3a538b","#3a548c","#39558c","#39568c","#38588c","#38598c","#375a8c","#375b8d","#365c8d","#365d8d","#355e8d","#355f8d","#34608d","#34618d","#33628d","#33638d","#32648e","#32658e","#31668e","#31678e","#31688e","#30698e","#306a8e","#2f6b8e","#2f6c8e","#2e6d8e","#2e6e8e","#2e6f8e","#2d708e","#2d718e","#2c718e","#2c728e","#2c738e","#2b748e","#2b758e","#2a768e","#2a778e","#2a788e","#29798e","#297a8e","#297b8e","#287c8e","#287d8e","#277e8e","#277f8e","#27808e","#26818e","#26828e","#26828e","#25838e","#25848e","#25858e","#24868e","#24878e","#23888e","#23898e","#238a8d","#228b8d","#228c8d","#228d8d","#218e8d","#218f8d","#21908d","#21918c","#20928c","#20928c","#20938c","#1f948c","#1f958b","#1f968b","#1f978b","#1f988b","#1f998a","#1f9a8a","#1e9b8a","#1e9c89","#1e9d89","#1f9e89","#1f9f88","#1fa088","#1fa188","#1fa187","#1fa287","#20a386","#20a486","#21a585","#21a685","#22a785","#22a884","#23a983","#24aa83","#25ab82","#25ac82","#26ad81","#27ad81","#28ae80","#29af7f","#2ab07f","#2cb17e","#2db27d","#2eb37c","#2fb47c","#31b57b","#32b67a","#34b679","#35b779","#37b878","#38b977","#3aba76","#3bbb75","#3dbc74","#3fbc73","#40bd72","#42be71","#44bf70","#46c06f","#48c16e","#4ac16d","#4cc26c","#4ec36b","#50c46a","#52c569","#54c568","#56c667","#58c765","#5ac864","#5cc863","#5ec962","#60ca60","#63cb5f","#65cb5e","#67cc5c","#69cd5b","#6ccd5a","#6ece58","#70cf57","#73d056","#75d054","#77d153","#7ad151","#7cd250","#7fd34e","#81d34d","#84d44b","#86d549","#89d548","#8bd646","#8ed645","#90d743","#93d741","#95d840","#98d83e","#9bd93c","#9dd93b","#a0da39","#a2da37","#a5db36","#a8db34","#aadc32","#addc30","#b0dd2f","#b2dd2d","#b5de2b","#b8de29","#bade28","#bddf26","#c0df25","#c2df23","#c5e021","#c8e020","#cae11f","#cde11d","#d0e11c","#d2e21b","#d5e21a","#d8e219","#dae319","#dde318","#dfe318","#e2e418","#e5e419","#e7e419","#eae51a","#ece51b","#efe51c","#f1e51d","#f4e61e","#f6e620","#f8e621","#fbe723","#fde725"])

colorscale = (i => {
  return d3.interpolateRdYlGn((i + 1) / 2 + 0.5);
});

const nodes = d3.csvParse(nodecsvdata.trim()).sort(
  (a, b) => parseFloat(b.healthy_score) - parseFloat(a.healthy_score)
);
const links = d3.csvParse(edgecsvdata.trim());

const width_half = width / 2;
const width_quarter = width / 4;

const center_x = width / 2;
const center_y = height / 2;

console.log(nodes);

nodes.forEach( (node, i) => {
  const angle = 2 * Math.PI * (i / nodes.length) - (Math.PI / 2);
  node.fx = center_x + radius * Math.cos(angle);
  node.fy = center_y + radius * Math.sin(angle);
  // node.fx = width * 0.1 + (Number(node.healthy_score) + 1)/2 * width * 0.8
  // node.fy = Math.random() * height;
});


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
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.5);

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
  // .attr('transform', 'scale(1, -1)')
  .attr("class", "font")
  .text(d => d.ingredient);

function isConnected(a, b){
  return links.some(d => (d.source == a) && (d.target == b)) || a == b;
}

function highlight(event, hoveredNode) {

  // Highlight connected nodes
  node.attr("opacity", d =>
    isConnected(hoveredNode, d) ? 1 : disabled_node
  );

  label.attr("opacity", d =>
    isConnected(hoveredNode, d) ? 1 : disabled_node
  );

  // Highlight connected links
  link
    .attr("stroke", d => {
      return d.source.ingredient === hoveredNode.ingredient
        ? "#000000"
        : "#ddd";
    }
    )
    .attr("stroke-opacity", d =>
      d.source.ingredient === hoveredNode.ingredient
        ? 1
        : disabled_edge
    );
    // .
    // attr("stroke-width", d =>
    //   d.source.id === hoveredNode.id ||
    //   d.target.id === hoveredNode.id
    //     ? 4
    //     : 1
    // );
}

function reset() {
  node.attr("opacity", 1);

  label.attr("opacity", 1);

  link
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.5)
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