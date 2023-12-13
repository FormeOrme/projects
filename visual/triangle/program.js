var width;
var height;

var arrows;

var wX;
var wY;

var ec;

function setup() {
	ec = color(0, 0, 0, 10);

	width = windowWidth;
	height = windowHeight;
	createCanvas(width, height);
	frameRate(60);
	reset();
}

function reset() {
	var border = 100;
	arrows = new Array();
	
	var count = width*height * (1/200);
	
	for (var i = 0; i < count; i++) {
		arrows.push(new Arrow());
	}
	wX = random(border, windowWidth - border);
	wY = random(border, windowHeight - border);
}

var time = new Date();
var best = null;

function draw() {
	background(30);
	ec = color(0, 0, 0, 10);

	noStroke();
	arrows.map(function (a) {
		a.draw();
	});
	stroke(30);
	strokeWeight(3);
	fill(255);
	textSize(32);
	diff = new Date() - time;
	text(diff, 10, 30);
	if(best != null){
		text(best, 10, 60);
	}
}

function mouseClicked() {
	if (collidePointCircle(mouseX, mouseY, wX, wY, 50)) {
		ec = color(random(100, 255), random(100, 255), random(100, 255));

		if (best == null || diff < best) {
			best = diff;
		}
		time = new Date();
		reset();
	}
}

function Arrow() {
	this.r = random(5, 5);
	this.x = random(windowWidth);
	this.y = random(windowHeight);
	this.c = color(random(100, 255), random(100, 255), random(100, 255));
	this.draw = function () {
		var rad = Math.atan2(wY - this.y, wX - this.x);
		var x1 = this.x + this.r * Math.cos(rad);
		var y1 = this.y + this.r * Math.sin(rad);
		var x2 = this.x + this.r * Math.cos(rad + TWO_PI / 3);
		var y2 = this.y + this.r * Math.sin(rad + TWO_PI / 3);
		var x3 = this.x + this.r * Math.cos(rad - TWO_PI / 3);
		var y3 = this.y + this.r * Math.sin(rad - TWO_PI / 3);

		fill(this.c);
		triangle(x1, y1, x2, y2, x3, y3);
	}
}
