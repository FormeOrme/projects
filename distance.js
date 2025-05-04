class Helper {
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
}

class Euclidean {

    /**
     * Calculate the Euclidean distance between two points.
     * 
     * @param {Array<number>} point1 - The first point.
     * @param {Array<number>} point2 - The second point.
     * @returns {number} The Euclidean distance between the two points.
     * */
    static distance(point1, point2) {
        if (point1.length !== point2.length) {
            throw new Error("Points must have the same dimension");
        }
        let sum = 0;
        for (let i = 0; i < point1.length; i++) {
            sum += (point1[i] - point2[i]) ** 2;
        }
        return sum ** 0.5;
    }
}

/**
 * Class representing Hamming distance calculations.
 */
class Hamming {

    /**
    * Calculate the Hamming distance between two arrays.
    * 
    * @param {Array} arr1 - The first arrays.
    * @param {Array} arr2 - The second arrays.
    * @returns {number} The Hamming distance between the two arrays.
    */
    static arrays(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            throw new Error("Inputs must be of equal length");
        }
        let distance = 0;
        for (let i = arr1.length - 1; i >= 0; i--) {
            if (arr1[i] !== arr2[i]) {
                distance++;
            }
        }
        return distance;
    }

    /**
     * Calculate the Hamming distance between two objects.
     * 
     * Missing keys are treated as 0.
     * 
     * @param {Object} obj1 - The first object.
     * @param {Object} obj2 - The second object.
     * @returns {number} The Hamming distance between the two objects.
     * */
    static objects(obj1, obj2) {
        const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
        let distance = 0;
        for (const key of allKeys) {
            const valA = obj1[key] || 0;
            const valB = obj2[key] || 0;
            if (valA !== valB) {
                distance++;
            }
        }
        return distance;
    }

}

/**
 * Class representing Jaccard similarity calculations.
 * 
 * Jaccard similarity is a measure of similarity between two sets.
 * It is defined as the size of the intersection divided by the size of the union of the two sets.
 */
class Jaccard {

    /**
     * Calculate the Jaccard similarity between two sets.
     * 
     * @param {Set} set1 - The first set.
     * @param {Set} set2 - The second set.
     * @returns {number} The Jaccard similarity between the two sets.
     */
    static sets(set1, set2) {
        if (set1.size === 0 && set2.size === 0) {
            return 1.0;
        }

        if (set1.isDisjointFrom(set2)) {
            return 0.0;
        }

        return set1.intersection(set2).size
            / set1.union(set2).size;
    }

    /**
     * Calculate the Jaccard similarity between two maps where each value is a Number
     * 
     * @param {Map} map1 - The first map.
     * @param {Map} map2 - The second map.
     * @returns {number} The Jaccard similarity between the two maps.
     */
    static maps(map1, map2) {
        if (map1.size === 0 && map2.size === 0) {
            return 1.0;
        }

        const values = (map) => {
            const result = new Set();
            for (const [key, value] of map) {
                for (let i = 0; i < value; i++) {
                    result.add(`${key}_${i}`);
                }
            }
            return result;
        };

        const set1 = values(map1);
        const set2 = values(map2);

        return Jaccard.sets(set1, set2);
    }
}

/**
 * Class representing bag distance calculations.
 * 
 * This class provides methods to compute the bag distance and bag similarity between two objects.
 * 
 * The bag distance is defined as the maximum of the size of the difference between two bags.
 * 
 * A bag is a collection of items where the order does not matter, and duplicates are allowed.
 * 
 * https://anhaidgroup.github.io/py_stringmatching/v0.4.x/_modules/py_stringmatching/similarity_measure/bag_distance.html#BagDistance.get_sim_score
 */
class BagDistance {

    /**
     * Computes the bag distance between two objects.
     *
     * @param {Object} obj1 - The first input object.
     * @param {Object} obj2 - The second input object.
     * @param {Function} fn - The function to calculate the distance between objects.
     * @returns {number} The bag distance.
     * @throws {TypeError} If the inputs are not strings.
     */

    static getRawScore(obj1, obj2, fn) {
        if (typeof obj1 !== typeof obj2) {
            throw new TypeError('Inputs of different types are not supported.');
        }
        if (obj1 === obj2) {
            return 0;
        }

        const bag1 = fn(obj1);
        const bag2 = fn(obj2);

        const size1 = BagDistance.getDifferenceSize(bag1, bag2);
        const size2 = BagDistance.getDifferenceSize(bag2, bag1);

        return Math.max(size1, size2);
    }

    static getRawScoreObj(obj1, obj2) {
        return BagDistance.getRawScore(obj1, obj2, Helper.getFieldCount);
    }

    static getRawScoreStr(str1, str2) {
        return BagDistance.getRawScore(str1, str2, Helper.getCharCount);
    }

    /**
     * Computes the normalized bag similarity between two Objects.
     * 
     * @param {Object} obj1 - The first input object.
     * @param {Object} obj2 - The second input object.
     * @returns {number} The normalized bag similarity.
     * @throws {TypeError} If the inputs are not strings.
     */
    static getSimScore(obj1, obj2, rawFn, lenFn) {
        const rawScore = rawFn(obj1, obj2);
        const obj1Len = lenFn(obj1);
        const obj2Len = lenFn(obj2);
        if (obj1Len === 0 && obj2Len === 0) {
            return 1.0;
        }
        return 1 - (rawScore / Math.max(obj1Len, obj2Len));
    }

    static getSimScoreObj(obj1, obj2) {
        return this.getSimScore(obj1, obj2, BagDistance.getRawScoreObj, (o) => Object.keys(o).length);
    }

    static getSimScoreStr(str1, str2) {
        return this.getSimScore(str1, str2, BagDistance.getRawScoreStr, (o) => o.length);
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

/**
 * Interface representing an object that has a distance.
 */
class HasDistance {
    /**
     * Calculates the distance between this object and another object.
     * 
     * @param {HasDistance} o2 - The other object to calculate the distance to.
     * @returns {number} The distance between the two objects.
     * @throws {Error} If the method is not implemented in derived classes.
     */
    distance(o2) {
        throw new Error("Method 'distance' must be implemented in derived classes.");
    }
}

class Condition {
    static isPositiveInteger(k) {
        return typeof k === 'number' && k > 0 && Number.isInteger(k);
    }
}

/**
 * Class representing a data container.
 * 
 * This class is used to store a list of data and provides methods to manipulate and access that data.
 * 
 * @class DataContainer
 */
class DataContainer {

    /**
     * Creates an instance of DataContainer.
     * 
     * @param {Object} options - Options for the DataContainer.
     * @param {Array<Object>} options.list - The list of objects to store.
     * @param {Function} options.distanceFunction - The function to calculate the distance between objects.
     */
    constructor({ dataSet, distanceFunction }) {
        if (!Array.isArray(dataSet)) {
            throw new TypeError('dataSet must be an array');
        }
        if (dataSet.length === 0) {
            throw new Error('list must not be empty');
        }
        if (typeof distanceFunction !== 'function') {
            throw new TypeError('distanceFunction must be a function');
        }
        this.dataSet = dataSet;
        this.distanceFunction = distanceFunction;
    }

}

/**
 * Class representing Multidimensional Scaling (MDS) calculations.
 * 
 * MDS is a technique used for dimensionality reduction and visualization of high-dimensional data.
 * It attempts to preserve the pairwise distances between points in a lower-dimensional space.
 */
class Mds {

    /**
     * Calculates the stress value for a given set of points and target distances.
     * 
     * Stress is a measure of how well the distances between points in the reduced space
     * match the target distances.
     * 
     * @param {Array<Array<number>>} points - The coordinates of the points in the reduced space.
     * @param {Array<Object>} targetDistances - An array of objects representing the target distances.
     * Each object should have the format { i1: number, i2: number, distance: number }.
     * @returns {number} The calculated stress value.
     */
    static calculateStress(points, targetDistances) {
        const distances = points
            .map((_, i) => i)
            .reduce(Reduce.combine, [])
            .map(([i1, i2]) => Euclidean.distance(points[i1], points[i2]));

        // calculate the stress
        let stress = 0;
        for (let i = 0; i < targetDistances.length; i++) {
            const targetDistance = targetDistances[i].distance;
            const currentDistance = distances[i];
            stress += Math.pow(targetDistance - currentDistance, 2);
        }
        return stress;
    }

    /**
     * Updates the positions of points using gradient descent to minimize stress.
     * 
     * @param {Array<Array<number>>} points - The coordinates of the points in the reduced space.
     * @param {Array<Object>} targetDistances - An array of objects representing the target distances.
     * Each object should have the format { i1: number, i2: number, distance: number }.
     * @param {number} [learningRate=0.01] - The learning rate for gradient descent.
     */
    static updatePoints(points, targetDistances, learningRate = 0.01) {

        const findIJ = (i, j) => (d) => (d.i1 === i && d.i2 === j) || (d.i1 === j && d.i2 === i);

        const gradients = points.map((p1, i) => {
            const gradient = [0, 0];
            for (let j = 0; j < points.length; j++) {
                if (i === j) continue;
                const p2 = points[j];
                const distance = Euclidean.distance(p1, p2);
                const targetDistance = targetDistances.find(findIJ(i, j)).distance;
                const diff = distance - targetDistance;
                gradient[0] += (p1[0] - p2[0]) * diff / distance;
                gradient[1] += (p1[1] - p2[1]) * diff / distance;
            }
            return gradient.map(g => g * learningRate);
        });
        for (let i = 0; i < points.length; i++) {
            points[i][0] -= gradients[i][0];
            points[i][1] -= gradients[i][1];
        }
    }

    static findPoints({
        targetDistances,
        learningRate = 0.01,
        maxIterations = 1000,
        tolerance = 0.01,
        localMinimumStressDeltaThreshold = 0.01,
        localMinimumStressThreshold = 1,
    }) {
        let points = MUtils.randomPoints(targetDistances.length);
        let stress = Mds.calculateStress(points, targetDistances);
        let iterations = 0;
        let previousStress = stress;
        while (iterations < maxIterations && stress > tolerance) {
            Mds.updatePoints(points, targetDistances, learningRate);
            stress = Mds.calculateStress(points, targetDistances);
            stressDelta = Math.abs(stress - previousStress);
            if (stressDelta < localMinimumStressDeltaThreshold && stress > localMinimumStressThreshold) {
                // if the stress delta is small and the stress is high, we are stuck in a local minimum
                // so we need to randomize the points
                points = MUtils.randomPoints(targetDistances.length);
                break;
            }
            iterations++;
        }
        return points;
    }
}
