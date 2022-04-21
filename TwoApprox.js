class TreeNode{
    constructor(value) {
        this.value = value;
        this.children = [];
    }
}
function twoApprox(points){
    const map = new Map();
    const graph = new Map();
    var pathIds = [];
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
        console.log(graph.get(i));
    }
    let x, y;
    let edges = 0;
    let selected = new Array(points.length).fill(false);
    let current = graph.get(0);
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
        console.log(x + " - " + y + " - " + graph.get(x)[y][1]);
        mst.push([x,y]);
        selected[y] = true;
        edges++;
    }
    console.log(mst);

    const root = new TreeNode(mst[0][0]);

}