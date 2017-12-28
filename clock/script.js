var cx, cy;
var values;

function setup() {
	var myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent('canvasContainer');
	noStroke();
	frameRate(60);
	ellipseMode(RADIUS);

	values = {
		"sec": {
			radius: 100,
			color: '#eeeeee',
			crad: 2,
			cloves: 60
		},
		"min": {
			radius: 90,
			color: '#aaaaaa',
			crad: 2,
			cloves: 60
		},
		"hrs": {
			radius: 80,
			color: '#dddddd',
			crad: 2,
			cloves: 12
		},
	};

	cy = windowHeight / 2;
	cx = windowWidth / 2;

	values.sec.max = 60 * 1000;
	values.sec.cx = cx;
	values.sec.cy = cy;
	values.sec.set = 'min';

	values.min.max = 60 * 60 * 1000;
	values.min.set = 'hrs';
	values.min.cx = cx;
	values.min.cy = cy;

	values.hrs.max = 12 * 60 * 60 * 1000;
	values.hrs.cx = cx;
	values.hrs.cy = cy;

}

function draw() {
	background("#0f1317");

	var now = new Date();

	var millis = now.getMilliseconds();
	var sec = now.getSeconds() * 1000 + millis;
	var min = now.getMinutes() * 60 * 1000 + sec;
	var hrs = (now.getHours()+1 % 12) * 60 * 60 * 1000 + min;

	values.sec.val = sec;
	values.min.val = min;
	values.hrs.val = hrs;

    fill('#ffffff');
    ellipse(cx,  cy, 5, 5 );
    
	Object.keys(values).map(function (v) {
		v = values[v];

		var px = v.cx + v.radius * cos(map(v.val, 0, v.max, -HALF_PI, TWO_PI-HALF_PI));
		var py = v.cy + v.radius * sin(map(v.val, 0, v.max, -HALF_PI, TWO_PI-HALF_PI));

		for (var t = 0; t < v.cloves; t++) {
            radius = 2;
            if(v.cloves > 12 && t%5!=0){
                radius = 1;
            }
			var tx = px + v.radius * cos(map(t, 0, v.cloves, 0, TWO_PI));
			var ty = py + v.radius * sin(map(t, 0, v.cloves, 0, TWO_PI));
			fill(v.color);
			noStroke();
			ellipse(tx, ty, radius, radius);
		}

		/*if (!!v.set) {
			values[v.set].cx = px;
			values[v.set].cy = py;
		}*/

		stroke(v.color);
		strokeWeight(v.crad);
		line(v.cx, v.cy, px, py);

		//ellipse(px,  py, v.crad , v.crad );
	});

}