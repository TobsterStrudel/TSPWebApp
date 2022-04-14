var svg = d3.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 500)
    .style("border", "1px dashed");
var points;
d3.select("body").insert("div", "svg").append("button").text("Export").on("click", exportGraph);
d3.select("body").insert("div", "svg").append("button").text("Reset").on("click", reset);
function exportGraph() {
    var cxcy = [];
    d3.selectAll("circle").each(function () {
        cxcy.push([d3.select(this).attr("cx"), d3.select(this).attr("cy")]);
    });
    points = cxcy;
}
function reset() {
    d3.selectAll("circle").remove();
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
        prevClickLoc = coords;
        count+=1;
        exportGraph();
    }
}