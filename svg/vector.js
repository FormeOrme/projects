class Vector {
    constructor(obj) {
        Object.assign(this, obj)
    }

    // Calculate the magnitude of the vector
    magnitude() {
        return (this.x ** 2 + this.y ** 2) ** (1 / 2);
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
    subtract({ x = 0, y = 0 }) {
        this.x -= x;
        this.y -= y;
        return this;
    }

    // Dot product of two vectors
    dot({ x, y }) {
        return this.x * x + this.y * y;
    }

    // Scalar multiplication (modify the current vector in-place)
    multiplyScalar(scalar) {
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
    rotate(center, angle) {
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

    // Return string representation of the vector
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}