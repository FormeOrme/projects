document.addEventListener('DOMContentLoaded', init, false);

const CURRENT = {};
let tick = 0;

function init(){
    let canvas = CURRENT.canvas = document.createElement("canvas");

    canvas.style = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        filter: blur(2px) contrast(10);
    `;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ctx = CURRENT.ctx = canvas.getContext("2d");

    document.body.appendChild(canvas);

    draw();

    window.addEventListener("resize", resize);
}

function draw(){
    let {ctx, canvas} = CURRENT;
    tick++;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.font = "150px monospace";
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.textAlign = "center";
    ctx.fillText("B L O B", canvas.width/2, (canvas.height/3)*2); 

    ctx.save();

    window.requestAnimationFrame(draw);
}
function resize(){
    CURRENT.canvas.width = window.innerWidth;
    CURRENT.canvas.height = window.innerHeight;
}