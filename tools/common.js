/* SHORTHANDS */
const gid = document.getElementById.bind(document);
const gq = document.querySelector.bind(document);
const gqa = document.querySelectorAll.bind(document);

/* STRING TO HSL COLOR */
const toH = (str, l = 72, s = 65, d = 210, k = 6, n = 13) =>
    `hsla(${(Array.from(str).reduce((a, c, i) => a + c.charCodeAt() * n * (k + i), d) % 360)}, ${l}%, ${s}%, 1)`

const UUID = () => self.crypto.randomUUID();

const isHtml = s => s.includes("<") && (!s.includes("{") || (s.includes("{") && (s.indexOf("{") > s.indexOf("<"))))

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
    const node = document.createElement(!!e.type ? e.type : "div");
    !e.id || (node.id = e.id);
    !e.children ||
        e.children.forEach((c) => {
            node[c.class] = createElement(c);
            node.appendChild(node[c.class]);
        });
    !e.innerText || (node.innerText = e.innerText);
    if (!!e.class) {
        Array.isArray(e.class) ? node.classList.add(...e.class) : node.classList.add(...e.class.trim().split(" "))
    }
    !e.attrs || Object.entries(e.attrs).forEach(([k, v]) => node.setAttribute(k, v));
    /* EVENTS */
    if (!!e.events) {
        Object.entries(e.events).forEach(([k, v]) => node.addEventListener(k, (e) => v(e, node), false));
    }
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

function csvJSON(text, quoteChar = '"', delimiter = ',') {
    var rows = text.split("\n");
    var headers = rows[0].split(",");

    const regex = new RegExp(`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`, 'gs');

    const match = line => [...line.matchAll(regex)]
        .map(m => m[2])
        .slice(0, -1);

    var lines = text.split('\n');
    const heads = headers ?? match(lines.shift());
    lines = lines.slice(1);

    return lines.map(line => {
        return match(line).reduce((acc, cur, i) => {
            // replace blank matches with `null`
            const val = cur.length <= 0 ? null : Number(cur) || cur;
            const key = heads[i] ?? `{i}`;
            return { ...acc, [key]: val };
        }, {});
    });
}