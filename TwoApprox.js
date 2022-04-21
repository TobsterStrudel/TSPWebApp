function twoApprox(points){
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
            }
        }
        graph.set(i, temp);
        console.log(graph.get(i));
    }

}