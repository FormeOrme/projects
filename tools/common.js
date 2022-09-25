/* STRING TO HSL COLOR */
const toH = (str, l = 72, s = 65, d = 210, k = 6, n = 13) =>
    `hsla(${(Array.from(str).reduce((a, c, i) => a + c.charCodeAt() * n * (k + i), d) % 360)}, ${l}%, ${s}%, 1)`

const UUID = () => self.crypto.randomUUID();

/* ADD STYLE NODE UTIL */
const addStyleNode = (s) => {
    let style = document.createElement('style');
    document.head.appendChild(style);
    style.type = 'text/css';
    style.appendChild(document.createTextNode(s));
}

/* LOCAL STORAGE UTILS */
Storage.prototype.getObject = function (n) { return JSON.parse(this.getItem(n)) }
Storage.prototype.setObject = function (n, v) { this.setItem(n, JSON.stringify(v)) }

/* CREATE DOM ELEMENT */
const createElement = (e) => {
    const node = document.createElement(e.type);
    !e.id || (node.id = e.id);
    !e.children ||
        e.children.forEach((c) => {
            node[c.class] = createElement(c);
            node.appendChild(node[c.class]);
        });
    !e.innerText || (node.innerText = e.innerText);
    !e.class || node.classList.add(...e.class);
    !e.attrs || e.attrs.forEach((a) => node.setAttribute(a[0], a[1]));

    /* EVENTS */
    !e.events || Object.entries(e.events).map(([k, v]) => node.addEventListener(k, (e) => v(e, node), false));

    /* CUSTOM PROPERTIES - OBJECT */
    node.custom = e.custom;

    return node;
}

function shuffleArr(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
}

const getShuffledArr = arr => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
}
