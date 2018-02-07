var $skin;

$(document).ready(function(){
    $skin = $('#skin');
    
    $('.face').map(function(i, o){
        $(o).css("background-image", "url("+$skin.attr('src')+")");
    });
    
    //sheet.insertRule( '.face{ background-image: url('+$skin.attr('src')+') }' );
    //sheet.addRule( '.face', 'background-image: url('+$skin.attr('src')+')');
})