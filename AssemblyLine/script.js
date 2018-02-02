

var prodTemp;

$(document).ready(function(){
    prodTemp = $('#templates .product');
    
    var cell = $('#templates .cell');
    for(var i = 0; i < 16*5; i++){
        $('#mainBoard').append(cell.clone());
    }
    
    $('#mainBoard .cell').map(function(i, o){
        $(o).addClass('roller');
    })
});

$(document).on('click', '.cell', function(){
    var prod = prodTemp.clone();
    $(prod).find('.obj').addClass('computer');
    $(this).find('.prodWrapper').append(prod);
});