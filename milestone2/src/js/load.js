let ingredientsData = [];
let recipesData = [];
let compoundsList = [];

Promise.all([
  d3.csv("data/ingredients_scored.csv", d => ({
    name:          d.ingredient,
    health:        +d.healthy_score,
    mood:          +d.mood_score,
    category:      d.category || "other",
    recipe_count:  +d.recipe_count,
    dominant_mood: d.dominant_mood || "Unknown",
  })),
  d3.csv("data/recipes_curated.csv"),
  d3.csv("data/recipes_scored.csv", d => ({
    title:     d.recipe_title,
    category:  d.category,
    avgHealth: +d.avg_healthy,
    avgMood:   +d.avg_mood,
  })),
]).then(([ingr, rec, recScored]) => {

  // Top-500 ingredients for scatter (performance)
  ingredientsData = ingr
    .sort((a, b) => b.recipe_count - a.recipe_count)
    .slice(0, 500);

  compoundsList = Object.keys(rec[0]).filter(k => k !== "name" && k !== "category");
  recipesData = rec.map((row, i) => {
    const compounds = {};
    compoundsList.forEach(c => compounds[c] = +row[c]);
    return { id: i, name: row.name, category: row.category, compounds };
  });

  d3.select("#viz-scatter").html("");
  d3.select("#viz-compare-spider").html("");

  initScatter(ingredientsData);
  initSpider(recipesData, compoundsList);
  initLineChart();
  initNetwork();

  // Bubble chart: aggregate recipes_scored by category
  const categoryMap = d3.rollup(
    recScored.filter(d => d.category),
    v => ({
      count:     v.length,
      avgHealth: d3.mean(v, d => d.avgHealth),
      avgMood:   d3.mean(v, d => d.avgMood),
    }),
    d => d.category
  );
  const bubbleData = Array.from(categoryMap, ([category, stats]) => ({ category, ...stats }))
    .filter(d => d.count >= 50)
    .sort((a, b) => b.count - a.count);

  initBubble(bubbleData);

  // Pass full ingredient list (all 9k+) to bar and sankey
  initIngredientBar(ingr);
  initSankey(ingr);

}).catch(err => {
  console.error("Data load failed:", err);
  d3.select("#viz-scatter").html('<span style="color:#E87461;">Data failed to load. Check console.</span>');
});
