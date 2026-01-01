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

export class PathBuilder {
    constructor({ x, y }) {
        this.d = `M ${x} ${y} `;
        this.firstPoint = this.lastPoint = new Vector({ x, y });
    }

    static moveTo({ x, y }) {
        return new PathBuilder({ x, y });
    }

    moveTo({ x, y }) {
        this.d += `M ${x} ${y} `;
        this.lastPoint = new Vector({ x, y });
        return this;
    }

    lineTo({ x, y }) {
        this.d += `L ${x} ${y} `;
        this.lastPoint = new Vector({ x, y });
        return this;
    }

    horizontalLineTo(x) {
        this.d += `H ${x} `;
        this.lastPoint.x = x;
        return this;
    }

    verticalLineTo(y) {
        this.d += `V ${y} `;
        this.lastPoint.y = y;
        return this;
    }

    curve({ x1, y1, x2, y2, x, y }) {
        this.d += `C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y} `;
        this.lastPoint = new Vector({ x, y });
        return this;
    }

    smoothCurve({ x2, y2, x, y }) {
        this.d += `S ${x2} ${y2}, ${x} ${y} `;
        this.lastPoint = new Vector({ x, y });
        return this;
    }

    quadraticCurve({ x1, y1, x, y }) {
        this.d += `Q ${x1} ${y1}, ${x} ${y} `;
        this.lastPoint = new Vector({ x, y });
        return this;
    }

    squareCurve({ x1, y1, x, y, angleRadius }) {
        return this.lineTo({ x: x1, y: y1 }).lineTo({ x, y });
    }

    smoothQuadraticCurve({ x, y }) {
        this.d += `T ${x} ${y} `;
        this.lastPoint = new Vector({ x, y });
        return this;
    }

    arc({ rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y }) {
        this.d += `A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y} `;
        this.lastPoint = new Vector({ x, y });
        return this;
    }

    closePath() {
        this.d += `Z `;
        return this;
    }

    build(attribute = {}) {
        if (this.d.includes("undefined")) {
            throw new Error("Error building path");
        }
        return Path({
            d: this.d.trim(),
            ...attribute,
        });
    }
}
