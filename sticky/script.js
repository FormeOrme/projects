var body = document.getElementsByTagName("BODY")[0];
var toggle3D = document.getElementById('toggle3D');

toggle3D.addEventListener('click', function(){
    body.classList.toggle("active3d");
});
