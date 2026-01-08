export function trimAndFill(s, n, c) {
    return s.length > n ? s.substring(0, n) : s.padEnd(n, c);
}

export function normalize(s) {
    return s?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function strip(s) {
    return normalize(s)?.split("/")[0]?.trim().replace(/\W+/g, "_").toLowerCase();
}

export function tokenize(s) {
    return normalize(s)
        ?.split(/[\W_]+/)
        .flatMap((w) => w.split(/(?=[A-Z])/))
        .filter(Boolean);
}

export function snakeCase(s) {
    return tokenize(s)?.join("_").toLowerCase();
}

export function kebabCase(s) {
    return tokenize(s)?.join("-").toLowerCase();
}

export function camelCase(s) {
    return tokenize(s)
        ?.map((w, i) => (i ? capitalize(w?.toLowerCase()) : w?.toLowerCase()))
        ?.join("");
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function trim(s) {
    return s?.trim?.() ?? s;
}

/**
 * Detects the data format of a string: returns 'json' for valid JSON, 'xml' for valid XML, or '' if neither.
 * @param {string} input - The string to check.
 * @returns {'json'|'xml'|''} The detected format type.
 */
export function detectDataFormat(input) {
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
