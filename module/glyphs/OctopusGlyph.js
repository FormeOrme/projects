import {
    lookupGlyph,
    getCenterOffset,
    createLineFromAngle,
    createGlyphGroups,
    DEFAULT_PRECISION,
} from "./glyphUtils.js";

/**
 * Octopus glyph calculator - radial segment layout
 * Creates glyphs using 8 radial segments arranged in a circle:
 *
 *     0
 *  7     1
 * 6       2
 *  5     3
 *     4
 *
 * Each segment radiates from center at 45° intervals
 */

const glyphMap = {
    A: "57",
    B: "017",
    C: "35",
    D: "147",
    E: "246",
    F: "46",
    G: "235",
    H: "04",
    I: "4",
    J: "01",
    K: "345",
    L: "24",
    M: "046",
    N: "047",
    O: "136",
    P: "016",
    Q: "025",
    R: "346",
    S: "37",
    T: "06",
    U: "024",
    V: "13",
    W: "123",
    X: "17",
    Y: "45",
    Z: "15",
};

const defaults = {
    innerRadius: 6,
    lineLength: 14,
    maxGlyphsInRow: 12,
    zoom: 2,
    lightStrokeWidth: 0,
    darkStrokeWidth: 6,
    horizontalKerning: 50,
    verticalKerning: 50,
    lightColor: "#CCC",
    darkColor: "#000",
    padding: 10,
    text: "SPHINX OF   BLACK QUARTZJUDGE MY VOW",
};

/**
 * Calculate glyph geometry for Octopus style
 * Uses radial segments emanating from center like tentacles
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

    const glyph = lookupGlyph(glyphMap, v);
    const center = getCenterOffset(x, y, horizontalKerning, verticalKerning);

    // Calculate line position for radial segment i
    // Each segment is rotated by i * 45° (π/4 radians)
    const calcLine = (i, angle = (i * Math.PI) / 4) => ({
        i,
        angle,
        x: center.x + innerRadius * Math.cos(angle),
        y: center.y + innerRadius * Math.sin(angle),
    });

    // Draw a line at the calculated position, perpendicular to radius
    const drawLine = (p, lineAngle = p.angle + Math.PI / 2) =>
        createLineFromAngle(p.x, p.y, lineAngle, lineLength, DEFAULT_PRECISION);

    const allSegments = Array.from({ length: 8 }, (_, i) => calcLine(i)).map((p) => drawLine(p));
    const activeSegments = Array.from({ length: 8 }, (_, i) =>
        glyph?.includes(i) ? calcLine(i) : null,
    )
        .filter(Boolean)
        .map((p) => drawLine(p));

    return createGlyphGroups(lightStrokeWidth, darkStrokeWidth, allSegments, activeSegments);
}

const Glyph = {
    title: "Octopus",
    glyphMap,
    defaults,
    glyphCalculator,
};

export default Glyph;
