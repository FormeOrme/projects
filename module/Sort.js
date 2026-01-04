import { Identity } from "/module/Utils.js";

/**
 * Creates a comparator function for alphabetical sorting.
 *
 * @param {Function} [func=Identity] - A function to extract the value to be compared from each object.
 * @returns {Function} A comparator function for alphabetical sorting.
 */
export function alpha(func = Identity) {
    return (o1, o2) => (func(o1) ?? "").localeCompare(func(o2) ?? "");
}

/**
 * Creates a comparator function for ascending numerical sorting.
 *
 * @param {Function} [func=Identity] - A function to extract the value to be compared from each object.
 * @returns {Function} A comparator function for ascending numerical sorting.
 */
export function asc(func = Identity) {
    return (o1, o2) => (func(o1) ?? 0) - (func(o2) ?? 0);
}

/**
 * Reverses the order of a given comparator function.
 *
 * @param {Function} sorting - A comparator function to reverse.
 * @returns {Function} A comparator function with reversed order.
 */
export function reverse(sorting) {
    return (o1, o2) => sorting(o2, o1);
}

/**
 * Creates a comparator function for multi-level sorting.
 * ```
 * // Sort by date ascending, then by name descending.
 * multiSort(
 * 	asc(o => new Date(o.date)),
 * 	reverse(alpha(o => o.name)),
 * )
 * ```
 * @param {...Function} functions - A list of comparator functions to apply in sequence.
 * @returns {Function} A comparator function for multi-level sorting.
 */
export function multiSort(...functions) {
    return (a, b) => {
        for (let fn of functions) {
            const result = fn(a, b);
            if (result !== 0) return result;
        }
        return 0;
    };
}
