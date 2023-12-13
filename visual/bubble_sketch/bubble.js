var balls;

var ctx = Sketch.create();

ctx.setup = function () {
	balls = [];
};
ctx.update = function () {
	balls[balls.length] = new Ball(this.mouse.x, this.mouse.y);
	balls.map(function (o) {
		o.update();
	});
    balls = balls.filter(function(ball){
        return ball.dmt > 1;
    });
};
ctx.draw = function () {
	balls.map(function (o) {
		o.draw(ctx);
	});
};

function Ball(posX, posY) {
	this.posX = posX;
	this.posY = posY;
	this.velX = random(0.2, 2);
	this.velY = random(0.2, 2);
	this.molX = random(-1, 1);
	this.molY = random(-1, 1);
	this.dec = random(0.2, 0.4);
	this.dmt = random(20, 30);
	this.colR = 255;
	this.colG = 255;
	this.colB = 255;
	this.update = function () {
		this.posX += this.velX * this.molX;
		this.posY += this.velY * this.molY;
		this.dmt -= this.dec;
	};
	this.draw = function (ctx) {
		ctx.beginPath();
		ctx.arc(this.posX, this.posY, this.dmt, 0, TWO_PI);
		ctx.fillStyle = 'rgba('+this.colR+','+this.colG+','+this.colG+', '+map(this.dmt,0,30, 0, 1)+')';
		ctx.fill();
	}
}

/*
var focus = false;

$( document ).hover(
function() {
focus = true;
}, function() {
focus = false;
}
);

function setup() {
var myCanvas = createCanvas(windowWidth, windowHeight);
myCanvas.parent('canvasContainer');
noStroke();
frameRate(60);
}
var counter = 0;
var balls = [];
function draw() {
counter++;
if(counter > 20){
balls[balls.length] = {
};
}
background("#0f1317");
//background(0,0,0,0);
balls.forEach(function(ball){
fill(ball.colR, ball.colG, ball.colB, map(ball.dmt,0,30, 0, 255));
ellipse(ball.posX, ball.posY, ball.dmt, ball.dmt);
ball.posX += ball.velX * ball.molX;
ball.posY += ball.velY * ball.molY;
ball.dmt -= ball.dec;
});
fill(255);

var posX = focus?mouseX:(windowWidth/2);
var posY = focus?mouseY:(windowHeight/2);

ellipse(posX, posY, 30,30);
balls = balls.filter(function(ball){
return ball.dmt > 1;
});
}

*/
