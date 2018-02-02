var prodTemp;
var objs = [];

var WIDTH = 16;
var HEIGHT = 5;

$(document).ready(function(){
    prodTemp = $('#templates .product');
    
    var cell = $('#templates .cell');
    for(var i = 0; i < WIDTH*HEIGHT; i++){
        $('#mainBoard').append(cell.clone().attr('id', '_'+i));
    }
    $('#mainBoard .cell').map(function(i, o){
        $(o).addClass('roller');
        var variance = Math.floor(Math.random()*4);
        switch(variance){
            case 1: $(o).addClass('rotate90'); break;
            case 2: $(o).addClass('rotate180'); break;
            case 3: $(o).addClass('rotate270'); break;
        }
    })
});

$(document).on('click', '.cell', function(){
    var p = new Product('computer', $(this).attr('id'));
    objs.push(p);
    p.draw();
});


function Product(type, cell){
    this.id = '_'+Math.floor(Math.random()*0xffffff);
    this.type = type;
    this.scale = (90 + Math.floor(Math.random()*30))/100;
    this.rotat = Math.floor(Math.random()*360);
    this.movx = -3 + Math.floor(Math.random()*7);
    this.movy = -3 + Math.floor(Math.random()*7);
    this.cell = cell;
    this.draw = function(){
        var id = this.id;
        var prod = prodTemp.clone();
        $(prod).find('.aleWrapper').css('transform', 'translate('+this.movx+'px, '+this.movy+'+px) rotate('+this.rotat+'deg) scale('+this.scale+')')
        $(prod).attr('id', '#'+id);
        $(prod).find('.obj').addClass(type);
        
        $('#'+this.cell).find('.prodWrapper').append(prod);
        setInterval(function(){
            this.cell = nextCell(cell);
            $('#'+this.cell).find('.prodWrapper').append(prod);
        },2000);
    };
}

function nextCell(cell){
    var tmp = cell.replace('_', '');
    
}