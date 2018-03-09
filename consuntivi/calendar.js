$(document).ready(function () {
	openMonth();
});

function openMonth(month = (new Date()).getMonth(), year = (new Date()).getFullYear()) {
    $('.cells.open').removeClass('open');
	var id = getId(month, year);
    
    if(!!$('#table').find(id).length){
        $(id).addClass('open');
    } else {
        var $cells = $('#templates .cells').clone();
        
        $cells
            .attr('data-month', month)
            .attr('data-year', year);
            
        var idBefore = getIdBefore(month, year);
        var idAfter = getIdAfter(month, year);
        
        if(!!$(idBefore).length){
            $(idBefore).after($cells);
        } else if(!!$(getIdAfter(month, year)).length){
            $(idAfter).before($cells);
        } else {
            $('.headers').after($cells);
        }
        
        var day = 1;
        var date = new Date(year, month, day, 0, 0, 0, 0);
        while (date.getMonth() == month) {
            var $header = $('.header[data-wdn="' + date.getDay() + '"]');

            $(id + ' .cell[data-wdn="' + date.getDay() + '"][data-wd=""]').first()
            .attr('data-wd', $header.html())
            .attr('data-day', date.getDate())
            .addClass('day');

            if (day == 1) {
                var del = true;
                $(id + ' .cell').map(function (i, $td) {
                    $td = $($td);
                    if (del) {
                        if (!$td.attr('data-wd')) {
                            $td.removeAttr('data-wd');
                        } else {
                            del = false;
                        }
                    }
                });
            }

            day++;
            date = new Date(year, month, day, 0, 0, 0, 0);
        }
        $cells.addClass('open');
    }
}


function getId(month, year){
    return '[data-month="' + month + '"][data-year="' + year + '"]';
}
function getIdAfter(month, year){
    month++;
    if(month>11){
        month = 0;
        year++;
    }
    return getId(month, year);
}
function getIdBefore(month, year){
    month--;
    if(month<0){
        month = 11;
        year--;
    }
    return getId(month, year);
}














