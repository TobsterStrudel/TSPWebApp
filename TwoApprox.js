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
function dfs(start, visited){
    path.push(start+1);
    visited[start] = true;

    for(let i = 0; i < adj[start].length; i++){
        if(adj[start][i] === 1 && !visited[i])
            dfs(i, visited);
    }
}
function addEdge(x, y)
{
    adj[x][y] = 1;
    adj[y][x] = 1;
}
function prims(graph){
    let x, y;
    let edges = 0;
    let selected = new Array(points.length).fill(false);
    selected[0] = true;
    let mst = [];
    while(edges < points.length - 1){
        let min = Number.MAX_VALUE; //or I guess it could be 500000 since the window is 500 x 500
        x = 0;
        y = 0;
        for(let i = 0; i < points.length; i++){
            if(selected[i]){
                for(let j = 0; j < points.length; j++){
                    let current = parseInt(graph.get(i)[j][1]);
                    if(!selected[j] && current !== 0){
                        if(current < min){
                            min = current;
                            x = i;
                            y = j;
                        }
                    }
                }
            }
        }
        mst.push([x,y]);
        selected[y] = true;
        edges++;
    }
    return mst;
}
function createGraph(points){
    const graph = new Map();
    for(let i = 0; i < points.length; i++){
        let temp = [];
        for(let j = 0; j < points.length; j++){
            if(i !== j){
                temp.push([j, squaredDistance(points[i], points[j]).toFixed(0)]);
            }else{
                temp.push([j,0]);
            }
        }
        graph.set(i, temp);
    }
    return graph;
}