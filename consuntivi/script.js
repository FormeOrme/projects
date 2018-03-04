$(document).on('click', '.clean', function(){
    $('.selected').removeClass('selected');
});

$(document).on('click', '.toggle', function(){
    $('table').toggleClass('column');
});

$(document).on('click', '#commands .close', function(){
    $('#commands').toggleClass('closed');
});

$(document).on('click', 'td[data-day]', function(){
    $(this).toggleClass('selected');
});

$(document).on('click', '.activity', function(e){
    e.stopPropagation();
    $(this).toggleClass('selected');
});

