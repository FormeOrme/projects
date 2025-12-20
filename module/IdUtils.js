const { floor } = Math;

function getUUID() {
    return crypto.randomUUID();
}

function getID() {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0];
}

function getHID() {
    return getID().toString(16);
}

function toX(i, w) {
    return i % w;
}

function toY(i, w) {
    return floor(i / w);
}

function toXY(i, w) {
    return {
        x: toX(i, w),
        y: toY(i, w),
    };
}

function toID(coords, w) {
    let x, y;
    if (Array.isArray(coords)) {
        [x, y] = coords;
    } else if (typeof coords === "object") {
        ({ x, y } = coords);
    } else {
        x = coords;
        y = w;
        w = arguments[2];
    }
    return floor(y) * w + floor(x);
}

export { getUUID, getID, getHID, toX, toY, toXY, toID };
