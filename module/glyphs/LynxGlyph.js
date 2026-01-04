import {
    lookupGlyph,
    getCenterOffset,
    createLine,
    createGlyphGroups,
    hexFilter,
} from "/module/glyphs/glyphUtils.js";

/**
 * Lynx glyph calculator
 * In this system the grid is made of 11 segments in a four square grid, arranged like so:
 
 0 ─────
 1  \ /
     X
 2  / \
 3  \ /
     X
 4  / \
 5 ─────
 6  \ /
     X
 7  / \
 8  \ /
     X
 9  / \
 a ─────
 
 *  For each glyph only up to 3 segments are used.
 *  The diagonal segments are exclusive to each other in a square.
 *  No more than 2 diagonal or horizontal segments can be used in a single glyph.
 */

const glyphMap = {
    A: "15",
    B: "1469",
    C: "46",
    D: "19",
    E: "258",
    F: "25",
    G: "59",
    H: "5",
    I: "3",
    J: "09",
    K: "28",
    L: "a",
    M: "15",
    N: "1",
    O: "0a",
    P: "05",
    Q: "08",
    R: "06",
    S: "29",
    T: "0",
    U: "5a",
    V: "8",
    W: "68",
    X: "47",
    Y: "36",
    Z: "18",
};

const defaults = {
    lineLength: 30,
    maxGlyphsInRow: 20,
    zoom: 1.5,
    lightStrokeWidth: 5,
    darkStrokeWidth: 10,
    horizontalKerning: 40,
    verticalKerning: 140,
    lightColor: "#1111",
    darkColor: "#0004",
    padding: 10,
    text: "SPHINX OF BLACK     QUARTZ JUDGE MY VOW",
};

const cells = (cellSide) => [
    /* 0 */ { y0: -cellSide * 2, y1: -cellSide * 2 },
    /* 1 */ { y0: -cellSide * 2, y1: -cellSide },
    /* 2 */ { y0: -cellSide, y1: -cellSide * 2 },
    /* 3 */ { y0: -cellSide, y1: 0 },
    /* 4 */ { y0: 0, y1: -cellSide },
    /* 5 */ { y0: 0, y1: 0 },
    /* 6 */ { y0: 0, y1: cellSide },
    /* 7 */ { y0: cellSide, y1: 0 },
    /* 8 */ { y0: cellSide, y1: cellSide * 2 },
    /* 9 */ { y0: cellSide * 2, y1: cellSide },
    /* a */ { y0: cellSide * 2, y1: cellSide * 2 },
];

const segments = (cellSide, x, y) =>
    cells(cellSide).map((cell) => [
        /*x0 */ x + -cellSide / 2,
        /*y0 */ y + cell.y0,
        /*x1 */ x + cellSide / 2,
        /*y1 */ y + cell.y1,
    ]);

/**
 * Calculate glyph geometry for Octopus style
 * Uses radial segments emanating from center like tentacles
 */
function glyphCalculator({ glyphMap, args, x: ox, y: oy, v }) {
    const {
        lineLength: cellSide,
        lightStrokeWidth,
        darkStrokeWidth,
        horizontalKerning,
        verticalKerning,
    } = args;

    const glyph = lookupGlyph(glyphMap, v);
    const { x, y } = getCenterOffset(ox, oy, horizontalKerning, verticalKerning);

    const allSegments = segments(cellSide, x, y).map((seg) => createLine(...seg));
    const activeSegments = allSegments.filter(hexFilter(glyph));

    return createGlyphGroups(lightStrokeWidth, darkStrokeWidth, allSegments, activeSegments);
}

const Glyph = {
    title: "Lynx",
    glyphMap,
    defaults,
    glyphCalculator,
};

export default Glyph;
