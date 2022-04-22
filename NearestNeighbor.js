function closestPoint(current, points, visited){
    let min = Number.MAX_VALUE;
    let closest;
    for(let i = 0; i < points.length; i++) {
        if (squaredDistance(current, points[i]) < min && squaredDistance(current, points[i]) !== 0 && !visited[i]) {
            min = squaredDistance(current, points[i]);
            closest = points[i];
        }
    }
    return closest;
}
function squaredDistance(a, b){
    return (b[0] - a[0])**2 + (b[1] - a[1])**2

}

function nearestNeighbor(points){
    const pointstoIdsMap = new Map();
    const idsToPointsMap = new Map();

    for(let i = 0; i < points.length; i++){
        pointstoIdsMap.set(points[i], i);
    }
    for(let i = 0; i < points.length; i++){
        idsToPointsMap.set(i, points[i]);
    }
    var pathIds = [];
    let visited = new Array(points.length).fill(false);
    pathIds.push(1)
    let i = 0;
    while(pathIds.length < points.length){ // O(n)
        visited[i] = true;
        let closest = closestPoint(points[i], points, visited); // O(n)
        pathIds.push(pointstoIdsMap.get(closest)+1);
        i = pointstoIdsMap.get(closest);
    }
    pathIds.push(1);
    d3.selectAll("line").remove();
    document.getElementById("path").innerHTML = "Path: " + pathIds
    for(let i = 0; i < pathIds.length-1; i++){
        makeArrow(idsToPointsMap.get(pathIds[i]-1), idsToPointsMap.get(pathIds[i+1]-1));
    }
}
function makeArrow(a, b){
    svg.append("line")
        .attr("x1",a[0])
        .attr("y1",a[1])
        .attr("x2",b[0])
        .attr("y2",b[1])
        .attr("stroke","blue")
        .attr("stroke-width",2)
        .attr("marker-end","url(#arrow)");
}