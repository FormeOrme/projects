import { Line } from "/module/Svg.js";
import { createGlyphGroups } from "/module/glyphs/glyphUtils.js";

/**
 * Eightful glyph calculator - diagonal segment layout
 * Creates glyphs using 8 diagonal segments arranged in pairs:
 *
 * 0 / \ 1  # Top diagonals
 * 2 \ / 3  # Upper-middle diagonals
 * 4 / \ 5  # Lower-middle diagonals
 * 6 \ / 7  # Bottom diagonals
 */

const glyphMap = {
    A: "45",
    B: "1357",
    C: "467",
    D: "6247",
    E: "0246",
    F: "0235",
    G: "3675",
    H: "2546",
    I: "25",
    J: "2567",
    K: "0356",
    L: "67",
    M: "3465",
    N: "465",
    O: "4567",
    P: "5013",
    Q: "0124",
    R: "64",
    S: "357",
    T: "345",
    U: "675",
    V: "23",
    W: "2367",
    X: "2345",
    Y: "234",
    Z: "246",
};

const defaults = {
    innerRadius: 3,
    lineLength: 6,
    maxGlyphsInRow: 12,
    zoom: 2,
    lightStrokeWidth: 10,
    darkStrokeWidth: 6,
    horizontalKerning: 31,
    verticalKerning: 55,
    lightColor: "#CCC",
    darkColor: "#000",
    padding: 10,
    text: "SPHINX OF   BLACK QUARTZJUDGE MY VOW",
};

/**
 * Calculate glyph geometry for Eightful style
 * Uses diagonal pairs with specific positioning
 */
function glyphCalculator({ glyphMap, args, x, y, v }) {
    const {
        innerRadius,
        lineLength,
        lightStrokeWidth,
        darkStrokeWidth,
        horizontalKerning,
        verticalKerning,
    } = args;

    const glyph = glyphMap[v.toUpperCase()];
    const P = 4; // precision

    // Helper to create position data
    const p = (lx, ly, a) => ({ lx, ly, a });

    const s = 1 * innerRadius; // spacing
    const l = 3 * innerRadius; // vertical offset

    // Define the 8 segment positions
    const map = [
        p(-s, -l, +1), // 0: top-left diagonal
        p(+s, -l, -1), // 1: top-right diagonal
        p(-s, -s, -1), // 2: upper-left diagonal
        p(+s, -s, +1), // 3: upper-right diagonal
        p(-s, +s, +1), // 4: lower-left diagonal
        p(+s, +s, -1), // 5: lower-right diagonal
        p(-s, +l, -1), // 6: bottom-left diagonal
        p(+s, +l, +1), // 7: bottom-right diagonal
    ];

    const LH = 2; // led height multiplier
    const LW = 2; // led width multiplier

    // Calculate line position and angle for segment i
    const calcLine = (i) => {
        const { lx, ly, a } = map[i];
        const angle = a * Math.atan2(LH, LW);
        return {
            i,
            angle,
            x: horizontalKerning / 2 + x + lx * LW,
            y: verticalKerning / 2 + y + ly * LH,
        };
    };

    // Draw a line at the calculated position
    const drawLine = (p, lineAngle = p.angle + Math.PI / 2) =>
        Line.with({
            attribute: {
                x1: (p.x + lineLength * Math.cos(lineAngle)).toPrecision(P),
                y1: (p.y + lineLength * Math.sin(lineAngle)).toPrecision(P),
                x2: (p.x + lineLength * Math.cos(lineAngle + Math.PI)).toPrecision(P),
                y2: (p.y + lineLength * Math.sin(lineAngle + Math.PI)).toPrecision(P),
            },
        });

    // Return [background, foreground] groups
    return createGlyphGroups(
        lightStrokeWidth,
        darkStrokeWidth,
        Array.from({ length: 8 }, (_, i) => calcLine(i)).map((p) => drawLine(p)),
        Array.from({ length: 8 }, (_, i) => (glyph?.includes(i) ? calcLine(i) : null))
            .filter(Boolean)
            .map((p) => drawLine(p)),
    );
}

const Glyph = {
    title: "Eightful",
    glyphMap,
    defaults,
    glyphCalculator,
};

export default Glyph;
