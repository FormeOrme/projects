import SUtils from "./SUtils.js";

export const Identity = (o) => o;

export class Utils {
    static tween = (v, r1, r2, m1, m2) => m1 + (m2 - m1) * ((v - r1) / (r2 - r1));

    static rpt({ a, b, c, d }) {
        if (!a) return (b * c) / d;
        if (!b) return (a * d) / c;
        if (!c) return (a * d) / b;
        if (!d) return (b * c) / a;
    }

    static normalize = (current, max) => current / max;
    static prc = (current, max) => Utils.normalize(current, max) * 100;

    static kvMap = (arr, k, v) => Utils.vkMap(arr, v, k);
    static vkMap = (arr, v = Identity, k = (o) => o.id) =>
        Object.fromEntries(arr.map((c) => [k(c), v(c)]));

    static fetchJson = ({ url, options }) =>
        fetch(url, options)
            .then((r) => r.json())
            .then((r) => ({ ...o, json: r }));

    static fetchAll = (o) =>
        Promise.all(o.map(Utils.fetchJson)).then((c) => Utils.vkMap(c, (o) => o.json));

    static clone = (o) =>
        Object.setPrototypeOf(JSON.parse(JSON.stringify(o)), o.constructor.prototype);

    static range = (n, fn = (_, i) => i) => Array.from({ length: n }, fn);
    static deduplicate = (a) => [...new Set(a)];
    static shuffle = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var rand = Math.floor(Math.random() * (i + 1));
            [array[i], array[rand]] = [array[rand], array[i]];
        }
        return array;
    };
    static shuffleNew = (arr) => this.shuffle([...arr]);
    static randomElement = (arr) => arr[(Math.random() * arr.length) | 0];
    static chance = (c) => Math.random() * 100 < c;

    static get location() {
        return new URL(window.location.href);
    }

    static isPrimitiveOrFalsy = (target) => typeof target !== "object" || !Boolean(target);

    static deepMerge(target, source) {
        if (Utils.isPrimitiveOrFalsy(target) && Utils.isPrimitiveOrFalsy(source)) {
            return target;
        }

        for (const key of Object.keys(source)) {
            // throw TypeError if the source and the target are not undefined and have different types
            if (target[key] && typeof target[key] !== typeof source[key]) {
                throw new TypeError(
                    `Cannot merge ${typeof target[key]} with ${typeof source[key]}`,
                );
            }

            if (source[key] && typeof source[key] === "object") {
                if (Array.isArray(source[key])) {
                    if (!Array.isArray(target[key])) {
                        target[key] = [];
                    }
                    target[key] = target[key].concat(source[key]);
                } else {
                    target[key] = Utils.deepMerge(target[key] || {}, source[key]);
                }
            } else {
                target[key] = source[key];
            }
        }
        return target;
    }

    static profile = (name, func) => {
        if (name) {
            console.profile(name);
        }
        const result = func();
        if (name) {
            console.profileEnd(name);
        }
        return result;
    };

    static compact = (obj) => [].concat(obj).filter(Boolean).map(SUtils.trim);
}
