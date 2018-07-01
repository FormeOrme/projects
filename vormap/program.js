var vertices;
var voronoi;
var vcolors;

var cells = new Array();

function setup() {
	var width = 1200;
	var height = 1200;
	// randomly generate vertices
		
	var CELL_NUMBER = width*height / 9000;
	
	for (var i = 0; i < CELL_NUMBER; i++) {
		cells.push(new Cell(random(windowWidth), random(windowHeight), random(3, 6)));
	}

	// using d3.js voronoi layout to calculate voronoi polygons

	voronoi = d3.geom.voronoi()
		.clipExtent([
				[0, 0],
				[width, height]
			]);

	/*
	-----------------------
	p5.js code starts here.
	-----------------------
	 */

	createCanvas(width, height);

	ellipseMode(RADIUS);
	
	vcolors = new Array();
	for(var i = 0; i < 6; i++){
		vcolors.push(color(random(100,255), random(100,255), random(100,255)));
	}
	noStroke();
	noFill();
	background(255);
}


var opacity = 0;
function draw() {
	opacity += 0.5;
	background(255);
	
	vertices = cells.map(function(c){
		c.move();
		return( [c.x, c.y] );
	});
	
	// create polygons using d3.js voronoi diagram
	var polygons = voronoi(vertices);

	// draw polygons
	noStroke();
	for (var j = 0; j < polygons.length; j++) {
		var apolygon = polygons[j];
		// pick a random color
		var polyColor = vcolors[j % vcolors.length];
		stroke(polyColor);
		for (var k = 0; k < apolygon.length; k++) {
			var v = apolygon[k];
			line(apolygon.point[0], apolygon.point[1], v[0], v[1]);
		}
	}
}

function Cell(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;

	this.mx = random(-1, 1);
	this.my = random(-1, 1);

	this.decay = random(0, 1);

	this.distanceFromMouse = Math.hypot(this.x - mouseX, this.y - mouseY);

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
		this.distanceFromMouse = Math.hypot(this.x - mouseX, this.y - mouseY);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	voronoi = d3.geom.voronoi()
		.clipExtent([
				[0, 0],
				[width, height]
			]);
}

function mouseWheel(event) {
	for (var i = 0; i < 5; i++) {
		if(event.delta < 0){
			cells.push(new Cell(random(windowWidth), random(windowHeight), random(3, 6)));
		} else if(event.delta > 0 && cells.length > 3){
			cells.pop();
		}
	}
}
