document.addEventListener('DOMContentLoaded', init, false);

function months() {
    return Array.from(Array(12).keys()).map(n => (new Date(CURRENT.year, n, 1)).toLocaleString(CURRENT.locale, { month: 'short' }));
};
function weekdays() {
    return Array.from(Array(7).keys()).map(n => (new Date(2010, 1, n + 1)).toLocaleString(CURRENT.locale, { weekday: "short" }));
};

const CURRENT = {
    locale: "en-us",
    months: months,
    weekdays: weekdays,
    year: 2019,
    template: {}
};
{
    CURRENT.template.row = { nodeName: "div", classList: ["row"] };
    CURRENT.template.col = { nodeName: "div", classList: ["col"] };
}

function createElement(e) {
    let n = document.createElement(e.nodeName);
    n.classList.add(...Array.from(e.classList || []));
    return n;
}

function buildContent() {
    //Array.from(Array(7).keys()).map(j => {
    let content = createElement(CURRENT.template.col);
    content.classList.add("content");

    let head = createElement(CURRENT.template.row);
    head.classList.add("head");

    let dateLabel = createElement(CURRENT.template.col);
    dateLabel.classList.add("dateLabel");
    dateLabel.classList.add("colLeft");
    
    let dateInput = document.createElement("input");
    dateInput.id = "dateInput";
    dateInput.type = "date";
    dateLabel.append(dateInput);
    CURRENT.dateInput = dateInput;

    let months = createElement(CURRENT.template.col);
    months.classList.add("months");
    months.classList.add("colRight");

    Array.from(Array(3).keys()).map((y) => {
        let row = createElement(CURRENT.template.row);
        Array.from(Array(7).keys()).map((x) => {
            let month = createElement(CURRENT.template.col);
            month.classList.add("month");
            row.append(month);
        });
        months.append(row);
    });

    head.append(dateLabel);
    head.append(months);
    
    let body = createElement(CURRENT.template.row);
    let numbers = createElement(CURRENT.template.col);
    numbers.classList.add("numbers");
    numbers.classList.add("colLeft");

    Array.from(Array(7).keys()).map((y) => {
        let row = createElement(CURRENT.template.row);
        Array.from(Array(5).keys()).map((x) => {
            let number = createElement(CURRENT.template.col);
            number.classList.add("number");

            number.innerText = 1 + y + 7*x ;
            if(number.innerText > 31){
                number.innerText = "";
            }

            row.append(number);
        });
        numbers.append(row);
    });

    let weekDays = createElement(CURRENT.template.col);
    weekDays.classList.add("weekDays");
    weekDays.classList.add("colRight");


    let TMP_weekDays = CURRENT.weekdays();
    Array.from(Array(7).keys()).map((y) => {
        let row = createElement(CURRENT.template.row);
        Array.from(Array(7).keys()).map((x) => {
            let weekDay = createElement(CURRENT.template.col);
            weekDay.classList.add("weekDay");
            weekDay.innerText = TMP_weekDays[(x + y)%7];
            if((x + y)%7 == 6){
                weekDay.classList.add("sunday");
            }

            row.append(weekDay);
        });
        weekDays.append(row);
    });

    body.append(numbers);
    body.append(weekDays);

    body.classList.add("body");
    

    content.append(head);
    content.append(body);
    return content;
}

function init() {
    CURRENT.table = document.getElementById('calendarTable');
    CURRENT.table.append(buildContent());
}