$(document).ready(function(){
    $('.command.empty').hide();
});

$(document).on('click', '.clean', function(){
    $('.selected').removeClass('selected');
    $('.selecting').removeClass('selecting');
});

$(document).on('click', '.toggle', function(){
    $('table').toggleClass('column');
    $('.command.empty').toggle();
});

$(document).on('click', '.empty', function(){
    $('table').toggleClass('hide-empty');
});

$(document).on('click', '#commands .close', function(){
    $('#commands').toggleClass('closed');
});

$(document).on('click', '.activity', function(e){
    e.stopPropagation();
    $(this).toggleClass('selected');
});

var selecting = false;
$(document).on('mousedown', '.day:not(.selected)', function(){
    selecting = true;
    $(this).addClass('selecting');
});
$(document).on('mouseenter', '.day:not(.selected)', function(){
    if(selecting){
        $(this).addClass('selecting');
    }
});
var unselecting = false;
$(document).on('mousedown', '.selected', function(){
    unselecting = true;
    $(this).addClass('unselecting');
});
$(document).on('mouseenter', '.selected', function(){
    if(unselecting){
        $(this).addClass('unselecting');
    }
});

$(document).on('mouseup', function(){
    $('.selecting').removeClass('selecting').addClass('selected');
    $('.unselecting').removeClass('selected').removeClass('unselecting');
    unselecting = false;
    selecting = false;
});
