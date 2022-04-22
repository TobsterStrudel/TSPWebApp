function christofides(points){
    const map = new Map();

    for(let i = 0; i < points.length; i++){
        map.set(i, points[i]);
    }
    const graph = createGraph(points)
    console.log(graph);
    let mst = prims(graph);
    console.log(mst);
    let str = "";
    let odd = [];
    let oddPoints = [];
    for(let i = 0; i < mst.length; i++){
        str += mst[i][0];
        str += mst[i][1];
    }
    for(let i = 0; i < points.length; i++){
        if((str.split(i.toString()).length - 1) % 2 === 1){
            odd.push(i);
            oddPoints.push(map.get(i));
        }
    }
    console.log(odd);
    const oddGraph = createGraph(oddPoints)
    console.log(oddGraph);

}