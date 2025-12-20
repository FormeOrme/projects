export default class Filter {
    static first = (o, i) => i === 0;
    static last = (o, i, a) => i === a.length - 1;
    static isTruthyOrZero = (o) => o != null && o !== false && o !== "";
    static not =
        (f) =>
        (...a) =>
            !f(...a);
}
