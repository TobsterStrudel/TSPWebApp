
async function nearestNeighbor(points){
    const pointstoIdsMap = new Map();
    const idsToPointsMap = new Map();

    for(let i = 0; i < points.length; i++){
        pointstoIdsMap.set(points[i], i);
    }
    for(let i = 0; i < points.length; i++){
        idsToPointsMap.set(i, points[i]);
    }

    const pathIds = [];
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
        await sleep(900);
    }
}