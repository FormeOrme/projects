document.addEventListener('DOMContentLoaded', init, false);
const CURRENT = {};
CURRENT.lastHue = Math.floor(Math.random() * 360);

const TEMPLATE = {
    belt: { nodeName: "span", classList: ["block", "belt"] },
    block_row: { nodeName: "div", classList: ["block_row"] },
    spacer: { nodeName: "div", classList: ["spacer"] },
    space: { nodeName: "div", classList: ["space"] },
    splitter: { nodeName: "div", classList: ["splitter"] },
}

function createElement(e) {
    let n = document.createElement(e.nodeName);
    n.classList.add(...Array.from(e.classList || []));
    return n;
}

function init() {
    let startRow = document.getElementById("start");
    startRow.blocks = [];
    startRow.row = 0;
    CURRENT.rows = [
        startRow
    ];

    CURRENT.spacers = [];
    CURRENT.cmd = {
        add: document.querySelector(".block.cmd.add"),
        remove: document.querySelector(".block.cmd.remove")
    }
    CURRENT.cmd.add.addEventListener("click", () => {
        addMainBlock();
    });

    document.addEventListener("click", (e) => {
        if (e.target.matches('.block.belt')) {
            e.target.classList.toggle("selected");
        }

        let selected;
        if ((selected = Array.from(document.querySelectorAll('.block.belt.selected'))).length == 2) {
            let spacer = createElement(TEMPLATE.spacer);
            let splitter = createElement(TEMPLATE.splitter);
            spacer.append(splitter);

            let gdr = gradient([
                { c:selected[0].backgroundc, q:1},
                { c:selected[1].backgroundc, q:1}
            ]);

            let newRow = createElement(TEMPLATE.block_row);
            
            let blockSx = createElement(TEMPLATE.belt);
            blockSx.row = newRow;
            blockSx.style.backgroundImage = gdr;
            
            let blockDx = createElement(TEMPLATE.belt);
            blockDx.style.backgroundImage = gdr;
            blockDx.row = newRow;

            newRow.append(blockSx);
            newRow.append(blockDx);

            selected[0].row.after(spacer);
            spacer.after(newRow);

            selected.map(t => t.classList.remove("selected"));
        }
    });

    CURRENT.colorConstants = document.createElement("style");
    document.head.appendChild(CURRENT.colorConstants);
}

function addMainBlock() {
    let cs = createElement(TEMPLATE.belt);
    cs.style.background = cs.backgroundc = colorHSL();
    CURRENT.rows[0].append(cs);
    cs.row = CURRENT.rows[0];
    cs.column = CURRENT.rows[0].blocks.length;
    CURRENT.rows[0].blocks.push(cs);
}

function colorHSL() {
    let hue = (CURRENT.lastHue + 110) % 360;
    CURRENT.lastHue = hue;
    return `hsl(${hue}, 80%, 50%)`;
}

/* GRADIENT MGMT*/
const TESTC = [
    { c: colorHSL(), q: 1 },
    { c: colorHSL(), q: 2 },
    { c: colorHSL(), q: 3 }
];
//repeating-linear-gradient(45deg, red, red 10px, yellow 10px)
//background-image: linear-gradient(90deg, red 33%, yellow 33%);
// CURRENT.tb.style.backgroundImage = gradient(TESTC);
function gradient(colors) {
    let sum = colors.map(c => c.q).reduce((a, c) => a + c, 0);
    let lpc = 0;
    return colors
        .map(c => { c.pc = (c.q * 100 / sum); return c })
        .reduce((a, c) => {
            a = `${a}${c.c} ${lpc}%,`;
            lpc += c.pc;
            a = `${a}${c.c} ${lpc}%,`;
            return a;
        }, "linear-gradient(90deg,")
        .slice(0, -1) + ")";
}