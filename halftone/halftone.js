var cells = new Array();
var SIDE = 20;
var MIN_COLOR;
var MAX_COLOR;
var COLORS = new Array();

var MIN_STATUS = 0;
var MAX_STATUS = 8;

var C_HEIGTH;
var C_WIDTH;

function setup() {
	var myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent('canvasContainer');
	frameRate(60);
	
	C_HEIGTH = windowHeight/SIDE;
	C_WIDTH = windowWidth/SIDE;
	
	MIN_COLOR = color(random(0, 100), random(0, 100), random(0, 100));
	MAX_COLOR = color(random(100, 255), random(100, 255), random(100, 255));
	for(var y = 0; y < C_HEIGTH; y ++){
		for(var x = 0; x < C_WIDTH; x ++){
			cells.push(new Cell(x, y));
		}
	}
	noStroke();
	for(var s = MIN_STATUS; s < MAX_STATUS; s++){
		var red = map(s, MIN_STATUS, MAX_STATUS, MIN_COLOR._getRed(), MAX_COLOR._getRed());
		var blu = map(s, MIN_STATUS, MAX_STATUS, MIN_COLOR._getBlue(), MAX_COLOR._getBlue());
		var gre = map(s, MIN_STATUS, MAX_STATUS, MIN_COLOR._getGreen(), MAX_COLOR._getGreen());
		COLORS.push(color(red, blu, gre));
	}
}

var tempCell;
function draw() {
	tempCell = JSON.parse(JSON.stringify(cells));
	
	cells.map(function(c){
		c.updateStatus(tempCell);
		c.draw();
	});
}

function Cell(x, y) {
	this.id = x + y*SIDE;
	this.x = x;
	this.y = y;
	this.status = Math.floor(random(MIN_STATUS, MAX_STATUS));
	this.draw = function(){
		fill(COLORS[this.status]);
		rect(this.x*SIDE, this.y*SIDE, SIDE, SIDE)
	}
	
	this.nbrs = getNbrs(x, y);
	
	this.updateStatus = function(cells){
		var statuses = this.nbrs.map(function(n){
			return cells[n].status;
		});
		statuses = statuses.reduce(function(a, b) { return a + b; }, 0);
		
		if(statuses > (MIN_STATUS+MAX_STATUS/2) * 7){
			this.status = Math.min(this.status+2, MAX_STATUS-1);
		} else {
			this.status = Math.max(this.status-1, MIN_STATUS);
		}
	}
}

function getNbrs(x, y){
	nbrs = new Array();
	if(x != 0){
		nbrs.push( x-1 + (y-1) * C_WIDTH );
		nbrs.push( x-1 + y   * C_WIDTH );
		nbrs.push( x-1 + (y+1) * C_WIDTH );
	} else {
		nbrs.push( C_WIDTH-1 + (y-1) * C_WIDTH );
		nbrs.push( C_WIDTH-1 + y   * C_WIDTH );
		nbrs.push( C_WIDTH-1 + (y+1) * C_WIDTH );
	}
	nbrs.push( x + (y-1) * C_WIDTH );
	nbrs.push( x + (y+1) * C_WIDTH );
	if(x != C_WIDTH-1){
		nbrs.push( x+1 + (y-1) * C_WIDTH );
		nbrs.push( x+1 + y   * C_WIDTH );
		nbrs.push( x+1 + (y+1) * C_WIDTH );
	} else {
		nbrs.push( 0 + (y-1) * C_WIDTH );
		nbrs.push( 0 + y   * C_WIDTH );
		nbrs.push( 0 + (y+1) * C_WIDTH );
	}
	return nbrs.filter(function(n){return n >= 0 && n < C_HEIGTH*C_WIDTH});
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}