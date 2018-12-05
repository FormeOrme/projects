document.addEventListener('DOMContentLoaded', init, false);

function init(){
    const digit = document.querySelector('.digit');
    let counter = 0;
    document.addEventListener('click', function (e) {
        digit.classList.remove('n'+counter);
        //counter = ++counter%10;
        counter = ++counter%2;
        digit.classList.add('n'+counter);
    });
}