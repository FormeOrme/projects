/* Local Storage Manager */

export function getObj(id, proto) {
    const item = localStorage.getItem(id);
    if (!item) return null;
    const parsed = JSON.parse(item);
    return !proto ? parsed : Object.setPrototypeOf(parsed, proto);
}

export function setObj(id, o) {
    if (o === null || o === undefined) {
        remove(id);
        return;
    }
    localStorage.setItem(id, JSON.stringify(o));
}

export function remove(id) {
    localStorage.removeItem(id);
}
