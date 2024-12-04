function group(children) {
    return G.with({ children })
}

class PathBuilder {
    constructor({ x, y }) {
        this.d = `M ${x} ${y} `;
        this.firstPoint = this.lastPoint = new Vector({ x, y });
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
        return this
            .lineTo({ x: x1, y: y1 })
            .lineTo({ x, y });
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
            throw new Error('Error building path');
        }
        return Path.with({
            attribute: {
                d: this.d.trim(),
                ...attribute
            }
        });
    }
}
