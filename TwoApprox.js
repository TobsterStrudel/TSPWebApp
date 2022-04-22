let adj;
const path = [];

function twoApprox(points){
    const idsToPointsMap = new Map();
    for(let i = 0; i < points.length; i++){
        idsToPointsMap.set(i, points[i]);
    }

    const graph = createGraph(points);
    let mst = prims(graph);

    adj = Array.from(Array(points.length).fill(0), () => new Array(points.length).fill(0)); //nxn array filled with zeros

    for(let i = 0; i < mst.length; i++){ //building adjacency matrix inside adj
        addEdge(mst[i][0], mst[i][1]) // 0 & 1 represent parent and child respectively
    }
    let visited = new Array(points.length).fill(false);
    dfs(0,visited); //result is stored in path (global variable)
    path.push(1);

    d3.selectAll("line").remove(); //remove any lines made by other functions before printing more
    document.getElementById("path").innerHTML = "Path: " + path;
    for(let i = 0; i < path.length-1; i++){ //send arrows to UI
        makeArrow(idsToPointsMap.get(path[i]-1), idsToPointsMap.get(path[i+1]-1));
    }
}