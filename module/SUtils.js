export class SUtils {
    static trimAndFill = (s, n, c) => s.length > n ? s.substring(0, n) : s.padEnd(n, c);

    static normalize = (s) => s?.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    static strip = (s) => SUtils.normalize(s)?.split("/")[0]?.trim().replace(/\W+/g, "_").toLowerCase();

    static tokenize = (s) => SUtils.normalize(s)
        ?.split(/[\W_]+/)
        .flatMap(w => w.split(/(?=[A-Z])/))
        .filter(Boolean);

    static snakeCase = (s) => SUtils.tokenize(s)?.join("_").toLowerCase();
    static kebabCase = (s) => SUtils.tokenize(s)?.join("-").toLowerCase();
    static camelCase = (s) => SUtils.tokenize(s)?.map((w, i) => i ? SUtils.capitalize(w) : w)?.join("");

    static capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

    static trim = (s) => s?.trim();
}