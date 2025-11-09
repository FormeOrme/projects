import { Identity } from "./Utils.js";

export default class Relation {
    constructor({ getAId = Identity, getBId = Identity }) {
        this.getAId = getAId;
        this.getBId = getBId;
        this.aToB = new Map();
        this.bToA = new Map();
    }

    #ensureMap(map, key) {
        if (!map.has(key)) map.set(key, new Map());
        return map.get(key);
    }

    set(a, b, value = true) {
        const aId = this.getAId(a);
        const bId = this.getBId(b);

        this.#ensureMap(this.aToB, aId).set(bId, value);
        this.#ensureMap(this.bToA, bId).set(aId, value);
    }

    get(a, b) {
        const aId = this.getAId(a);
        const bId = this.getBId(b);
        return this.aToB.has(aId) ? this.aToB.get(aId).get(bId) : undefined;
    }

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

    exists(a, b) {
        const aId = this.getAId(a);
        const bId = this.getBId(b);
        return this.aToB.has(aId) && this.aToB.get(aId).has(bId);
    }

    getRelatedB(a) {
        const aId = this.getAId(a);
        if (!this.aToB.has(aId)) return [];
        return this.aToB.get(aId);
    }

    getRelatedA(b) {
        const bId = this.getBId(b);
        if (!this.bToA.has(bId)) return [];
        return this.bToA.get(bId);
    }

    toJSON() {
        const pairs = [];
        for (const [aId, bMap] of this.aToB.entries()) {
            for (const [bId, value] of bMap.entries()) {
                pairs.push([aId, bId, value]);
            }
        }
        return pairs;
    }

    static fromJSON(json, getAId, getBId) {
        const rel = new Relation(getAId, getBId);
        json?.forEach((pair) => rel.set(...pair));
        return rel;
    }
}
