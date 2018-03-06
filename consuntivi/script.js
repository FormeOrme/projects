/* COMMANDS SECTION */
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

/* SELECTION */
var selecting = false;
$(document).on('mousedown', '.day:not(.selected)', function(){
    selecting = 'day';
    $(this).addClass('selecting');
});
$(document).on('mouseenter', '.day:not(.selected)', function(){
    if(selecting=='day'){
        $(this).addClass('selecting');
    }
});
$(document).on('mousedown', '.activity', function(e){
    e.stopPropagation();
});
$(document).on('mousedown', '.activity:not(.selected)', function(){
    selecting = 'activity';
    $(this).addClass('selecting');
});
$(document).on('mouseenter', '.activity:not(.selected)', function(){
    if(selecting=='activity'){
        $(this).addClass('selecting');
    }
});

var unselecting = false;
$(document).on('mousedown', '.selected', function(){
    var $this = $(this);
    if($this.is('.day')){
        unselecting = 'day';
    } else if ($this.is('.activity')){
        unselecting = 'activity';
    }
    $this.addClass('unselecting');
});
$(document).on('mouseenter', '.selected', function(){
    var $this = $(this);
    if($this.hasClass(unselecting)){
        $this.addClass('unselecting');
    }
});

$(document).on('mouseup', function(){
    $('.selecting').removeClass('selecting').addClass('selected');
    $('.unselecting').removeClass('selected').removeClass('unselecting');
    unselecting = false;
    selecting = false;
});
