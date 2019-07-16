document.addEventListener('DOMContentLoaded', init, false);

// ⠁_⠂_⠐_⠈_⠃_⠘_⠉_⠒_⠋_⠓_⠙_⠚_⠛
const NUMS = [
    "⠐⠒⠒⠂"+
    "⠘⠋⠙⠃"+
    "⠘⠃⠘⠃"+
    "⠘⠃⠘⠃"+
    "⠘⠓⠚⠃"+
    "⠈⠉⠉⠁"
];

function init(){
    let counter = 0;

    const digit = buildDigit("digit");
    printDigit(digit, counter);

    document.addEventListener('click', function (e) {
        //counter = ++counter%10;
        counter = ++counter%10;
        printDigit(digit, counter);
    });
}

const printDigit = ( d, count )=>{
    d.forEach((c, i) => {
        c.classList = [];
        c.classList.add("cell");
        c.classList.add(NUMS[count].split()[i]||"X");
    });
}

const buildDigit = (id) => {
    var arr = [];
    var digit = document.getElementById(id);
    for(var r = 0; r < 6; r++){
        var row = document.createElement("span");
        row.classList.add("row");
        for(var c = 0; c < 4; c++){
            var cell = document.createElement("span");
            cell.classList.add("cell");
            row.append(cell);
            arr.push(cell);
        }
        digit.append(row);
    }
    return arr;
}