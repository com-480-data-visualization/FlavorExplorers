//data
const healthSorted = ["breast milk", "wild pacific salmon fillet", "arugula spinach", "but avocado", "red swiss chard", "pouch wild caught pink salmon", "handfu spinach", "avocado mexico", "torn kale leaf", "broccoli spear", "halibut filet", "leaf collard green", "thai basil leaf picked stem", "cooled truroot organic sprouted green lentil", "organic flaxseed meal", "tomato lime juice cilantro", "shelled walnut", "dinosaur kale", "alaskan king crab leg", "sashimi grade salmon"]
const moodSorted = ["breast milk", "wild pacific salmon fillet", "goya virgin olive oil", "unfiltered virgin olive oil", "beef liver", "arugula spinach", "but avocado", "red swiss chard", "pouch wild caught pink salmon", "handfu spinach", "avocado mexico", "torn kale leaf", "broccoli spear", "halibut filet", "leaf collard green", "thai basil leaf picked stem", "cooled truroot organic sprouted green lentil", "organic flaxseed meal", "tomato lime juice cilantro", "shelled walnut"]

//config
const color_normal = "black";
const color_intersect = "blue";
const color_highlight = "red";
const opacity_deslected = 0.1;

//text to color functions
function healthColor(d) {
    if(moodSorted.includes(d)){
      return color_intersect;
    }
    return color_normal;
}

function moodColor(d) {
    if(healthSorted.includes(d)){
      return color_intersect;
    }
    return color_normal;
}

//left list
const left = d3.select("#list_left")
  .selectAll("li")
  .data(healthSorted)
  .enter()
  .append("li")
  .text(d => d)
  .attr("data-index", (d, i) => i)
  .style("color", healthColor);

//right list
const right = d3.select("#list_right")
  .selectAll("li")
  .data(moodSorted)
  .enter()
  .append("li")
  .text(d => d)
  .attr("data-index", (d, i) => i)
  .style("color", moodColor);


//set hover events
function register_hover(list, other_list, this_arr, other_arr, this_color, other_color){
  list.on("mouseover", function(event, d) {
      d3.select(this)
        .style("color", color_highlight)
        .style("font-weight", "bold");

      const index_in_list = this_arr.findIndex(e => e == d);
      d3.selectAll(
        list
        .nodes()
        .filter((d, i) => i != index_in_list)
      ).style("opacity", opacity_deslected);

      const index = other_arr.findIndex(e => e == d);
      if(index != -1) {
        d3.select(other_list.nodes()[index])
          .style("color", color_highlight)
      }

      d3.selectAll(
        other_list
        .nodes()
        .filter((d, i) => i != index)
      ).style("opacity", opacity_deslected);

    })
    .on("mouseout", function(event, d) {
      d3.select(this)
        .style("color", this_color(d))
        .style("font-weight", "normal");

      d3.selectAll(list.nodes())
        .style("opacity", 1.0);

      d3.selectAll(other_list.nodes())
        .style("opacity", 1.0);

      const index = other_arr.findIndex(e => e == d);
      if(index != -1) {
        d3.select(other_list.nodes()[index])
          .style("color", other_color)
      }
    });
}

register_hover(left, right, healthSorted, moodSorted, healthColor, moodColor);
register_hover(right, left, moodSorted, healthSorted, moodColor, healthColor);