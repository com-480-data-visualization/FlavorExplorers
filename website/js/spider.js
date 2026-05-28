let spiderRecipes = [];
let spiderCompounds = [];
const selectedRecipes = [];
const RECIPE_COLORS = ["#E87461", "#6BAA75", "#3D405B"];

window.selectRecipe = function(id) {
  if (selectedRecipes.length < 3) {
    selectedRecipes.push(id);
    renderPickerSelected();
    renderPickerResults("");
    drawCompareSpider();
  }
};

window.removeRecipe = function(index) {
  selectedRecipes.splice(index, 1);
  renderPickerSelected();
  drawCompareSpider();
};

function initSpider(recipes, compounds) {
  spiderRecipes = recipes;
  spiderCompounds = compounds;

  const wrap = d3.select("#recipe-picker");
  wrap.html(`
    <div class="picker-label">Pick up to 3 recipes</div>
    <input class="picker-search" type="text" placeholder="Search..." id="recipe-search">
    <div class="picker-results" id="recipe-results"></div>
    <div class="picker-selected" id="recipe-selected"></div>
  `);

  document.getElementById("recipe-search").addEventListener("input", e => renderPickerResults(e.target.value));
  renderPickerResults("");
  drawCompareSpider();
}

function renderPickerResults(query) {
  const container = document.getElementById("recipe-results");
  const q = query.toLowerCase().trim();
  const matches = spiderRecipes.filter(r => !selectedRecipes.includes(r.id) && r.name.toLowerCase().includes(q)).slice(0, 6);
  
  container.innerHTML = matches.map(r => `<div class="picker-option" onclick="selectRecipe(${r.id})">${r.name}</div>`).join("");
}

function selectRecipe(id) {
  if (selectedRecipes.length < 3) {
    selectedRecipes.push(id);
    renderPickerSelected();
    renderPickerResults("");
    drawCompareSpider();
  }
}

function renderPickerSelected() {
  const container = document.getElementById("recipe-selected");
  container.innerHTML = selectedRecipes.map((id, i) => {
    const r = spiderRecipes.find(x => x.id === id);
    return `<div class="picker-chip" style="background:${RECIPE_COLORS[i]}" onclick="removeRecipe(${i})">${r.name} ×</div>`;
  }).join("");
}

function removeRecipe(index) {
  selectedRecipes.splice(index, 1);
  renderPickerSelected();
  drawCompareSpider();
}

function drawCompareSpider() {
  const card = d3.select("#viz-compare-spider");
  card.selectAll("*").remove();
  const W = 400, H = 360, R = 120;
  const svg = card.append("svg").attr("viewBox", `0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform", `translate(${W/2}, ${H/2 + 10})`);
  const N = spiderCompounds.length;
  const angle = i => (Math.PI * 2 * i) / N - Math.PI / 2;

  spiderCompounds.forEach((label, i) => {
    g.append("line").attr("x2", Math.cos(angle(i)) * R).attr("y2", Math.sin(angle(i)) * R).attr("stroke", "#eee");
    g.append("text").attr("x", Math.cos(angle(i)) * (R + 15)).attr("y", Math.sin(angle(i)) * (R + 15))
     .attr("text-anchor", "middle").attr("font-size", 9).text(label);
  });

  selectedRecipes.forEach((id, i) => {
    const r = spiderRecipes.find(x => x.id === id);
    const pts = spiderCompounds.map((c, j) => {
      const v = r.compounds[c] || 0;
      return `${Math.cos(angle(j)) * R * v},${Math.sin(angle(j)) * R * v}`;
    }).join(" ");
    g.append("polygon").attr("points", pts).attr("fill", RECIPE_COLORS[i]).attr("fill-opacity", 0.2).attr("stroke", RECIPE_COLORS[i]).attr("stroke-width", 2);
  });
}