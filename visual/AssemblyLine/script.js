var t_prod;
var objs = {};

var WIDTH = 16;
var HEIGHT = 5;

var types = ["tomato", "orange", "cherry", "strawb", "apple"];

window.addEventListener('load', function () {
    t_prod = document.getElementById('product');
    var t_cell = document.getElementById('cell');
    for (var i = 0; i < WIDTH * HEIGHT; i++) {
        var tmp = document.importNode(t_cell.content, true);
        const cell = tmp.querySelector(".cell");
        cell.id = '_' + i;
        cell.addEventListener("click", c => {
            var p = new Product(types[Math.floor(Math.random() * types.length)], c.id);
            objs[p.id] = p;
            objs[p.id].init();
            objs[p.id].loop();
        })
        document.getElementById('mainBoard').appendChild(tmp);
    }
    Array.from(document.querySelectorAll('#mainBoard .cell')).map(c => {
        c.classList.add("roller")
        c.classList.add(`rotate${Math.floor(Math.random() * 4) * 90 - 90}`)
    })
})

// $(document).on('contextmenu', '.cell', function (e) {
//     e.preventDefault();
// 
//     switch (calcRot($(this).attr('class'))) {
//         case 0:
//             $(this).removeClass('rotate270');
//             break;
//         case 1:
//             $(this).addClass('rotate90');
//             break;
//         case 2:
//             $(this).removeClass('rotate90').addClass('rotate180');
//             break;
//         case 3:
//             $(this).removeClass('rotate180').addClass('rotate270');
//             break;
//     }
// 
// });


function Product(type, cell) {
    this.id = '_' + Math.floor(Math.random() * 0xffffff);
    this.type = type;
    this.scale = (90 + Math.floor(Math.random() * 30)) / 100;
    this.rotat = Math.floor(Math.random() * 360);
    this.movx = -3 + Math.floor(Math.random() * 7);
    this.movy = -3 + Math.floor(Math.random() * 7);
    this.cell = cell;

    this.init = function () {
        var tmp = document.importNode(t_prod.content, true);
        var product = tmp.querySelector(".product");
        product.id = this.id
        tmp.querySelector('.obj').classList.add(this.type);
        tmp.querySelector('.aleWrapper').style.transform =
            `translate(${this.movx}px, ${this.movy}px) 
            rotate(${this.rotat}deg) 
            scale(${this.scale})`;
        this.prod = tmp;
    }

    this.draw = function (id) {
        var p = objs[id];
        if (!!p) {
            $('#' + p.cell).find('.prodWrapper').append(p.prod);
            p.cell = nextCell(p.cell);
        }
        if (!p || !p.cell) {
            $('#' + id).remove();
            if (!!objs[id]) {
                clearInterval(objs[id].interval);
            }
            objs[id] = null;
        } else {
            p.cell = "_" + p.cell;
        }
    }
        ;
    this.loop = function () {
        this.draw(this.id);
        //window.setTimeout(this.draw.bind(null, this.id), 2000);
        this.interval = setInterval(this.draw, 1990, this.id);
    };
}

function nextCell(cellId) {
    var temp = cellId.replace('_', '') * 1;
    if (!$('#' + cellId).attr('class')) { return null }
    var rot = calcRot($('#' + cellId).attr('class'));
    if (temp % WIDTH == 0 && rot == 3) { return null }
    if (temp % WIDTH == WIDTH - 1 && rot == 1) { return null }

    switch (rot) {
        case 0: return temp - WIDTH;
        case 1: return temp + 1;
        case 2: return temp + WIDTH;
        case 3: return temp - 1;
    }
    return null;
}

function calcRot(classes) {
    if (classes.indexOf('rotate90') > 0) { return 2; }
    if (classes.indexOf('rotate180') > 0) { return 3; }
    if (classes.indexOf('rotate270') > 0) { return 0; }
    return 1;
}

