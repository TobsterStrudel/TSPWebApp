var adj;
var path = [];
function twoApprox(points){
    path = [];
    const map = new Map();
    const graph = new Map();
    for(let i = 0; i < points.length; i++){
        map.set(points[i], i);
    }
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

    adj = Array.from(Array(points.length).fill(0), () => new Array(points.length).fill(0));

    for(let i = 0; i < mst.length; i++){
        addEdge(mst[i][0], mst[i][1])
    }
    let visited = new Array(points.length).fill(false);
    dfs(0,visited);
    path.push(0);
    document.getElementById("path").innerHTML = "Path: " + path;
}
function dfs(start, visited){
    path.push(start);
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