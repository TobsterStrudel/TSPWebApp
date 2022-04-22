var svg = d3.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 500)
    .style("border", "1px dashed");
var points;
d3.select("body").insert("div", "svg").append("button").text("Reset").on("click", reset);
d3.select("body").insert("div", "svg").append("button").text("Undo").on("click", undo);
function exportGraph() {
    var cxcy = [];
    d3.selectAll("circle").each(function () {
        cxcy.push([d3.select(this).attr("cx"), d3.select(this).attr("cy")]);
    });
    points = cxcy;
}
function undo(){
    if(count !== 0){
        svg.select("circle").remove();
        svg.select("text").remove();
        count--;
        document.getElementById("pointsCount").innerHTML = "Points: " + count;
    }
}
function reset() {
    d3.selectAll("circle").remove();
    d3.selectAll("text").remove();
    count = 0;
    document.getElementById("pointsCount").innerHTML = "Points: " + count;
    document.getElementById("path").innerHTML = "Path: ";
}
svg.on("click", svgClick);
var prevClickLoc = [0,0];
var count = 0;
// document.getElementById("clicks").innerHTML = count;
function svgClick() {
    d3.event.stopPropagation();
    var coords = d3.mouse(this);
    var x = coords[0];
    var y = coords[1];
    if (x !== prevClickLoc[0] && y !== prevClickLoc[1]){
        svg.append("circle").attr("r", 3)
            .attr("cx", x.toFixed(2))
            .attr("cy", y.toFixed(2))
            .style("fill", "blue")
            .style("stroke", "black")
            .style("stroke-width", "2px");

        svg.append("text")
            .style("fill", "black")
            .style("font-size", "14px")
            .attr("dy", ".35em")
            .attr("x", x+10)
            .attr("y", y-10)
            .style("style", "label")
            .text(count);

        prevClickLoc = coords;
        count++;
        document.getElementById("pointsCount").innerHTML = "Points: " + count;
        exportGraph();
    }
}