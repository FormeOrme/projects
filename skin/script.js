var $skin;

$(document).ready(function(){
    $skin = $('#skin');
    update();
})

function update(){
    //$('.face').map(function(i, o){
    //    $(o).css("background-image", "url("+$skin.attr('src')+")");
    //});
    //sheet.insertRule( '.face{ background-image: url('+$skin.attr('src')+') }' );
    //sheet.addRule( '.face', 'background-image: url('+$skin.attr('src')+')');
    if(!!document.styleSheets[0].addRule){
        document.styleSheets[0].addRule( '.face', 'background-image: url('+$skin.attr('src')+')');
    } else {
        document.styleSheets[0].insertRule( '.face{ background-image: url('+$skin.attr('src')+') }' );
    }
}

var rotate = true;

$(document).on('click', '.toggle', function(){
    var $class = $(this).data('class');
    $('.'+$class).toggle();
})