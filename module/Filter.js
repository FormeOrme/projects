export function first(o, i) {
    return i === 0;
}

export function last(o, i, a) {
    return i === a.length - 1;
}

export function isTruthyOrZero(o) {
    return o != null && o !== false && o !== "";
}

export function not(f) {
    return function (...a) {
        return !f(...a);
    };
}
