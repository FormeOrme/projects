/**
 * Class representing a
  2D vector.
 */
export default class Vector {
    /**
     * Create a vector.
     * @param {number|Object} x - The x coordinate or an object with x and y properties.
     * @param {number} [y] - The y coordinate.
     */
    constructor(x, y) {
        if (Object.hasOwn(x, "x")) {
            Object.assign(this, x);
        } else {
            this.x = x;
            this.y = y;
        }
    }

    /**
     * Create a new vector with the same x and y values.
     * @returns {Vector} A new vector with the same x and y values.
     */
    copy() {
        return new Vector({ x: this.x, y: this.y });
    }

    /**
     * Calculate the magnitude of the vector.
     * @returns {number} The magnitude of the vector.
     */
    magnitude() {
        return Math.hypot(this.x, this.y);
    }

    /**
     * Normalize the vector (make it a unit vector).
     * @returns {Vector} The normalized vector.
     */
    normalize() {
        const mag = this.magnitude();
        this.x /= mag;
        this.y /= mag;
        return this;
    }

    /**
     * Calculate the unit vector (vector in the same direction with magnitude of 1).
     * @returns {Vector} The unit vector.
     */
    unit() {
        const mag = this.magnitude();
        return new Vector(this.x / mag, this.y / mag);
    }

    /**
     * Add another vector to this vector (modify the current vector in-place).
     * @param {Object} vector - The vector to add.
     * @param {number} [vector.x=0] - The x coordinate of the vector to add.
     * @param {number} [vector.y=0] - The y coordinate of the vector to add.
     * @returns {Vector} The current vector after addition.
     */
    add({ x = 0, y = 0 }) {
        this.x += x;
        this.y += y;
        return this;
    }

    /**
     * Subtract another vector from this vector (modify the current vector in-place).
     * @param {Object} vector - The vector to subtract.
     * @param {number} [vector.x=0] - The x coordinate of the vector to subtract.
     * @param {number} [vector.y=0] - The y coordinate of the vector to subtract.
     * @returns {Vector} The current vector after subtraction.
     */
    sub({ x = 0, y = 0 }) {
        this.x -= x;
        this.y -= y;
        return this;
    }

    /**
     * Subtract vector b from vector a.
     * @param {Vector} a - The vector to subtract from.
     * @param {Vector} b - The vector to subtract.
     * @returns {Vector} The result of the subtraction.
     */
    static sub(a, b) {
        return new Vector({ x: a.x - b.x, y: a.y - b.y });
    }

    /**
     * Calculate the dot product of this vector and another vector.
     * @param {Object} vector - The other vector.
     * @param {number} vector.x - The x coordinate of the other vector.
     * @param {number} vector.y - The y coordinate of the other vector.
     * @returns {number} The dot product of the two vectors.
     */
    dot({ x, y }) {
        return this.x * x + this.y * y;
    }

    /**
     * Multiply this vector by a scalar (modify the current vector in-place).
     * @param {number} scalar - The scalar to multiply by.
     * @returns {Vector} The current vector after multiplication.
     */
    mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    /**
     * Calculate the distance from this vector to another vector.
     * @param {Object} vector - The other vector.
     * @returns {number} The distance between the two vectors.
     */
    distance(vector) {
        return this.distance2(vector) ** (1 / 2);
    }

    /**
     * Calculate the squared distance from this vector to another vector.
     * @param {Object} vector - The other vector.
     * @param {number} vector.x - The x coordinate of the other vector.
     * @param {number} vector.y - The y coordinate of the other vector.
     * @returns {number} The squared distance between the two vectors.
     */
    distance2({ x, y }) {
        return (this.x - x) ** 2 + (this.y - y) ** 2;
    }

    /**
     * Rotate this vector around a center point by an angle in degrees (counterclockwise).
     * @param {Object} center - The center point to rotate around.
     * @param {number} center.x - The x coordinate of the center point.
     * @param {number} center.y - The y coordinate of the center point.
     * @param {number} angle - The angle in degrees to rotate.
     * @returns {Vector} The rotated vector.
     */
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

    /**
     * Rotate this vector by an angle in radians.
     * @param {number} angle - The angle in radians to rotate.
     * @returns {Vector} The rotated vector.
     */
    rotate(angle) {
        const xNew = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        const yNew = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        return new Vector({ x: xNew, y: yNew });
    }

    /**
     * Calculate the angle of this vector.
     * @returns {number} The angle of the vector in radians.
     */
    angle() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Calculate the angle from this vector to another vector.
     * @param {Object} vector - The other vector.
     * @param {number} vector.x - The x coordinate of the other vector.
     * @param {number} vector.y - The y coordinate of the other vector.
     * @returns {number} The angle between the two vectors in radians.
     */
    angleTo({ x, y }) {
        return Math.atan2(y - this.y, x - this.x);
    }

    /**
     * Create a vector from an angle.
     * @param {number} angle - The angle in radians.
     * @returns {Vector} A new vector with the given angle.
     */
    static fromAngle(angle) {
        return new Vector({ x: Math.cos(angle), y: Math.sin(angle) });
    }

    /**
     * Return the string representation of the vector.
     * @returns {string} The string representation of the vector.
     */
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
