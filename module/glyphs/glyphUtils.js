import { G, Line } from "/module/Svg.js";

/**
 * Utility functions for glyph rendering
 */

/**
 * Default precision for toPrecision() calls on coordinates
 */
export const DEFAULT_PRECISION = 4;

/**
 * Returns the result if value is truthy (non-zero), otherwise returns null.
 * Useful for conditionally rendering glyph elements based on stroke width or other numeric settings.
 *
 * @param {*} value - The value to check (typically a number like strokeWidth)
 * @param {*} result - The result to return if value is truthy
 * @returns {*} The result if value is truthy, null otherwise
 * MARK: visibleOrNull
 */
export function visibleOrNull(value, result) {
    return value !== 0 ? result : null;
}

/**
 * Look up a glyph definition from a glyph map, converting the character to uppercase.
 *
 * @param {Object} glyphMap - The glyph map object
 * @param {string} char - The character to look up
 * @returns {string|undefined} The glyph definition or undefined if not found
 * MARK: lookupGlyph
 */
export function lookupGlyph(glyphMap, char) {
    return glyphMap[char.toUpperCase()];
}

/**
 * Calculate the center offset for a glyph based on kerning and position.
 *
 * @param {number} x - The x position
 * @param {number} y - The y position
 * @param {number} horizontalKerning - The horizontal kerning value
 * @param {number} verticalKerning - The vertical kerning value
 * @returns {{x: number, y: number}} The center offset coordinates
 * MARK: getCenterOffset
 */
export function getCenterOffset(x, y, horizontalKerning, verticalKerning) {
    return {
        x: horizontalKerning / 2 + x,
        y: verticalKerning / 2 + y,
    };
}

/**
 * Create a line element from start and end coordinates with specified precision.
 *
 * @param {number} x1 - Start x coordinate
 * @param {number} y1 - Start y coordinate
 * @param {number} x2 - End x coordinate
 * @param {number} y2 - End y coordinate
 * @param {number} [precision=DEFAULT_PRECISION] - Precision for toPrecision()
 * @returns {Object} Line element
 * MARK: createLine
 */
export function createLine(x1, y1, x2, y2, precision = DEFAULT_PRECISION) {
    return Line.with({
        attribute: {
            x1: x1.toPrecision(precision),
            y1: y1.toPrecision(precision),
            x2: x2.toPrecision(precision),
            y2: y2.toPrecision(precision),
        },
    });
}

/**
 * Create a line element from a center point, angle, and length.
 *
 * @param {number} centerX - Center x coordinate
 * @param {number} centerY - Center y coordinate
 * @param {number} angle - Angle in radians for the line direction
 * @param {number} length - Length of the line
 * @param {number} [precision=DEFAULT_PRECISION] - Precision for toPrecision()
 * @returns {Object} Line element
 * MARK: createLineFromAngle
 */
export function createLineFromAngle(
    centerX,
    centerY,
    angle,
    length,
    precision = DEFAULT_PRECISION,
) {
    const x1 = centerX + length * Math.cos(angle);
    const y1 = centerY + length * Math.sin(angle);
    const x2 = centerX + length * Math.cos(angle + Math.PI);
    const y2 = centerY + length * Math.sin(angle + Math.PI);

    return createLine(x1, y1, x2, y2, precision);
}

/**
 * Create background and foreground glyph groups.
 * Returns an array with [background, foreground] groups.
 *
 * @param {number} lightStrokeWidth - Stroke width for background (light) segments
 * @param {number} darkStrokeWidth - Stroke width for foreground (dark) segments
 * @param {Array} allSegments - Array of all segment elements for background
 * @param {Array} activeSegments - Array of active segment elements for foreground
 * @returns {Array} Array with [background, foreground] groups
 * MARK: createGlyphGroups
 */
export function createGlyphGroups(lightStrokeWidth, darkStrokeWidth, allSegments, activeSegments) {
    return [
        visibleOrNull(lightStrokeWidth, G.with({ children: allSegments })),
        visibleOrNull(darkStrokeWidth, G.with({ children: activeSegments })),
    ];
}

export function hexFilter(glyph) {
    return (_, i) => glyph?.includes(i.toString(16));
}
