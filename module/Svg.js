import { Elem, asFunctions } from "./Dom.js";
import Vector from "./Vector.js";

class SvgElement extends Elem {
    manageArgs(args) {
        if (args && !args.attribute) {
            const { children, style, ...attribute } = args;
            super.manageArgs({
                attribute,
                style,
                children,
            });
        } else {
            super.manageArgs(args);
        }
    }
}

const elementClasses = [
    /* SvgBaseElements */
    class Svg extends SvgElement {},
    class Defs extends SvgElement {},
    class G extends SvgElement {},
    class Path extends SvgElement {},
    class Line extends SvgElement {},
    class Rect extends SvgElement {},
    class Circle extends SvgElement {},
    class Ellipse extends SvgElement {},
    class Polygon extends SvgElement {},
    class Polyline extends SvgElement {},
    /* SvgDefElements */
    class LinearGradient extends SvgElement {},
    class Stop extends SvgElement {},
];

export const {
    Svg,
    Defs,
    G,
    Path,
    Line,
    Rect,
    Circle,
    Ellipse,
    Polygon,
    Polyline,
    LinearGradient,
    Stop,
} = asFunctions(elementClasses);
/**
 * A utility class for building SVG path data strings using a fluent API.
 * Supports various SVG path commands such as move, line, curve, arc, and more.
 *
 * @example
 * const path = PathBuilder.moveTo({ x: 0, y: 0 })
 *   .lineTo({ x: 100, y: 0 })
 *   .lineTo({ x: 100, y: 100 })
 *   .closePath()
 *   .build();
 */
export class PathBuilder {
    #d = [];

    get d() {
        return this.#d.join(" ");
    }

    constructor({ x, y }) {
        this.firstPoint = this.lastPoint = new Vector({ x, y });
        this.#append(`M ${x} ${y}`);
    }

    #append(command) {
        if (command.includes("undefined")) {
            console.error("Error building path:", command);
            throw new Error("Error building path");
        }
        this.#d.push(command);
    }

    static moveTo({ x, y }) {
        return new PathBuilder({ x, y });
    }

    #getXY({ x, y, dx = 0, dy = 0, ...other } = {}) {
        const baseX = this.lastPoint?.x ?? 0;
        const baseY = this.lastPoint?.y ?? 0;
        return {
            x: x ?? baseX + dx,
            y: y ?? baseY + dy,
            ...other,
        };
    }

    moveTo(args) {
        const { x, y } = this.#getXY(args);
        this.#append(`M ${x} ${y}`);

        this.lastPoint = new Vector({ x, y });
        return this;
    }

    lineTo(args) {
        const { x, y } = this.#getXY(args);
        this.#append(`L ${x} ${y}`);

        this.lastPoint = new Vector({ x, y });
        return this;
    }

    horizontalLineTo(x) {
        this.#append(`H ${x}`);
        this.lastPoint.x = x;
        return this;
    }

    verticalLineTo(y) {
        this.#append(`V ${y}`);
        this.lastPoint.y = y;
        return this;
    }

    curve({ x1, y1, x2, y2, x, y }) {
        this.#append(`C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`);
        this.lastPoint = new Vector({ x, y });
        return this;
    }

    smoothCurve({ x2, y2, x, y }) {
        this.#append(`S ${x2} ${y2}, ${x} ${y}`);
        this.lastPoint = new Vector({ x, y });
        return this;
    }

    quadraticCurve({ x1, y1, x, y }) {
        this.#append(`Q ${x1} ${y1}, ${x} ${y}`);
        this.lastPoint = new Vector({ x, y });
        return this;
    }

    smoothQuadraticCurve(args) {
        const { x, y } = this.#getXY(args);
        this.#append(`T ${x} ${y}`);
        this.lastPoint = new Vector({ x, y });
        return this;
    }

    arc({ rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y }) {
        this.#append(
            `A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag ? 1 : 0} ${sweepFlag ? 1 : 0} ${x} ${y}`,
        );
        this.lastPoint = new Vector({ x, y });
        return this;
    }

    /**
     * Draws an arc from the last point to the specified (x, y) coordinates.
     *
     * Calculates the radii based on the distance between the last point and the target point,
     * and creates an SVG arc command with those parameters.
     *
     * @param {Object} args - The target coordinates for the arc.
     * @returns {string} The SVG arc path command.
     */
    arcTo(args) {
        const { x, y, largeArcFlag = false, sweepFlag = true } = this.#getXY(args);
        return this.arc({
            rx: Math.abs(this.lastPoint.x - x),
            ry: Math.abs(this.lastPoint.y - y),
            x,
            y,
            largeArcFlag,
            sweepFlag,
            xAxisRotation: 0,
        });
    }

    closePath() {
        this.#append("Z");
        this.lastPoint = this.firstPoint;
        return this;
    }

    build(attribute = {}) {
        return Path({
            d: this.d,
            ...attribute,
        });
    }
}
