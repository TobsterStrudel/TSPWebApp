function christofides(points){
    let mst = prims(createGraph(points));
    console.log(mst);
    let str = "";
    let odd = [];
    for(let i = 0; i < mst.length; i++){
        str += mst[i][0];
        str += mst[i][1];
    }
    for(let i = 0; i < points.length; i++){
        if((str.split(i.toString()).length - 1) % 2 === 1){
            odd.push(i);
        }
    }
    console.log(odd);

}