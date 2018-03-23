var NUMBERS = [
[2,6,6,3, 5,11,12,7, 5,7,5,7, 5,7,5,7, 5,10,9,7, 1,8,8,4],	//0
[0,0,2,3, 0,0,5,7, 0,0,5,7, 0,0,5,7, 0,0,5,7, 0,0,1,4],    //1
[2,6,6,3, 1,8,12,7, 2,6,9,7, 5,11,8,4, 5,10,6,3, 1,8,8,4],	//2
[2,6,6,3, 1,8,12,7, 2,6,9,7, 1,8,12,7, 2,6,9,7, 1,8,8,4],	//3
[2,3,2,3, 5,7,5,7, 5,10,9,7, 1,8,12,7, 0,0,5,7, 0,0,1,4],	//4
[2,6,6,3, 5,11,8,4, 5,10,6,3, 1,8,12,7, 2,6,9,7, 1,8,8,4],	//5
[2,6,6,3, 5,11,8,4, 5,10,6,3, 5,11,12,7, 5,10,9,7, 1,8,8,4],	//6
[2,6,6,3, 1,8,12,7, 0,0,5,7, 0,0,5,7, 0,0,5,7, 0,0,1,4],	//7
[2,6,6,3, 5,11,12,7, 5,10,9,7, 5,11,12,7, 5,10,9,7, 1,8,8,4],//8
[2,6,6,3, 5,11,12,7, 5,10,9,7, 1,8,12,7, 0,0,5,7, 0,0,1,4],	//9
]

function Number(val, posx, posy){
	this.val		= val;
	this.posx		= posx;
	this.posy		= posy;
	
	this.cells = getCellsFromNumber(val, posx, posy);
	
	this.display = function(){
		this.cells.forEach(function(c){
			c.display();
		});
	}
	
	this.goToNumber = function(val){
		var i = 0;
		this.cells.forEach(function(c){
			c.goToStage(NUMBERS[val][i]);
			i++
		});
	}
	this.update = function(m){
		this.cells.forEach(function(c){
			c.update(m);
		});
	}
}

function getCellsFromNumber(n, posx, posy){
	var rad = 25;
	var d = rad*2;
	var cells = [];
	for(var i = 0; i < NUMBERS[n].length; i++){
		cells[i] = new Cell(posx + (i%4 * d), posy + ( floor(i/4) * d ), rad, NUMBERS[n][i]);
	}
	return cells;
}


function Cell(posx, posy, rad, stage = 0, type = PIE){
	this.rad		= rad;
	this.posx		= posx;
	this.posy		= posy;
	this.srtSrt 	= getAngSrt(stage);	//	START ANGLE
	this.srtEnd 	= getAngEnd(stage); //
	this.nxtSrt 	= this.srtSrt;		//	NEXT ANGLE
	this.nxtEnd 	= this.srtEnd;      //
	this.angSrt 	= this.srtSrt;      //	ACTUAL ANGLE = 
	this.angEnd 	= this.srtEnd;      //
	this.type		= type;
	this.mill		= 0;
	this.id = floor(random(1000));
	
	this.display = function(){
		var rand = -10;
		arc(this.posx, this.posy, this.rad +rand, this.rad +rand, this.angSrt, this.angEnd, this.type);
		//fill(255);
		//text("rad_: " + this.rad				, this.posx, this.posy + 100 + 10*1.5);
		//text("posx: " + this.posx				, this.posx, this.posy + 100 + 20*1.5);
		//text("posy: " + this.posy				, this.posx, this.posy + 100 + 30*1.5);
		//text("srtS: " + nf(this.srtSrt, 1, 3)	, this.posx, this.posy + 100 + 40*1.5);
		//text("srtE: " + nf(this.srtEnd, 1, 3)	, this.posx, this.posy + 100 + 50*1.5);
		//text("nxtS: " + nf(this.nxtSrt, 1, 3)	, this.posx, this.posy + 100 + 60*1.5);
		//text("nxtE: " + nf(this.nxtEnd, 1, 3)	, this.posx, this.posy + 100 + 70*1.5);
		//text("angS: " + nf(this.angSrt, 1, 3)	, this.posx, this.posy + 100 + 80*1.5);
		//text("angE: " + nf(this.angEnd, 1, 3)	, this.posx, this.posy + 100 + 90*1.5);
		//text("mill: " + nf(this.mill  , 1, 3)	, this.posx, this.posy + 100 +100*1.5);
	}
	
	this.goToStage = function(stage){
		this.nxtSrt = getAngSrt(stage);
		this.nxtEnd = getAngEnd(stage);
	}
    
	this.update = function(m){
		this.mill = m;
		this.angSrt = map(m, 0, 1000, this.srtSrt, this.nxtSrt);
		this.angEnd = map(m, 0, 1000, this.srtEnd, this.nxtEnd);
		if(m > 900){
			this.srtSrt = this.nxtSrt;
			this.srtEnd = this.nxtEnd;
		}
	}
}

var MIN_ANGLE = 0.00000001;

function getAngSrt(stage){
	switch(stage){
		case 0: 	return 0;
		case 1: 	return PI + HALF_PI;
		case 2: 	return 0;
		case 3: 	return HALF_PI;
		case 4: 	return PI;
		case 5: 	return PI + HALF_PI;
		case 6: 	return 0;
		case 7: 	return HALF_PI;
		case 8: 	return PI;
		case 9: 	return PI + HALF_PI;
		case 10: 	return 0;
		case 11: 	return HALF_PI;
		case 12: 	return PI;
		case 13: 	return 0;
	}
}
function getAngEnd(stage){
	switch(stage){
		case 0: 	return MIN_ANGLE;
		case 1: 	return 0;
		case 2: 	return HALF_PI;
		case 3: 	return PI;
		case 4: 	return PI + HALF_PI;
		case 5: 	return HALF_PI;
		case 6: 	return PI;
		case 7: 	return PI + HALF_PI;
		case 8: 	return 0;
		case 9: 	return PI;
		case 10: 	return PI + HALF_PI;
		case 11: 	return 0;
		case 12: 	return HALF_PI;
		case 13: 	return TWO_PI;
	}
}