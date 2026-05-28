Promise.all([
  d3.csv("data/ingredients_scored.csv", d => ({
    name:          d.ingredient,
    health:        +d.healthy_score,
    mood:          +d.mood_score,
    category:      d.category || "other",
    recipe_count:  +d.recipe_count,
    dominant_mood: d.dominant_mood || "Unknown",
  })),
  d3.csv("data/recipes_scored.csv", d => ({
    title:        d.recipe_title,
    category:     d.category,
    subcategory:  d.subcategory,
    avgHealth:    +d.avg_healthy,
    avgMood:      +d.avg_mood,
    nIngr:        +d.n_ingredients    || 1,
    nMoodIngr:    +d.n_mood_ingredients || 0,
  })),
]).then(([ingr, recScored]) => {

  initNetwork();

  // ── Recipe scatter: self-contained (data inlined in recipe-scatter.js) ─────
  // initRecipeScatter is NOT called here — graph.js runs on load automatically

  // ── Leaderboard ────────────────────────────────────────────────────────────
  initLeaderboard(ingr);

  // ── Bubble chart: aggregate by category ───────────────────────────────────
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

  // ── Milestone-3 charts (self-contained) ───────────────────────────────────
  initIngredientsHeatmap();
  initCategoryScatter();

  // ── Sankey ────────────────────────────────────────────────────────────────
  initSankey(ingr);

  // ── Scrollytelling ────────────────────────────────────────────────────────
  initScrollytelling(ingr, recScored);

}).catch(err => {
  console.error("Data load failed:", err);
});
