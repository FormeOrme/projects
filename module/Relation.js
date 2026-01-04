import { Identity } from "/module/Utils.js";

/**
 * A bidirectional relationship mapping class that maintains connections between two types of entities.
 * Efficiently tracks many-to-many relationships with O(1) lookups in both directions.
 */
export default class Relation {
    /**
     * Creates a new Relation instance.
     * @param {Object} options - Configuration options
     * @param {Function} options.getAId - Function to extract ID from entity A (default: Identity)
     * @param {Function} options.getBId - Function to extract ID from entity B (default: Identity)
     */
    constructor({ getAId = Identity, getBId = Identity }) {
        this.getAId = getAId;
        this.getBId = getBId;
        this.aToB = new Map();
        this.bToA = new Map();
    }

    /**
     * Ensures a Map exists for a given key, creating it if necessary.
     * @private
     * @param {Map} map - The parent Map to check
     * @param {*} key - The key to ensure exists
     * @returns {Map} The nested Map for the given key
     */
    #ensureMap(map, key) {
        if (!map.has(key)) map.set(key, new Map());
        return map.get(key);
    }

    /**
     * Creates or updates a relationship between entities A and B.
     * @param {*} a - The first entity
     * @param {*} b - The second entity
     * @param {*} value - The value to store for this relationship (default: true)
     */
    set(a, b, value = true) {
        const aId = this.getAId(a);
        const bId = this.getBId(b);

        this.#ensureMap(this.aToB, aId).set(bId, value);
        this.#ensureMap(this.bToA, bId).set(aId, value);
    }

    /**
     * Retrieves the value of the relationship between A and B.
     * @param {*} a - The first entity
     * @param {*} b - The second entity
     * @returns {*} The relationship value, or undefined if no relationship exists
     */
    get(a, b) {
        const aId = this.getAId(a);
        const bId = this.getBId(b);
        return this.aToB.has(aId) ? this.aToB.get(aId).get(bId) : undefined;
    }

    /**
     * Removes the relationship between entities A and B.
     * Cleans up empty nested Maps to prevent memory leaks.
     * @param {*} a - The first entity
     * @param {*} b - The second entity
     */
    remove(a, b) {
        const aId = this.getAId(a);
        const bId = this.getBId(b);

        if (this.aToB.has(aId)) {
            this.aToB.get(aId).delete(bId);
            if (this.aToB.get(aId).size === 0) this.aToB.delete(aId);
        }
        if (this.bToA.has(bId)) {
            this.bToA.get(bId).delete(aId);
            if (this.bToA.get(bId).size === 0) this.bToA.delete(bId);
        }
    }

    /**
     * Checks if a relationship exists between entities A and B.
     * @param {*} a - The first entity
     * @param {*} b - The second entity
     * @returns {boolean} True if the relationship exists, false otherwise
     */
    exists(a, b) {
        const aId = this.getAId(a);
        const bId = this.getBId(b);
        return this.aToB.has(aId) && this.aToB.get(aId).has(bId);
    }

    /**
     * Gets all B entities related to entity A.
     * @param {*} a - The A entity
     * @returns {Map|Array} Map of related B entities, or empty array if none exist
     */
    getRelatedB(a) {
        const aId = this.getAId(a);
        if (!this.aToB.has(aId)) return [];
        return this.aToB.get(aId);
    }

    /**
     * Gets all A entities related to entity B.
     * @param {*} b - The B entity
     * @returns {Map|Array} Map of related A entities, or empty array if none exist
     */
    getRelatedA(b) {
        const bId = this.getBId(b);
        if (!this.bToA.has(bId)) return [];
        return this.bToA.get(bId);
    }

    /**
     * Serializes the relationship graph to JSON format.
     * @returns {Array<Array>} Array of [aId, bId, value] triplets
     */
    toJSON() {
        const pairs = [];
        for (const [aId, bMap] of this.aToB.entries()) {
            for (const [bId, value] of bMap.entries()) {
                pairs.push([aId, bId, value]);
            }
        }
        return pairs;
    }

    /**
     * Reconstructs a Relation instance from serialized JSON data.
     * @static
     * @param {Array<Array>} json - Array of [aId, bId, value] triplets
     * @param {Function} getAId - Function to extract ID from entity A
     * @param {Function} getBId - Function to extract ID from entity B
     * @returns {Relation} New Relation instance with restored relationships
     */
    static fromJSON(json, getAId, getBId) {
        const rel = new Relation(getAId, getBId);
        json?.forEach((pair) => rel.set(...pair));
        return rel;
    }
}
