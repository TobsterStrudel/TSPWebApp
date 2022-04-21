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
    const map = new Map();

    for(let i = 0; i < points.length; i++){
        map.set(points[i], i);
    }
    var pathIds = [];
    let visited = new Array(points.length).fill(false);
    pathIds.push(1)
    let i = 0;
    while(pathIds.length < points.length){ // O(n)
        visited[i] = true;
        let closest = closestPoint(points[i], points, visited); // O(n)
        pathIds.push(map.get(closest)+1);
        i = map.get(closest);
    }
    pathIds.push(1);
    console.log("pathIds: " + pathIds);
    document.getElementById("path").innerHTML = "Path: " + pathIds
}