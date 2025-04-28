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

        this.distanceMap = new Map2D();
    }

    /**
     * Multidimensional scaling (MDS) algorithm.
     * 
     * @param {number} maxIterations - Maximum number of iterations.
     * @param {Array<Object>} cluster - The dataset to process.
     * @param {Function} distanceFunction - The function to calculate the distance between objects.
     * @returns {Array<Object>} The coordinates of the objects.
     */
    mds(
        maxIterations = 100,
        cluster = this.dataSet,
        distanceFunction = this.distanceFunction,
    ) {
        const n = cluster.length;
        const coordinates = new Float64Array(n * 2); // Typed array for coordinates

        // Initialize coordinates with random values
        for (let i = 0; i < n; i++) {
            coordinates[i * 2] = Math.random(); // x
            coordinates[i * 2 + 1] = Math.random(); // y
        }

        for (let iter = 0; iter < maxIterations; iter++) {
            for (let i = 0; i < n; i++) {
                const ix = i * 2;
                const iy = ix + 1;

                for (let j = i + 1; j < n; j++) { // Avoid redundant calculations (j > i)
                    const jx = j * 2;
                    const jy = jx + 1;

                    const dx = coordinates[ix] - coordinates[jx];
                    const dy = coordinates[iy] - coordinates[jy];
                    const distance = Math.sqrt(dx * dx + dy * dy) || Number.MIN_VALUE; // Avoid division by zero

                    const o1 = cluster[i];
                    const o2 = cluster[j];
                    const matrixDistance = this.distanceMap.fetch([o1, o2], distanceFunction);
                    const error = distance - matrixDistance;
                    const scale = error / distance;

                    const adjustmentX = 0.5 * scale * dx;
                    const adjustmentY = 0.5 * scale * dy;

                    coordinates[ix] -= adjustmentX;
                    coordinates[iy] -= adjustmentY;
                    coordinates[jx] += adjustmentX;
                    coordinates[jy] += adjustmentY;
                }
            }
        }

        // Convert typed array back to object format
        return Array.from({ length: n }, (_, i) => ({
            x: coordinates[i * 2],
            y: coordinates[i * 2 + 1],
            o: cluster[i],
        }));
    }
    /**
     * K-means clustering algorithm.
     *
     * @param {number} k - The number of clusters to form.
     * @param {number} maxIterations - The maximum number of iterations to perform.
     * @returns {Array<Array<Object>>} An array of clusters, where each cluster is an array of objects.
     * @throws {TypeError} If k is not a positive integer.
     */
    kMeans(k, maxIterations = 100) {
        if (!Condition.isPositiveInteger(k)) {
            throw new TypeError('k must be a positive integer');
        }
        if (!Condition.isPositiveInteger(maxIterations)) {
            throw new TypeError('maxIterations must be a positive integer');
        }
        if (this.dataSet.length < k) {
            throw new Error('Number of clusters cannot exceed number of data points');
        }

        const data = this.dataSet;
        const distanceFunction = this.distanceFunction;
        const mds = this.mds.bind(this);

        function calculateCentroid(cluster) {
            const n = cluster.length;
            if (n === 0) {
                throw new Error("Cluster is empty");
            }

            // Step 2: Apply MDS to get coordinates
            const coordinates = mds(cluster);

            // Step 3: Calculate the centroid
            let avg = { x: 0, y: 0 };
            for (let coord of coordinates) {
                avg.x += coord.x;
                avg.y += coord.y;
            }
            avg.x /= n;
            avg.y /= n;

            let centroid;
            let minDistance = Infinity;
            for (let coord of coordinates) {
                const dx = coord.x - avg.x;
                const dy = coord.y - avg.y;
                const distance = (dx * dx + dy * dy) ** 0.5;
                if (distance < minDistance) {
                    minDistance = distance;
                    centroid = coord.o; // Use the original object
                }
            }

            return centroid;
        }

        // Initialize centroids randomly
        const centroids = [];
        for (let i = 0; i < k; i++) {
            const randomIndex = Math.floor(Math.random() * data.length);
            centroids.push(data[randomIndex]);
        }

        let clusters = [];
        let iter = 0;

        for (; iter < maxIterations; iter++) {
            // Assign clusters
            clusters = Array.from({ length: k }, () => []);
            for (const point of data) {
                let closestCentroidIndex = 0;
                let minDistance = Infinity;
                for (let i = 0; i < k; i++) {
                    let distance = this.distanceMap.fetch([centroids[i], point], distanceFunction);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestCentroidIndex = i;
                    }
                }
                clusters[closestCentroidIndex].push(point);
            }

            // Update centroids
            const newCentroids = clusters.map(calculateCentroid);

            // Check for convergence
            let hasConverged = true;
            for (let i = 0; i < k; i++) {
                if (centroids[i] !== newCentroids[i]) {
                    hasConverged = false;
                    break;
                }
            }

            if (hasConverged) {
                break;
            }

            centroids.splice(0, k, ...newCentroids);
        }

        return { iter, clusters };
    }


}
