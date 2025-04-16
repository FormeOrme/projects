/**
 * Class representing Hamming distance calculations.
 */
class Distance {

    /**
    * Calculate the Hamming distance between two objects with a length property.
    * 
    * @param {string} a - The first object.
    * @param {string} b - The second object.
    * @returns {number} The Hamming distance between the two objects.
    */
    static hamming(a, b) {
        if (a.length !== b.length) {
            throw new Error("Inputs must be of equal length");
        }
        let distance = 0;
        for (let i = a.length - 1; i >= 0; i--) {
            if (a[i] !== b[i]) {
                distance++;
            }
        }
        return distance;
    }

    // https://anhaidgroup.github.io/py_stringmatching/v0.4.x/_modules/py_stringmatching/similarity_measure/bag_distance.html#BagDistance.get_sim_score
}

class BagDistance {

    /**
     * Computes the bag distance between two objects.
     *
     * @param {Object} obj1 - The first input object.
     * @param {Object} obj2 - The second input object.
     * @returns {number} The bag distance.
     * @throws {TypeError} If the inputs are not strings.
     */
    static getRawScore(obj1, obj2) {
        if (typeof obj1 !== typeof obj2) {
            throw new TypeError('Inputs of different types are not supported.');
        }
        if (obj1 === obj2) {
            return 0;
        }

        const getCount = typeof obj1 === 'string' ? BagDistance.getCharCount : BagDistance.getFieldCount;
        const bag1 = getCount(obj1);
        const bag2 = getCount(obj2);

        const size1 = BagDistance.getDifferenceSize(bag1, bag2);
        const size2 = BagDistance.getDifferenceSize(bag2, bag1);

        return Math.max(size1, size2);
    }

    /**
     * Computes the normalized bag similarity between two Objects.
     * 
     * @param {Object} obj1 - The first input object.
     * @param {Object} obj2 - The second input object.
     * @returns {number} The normalized bag similarity.
     * @throws {TypeError} If the inputs are not strings.
     */
    static getSimScore(obj1, obj2) {
        const rawScore = BagDistance.getRawScore(obj1, obj2);
        const obj1Len = typeof obj1 === 'string' ? obj1.length : Object.keys(obj1).length;
        const obj2Len = typeof obj2 === 'string' ? obj2.length : Object.keys(obj2).length;
        if (obj1Len === 0 && obj2Len === 0) {
            return 1.0;
        }
        return 1 - (rawScore / Math.max(obj1Len, obj2Len));
    }

    /**
     * Helper function to count the occurrences of each character in a string.
     *
     * @param {string} str - The input string.
     * @returns {Map} A map of character counts.
     */
    static getCharCount(str) {
        const charCount = new Map();
        for (const char of str) {
            charCount.set(char, (charCount.get(char) || 0) + 1);
        }
        return charCount;
    }

    /**
     * Helper function to count the occurrences of each field in an object.
     * 
     * @param {Object} obj - The input object.
     * @returns {Map} A map of field counts.
     */
    static getFieldCount(obj) {
        const fieldCount = new Map();
        for (const field in obj) {
            const value = typeof obj[field] === 'number' ? obj[field] : 1;
            fieldCount.set(field, (fieldCount.get(field) || 0) + value);
        }
        return fieldCount;
    }

    /**
     * Helper function to calculate the size of the difference between two bags.
     *
     * @param {Map} bag1 - The first bag of character counts.
     * @param {Map} bag2 - The second bag of character counts.
     * @returns {number} The size of the difference.
     */
    static getDifferenceSize(bag1, bag2) {
        let size = 0;
        for (const [char, count] of bag1) {
            if (!bag2.has(char)) {
                size += count;
            } else if (count > bag2.get(char)) {
                size += (count - bag2.get(char));
            }
        }
        return size;
    }
}