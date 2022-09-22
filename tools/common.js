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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
