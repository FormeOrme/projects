var cells = new Array();
var SIDE = 10;
var MIN_COLOR;
var MAX_COLOR;
var COLORS = new Array();

var C_HEIGTH;
var C_WIDTH;

var dA = 1;
var dB = 0.5;
var feed = 0.055;
var k = 0.062;

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
		return f.x >= 10 && f.x <= 11 && f.y >= 2 && f.y <= 3;
	}).map(function (f) {
		f.b = 1;
	});

	noStroke();

	MIN_COLOR = color(random(0, 100), random(0, 100), random(0, 100));
	MAX_COLOR = color(random(100, 255), random(100, 255), random(100, 255));
}

function getColor(a, b) {
	var red = map(a, 0, a + b, MIN_COLOR._getRed(), MAX_COLOR._getRed());
	var blu = map(a, 0, a + b, MIN_COLOR._getBlue(), MAX_COLOR._getBlue());
	var gre = map(a, 0, a + b, MIN_COLOR._getGreen(), MAX_COLOR._getGreen());

	return color(red, blu, gre);
}

var tempCell;
function draw() {
	tempCell = JSON.parse(JSON.stringify(cells));

	cells.map(function (c) {
		c.update(tempCell);
	});

	cells.map(function (c) {
		c.draw();
	});
}

function Cell(x, y, a, b) {
	this.id = x + y * SIDE;
	this.x = x;
	this.y = y;

	this.a = a;
	this.b = b;

	this.draw = function () {
		fill(getColor(this.a, this.b));
		rect(this.x * SIDE, this.y * SIDE, SIDE, SIDE);
	}

	this.update = function (cells) {
		this.a = constrain(a + (dA * laplace(cells, x, y, 'a')) - (a * b * b) + (feed * (1 - a)), 0, 1);
		this.b = constrain(b + (dB * laplace(cells, x, y, 'b')) + (a * b * b) - ((k + feed) * b), 0, 1);
	}
}

function laplace(cells, x, y, v) {
	var sum = 0;
	var t;
	sum += !!(t = getCell(cells, x, y)) ? t[v] : 0 * -1;
	sum += !!(t = getCell(cells, x - 1, y)) ? t[v] : 0 * 0.2;
	sum += !!(t = getCell(cells, x + 1, y)) ? t[v] : 0 * 0.2;
	sum += !!(t = getCell(cells, x, y + 1)) ? t[v] : 0 * 0.2;
	sum += !!(t = getCell(cells, x, y - 1)) ? t[v] : 0 * 0.2;
	sum += !!(t = getCell(cells, x - 1, y - 1)) ? t[v] : 0 * 0.05;
	sum += !!(t = getCell(cells, x + 1, y - 1)) ? t[v] : 0 * 0.05;
	sum += !!(t = getCell(cells, x + 1, y + 1)) ? t[v] : 0 * 0.05;
	sum += !!(t = getCell(cells, x - 1, y + 1)) ? t[v] : 0 * 0.05;
	return sum;
}
function getCell(cells, x, y) {
	return cells.filter(function (f) {
		return f.x == x && f.y == y
	})[0];
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
