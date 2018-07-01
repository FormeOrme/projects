function hashcode(s) {
	var hash = 0;
	var i;
	var chr;
	if (s.length === 0)
		return hash;
	for (i = 0; i < s.length; i++) {
		chr = s.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

function color(n) {
	var c = ("93e980" + n.toString(16)).slice(-6);
    var col = [0,2,4];
    
    col = col.map(function(o, i){
        var r = parseInt(c.substr(o, 2), 16);
        r = r < 100 ? r + 100 : r;
        return ("AA"+r.toString(16)).slice(-2);
    });

	return col[0]+col[1]+col[2];
}

$(document).on('input', '#string', function () {
	var $string = $(this);
	var $color = color(hashcode($string.val()));
	$('body').css('background', '#' + $color);
	$('#color').html('#' + $color);
});
