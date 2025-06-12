import { Identity } from './Utils.js';

/**
 * A utility class for sorting operations.
 * Provides methods for alphabetical sorting, ascending numerical sorting, reversing sort orders, 
 * and multi-level sorting using custom comparator functions.
 */
export class Sort {

    /**
     * Creates a comparator function for alphabetical sorting.
     * 
     * @param {Function} [func=Identity] - A function to extract the value to be compared from each object.
     * @returns {Function} A comparator function for alphabetical sorting.
     */
    static alpha = (func = Identity) => (o1, o2) => (func(o1) ?? '').localeCompare(func(o2) ?? '');

    /**
     * Creates a comparator function for ascending numerical sorting.
     * 
     * @param {Function} [func=Identity] - A function to extract the value to be compared from each object.
     * @returns {Function} A comparator function for ascending numerical sorting.
     */
    static asc = (func = Identity) => (o1, o2) => (func(o1) ?? 0) - (func(o2) ?? 0);

    /**
     * Reverses the order of a given comparator function.
     * 
     * @param {Function} sorting - A comparator function to reverse.
     * @returns {Function} A comparator function with reversed order.
     */
    static reverse = (sorting) => (o1, o2) => sorting(o2, o1);

    /**
     * Creates a comparator function for multi-level sorting.
     * 
     * eg: Sort.multiSort(
     * 	Sort.asc(o => new Date(o.date)),
     * 	Sort.reverse(Sort.alpha(o => o.name)),
     * ) > Sorts by date ascending, then by name descending.
     * 
     * @param {...Function} functions - A list of comparator functions to apply in sequence.
     * @returns {Function} A comparator function for multi-level sorting.
     */
    static multiSort = (...functions) => (a, b) => {
        for (let fn of functions) {
            const result = fn(a, b);
            if (result !== 0) return result;
        }
        return 0;
    };
}