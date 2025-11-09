export default class SUtils {
    static trimAndFill = (s, n, c) => (s.length > n ? s.substring(0, n) : s.padEnd(n, c));

    static normalize = (s) => s?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    static strip = (s) =>
        SUtils.normalize(s)?.split("/")[0]?.trim().replace(/\W+/g, "_").toLowerCase();

    static tokenize = (s) =>
        SUtils.normalize(s)
            ?.split(/[\W_]+/)
            .flatMap((w) => w.split(/(?=[A-Z])/))
            .filter(Boolean);

    static snakeCase = (s) => SUtils.tokenize(s)?.join("_").toLowerCase();
    static kebabCase = (s) => SUtils.tokenize(s)?.join("-").toLowerCase();
    static camelCase = (s) =>
        SUtils.tokenize(s)
            ?.map((w, i) => (i ? SUtils.capitalize(w) : w))
            ?.join("");

    static capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    static trim = (s) => s?.trim?.() ?? s;

    /**
     * Detects the data format of a string: returns 'json' for valid JSON, 'xml' for valid XML, or '' if neither.
     * @param {string} input - The string to check.
     * @returns {'json'|'xml'|''} The detected format type.
     */
    static detectDataFormat(input) {
        if (typeof input !== "string" || !input.trim()) return "";
        // Try JSON
        try {
            JSON.parse(input);
            return "json";
        } catch {}
        // Try XML
        try {
            const doc = new DOMParser().parseFromString(input, "text/xml");
            if (doc.documentElement && doc.documentElement.nodeName !== "parsererror") {
                return "xml";
            }
        } catch {}
        return "";
    }
}
