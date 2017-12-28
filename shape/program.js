var width;
var height;

var arrows;
var ec;

function setup() {
	ec = color(0, 0, 0, 10);

	width = windowWidth;
	height = windowHeight;
	createCanvas(width, height);
	//frameRate(60);
	reset();
}

function reset() {
	arrows = new Array();
	
	var count = width*height * (1/3000);
	
	for (var i = 0; i < count; i++) {
		arrows.push(new Arrow());
	}
}

function draw() {
	background(30);
	ec = color(0, 0, 0, 10);

	noStroke();
	arrows.map(function (a) {
		a.draw();
		a.move();
	});
}

function polygon(x, y, radius, npoints, rad) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = rad; a < TWO_PI+rad; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function Arrow() {
	
	this.mx = random(-1, 1);
	this.my = random(-1, 1);
	this.decay = random(0, 1);
	this.move = function () {
		this.x += this.mx * this.decay;
		this.y += this.my * this.decay;

		if (this.x < 0) {
			this.x = windowWidth;
		}
		if (this.x > windowWidth) {
			this.x = 0;
		}
		if (this.y < 0) {
			this.y = windowHeight;
		}
		if (this.y > windowHeight) {
			this.y = 0;
		}
		this.decay -= 0.01;
		if (this.decay < 0) {
			this.decay = random(0, 1);
			this.mx = random(-1, 1);
			this.my = random(-1, 1);
		}
	}
	
	this.r = random(15, 25);
	
	this.x = random(windowWidth);
	
	this.y = random(windowHeight);
	
	this.p = Math.floor(random(3, 6));
	
	this.c = color(random(100, 255), random(100, 255), random(100, 255), 100);
	
	this.draw = function () {
		var rad = Math.atan2(mouseY - this.y, mouseX - this.x);
		fill(this.c);
		this.c.levels[3] = 255;
		stroke(this.c);
		polygon(this.x , this.y, this.r , this.p, rad)
		
	}
}
