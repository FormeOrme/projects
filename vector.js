class Vector {
    constructor(x, y) {
        if (Object.hasOwn(x, "x")) {
            Object.assign(this, x)
        } else {
            this.x = x;
            this.y = y;
        }
    }

    // Create a new vector with the same x and y values
    copy() {
        return new Vector({ x: this.x, y: this.y });
    }

    // Calculate the magnitude of the vector
    magnitude() {
        return (this.x ** 2 + this.y ** 2) ** (1 / 2);
    }

    normalize() {
        const mag = this.magnitude();
        this.x /= mag;
        this.y /= mag;
        return this;
    }

    // Calculate the unit vector (vector in the same direction with magnitude of 1)
    unit() {
        const mag = this.magnitude();
        return new Vector(this.x / mag, this.y / mag);
    }

    // Add two vectors (modify the current vector in-place)
    add({ x = 0, y = 0 }) {
        this.x += x;
        this.y += y;
        return this;
    }

    // Subtract two vectors (modify the current vector in-place)
    sub({ x = 0, y = 0 }) {
        this.x -= x;
        this.y -= y;
        return this;
    }

    static sub(a, b) {
        return new Vector({ x: a.x - b.x, y: a.y - b.y });
    }

    // Dot product of two vectors
    dot({ x, y }) {
        return this.x * x + this.y * y;
    }

    // Scalar multiplication (modify the current vector in-place)
    mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    // Calculate the distance from another vector
    distance(xy) {
        return this.distance2(xy) ** (1 / 2);
    }

    distance2({ x, y }) {
        return ((this.x - x) ** 2 + (this.y - y) ** 2);
    }

    // Rotate the vector around a center point by an angle in degrees (counterclockwise)
    rotateAround(center, angle) {
        const radians = (Math.PI / 180) * angle; // Convert degrees to radians
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        const { x: cx, y: cy } = center;
        const dx = this.x - cx;
        const dy = this.y - cy;

        const xNew = cos * dx - sin * dy + cx;
        const yNew = sin * dx + cos * dy + cy;

        return new Vector({ x: xNew, y: yNew });
    }

    rotate(angle) {
        const xNew = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        const yNew = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        return new Vector({ x: xNew, y: yNew });
    }

    angle() {
        return Math.atan2(this.y, this.x);
    }

    angleTo({ x, y }) {
        return Math.atan2(y - this.y, x - this.x);
    }

    static fromAngle(angle) {
        return new Vector({ x: Math.cos(angle), y: Math.sin(angle) });
    }

    // Return string representation of the vector
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}