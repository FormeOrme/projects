const SIZE = 300

const WIDTH = 500
const HEIGHT = 300


var canvas, ctx;

var nbr_map = [];

// ok 0 2 4
// ok 0 2 5

const nbr = (x, y, r) => {
    let arr = [];
    for (let k = -r; k <= r; k++) {
        for (let j = -r; j <= r; j++) {
            arr.push([x + k, y + j]);
        }
    }
    return arr
        .filter(xy => xy[0] >= 0 && xy[0] < canvas.width)
        .filter(xy => xy[1] >= 0 && xy[1] < canvas.height)
}

const nbr_m = (x, y, r) => ([
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
    [x + 1, y + 1],
    [x - 1, y - 1],
    [x - 1, y + 1],
    [x + 1, y - 1],
    [x, y]
]
    //.filter(() => Math.random() > 0.2)
    .filter(xy => xy[0] >= 0 && xy[0] < canvas.width)
    .filter(xy => xy[1] >= 0 && xy[1] < canvas.height)
)

// a:b = c:r
const map = (n, start1, stop1, start2, stop2) => ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2

const ADD = 15

let loop = 0
let diag = 90

const update_nbr_map = (f, n) => {
    nbr_map = []
    for (let x = 0; x < canvas.width; x++) {
        nbr_map[x] = []
        for (let y = 0; y < canvas.height; y++) {
            let c = Math.random() * 255
            let off = (y * id.width + x) * 4
            pixels[off] = c
            pixels[off + 1] = c
            pixels[off + 2] = c
            pixels[off + 3] = 255

            nbr_map[x][y] = f(x, y, n)
        }
    }
}

let id
let pixels

function init() {
    id = ctx.getImageData(0, 0, canvas.width, canvas.height)
    pixels = id.data

    update_nbr_map(nbr_m, 1)

    ctx.putImageData(id, 0, 0)
}

let flip = true

function draw() {
    loop++;
    flip = loop % 150 != 0 ? flip : !flip;

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    let id = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let pixels = id.data

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            let off = (y * id.width + x) * 4
            let avg = 0;
            let t = 0
            nbr_map[x][y].map(xy => {
                //nbr_m(x, y).map(xy => {
                let [x, y] = xy
                avg += pixels[(y * id.width + x) * 4]
                t++
            })
            avg = avg / t;
            let cc = pixels[off]

            if (flip ? avg < 255 / 2 : avg > 255 / 2) {
                //if (avg < 255 / 2) {
                //if ( avg > 255 / 2) {
                //if (avg < 125 + map(x, 0, canvas.width, 0, diag) - map(y, 0, canvas.height, 0, diag)) {
                //if (avg > 125 + map(x, 0, canvas.width, 0, diag) - map(y, 0, canvas.height, 0, diag)) {
                //if (flip ?
                //    avg > 125 + map(x, 0, canvas.width, 0, diag) - map(y, 0, canvas.height, 0, diag)
                //    :
                //    avg < 125 + map(x, 0, canvas.width, 0, diag) - map(y, 0, canvas.height, 0, diag)
                //) {
                cc += ADD
            } else {
                cc -= ADD
            }
            pixels[off] = cc
            pixels[off + 1] = cc
            pixels[off + 2] = cc
            pixels[off + 3] = 255
        }
    }

    ctx.putImageData(id, 0, 0)
    requestAnimationFrame(draw)
}

(function () {
    let container = document.getElementById("container")
    canvas = document.createElement("canvas")

    canvas.addEventListener("mouseenter", () => flip = !flip)
    canvas.addEventListener("mouseleave", () => flip = !flip)

    container.append(canvas)
    ctx = canvas.getContext('2d')
    canvas.width = WIDTH
    canvas.height = HEIGHT
    ctx.lineWidth = 2
    ctx.globalCompositeOperation = "source-over"

    init()
    draw()
})()