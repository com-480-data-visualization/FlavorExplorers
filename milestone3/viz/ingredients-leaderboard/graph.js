// const leftData = ["Apple", "Banana", "Cherry"];
// const rightData = ["Red", "Yellow", "Dark Red"];

const color_normal = "black";
const color_intersect = "blue";
const color_highlight = "red";

const healthSorted = ["breast milk", "wild pacific salmon fillet", "arugula spinach", "but avocado", "red swiss chard", "pouch wild caught pink salmon", "handfu spinach", "avocado mexico", "torn kale leaf", "broccoli spear", "halibut filet", "leaf collard green", "thai basil leaf picked stem", "cooled truroot organic sprouted green lentil", "organic flaxseed meal", "tomato lime juice cilantro", "shelled walnut", "dinosaur kale", "alaskan king crab leg", "sashimi grade salmon"]
const moodSorted = ["breast milk", "wild pacific salmon fillet", "goya virgin olive oil", "unfiltered virgin olive oil", "beef liver", "arugula spinach", "but avocado", "red swiss chard", "pouch wild caught pink salmon", "handfu spinach", "avocado mexico", "torn kale leaf", "broccoli spear", "halibut filet", "leaf collard green", "thai basil leaf picked stem", "cooled truroot organic sprouted green lentil", "organic flaxseed meal", "tomato lime juice cilantro", "shelled walnut"]

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

// LEFT LIST
const left = d3.select("#listA")
  .selectAll("li")
  .data(healthSorted)
  .enter()
  .append("li")
  .text(d => d)
  .attr("data-index", (d, i) => i)
  .style("color", healthColor);

// RIGHT LIST
const right = d3.select("#listB")
  .selectAll("li")
  .data(moodSorted)
  .enter()
  .append("li")
  .text(d => d)
  .attr("data-index", (d, i) => i)
  .style("color", moodColor);


// HOVER INTERACTION
left.on("mouseover", function(event, d) {
    // const index = d3.select(this).attr("data-name");

    // highlight left item
    d3.select(this)
      .style("color", color_highlight)
      .style("font-weight", "bold");

    const index = moodSorted.findIndex(e => e == d);
    if(index != -1) {
      // update matching right item
      d3.select(right.nodes()[index])
        .style("color", color_highlight)
        // .text(`Hovered with ${d}`);
    }
  })
  .on("mouseout", function(event, d) {
    // const index = d3.select(this).attr("data-index");

    // reset left
    d3.select(this)
      .style("color", healthColor(d))
      .style("font-weight", "normal");

    const index = moodSorted.findIndex(e => e == d);
    if(index != -1) {
      // update matching right item
      d3.select(right.nodes()[index])
        .style("color", moodColor)
        // .text(`Hovered with ${d}`);
    }
    // // reset right
    // d3.select(right.nodes()[index])
    //   .style("color", moodColor)
    //   // .text(rightData[index]);
  });
