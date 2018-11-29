const C_MONTHS = ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC'];
const C_DOW = ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'];

const CURRENT = {};
const MONTH_VIEWS = {};

function initCalendar() {
    document.addEventListener('click', function (e) {
        if (e.target.matches('#prev')) {
            let tempView = CURRENT.view.getPrevious();
            CURRENT.view.cells.before(tempView.cells);
            void CURRENT.view.cells.offsetWidth;
            CURRENT.view.cells.classList.remove('open');
            tempView.cells.classList.add('open');
            CURRENT.view = tempView;
        }
        if (e.target.matches('#next')) {
            let tempView = CURRENT.view.getNext();
            CURRENT.view.cells.after(tempView.cells);
            void CURRENT.view.cells.offsetWidth;
            CURRENT.view.cells.classList.remove('open');
            CURRENT.view = tempView;
            tempView.cells.classList.add('open');
        }
    });

    const headers = templateHeaders();
    const table = document.getElementById("table");
    table.append(headers);
    CURRENT.view = new MonthView();
    CURRENT.view.cells.classList.add('open');
    headers.after(CURRENT.view.cells);
}

function templateMonth(month, year) {
    const cells = document.createElement("div");
    //cells.id = id;
    cells.classList.add("cells");
    cells.dataset.month = month;
    cells.dataset.monthName = C_MONTHS[month];
    cells.dataset.year = year;

    const label = document.createElement("span");
    label.classList.add('label');
    label.dataset.monthName = C_MONTHS[month];
    label.dataset.year = year;

    cells.append(label);

    let day = 1;
    let date = new Date(year, month, day, 0, 0, 0, 0);
    let row = templateRow();
    let offset = templateDay();
    if(date.getDay()!=1){
        offset.classList.add("w" + (date.getDay()+6)%7 );
        offset.classList.add("offset");
        row.append(offset);
    }
    while (date.getMonth() == month) {
        row.append(templateDay(date));
        if (date.getDay() == 0) {
            cells.append(row);
            row = templateRow();
        }
        day++;
        date = new Date(year, month, day, 0, 0, 0, 0);
    }
    if(date.getDay()!=1){
        offset = templateDay();
        let w = (6-(date.getDay()+5)%7);
        offset.classList.add("w" + w);
        offset.classList.add("offset");
        if(w>=2){
            offset.classList.add("weekend");
        }
        row.append(offset);
    }

    cells.append(row);
    return cells;
}
function templateRow() {
    let row = document.createElement('div');
    row.classList.add('row');
    return row;
}
function templateDay(date) {
    let day = document.createElement('div');
    day.classList.add('cell');
    if (!!date) {
        day.classList.add('day');
        if(date.getDay() == 0 || date.getDay() == 6){
            day.classList.add('weekend');
        }
        day.dataset.wdn = date.getDay();
        day.dataset.wd = C_DOW[date.getDay()];
        day.dataset.day = date.getDate();
        day.append(templateWrapper());
    }
    return day;
}
function templateWrapper() {
    let wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    return wrapper;
}
function templateHeaders(){
    let headers = document.createElement('div');
    headers.id = 'headers';
    let row = templateRow();
    for(let i = 0; i < C_DOW.length;i++){
        let header = document.createElement('div');
        header.classList.add('header');
        let dayname = document.createElement('span');
        dayname.classList.add('dayname');
        dayname.innerHTML = C_DOW[(i+1)%7];
        header.append(dayname);
        if((i+1)%7 == 6 || (i+1)%7 == 0){
            header.classList.add('weekend');
        }
        row.append(header);
    }
    headers.append(row);
    return headers;
}
function templateActivity(hours_, desc_){
    //<span class="activity"><span class="hours"></span><span class="desc"></span></span>
    let activity = document.createElement('span');
    activity.classList.add('activity');
    let hours = document.createElement('span');
    hours.classList.add('hours');
    hours.innerHTML = hours_;
    let desc = document.createElement('span');
    desc.classList.add('desc');
    desc.innerHTML = desc_;

    activity.append(hours);
    activity.append(desc);
    return activity;
}

function getId(year, month) {
    return `cells_${year}_${month}`;
}

class MonthView {
    constructor(month = (new Date()).getMonth(), year = (new Date()).getFullYear()) {
        this.month = month;
        this.year = year;
        this.cells = templateMonth(month, year);

        if(!MONTH_VIEWS[year]){
            MONTH_VIEWS[year] = {};
        }
        MONTH_VIEWS[year][month] = this;
    }

    getId() {
        return getId(this.year, this.month);
    }

    getPrevious() {
        let n_month = this.month - 1;
        let n_year = this.year;
        if (n_month < 0) {
            n_month = 11;
            n_year--;
        }
        
        if(!!MONTH_VIEWS[n_year] && !!MONTH_VIEWS[n_year][n_month]){
            return MONTH_VIEWS[n_year][n_month];
        }
        return new MonthView(n_month, n_year);
    }

    getNext() {        
        let n_month = this.month + 1;
        let n_year = this.year;
        if (n_month > 11) {
            n_month = 0;
            n_year++;
        }
        
        if(!!MONTH_VIEWS[n_year] && !!MONTH_VIEWS[n_year][n_month]){
            return MONTH_VIEWS[n_year][n_month];
        }
        return new MonthView(n_month, n_year);
    }
}