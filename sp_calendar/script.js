document.addEventListener('DOMContentLoaded', init, false);

const LANGS = ["en-en", "it-it"];

function months(year) {
    return Array.from(Array(12).keys()).map(n => (new Date(year, n, 1)));
    /* .toLocaleString(CURRENT.locale, { month: 'short' }) */
};
function weekdays() {
    return Array.from(Array(7).keys()).map(n => (new Date(2010, 1, n + 1)).toLocaleString(CURRENT.locale, { weekday: "short" }));
};

const CURRENT = {
    now : new Date(),
    locale: LANGS[0],
    weekdays: weekdays,
    year: (new Date()).getFullYear(),
    months: ()=>months(CURRENT.year),
    template: {
        row: { nodeName: "div", classList: ["row"] },
        col: { nodeName: "div", classList: ["col"] }
    },
    commands: {}
};


function createElement(e, classList) {
    let n = document.createElement(e.nodeName);
    n.classList.add(...Array.from(e.classList || []));
    n.classList.add(...Array.from(classList || []));
    return n;
}

function append(container, content, varName) {
    if (!!container[varName]) {
        if (!Array.isArray(container[varName])) {
            container[varName] = [container[varName]];
        }
        container[varName].push(content);
    } else {
        container[varName] = content;
    }
    container.append(content);
}

function fillMonths(months){
    months.row.map(r=>{ r.month.map(m=> m.dataset.label="") });
    let rowIndex = Array(7).fill(0);
    CURRENT.months().map(m => {
        let i = (m.getDay()+6) % 7;
        let val = months.row[rowIndex[i]++].month[i];
        val.dataset.label = m.toLocaleString(CURRENT.locale, { month: 'short' });
    });
}
function fillWeekDays(weekDays){
    let TMP_weekDays = CURRENT.weekdays();
    weekDays.row.map((o, y)=>{
        o.weekDay.map((w, x)=>{
            w.dataset.label = TMP_weekDays[(x + y) % 7];
            if ((x + y) % 7 == 6) {
                w.classList.add("sunday");
            }
        })
    });
}

function buildContent() {
    console.log(CURRENT);

    let content = createElement(CURRENT.template.col);
    content.classList.add("content");

    let head = createElement(CURRENT.template.row);
    head.classList.add("head");

    let commands = createElement(CURRENT.template.col, ["commands", "colLeft"]);

    let dateInput = document.createElement("input");
    dateInput.id = "dateInput";
    dateInput.type = "number";
    dateInput.value = CURRENT.year;
    dateInput.classList.add("command");

    CURRENT.commands.dateInput = dateInput;
    append(commands, dateInput, "dateInput");
    
    let langSelect = document.createElement("select");
    langSelect.id = "langSelect";
    langSelect.classList.add("command");
    LANGS.map(l=>{
        let option = document.createElement("option");
        option.value = l;
        option.innerText = l;
        langSelect.append(option);
    });
    langSelect.value = CURRENT.locale;
    langSelect.addEventListener("change", (e)=>{
        CURRENT.locale = e.target.value;
        init();
    })

    CURRENT.commands.langSelect = langSelect;
    append(commands, langSelect, "langSelect");

    let months = createElement(CURRENT.template.col, ["months", "colRight"]);
    Array.from(Array(3).keys()).map((y) => {
        let row = createElement(CURRENT.template.row);
        Array.from(Array(7).keys()).map((x) => {
            let month = createElement(CURRENT.template.col, ["month", "printLabel"]);
            month.addEventListener("click", (e)=>{
                document.querySelectorAll(".month.active").forEach(m=>m.classList.remove("active"));
                e.target.classList.add("active");
            });

            append(row, month, "month");
        });
        append(months, row, "row");
    });

    dateInput.addEventListener("change", (e)=>{
        CURRENT.year = e.target.value*1;
        fillMonths(months);
    })

    fillMonths(months);

    append(head, commands, "commands");
    append(head, months, "months");

    let body = createElement(CURRENT.template.row, ["body"]);
    let numbers = createElement(CURRENT.template.col, ["numbers", "colLeft"]);

    Array.from(Array(7).keys()).map((y) => {
        let row = createElement(CURRENT.template.row);
        row.dataset.row = y;
        Array.from(Array(5).keys()).map((x) => {
            let number = createElement(CURRENT.template.col, ["number", "printLabel"]);
            number.dataset.label = 1 + y + 7 * x;
            number.dataset.row = y;
            if (number.dataset.label > 31) {
                number.dataset.label = "";
            }
            number.addEventListener("click", (e)=>{
                document.querySelectorAll(".number.active").forEach(m=>m.classList.remove("active"));
                e.target.classList.add("active");
            });
            append(row, number, "number");
        });
        append(numbers, row, "row");
    });

    let weekDays = createElement(CURRENT.template.col, ["weekDays", "colRight"]);

    Array.from(Array(7).keys()).map((y) => {
        let row = createElement(CURRENT.template.row);
        row.dataset.row = y;
        Array.from(Array(7).keys()).map((x) => {
            let weekDay = createElement(CURRENT.template.col, ["weekDay", "printLabel"]);
            weekDay.dataset.row = y;
            append(row, weekDay, "weekDay");
        });
        append(weekDays, row, "row");
    });

    fillWeekDays(weekDays);

    append(body, numbers, "numbers");
    append(body, weekDays, "weekDays");

    append(content, head, "head");
    append(content, body, "body");

    return content;
}

function init() {
    CURRENT.table = document.getElementById('calendarTable');
    CURRENT.table.innerHTML = '';
    append(CURRENT.table, buildContent(), "content");
}