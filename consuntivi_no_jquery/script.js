document.addEventListener('DOMContentLoaded', init, false);

/* FUNCTIONS */
function removeClass(e, className) {
    e.classList.remove(className);
}
function toggleClass(e, className) {
    e.classList.toggle(className);
}
function addClass(e, className) {
    e.classList.add(className);
}

/* INITIALIZATION */
function init() {
    initCommands();
    initSelection();
    initCalendar();
}

function initCommands() {
    const commands = document.getElementById('commands');
    const table = document.getElementById('table');

    /* COMMANDS SECTION */
    document.addEventListener('click', function (e) {
        if (e.target.matches('#commands .close')) {
            commands.classList.toggle('closed');
        }
        if (e.target.matches('#commands .clean')) {
            document.querySelectorAll('.selected').forEach(x => removeClass(x, "selected"));
            document.querySelectorAll('.selecting').forEach(x => removeClass(x, "selecting"));
        }
        if (e.target.matches('#commands .toggle_view')) {
            table.classList.toggle('column');
            document.querySelector('#commands .toggle_empty').classList.toggle('hidden');
        }
        if (e.target.matches('#commands .toggle_empty')) {
            table.classList.toggle('hide-empty');
        }
        if (e.target.matches('#commands .toggle_weekend')) {
            document.querySelectorAll('.weekend.selected').forEach(x => removeClass(x, "selected"));
            table.classList.toggle('hide-weekend');
        }
    });
}

function initSelection() {
    var selecting;
    var unselecting;
    document.addEventListener('mousedown', function (e) {
        let target;
        /* SELECTING */
        if (!!(target = e.target.closest('.day:not(.selected)'))) {
            selecting = 'day';
            target.classList.add('selecting');
        }
        if (e.target.matches('.activity:not(.selected)')) {
            selecting = 'activity';
            e.target.classList.add('selecting');
        }
        /* UNSELECTING */
        if (!!(target = e.target.closest('.selected'))) {
            if (target.classList.contains('day')) {
                unselecting = 'day';
            } else if (target.classList.contains('activity')) {
                unselecting = 'activity';
            }
            target.classList.add('unselecting');
        }
    });
    document.addEventListener('mouseover', function (e) {
        /* SELECTING */
        if (!!(target = e.target.closest('.day:not(.selected)'))) {
            if (selecting == 'day') {
                target.classList.add('selecting');
            }
        }
        if (e.target.matches('.activity:not(.selected)')) {
            if (selecting == 'activity') {
                e.target.classList.add('selecting');
            }
        }
        /* UNSELECTING */
        if (!!(target = e.target.closest('.selected'))) {
            if (target.classList.contains(unselecting)) {
                target.classList.add('unselecting');
            }
        }
    });
    document.addEventListener('mouseup', function (e) {
        let _selecting = document.querySelectorAll('.selecting');
        let _unselecting = document.querySelectorAll('.unselecting');

        _selecting.forEach(x => removeClass(x, "selecting"));
        _selecting.forEach(x => addClass(x, "selected"));
        _unselecting.forEach(x => removeClass(x, "unselecting"));
        _unselecting.forEach(x => removeClass(x, "selected"));

        selecting = false;
        unselecting = false;
    });
}