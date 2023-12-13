var $input;
var $output;

$(document).ready(function(){
    $input = $('#input');
    $output = $('#output');
    
    update();
});

var alphabeth = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";

var globReg = new RegExp("["+alphabeth+"]+|[^"+alphabeth+"]+", 'g');
var wordReg = new RegExp("["+alphabeth+"]+", 'g');

function getWord(size){
    var array = words.filter(function(o){return o.length == size;})
    return array[Math.floor(Math.random()*array.length)];
}

function update(){    
    var matches = $input.val().toLowerCase().match(globReg);
    var value = "";
    if(!!matches){
        matches.map(function(o, i){
            if(o.match(wordReg)){
                value += getWord(o.length);
            } else {
                value += o;
            }
        });
    }
    
    $output.html(value);
}

$(document).on('input', '#input', function(){
    update();
});