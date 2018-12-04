document.addEventListener('DOMContentLoaded', init, false);

const CURRENT = {};

function init(){
    const body = document.body;
    CURRENT.rotation = {};
    CURRENT.rotation.x = 0;
    CURRENT.rotation.y = 0;
    CURRENT.rotation.z = 0;

    CURRENT.cube = document.getElementById('cube')
}

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
    let x = CURRENT.rotation.x = event.alpha;
    let y = CURRENT.rotation.y = event.beta;
    let z = CURRENT.rotation.z = event.gamma;

    CURRENT.cube.style.transform = `translateZ(-100px) rotateX(${y}deg) rotateZ(${x}deg) rotateY(${z*-1}deg)`;

    document.getElementById('alpha').innerText = x;
    document.getElementById('beta').innerText  = y;
    document.getElementById('gamma').innerText = z;

    document.getElementById('absolute').innerText = CURRENT.cube.style.transform;
}