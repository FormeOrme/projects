import { G, Line } from "../Svg.js";
import { visibleOrNull } from "./glyphUtils.js";

/**
 * Grid glyph calculator - 7-segment style layout
 * Creates glyphs using segments in a classic display pattern:
 *
 *    _0_
 *  1|   |2
 *    _3_
 *  4|   |5
 *    _6_
 *
 * Segments numbered 0-6 like classic 7-segment displays
 */

const glyphMap = {
    A: "012345", // All but bottom
    B: "0123456", // All segments (like 8)
    C: "0146", // Top, left sides, bottom
    D: "023456", // Like 0 without top-left
    E: "01346", // Top, left, middle, bottom
    F: "0134", // Top, left, middle
    G: "01456", // C with middle segment
    H: "12345", // Vertical sides + middle
    I: "0145", // Simple I (top, left sides, bottom)
    J: "2456", // Right side + bottom
    K: "13245", // Left + angles (H-like)
    L: "146", // Left side + bottom
    M: "01245", // Top + verticals
    N: "012456", // Like M with bottom
    O: "012456", // Full rectangle
    P: "01234", // Top half + left
    Q: "012356", // O with tail
    R: "012345", // Like P with leg
    S: "01356", // Classic S shape
    T: "0134", // Top + left middle
    U: "12456", // Sides + bottom
    V: "1456", // Like U without right top
    W: "123456", // All verticals + bottom
    X: "12345", // Like H
    Y: "12356", // Y shape
    Z: "0236", // Z diagonal
};

const defaults = {
    innerRadius: 3,
    lineLength: 8,
    maxGlyphsInRow: 12,
    zoom: 2,
    lightStrokeWidth: 6,
    darkStrokeWidth: 4,
    horizontalKerning: 32,
    verticalKerning: 52,
    lightColor: "#E0E0E0",
    darkColor: "#FF3030",
    padding: 10,
    text: "SPHINX OF   BLACK QUARTZJUDGE MY VOW",
};

/**
 * Calculate glyph geometry for Grid style
 * Uses 7-segment display layout for clear, readable letters
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

    const w = 4 * innerRadius; // width of character
    const h = 6 * innerRadius; // height of character
    const offsetX = horizontalKerning / 2 + x;
    const offsetY = verticalKerning / 2 + y;

    // Define 7 segments like classic display:
    // 0: top horizontal
    // 1: top-left vertical
    // 2: top-right vertical
    // 3: middle horizontal
    // 4: bottom-left vertical
    // 5: bottom-right vertical
    // 6: bottom horizontal
    const segments = [
        { x1: 0, y1: -h / 2, x2: w, y2: -h / 2 }, // 0: top
        { x1: 0, y1: -h / 2, x2: 0, y2: 0 }, // 1: top-left
        { x1: w, y1: -h / 2, x2: w, y2: 0 }, // 2: top-right
        { x1: 0, y1: 0, x2: w, y2: 0 }, // 3: middle
        { x1: 0, y1: 0, x2: 0, y2: h / 2 }, // 4: bottom-left
        { x1: w, y1: 0, x2: w, y2: h / 2 }, // 5: bottom-right
        { x1: 0, y1: h / 2, x2: w, y2: h / 2 }, // 6: bottom
    ];

    // Map char to index
    const charToIndex = (char) => {
        if (char >= "0" && char <= "9") return parseInt(char);
        return null;
    };

    // Create a line element from segment data
    const createLine = (seg) =>
        Line.with({
            attribute: {
                x1: (offsetX + seg.x1).toPrecision(P),
                y1: (offsetY + seg.y1).toPrecision(P),
                x2: (offsetX + seg.x2).toPrecision(P),
                y2: (offsetY + seg.y2).toPrecision(P),
            },
        });

    // Return [background, foreground] groups
    return [
        visibleOrNull(
            lightStrokeWidth,
            G.with({
                children: segments.map((seg) => createLine(seg)),
            }),
        ),
        visibleOrNull(
            darkStrokeWidth,
            G.with({
                children: (glyph || "")
                    .split("")
                    .map(charToIndex)
                    .filter((idx) => idx !== null && idx < segments.length)
                    .map((idx) => createLine(segments[idx])),
            }),
        ),
    ];
}

const Glyph = {
    title: "Grid",
    glyphMap,
    defaults,
    glyphCalculator,
};

export default Glyph;
