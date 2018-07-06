var W = 100;

var matrix = Array(W).fill(Array.apply(null, Array(W)).map(Number.prototype.valueOf,0));

function setup() {
    var myCanvas = createCanvas(W, W);
    myCanvas.parent('canvasContainer');
    noStroke();
    frameRate(60);
    noFill();
}

function draw() {
    background("#000");
    
    matrix[floor(random(0,W))][floor(random(0,W))] ++ ;
    
    matrix.map(function(row, y){
        row.map(function(cell, x){
            stroke(cell*3);
            point(x, y);
        });
    });
    
}