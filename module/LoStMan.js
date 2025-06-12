/* Local Storage Manager */
export class LoStMan {
    static getObj(id, proto) {
        const parsed = JSON.parse(localStorage.getItem(id));
        return !proto ? parsed : Object.setPrototypeOf(parsed, proto);
    }
    static setObj(id, o) {
        localStorage.setItem(id, JSON.stringify(o))
    }

    static remove(id) {
        localStorage.removeItem(id);
    }
}
