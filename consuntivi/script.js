$(document).ready(function(){
    $('.command.empty').hide();
});

$(document).on('click', '.clean', function(){
    $('.selected').removeClass('selected');
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

$(document).on('click', '.day, .activity', function(e){
    e.stopPropagation();
    $(this).toggleClass('selected');
});

