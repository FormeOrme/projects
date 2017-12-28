var focus = false;

$( document ).hover(
  function() {
	focus = true;
  }, function() {
	focus = false;
  }
);

var cells = new Array();
var closest;

var COLOR_BG;
var COLOR_FG;
function setup() {
	var myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent('canvasContainer');
	frameRate(60);
	ellipseMode(RADIUS);

	//COLOR_BG = color(15, 19, 23, 255);
	//COLOR_FG = color(170, 136, 34, 255);

	COLOR_BG = color(255, 255, 255, 255);
	COLOR_FG = color(255, 0, 0, 255);

	var CELL_NUMBER = ((windowWidth*windowHeight)/100);
	
	for (var i = 0; i < CELL_NUMBER; i++) {
		cells.push(new Cell(random(windowWidth), random(windowHeight), random(3, 6)));
	}
}

function draw() {
	background(COLOR_BG);

	closest = new Array();

	noStroke();
	cells.filter(function (c) {
		return c.distanceFromMouse * (9 - c.radius) < 700;
	}).forEach(function (c) {
		var alpha = map(c.distanceFromMouse * (9 - c.radius), 0, 700, 300, 0);
		var tempC = c.color;
		var clr = color(tempC._getRed(), tempC._getGreen(), tempC._getBlue(), alpha);
		fill(clr);
		ellipse(c.x, c.y, c.radius);
	});

	cells.forEach(function (c) {
		c.move();
	});

	//closest = cells.sort(function (c1, c2) {
	//		return c1.distanceFromMouse - c2.distanceFromMouse;
	//	});
	//closest = closest.slice(0, 5);
	//fill("#0f1317");
	//stroke("#aa8822");
	//closest.forEach(function (l) {
	//	closest.forEach(function (j) {
	//		if (j != l) {
	//			line(j.x, j.y, l.x, l.y);
	//		}
	//	});
	//});
}

function Cell(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;

	this.color = COLOR_FG;
	
	this.mx = random(-1, 1);
	this.my = random(-1, 1);

	this.decay = random(0, 1);

	var posX = focus?mouseX:(windowWidth/2);
	var posY = focus?mouseY:(windowHeight/2);
	this.distanceFromMouse = Math.hypot(this.x - posX, this.y - posY);

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
			
			this.color = COLOR_FG;
			
		}
		var posX = focus?mouseX:(windowWidth/2);
		var posY = focus?mouseY:(windowHeight/2);
		this.distanceFromMouse = Math.hypot(this.x - posX, this.y - posY);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

$(document).ready(function(){
	$('[data-changecolor]').map(function(i, o){
		var temp = $(this).attr("data-changecolor");
		var px = 1;
		$(o).css('text-shadow', px+'px '+px+'px '+temp+', '+px+'px -'+px+'px '+temp+', -'+px+'px -'+px+'px '+temp+', -'+px+'px '+px+'px '+temp);
	});
});

$(document).on('mouseenter mouseleave', '[data-changecolor]', function (e) {
	var temp = $(this).attr("data-changecolor");
	$(this).attr('data-changecolor', COLOR_FG);
	COLOR_FG = color(temp);

});
