function closestPoint(current, points, visited){
    let min = Number.MAX_VALUE;
    let closest;
    for(let i = 0; i < points.length; i++) {
        console.log(i);
        if (squaredDistance(current, points[i]) < min && squaredDistance(current, points[i]) !== 0 && !visited[i]) {
            min = squaredDistance(current, points[i]);
            closest = points[i];
            console.log("8: " + points[i]);
        }
    }
    return closest;
}
function squaredDistance(a, b){
    console.log(a**2+b**2);
    return a**2 + b**2;
}

function nearestNeighbor(points){
    const map = new Map();

    for(let i = 0; i < points.length; i++){
        map.set(points[i], i);
        console.log(points[i]);
    }
    let pathIds = [];
    let visited = new Array(points.length).fill(false);

    let i = 0;
    while(pathIds.length < points.length){ // O(n)
        visited[i] = true;
        console.log("visited[i]: " + visited[i]);
        console.log("points[i]: " + points[i]);
        console.log("i: " + i);
        let closest = closestPoint(points[i], points, visited); // O(n)
        pathIds.push(map.get(closest));
        i = map.get(closest);
    }
    console.log(pathIds);
}