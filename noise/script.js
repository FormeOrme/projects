const { PI, cos, sin, abs, sqrt, pow, floor, round, random, atan2 } = Math;

document.addEventListener('DOMContentLoaded', init, false);

const p_num = 500;

let tick;
let n;
let px;
let py;
let center;

function init(){
    n = new SimplexNoise();
    px = new Float32Array(p_num);
    py = new Float32Array(p_num);
    pxm = new Float32Array(p_num);
    pym = new Float32Array(p_num);
    ps = new Float32Array(p_num);
    let sz = 15;
    
    function setup() {
        tick = 0;
        center = [];
        createCanvas();
        initP();
        draw();
    }

    function initP(){
        for(var i = 0; i < p_num; i++){
            px[i] = Math.random()*canvas.a.width;
            py[i] = Math.random()*canvas.a.height;
            ps[i] = 2 + Math.random()*2;
        }
    }

    function drawp(i){
        ctx.a.save();
        ctx.a.lineWidth = sz;
        ctx.a.strokeStyle = '#FFF';
        ctx.a.beginPath();
        ctx.a.moveTo(px[i]+sz, py[i]+sz);
        ctx.a.lineTo(px[i], py[i]);
        ctx.a.stroke();
        ctx.a.closePath();
        ctx.a.restore();

        //let dx = n.noise2D(px[i] , tick*0.006);
        let dx = n.noise3D(px[i], px[i], tick*0.05);
        //let dy = n.noise2D(py[i] , tick*0.006);
        let dy = n.noise3D(py[i], px[i], tick*0.05);

        px[i] = (px[i]  + 2*dx)%canvas.a.width;
        py[i] = (py[i]  + 2*dy)%canvas.a.height;
    }
    
    function draw() {
        tick++;
        ctx.a.clearRect(0,0,canvas.a.width,canvas.a.height);
        
        //ctx.b.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.b.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.b.fillRect(0,0,canvas.b.width,canvas.b.height);
        
        let i;        
        for (i = 0; i < p_num; i++) {
            drawp(i);
        }

        
        // ctx.b.save();
        // ctx.b.filter = 'blur(8px)';
        // ctx.b.globalCompositeOperation = 'lighten';
        // ctx.b.drawImage(canvas.a, 0, 0);
        // ctx.b.restore();
        
        ctx.b.save();
        ctx.b.globalCompositeOperation = 'lighter';
        ctx.b.drawImage(canvas.a, 0, 0);
        ctx.b.restore();
        
        window.requestAnimationFrame(draw);
    }

    function createCanvas() {
        canvas = {
            a: document.createElement("canvas"),
            b: document.createElement("canvas")
        };
        canvas.b.style = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            filter: blur(5px) contrast(12);
        `;
        document.body.appendChild(canvas.b);
        ctx = {
            a: canvas.a.getContext("2d"),
            b: canvas.b.getContext("2d")
        };
        resize();
    }

    function resize() {
        const { innerWidth, innerHeight } = window;
        
        canvas.a.width = canvas.b.width = innerWidth;
        canvas.a.height = canvas.b.height = innerHeight;
        center.x = 0.5 * innerWidth;
        center.y = 0.5 * innerHeight;
    }
    
    window.addEventListener("load", setup);
    window.addEventListener("resize", resize);
}