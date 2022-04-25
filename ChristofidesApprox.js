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

    const matchTree = minimumWeightMatching(mst, graph, odd);
    console.log(matchTree);
    const eulerTour = eulerianTour(matchTree, graph);
    console.log(eulerTour);

}
function minimumWeightMatching(mst, graph, odd){

    shuffle(odd);

    while(odd.length !== 0){
        let v = odd.pop();

        let length = Number.MAX_VALUE;
        let u = 1;
        let closest = 0;
        for(u in odd){
            if(v !== u && graph.get(v)[u][1] < length){
                length = graph.get(v)[u][1];
                closest = u;
            }
        }
        mst.push([v,parseInt(closest)]);
        odd.slice(closest);
    }
    return mst;

}

















// function eulerianTour(matchTree, graph){
//     let neighbors = [];
//     for (let edge in matchTree){
//         if(!(edge[0] in neighbors)){
//             neighbors[edge[0]] = [];
//         }
//         if(!(edge[1] in neighbors)){
//             neighbors[edge[1]] = [];
//         }
//         neighbors[edge[0]].push(edge[1]);
//         neighbors[edge[1]].push(edge[0]);
//     }
//
//     let start = matchTree[0][0];
//     let EP = [neighbors[start[0]]];
//     let i = 0, v = 0;
//     while(matchTree.length > 0){
//         for([i, v] in EP.entries()){
//             console.log("i: " + i + "\nv: " + v);
//             if(neighbors[v].length > 0){
//                 break;
//             }
//         }
//         while(neighbors[v].length > 0){
//             let w = neighbors[v][0];
//             matchTree.slice([v,w]);
//             console.log(matchTree.length);
//             delete neighbors[v][(neighbors[v].indexOf(w))]
//             delete neighbors[w][(neighbors[w].indexOf(v))]
//             i++;
//             EP.push([i, w]);
//             v = w;
//
//         }
//     }
//     return EP;
// }