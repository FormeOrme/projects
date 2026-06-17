import { trim } from "./SUtils.js";

const { floor, random } = Math;

export function Identity(o) {
    return o;
}

export function tween(v, r1, r2, m1, m2) {
    return m1 + (m2 - m1) * ((v - r1) / (r2 - r1));
}

/**
 * Rule of three: solves a/b = c/d for the missing value.
 * Pass exactly 3 values and null/undefined for the missing one.
 * @param {Object} params - Object with a, b, c, d properties
 * @returns {number} The calculated missing value
 */
export function rpt({ a, b, c, d }) {
    if (a == null) return (b * c) / d;
    if (b == null) return (a * d) / c;
    if (c == null) return (a * d) / b;
    if (d == null) return (b * c) / a;
    throw new Error("rpt: exactly one parameter must be null or undefined");
}

export function normalize(current, max) {
    return current / max;
}

export function prc(current, max) {
    return normalize(current, max) * 100;
}

export function kvMap(arr, keyFunction, valueFunction) {
    return vkMap(arr, valueFunction, keyFunction);
}

export function vkMap(arr, valueFunction = Identity, keyFunction = ({ id }) => id) {
    return Object.fromEntries(arr.map((c) => [keyFunction(c), valueFunction(c)]));
}

export async function fetchJson({ url, options }) {
    const response = await fetch(url, options);
    const json = await response.json();
    return { url, options, json };
}

export async function fetchAll(objects) {
    const c = await Promise.all(objects.map(fetchJson));
    return vkMap(c, ({ json }) => json);
}

export function clone(o) {
    return Object.setPrototypeOf(structuredClone(o), o.constructor.prototype);
}

export function range(
    n,
    fn = function (_, i) {
        return i;
    },
) {
    return Array.from({ length: n }, fn);
}

export function deduplicate(a) {
    return [...new Set(a)];
}

export function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = floor(random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
    return array;
}

export function shuffleNew(arr) {
    return shuffle([...arr]);
}

export function randomElement(arr) {
    return arr[(random() * arr.length) | 0];
}

export function getLocation() {
    return new URL(window.location.href);
}

export function isPrimitiveOrFalsy(target) {
    return typeof target !== "object" || !Boolean(target);
}

export function deepMerge(target, source) {
    if (isPrimitiveOrFalsy(target) && isPrimitiveOrFalsy(source)) {
        return target;
    }

    for (const key of Object.keys(source)) {
        // throw TypeError if the source and the target are not undefined and have different types
        if (target[key] && typeof target[key] !== typeof source[key]) {
            throw new TypeError(`Cannot merge ${typeof target[key]} with ${typeof source[key]}`);
        }

        if (source[key] && typeof source[key] === "object") {
            if (Array.isArray(source[key])) {
                if (!Array.isArray(target[key])) {
                    target[key] = [];
                }
                target[key] = target[key].concat(source[key]);
            } else {
                target[key] = deepMerge(target[key] || {}, source[key]);
            }
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

export function profile(name, func) {
    if (name) {
        console.profile(name);
    }
    const result = func();
    if (name) {
        console.profileEnd(name);
    }
    return result;
}

/**
 * Converts input to array, trims strings, removes falsy values and whitespace-only strings
 * @param {*} obj - Value to compact (string, array, or any value)
 * @returns {Array} Array with trimmed strings, falsy values removed
 * @example
 * compact("  hello  ")              // ["hello"]
 * compact(["  a  ", "", null, "b"]) // ["a", "b"]
 * compact([[" a "], [" ", "b"]])   // ["a", "b"]
 * compact(undefined)                // []
 */
export function compact(obj) {
    if (obj == null) {
        return [];
    }
    return [].concat(obj).flat(Infinity).map(trim).filter(Boolean);
}

/**
 * Returns a new object containing only the keys present in the mask.
 * Supports nested masks: if a mask value is an object/array, it is applied
 * recursively to the corresponding nested object.
 * Wildcard "*": if a mask key is "*", its sub-mask is applied to every key
 * of the corresponding object in obj.
 * @param {Object} obj - The source object.
 * @param {string[] | Object} msk - An array of keys, or an object whose keys define the mask.
 *   Nested masks: { a: true, b: { x: true } } will include obj.a and only obj.b.x.
 *   Wildcard: { a: { "*": { b: true } } } will include b from every value in obj.a.
 * @returns {Object} A new object with only the masked properties.
 */
export function mask(obj, msk) {
    const result = {};
    const applySubMask = (val, subMask) =>
        subMask && typeof subMask === "object" && val && typeof val === "object"
            ? mask(val, subMask)
            : val;
    if (Array.isArray(msk)) {
        for (let i = 0; i < msk.length; i++) {
            const k = msk[i];
            if (Object.hasOwn(obj, k)) result[k] = obj[k];
        }
        return result;
    }
    for (const k in msk) {
        if (k === "*") {
            const subMask = msk[k];
            for (const ck of Object.keys(obj)) {
                result[ck] = applySubMask(obj[ck], subMask);
            }
            continue;
        }
        if (!Object.hasOwn(obj, k)) continue;
        result[k] = applySubMask(obj[k], msk[k]);
    }
    return result;
}

export function debounce(func, delay = 200) {
    let task = null;
    return (...args) => {
        if (task) clearTimeout(task);
        task = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
