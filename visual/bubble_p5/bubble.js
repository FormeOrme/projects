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
        "posX":focus?mouseX:(windowWidth/2), 
        "posY":focus?mouseY:(windowHeight/2), 
        "velX":random(0.2, 2), 
        "velY":random(0.2, 2),
        "molX":random(-1, 1),
        "molY":random(-1, 1),
        "dec":random(0.2, 0.4),
        "dmt": random(20,30),
        "colR": 255,
        "colG": 255,
        "colB": 255,
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