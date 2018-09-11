function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    //var viewportBottom = viewportTop + $(window).height();
    var viewportBottom = viewportTop + window.innerHeight;

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

// Check if it's time to start the animation.
function checkAnimation() {
    var $elems = $('.animate');
    $elems.map(function(i, o){
        $elem = $(o);
        if (isElementInViewport($elem)) {
            // Start the animation
            $elem.addClass('visible');
        } else {
            $elem.removeClass('visible');
        }
    });
}

// Capture scroll events
$(document).ready(function(){
    checkAnimation();
});
$(window).scroll(function(){
    checkAnimation();
});

