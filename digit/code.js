var NUMBERS_SRT_END = [
	[2, 6, 6, 3, 5, 11, 12, 7, 5, 7, 5, 7, 5, 7, 5, 7, 5, 10, 9, 7, 1, 8, 8, 4],	//0
	[0, 0, 2, 3, 0, 0, 5, 7, 0, 0, 5, 7, 0, 0, 5, 7, 0, 0, 5, 7, 0, 0, 1, 4],    //1
	[2, 6, 6, 3, 1, 8, 12, 7, 2, 6, 9, 7, 5, 11, 8, 4, 5, 10, 6, 3, 1, 8, 8, 4],	//2
	[2, 6, 6, 3, 1, 8, 12, 7, 2, 6, 9, 7, 1, 8, 12, 7, 2, 6, 9, 7, 1, 8, 8, 4],	//3
	[2, 3, 2, 3, 5, 7, 5, 7, 5, 10, 9, 7, 1, 8, 12, 7, 0, 0, 5, 7, 0, 0, 1, 4],	//4
	[2, 6, 6, 3, 5, 11, 8, 4, 5, 10, 6, 3, 1, 8, 12, 7, 2, 6, 9, 7, 1, 8, 8, 4],	//5
	[2, 6, 6, 3, 5, 11, 8, 4, 5, 10, 6, 3, 5, 11, 12, 7, 5, 10, 9, 7, 1, 8, 8, 4],	//6
	[2, 6, 6, 3, 1, 8, 12, 7, 0, 0, 5, 7, 0, 0, 5, 7, 0, 0, 5, 7, 0, 0, 1, 4],	//7
	[2, 6, 6, 3, 5, 11, 12, 7, 5, 10, 9, 7, 5, 11, 12, 7, 5, 10, 9, 7, 1, 8, 8, 4],//8
	[2, 6, 6, 3, 5, 11, 12, 7, 5, 10, 9, 7, 1, 8, 12, 7, 0, 0, 5, 7, 0, 0, 1, 4],	//9
]

function Grid(val, posx, posy, rad) {
	this.rad = rad;
	this.val = val;
	this.posx = posx;
	this.posy = posy;

	this.cells = getCellsFromNumber(val, posx, posy, rad);

	this.display = () => this.cells.forEach(c => c.display());

	this.goToNumber = val => this.cells.forEach((c, i) => c.goToStage(NUMBERS_AMP_ROT[val][i]));

	this.update = m => this.cells.forEach(c => c.update(m));
}

function getCellsFromNumber(n, posx, posy, rad) {
	var d = rad * 2;
	var cells = [];
	for (var i = 0; i < NUMBERS_AMP_ROT[n].length; i++) {
		cells[i] = new Cell(
			posx + (i % 4 * d),
			posy + (floor(i / 4) * d),
			rad,
			NUMBERS_AMP_ROT[n][i]);
	}
	return cells;
}


function Cell(posx, posy, rad, stage = 0, type = PIE) {
	this.rad = rad; // Radius
	this.posx = posx;
	this.posy = posy;
	/* START ANGLE */
	this.srtSrt = getAngAmp(stage[0]); // Corner Amplitde
	this.srtEnd = getAngRot(stage[1]); // Corner Rotation
	/* 	NEXT ANGLE */
	this.nxtSrt = this.srtSrt; // Corner Amplitde
	this.nxtEnd = this.srtEnd; // Corner Rotation

	/*TO USE */
	this.angSrt = this.srtSrt; // Corner Amplitde
	this.angEnd = this.srtEnd; // Corner Rotation

	this.type = type;
	this.mill = 0;
	this.id = floor(random(1000));

	this.display = function () {
		// arc(this.posx, this.posy, this.rad + rand, this.rad + rand, this.angSrt, this.angEnd, this.type);

		var rand = -3; // padding
		let _srt = this.angEnd - this.angSrt / 2;
		let _end = this.angEnd + this.angSrt / 2;
		
		for(var i= 10; i > 0; i--){
		fill(0,50+i*7,100+i*10)
		arc(this.posx +i,
			this.posy +i,
			this.rad + rand,
			this.rad + rand,
			_srt,
			_end,
			this.type);
		}

		fill("#FFF")
		arc(this.posx,
			this.posy,
			this.rad + rand,
			this.rad + rand,
			_srt,
			_end,
			this.type);

		// fill(255);
		// text("srtS: " + nf(this.srtSrt, 1, 3), this.posx * 1.8 + 200, this.posy * 1.5 + 10);
		// text("srtE: " + nf(this.srtEnd, 1, 3), this.posx * 1.8 + 200, this.posy * 1.5 + 20);
		// text("nxtS: " + nf(this.nxtSrt, 1, 3), this.posx * 1.8 + 200, this.posy * 1.5 + 30);
		// text("nxtE: " + nf(this.nxtEnd, 1, 3), this.posx * 1.8 + 200, this.posy * 1.5 + 40);
		// text("angS: " + nf(this.angSrt, 1, 3), this.posx * 1.8 + 200, this.posy * 1.5 + 50);
		// text("angE: " + nf(this.angEnd, 1, 3), this.posx * 1.8 + 200, this.posy * 1.5 + 60);
		// text("mill: " + nf(this.mill, 1, 3)    	, this.posx*1.8+200, this.posy* 1.5 + 70 );
	}

	this.goToStage = function (stage) {
		// this.nxtSrt = getAngSrt(stage);
		// this.nxtEnd = getAngEnd(stage);
		this.nxtSrt = getAngAmp(stage[0]);
		this.nxtEnd = getAngRot(stage[1]);

		if (this.nxtEnd - this.srtEnd > PI) {
			this.nxtEnd -= TWO_PI;
		}
	}

	this.update = function (m) {
		this.mill = m;
		this.angSrt = map(m, 0, 1000, this.srtSrt, this.nxtSrt);
		this.angEnd = map(m, 0, 1000, this.srtEnd, this.nxtEnd);
		if (m > 900) {
			this.srtSrt = this.nxtSrt;
			this.srtEnd = this.nxtEnd;
		}
	}
}

var MIN_ANGLE = 0.0001;



var NUMBERS_AMP_ROT = {
	"0":[/* 0 */
		[1, 1], [2, 2], [2, 2], [1, 3],
		[2, 0], [3, 5], [3, 7], [2, 4],
		[2, 0], [2, 4], [2, 0], [2, 4],
		[2, 0], [2, 4], [2, 0], [2, 4],
		[2, 0], [3, 3], [3, 1], [2, 4],
		[1, 7], [2, 6], [2, 6], [1, 5],
	],
	"1":[/* 1 */
		[0, 1], [0, 0], [1, 1], [1, 3],
		[0, 0], [0, 0], [2, 0], [2, 4],
		[0, 0], [0, 0], [2, 0], [2, 4],
		[0, 0], [0, 0], [2, 0], [2, 4],
		[0, 0], [0, 0], [2, 0], [2, 4],
		[0, 7], [0, 0], [1, 7], [1, 5],
	],
	"2":[/* 2 */
		[1, 1], [2, 2], [2, 2], [1, 3],
		[1, 7], [2, 6], [3, 7], [2, 4],
		[1, 1], [2, 2], [3, 1], [2, 4],
		[2, 0], [3, 5], [2, 6], [1, 5],
		[2, 0], [3, 3], [2, 2], [1, 3],
		[1, 7], [2, 6], [2, 6], [1, 5],
	],
	"3":[/* 3 */
		[1, 1], [2, 2], [2, 2], [1, 3],
		[1, 7], [2, 6], [3, 7], [2, 4],
		[1, 1], [2, 2], [3, 1], [2, 4],
		[1, 7], [2, 6], [3, 7], [2, 4],
		[1, 1], [2, 2], [3, 1], [2, 4],
		[1, 7], [2, 6], [2, 6], [1, 5],
	],
	"4":[/* 4 */
		[1, 1], [1, 3], [1, 1], [1, 3],
		[2, 0], [2, 4], [2, 0], [2, 4],
		[2, 0], [3, 3], [3, 1], [2, 4],
		[1, 7], [2, 6], [3, 7], [2, 4],
		[0, 0], [0, 0], [2, 0], [2, 4],
		[0, 7], [0, 0], [1, 7], [1, 5],
	],
	"5":[/* 5 */
		[1, 1], [2, 2], [2, 2], [1, 3],
		[2, 0], [3, 5], [2, 6], [1, 5],
		[2, 0], [3, 3], [2, 2], [1, 3],
		[1, 7], [2, 6], [3, 7], [2, 4],
		[1, 1], [2, 2], [3, 1], [2, 4],
		[1, 7], [2, 6], [2, 6], [1, 5],
	],
	"6":[/* 6 */
		[1, 1], [2, 2], [2, 2], [1, 3],
		[2, 0], [3, 5], [2, 6], [1, 5],
		[2, 0], [3, 3], [2, 2], [1, 3],
		[2, 0], [3, 5], [3, 7], [2, 4],
		[2, 0], [3, 3], [3, 1], [2, 4],
		[1, 7], [2, 6], [2, 6], [1, 5],
	],
	"7":[/* 7 */
		[1, 1], [2, 2], [2, 2], [1, 3],
		[1, 7], [2, 6], [3, 7], [2, 4],
		[0, 0], [0, 0], [2, 0], [2, 4],
		[0, 0], [0, 0], [2, 0], [2, 4],
		[0, 0], [0, 0], [2, 0], [2, 4],
		[0, 7], [0, 0], [1, 7], [1, 5],
	],
	"8":[/* 8 */
		[1, 1], [2, 2], [2, 2], [1, 3],
		[2, 0], [3, 5], [3, 7], [2, 4],
		[2, 0], [3, 3], [3, 1], [2, 4],
		[2, 0], [3, 5], [3, 7], [2, 4],
		[2, 0], [3, 3], [3, 1], [2, 4],
		[1, 7], [2, 6], [2, 6], [1, 5],
	],
	"9":[/* 9 */
		[1, 1], [2, 2], [2, 2], [1, 3],
		[2, 0], [3, 5], [3, 7], [2, 4],
		[2, 0], [3, 3], [3, 1], [2, 4],
		[1, 7], [2, 6], [3, 7], [2, 4],
		[0, 0], [0, 0], [2, 0], [2, 4],
		[0, 7], [0, 0], [1, 7], [1, 5],
	],
	":":[/* 9 */
		[0, 1], [0, 2], [0, 2], [0, 3],
		[0, 0], [1, 1], [1, 3], [0, 4],
		[0, 0], [1, 7], [1, 5], [0, 4],
		[0, 0], [1, 1], [1, 3], [0, 4],
		[0, 0], [1, 7], [1, 5], [0, 4],
		[0, 7], [0, 6], [0, 6], [0, 5],
	]
}


function getAngAmp(stage) {
	switch (stage) {
		case 0: return MIN_ANGLE;
		case 1: return HALF_PI;
		case 2: return PI;
		case 3: return PI + HALF_PI;
	}
}
function getAngRot(stage) {
	switch (stage) {
		case 0: return 0;
		case 1: return HALF_PI / 2;
		case 2: return HALF_PI;
		case 3: return HALF_PI + HALF_PI / 2;
		case 4: return PI;
		case 5: return PI + HALF_PI / 2;
		case 6: return PI + HALF_PI;
		case 7: return PI + HALF_PI + HALF_PI / 2;
	}
}

function getAngSrt(stage) {
	switch (stage) {
		case 0: return 0;
		case 1: return PI + HALF_PI;
		case 2: return 0;
		case 3: return HALF_PI;
		case 4: return PI;
		case 5: return PI + HALF_PI;
		case 6: return 0;
		case 7: return HALF_PI;
		case 8: return PI;
		case 9: return PI + HALF_PI;
		case 10: return 0;
		case 11: return HALF_PI;
		case 12: return PI;
		case 13: return 0;
	}
}
function getAngEnd(stage) {
	switch (stage) {
		case 0: return MIN_ANGLE;
		case 1: return 0;
		case 2: return HALF_PI;
		case 3: return PI;
		case 4: return PI + HALF_PI;
		case 5: return HALF_PI;
		case 6: return PI;
		case 7: return PI + HALF_PI;
		case 8: return 0;
		case 9: return PI;
		case 10: return PI + HALF_PI;
		case 11: return 0;
		case 12: return HALF_PI;
		case 13: return TWO_PI;
	}
}