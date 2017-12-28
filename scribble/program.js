var vertices;
var voronoi;
var vcolors;
var vprops;

var cells = new Array();
var scribble;
function setup() {
	scribble = new Scribble();
	
	var width = windowWidth;
	var height = windowHeight;
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
	for(var i = 0; i < 7; i++){
		vcolors.push(color(random(100,255), random(100,255), random(100,255)));
	}
	vprops = [];
	for(var i = 0; i < 10; i++){
		vprops.push( { 'gap': random(10, 20), 'angle': random(0, 360) } );
	}
	strokeWeight( 2 );
}



function draw() {
	background(0);
	vertices = cells.map(function(c){
		c.move();
		return( [c.x, c.y] );
	});
	
	// create polygons using d3.js voronoi diagram
	var polygons = voronoi(vertices);

	// draw polygons
	for (var j = 0; j < polygons.length; j++) {
		var apolygon = polygons[j];
		// pick a random color
		var polyColor = vcolors[j % vcolors.length];
		//var polyColor = vcolors[ Math.floor( (apolygon.point[1]*vcolors.length)/windowHeight ) ];

		var xCoords = [];
		var yCoords = [];
		
		for (var k = 0; k < apolygon.length; k++) {
			var v = apolygon[k];
			xCoords.push(v[0]);
			yCoords.push(v[1]);
		}
		stroke(255);
		var vprop = vprops[j % vprops.length];
		scribble.scribbleFilling( xCoords, yCoords, vprop.gap, vprop.angle );
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
			this.x = windowWidth-1;
		}
		if (this.y < 0) {
			this.y = windowHeight-1;
		}
		if (this.x > windowWidth) {
			this.x = 1;
		}
		if (this.y > windowHeight) {
			this.y = 1;
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
