document.addEventListener('DOMContentLoaded', init, false);

const NS = 'http://www.w3.org/2000/svg';
const CURRENT = {};

function init(){
    // Vanilla js
    var div = document.createElement('div'); 
    var svg = CURRENT.svg = document.createElementNS(NS, 'svg');
    svg.setAttributeNS(null, 'width', '100%');
    svg.setAttributeNS(null, 'height', '100%');
    div.appendChild(svg);

    //<circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"/>

    var circle = CURRENT.circle = createElementNS('circle', {
        cx: 100,
        cy: 100,
        r: 20,
        stroke: 'red',
        fill: 'transparent',
        "stroke-width": "3px"
    })

    svg.append(circle);

    document.body.appendChild(div);
}

function createElementNS(s, p){
    var e = document.createElementNS(NS, s);
    Object.keys(p).map(k=> e.setAttribute(k, p[k]));
    return e;
}