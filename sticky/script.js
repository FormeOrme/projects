/* SETUP */

var wrap = document.getElementsByClassName('wrap-text');
for (var i = 0; i < wrap.length; i++) {
	wrap[i].innerHTML = wrap[i].innerHTML.replace(/(\w+)/g, '<span class="block">$1</span>');
}

/* EVENTS */

var body = document.getElementsByTagName("BODY")[0];
var toggle3D = document.getElementById('toggle3D');
var container = document.getElementById('container');

toggle3D.addEventListener('click', function(){
    body.classList.toggle("active3d");
});

body.addEventListener('mousemove', function(e){
    
});