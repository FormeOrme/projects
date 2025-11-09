/* Local Storage Manager */
export default class LoStMan {
    static getObj(id, proto) {
        const item = localStorage.getItem(id);
        if (!item) return null;
        const parsed = JSON.parse(item);
        return !proto ? parsed : Object.setPrototypeOf(parsed, proto);
    }
    static setObj(id, o) {
        if (o === null || o === undefined) {
            LoStMan.remove(id);
            return;
        }
        localStorage.setItem(id, JSON.stringify(o));
    }

    static remove(id) {
        localStorage.removeItem(id);
    }
}
