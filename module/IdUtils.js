export default class IdUtils {
    static get UUID() {
        return self.crypto.randomUUID();
    }
    static get ID() {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0];
    }
    static get HID() {
        return IdUtils.ID.toString(16);
    }

    static toX = (i, w) => i % w;
    static toY = (i, w) => ~~(i / w);
    static toXY = (i, w) => ({
        x: IdUtils.toX(i, w),
        y: IdUtils.toY(i, w),
    });

    static toID = function (coords, w) {
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
        return Math.floor(y) * w + Math.floor(x);
    };
}
