var cells = new Array();
var SIDE = 10;
var MIN_COLOR;
var MAX_COLOR;
var COLORS = new Array();

var C_HEIGTH;
var C_WIDTH;

var dA = 1;
var dB = 0.5;
var f = 0.04;
var k = 0.06;

var SIZE = 500;

function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvasContainer');
    frameRate(60);

    C_HEIGTH = Math.ceil(windowHeight / SIDE);
    C_WIDTH = Math.ceil(windowWidth / SIDE); ;

    for (var y = 0; y < C_HEIGTH; y++) {
        for (var x = 0; x < C_WIDTH; x++) {
            cells.push(new Cell(x, y, 1, 0));
        }
    }

    cells.filter(function (f) {
        return f.x >= 10 && f.x < 30;
    }).filter(function (f) {
        return f.y >= 10 && f.y < 30;
    }).map(function (f) {
        f.b = 1
    });

    noStroke();

    MAX_COLOR = color(random(0, 100), random(0, 100), random(0, 100));
    MIN_COLOR = color(random(100, 255), random(100, 255), random(100, 255));

}

function getColor(a, b) {
    var red = map(a, 0, a + b, MIN_COLOR._getRed(), MAX_COLOR._getRed());
    var blu = map(a, 0, a + b, MIN_COLOR._getBlue(), MAX_COLOR._getBlue());
    var gre = map(a, 0, a + b, MIN_COLOR._getGreen(), MAX_COLOR._getGreen());
    return color(red, gre, blu);
}

var oldCells;
function draw() {
    
    oldCells = JSON.parse(JSON.stringify(cells));

    noStroke();
    cells.map(function (c) {
        c.draw();
    });
    cells.map(function (c) {
        c.update(oldCells);
    });
    
    noFill();
    stroke(0);
    text(f, 0,0);
}

function Cell(x, y, a, b) {
    this.x = x;
    this.y = y;

    this.a = a;
    this.b = b;

    this.draw = function () {
        fill(getColor(this.a, this.b));
        rect(this.x * SIDE, this.y * SIDE, SIDE, SIDE);
    }

    this.update = function (old) {
        var c = this.a;
        var d = this.b;
    
        this.a = constrain(c + (dA * laplace(old, x, y, 'a')) - (c * d * d) + (f * (1 - c)), 0, 1);
        this.b = constrain(d + (dB * laplace(old, x, y, 'b')) + (c * d * d) - ((k + f) * d), 0, 1);
    }
}

function laplace(old, x, y, v) {
    var sum = 0;
    sum += getCell(old, x, y, v) * -1;
    sum += getCell(old, x - 1, y, v) * 0.2;
    sum += getCell(old, x + 1, y, v) * 0.2;
    sum += getCell(old, x, y + 1, v) * 0.2;
    sum += getCell(old, x, y - 1, v) * 0.2;
    sum += getCell(old, x - 1, y - 1, v) * 0.05;
    sum += getCell(old, x + 1, y - 1, v) * 0.05;
    sum += getCell(old, x + 1, y + 1, v) * 0.05;
    sum += getCell(old, x - 1, y + 1, v) * 0.05;
    return sum;
}

function getCell(old, x, y, v) {
    x = (x + C_WIDTH) % C_WIDTH;
    y = (y + C_HEIGTH) % C_HEIGTH;
    return old[x + y * C_WIDTH][v];
}
