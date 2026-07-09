export class Monitor {
    /**
     * @param {string} parentSelector
     * @param {string} targetSelector
     */
    constructor(parentSelector, targetSelector) {
        this._parentSelector = parentSelector;
        this._targetSelector = targetSelector;
        this._add = null;
        this._remove = () => {};
        this._observer = null;
        this._seen = new WeakSet();
    }

    /** Static factory. @returns {Monitor} */
    static watch(parentSelector, targetSelector) {
        return new Monitor(parentSelector, targetSelector);
    }

    /** @param {(element: Element) => void} fn @returns {this} */
    add(fn) {
        this._add = fn;
        return this;
    }

    /** @param {(element: Element) => void} fn @returns {this} */
    remove(fn) {
        this._remove = fn;
        return this;
    }

    /** Begin observing. @returns {this} */
    start() {
        if (this._observer) return this;

        if (typeof this._add !== "function") {
            console.error(`Monitor: "add" callback required before start()`);
            return this;
        }

        const parent = document.querySelector(this._parentSelector);
        if (!parent) {
            console.warn(`Monitor: parent not found for selector "${this._parentSelector}"`);
            return this;
        }

        const onAdd = (el) => {
            if (this._seen.has(el)) return;
            this._seen.add(el);
            this._add(el);
        };

        const onRemove = (el) => {
            this._seen.delete(el);
            this._remove(el);
        };

        const notify = (node, action) => {
            try {
                if (node.matches(this._targetSelector)) {
                    action(node);
                    return;
                }
                for (const child of node.querySelectorAll(this._targetSelector)) {
                    action(child);
                }
            } catch (e) {
                console.error("Monitor: error in callback or selector", e);
            }
        };

        this._observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType !== Node.ELEMENT_NODE) continue;
                    notify(node, onAdd);
                }
                for (const node of mutation.removedNodes) {
                    if (node.nodeType !== Node.ELEMENT_NODE) continue;
                    notify(node, onRemove);
                }
            }
        });

        this._observer.observe(parent, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false,
        });

        try {
            for (const element of parent.querySelectorAll(this._targetSelector)) {
                onAdd(element);
            }
        } catch (e) {
            console.error("Monitor: error in initial scan or selector", e);
        }

        return this;
    }

    /** Stop observing. @returns {this} */
    stop() {
        this._observer?.disconnect();
        this._observer = null;
        return this;
    }
}
