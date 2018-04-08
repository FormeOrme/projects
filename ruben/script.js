var imgs = ["r1.png", "r2.png", "r3.png"];

function getImage(){
    return imgs[Math.floor(Math.random()*imgs.length)];
}

function addSheet(){
    var $sheet = $('#templates .sheet').clone();
    
    $sheet.find('img').attr("src","src/" + getImage());
    
    $('#container').append($sheet);
}
$(document).on('click', 'body', addSheet);