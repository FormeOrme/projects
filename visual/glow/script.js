var canvas;

var particles = new Array();
var pNum = 300;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	
	pNum = windowWidth*windowHeight / 5000;
	
	frameRate(60);
	noFill();
	ellipseMode(RADIUS);
	for (var n = 0; n < pNum; n++) {
		particles.push(new Particle());
	}
}

function draw() {
	canvas.clear();
	particles.map(function (p) {
		p.draw();
	});
}

window.onresize = function () {
	canvas.resize(windowWidth, windowHeight);
};

var shapes = ['ellipse', 'cross'];

function cross(x, y, r, a) {
	var dx = r * cos(a); 
	var dy = r * sin(a);
	line(x+dx, y+dy, x-dx, y-dy);
	var dx = r * cos(a+HALF_PI); 
	var dy = r * sin(a+HALF_PI);
	line(x+dx, y+dy, x-dx, y-dy);
}

function Particle() {
	this.cr = random(0, width / 3 * 2); //Distance From Center
	this.pos = random(0, TWO_PI); //Rotation
	this.r = random(10, 20); //Radius
	this.s = random(1, 5); // Speed
	this.d = Math.floor(Math.random() + 0.5) ? -1 : 1; //Direction
	
	this.crPos = random(0, TWO_PI); //Cross Rotation
	this.shape = shapes[Math.floor( Math.random()*shapes.length )]; // Shape

	this.draw = function () {
		/* RIPOSIZIONO */
		this.cr += this.s * 0.4;
		if (this.cr > width / 3 * 2) {
			this.cr = 0;
		}
		this.pos += this.s * this.d * 0.0005;
		this.crPos += this.d * 0.005;

		/* IMPOSTO IL COLORE */
		var tempc = color('#6ECDE4');
		tempc._array[3] = map(this.cr, 0, Math.min(width / 3 * 2, 400), -1, 1);
		stroke(tempc);
		strokeWeight(map(this.r, 10, 20, 2, 5));

		/* DISEGNO */
		switch (this.shape) {
		case 'ellipse':
			var cx = width / 2;
			var cy = height / 2;
			var x = cx + cos(this.pos) * this.cr;
			var y = cy + sin(this.pos) * this.cr;
			ellipse(x, y, this.r, this.r);
			break;
		case 'cross':
			var cx = width / 2;
			var cy = height / 2;
			var x = cx + cos(this.pos) * this.cr;
			var y = cy + sin(this.pos) * this.cr;
			cross(x, y, this.r, this.crPos)
		}
	}
}
