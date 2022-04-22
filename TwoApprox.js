var adj;
var path = [];

function twoApprox(points){
    const idsToPointsMap = new Map();
    for(let i = 0; i < points.length; i++){
        idsToPointsMap.set(i, points[i]);
    }
    path = [];
    const graph = createGraph(points);
    let mst = prims(graph);

    adj = Array.from(Array(points.length).fill(0), () => new Array(points.length).fill(0));

    for(let i = 0; i < mst.length; i++){
        addEdge(mst[i][0], mst[i][1])
    }
    let visited = new Array(points.length).fill(false);
    dfs(0,visited);
    path.push(1);
    d3.selectAll("line").remove();
    document.getElementById("path").innerHTML = "Path: " + path;
    for(let i = 0; i < path.length-1; i++){
        makeArrow(idsToPointsMap.get(path[i]-1), idsToPointsMap.get(path[i+1]-1));
    }
}