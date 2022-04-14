function closestPoint(current, points, visited){
    let min = Number.MAX_VALUE;
    let closest;
    for(let i = 0; i < points.size; i++)
    if(squaredDistance(current,points[i]) < min && squaredDistance(current,points[i]) !== 0 && !visited[i]){
        min = squaredDistance(current,points[i]);
        closest = points[i];
    }
    return closest;
}
function squaredDistance(a, b){
    return a**2 + b**2;
}

function nearestNeighbor(points){
    const map = new Map();

    for(let i = 0; i < points.size; i++){
        map.set(points[i], i);
    }
    let pathIds = [];
    let visited = new Array(points.size).fill(false);

    let i = 0;
    while(pathIds.size < points.size){ // O(n)
        visited[i] = true;
        let closest = closestPoint(points[i], points, visited); // O(n)
        pathIds.push(map[closest]);
        i = map[closest];
    }
    console.log(pathIds);
}