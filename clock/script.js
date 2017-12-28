var cx, cy;
var values;

function setup() {
	var myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent('canvasContainer');
	noStroke();
	frameRate(60);
	ellipseMode(RADIUS);

	values = {
		"hrs": {
			radius: 80,
			color: '#FEC309',
			crad: 2,
			cloves: 12
		},
		"min": {
			radius: 90,
			color: '#395574',
			crad: 2,
			cloves: 60
		},
		"sec": {
			radius: 100,
			color: '#14594F',
			crad: 2,
			cloves: 60
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
	var hrs = (now.getHours() % 12) * 60 * 60 * 1000 + min;

	values.sec.val = sec;
	values.min.val = min;
	values.hrs.val = hrs;

    fill('#474D4F');
	noStroke();
    
    for (var t = 0; t < 12; t++) {
        var radius = 1;
        if( t%3==0){
            radius = 2;
        }
        var tx = cx + 100 * cos(map(t, 0, 12, 0, TWO_PI));
        var ty = cy + 100 * sin(map(t, 0, 12, 0, TWO_PI));
        ellipse(tx, ty, radius, radius);
        var tx = cx + 90 * cos(map(t, 0, 12, 0, TWO_PI));
        var ty = cy + 90 * sin(map(t, 0, 12, 0, TWO_PI));
        ellipse(tx, ty, radius, radius);
        var tx = cx + 80 * cos(map(t, 0, 12, 0, TWO_PI));
        var ty = cy + 80 * sin(map(t, 0, 12, 0, TWO_PI));
        ellipse(tx, ty, radius, radius);
    }
    
	Object.keys(values).map(function (v) {
		v = values[v];

		var px = v.cx + v.radius * cos(map(v.val, 0, v.max, -HALF_PI, TWO_PI-HALF_PI));
		var py = v.cy + v.radius * sin(map(v.val, 0, v.max, -HALF_PI, TWO_PI-HALF_PI));
    
        fill(v.color);
        noStroke();
        ellipse(px, py, v.crad*2, v.crad*2);
        
		for (var t = 0; t < v.cloves; t++) {
            var radius = v.crad;
            if(v.cloves > 12 && t%5!=0){
                radius = 1;
            }
			var tx = px + v.radius * cos(map(t, 0, v.cloves, 0, TWO_PI));
			var ty = py + v.radius * sin(map(t, 0, v.cloves, 0, TWO_PI));
			ellipse(tx, ty, radius, radius);
		}

		/*if (!!v.set) {
			values[v.set].cx = px;
			values[v.set].cy = py;
		}*/

		//stroke(v.color);
		//strokeWeight(v.crad);
		//line(v.cx, v.cy, px, py);

		//ellipse(px,  py, v.crad , v.crad );
	});

}