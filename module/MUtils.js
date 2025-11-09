export default class MUtils {
    static toRadians = (degrees) => degrees * (Math.PI / 180);
    static toDegrees = (radians) => radians * (180 / Math.PI);

    static randomPoints(num) {
        const points = Array.from({ length: num }, () => [
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
        ]);
        return points;
    }

    static circlePoints(num, radius = 1, wiggle = 0) {
        const points = Array.from({ length: num }, (_, i) => {
            const angle = (i / num) * Math.PI * 2;
            const x = radius * Math.cos(angle) + (Math.random() - 0.5) * wiggle;
            const y = radius * Math.sin(angle) + (Math.random() - 0.5) * wiggle;
            return [x, y];
        });
        return points;
    }

    /**
     * Calculate the intersection points of two circles.
     * @param {Object} params - The parameters for the circles.
     * @param {number} params.x1 - The x coordinate of the center of the first circle.
     * @param {number} params.y1 - The y coordinate of the center of the first circle.
     * @param {number} params.r1 - The radius of the first circle.
     * @param {number} params.x2 - The x coordinate of the center of the second circle.
     * @param {number} params.y2 - The y coordinate of the center of the second circle.
     * @param {number} params.r2 - The radius of the second circle.
     * @param {number} params.cx - The x coordinate of the center point for sorting.
     * @param {number} params.cy - The y coordinate of the center point for sorting.
     * @returns {Array<Object>} The intersection points sorted by distance to the center point.
     */
    static circleIntersectionPoints({ x1, y1, r1, x2, y2, r2, cx, cy }) {
        // Calculate the distance between the centers
        const dx = x2 - x1;
        const dy = y2 - y1;
        const d2 = dx ** 2 + dy ** 2; // Squared distance for efficiency
        const d = d2 ** (1 / 2);

        // Check if there are no intersections
        if (d > r1 + r2 || d < (r1 - r2) ** 2 || d === 0) {
            return []; // No intersection
        }

        // Calculate the distance from the first circle's center to the midpoint between the intersection points
        const r1Sq = r1 ** 2;
        const r2Sq = r2 ** 2;
        const a = (r1Sq - r2Sq + d2) / (2 * d);

        // Find the midpoint
        const xm = x1 + (dx * a) / d;
        const ym = y1 + (dy * a) / d;

        // Calculate the height of the intersection points above or below the line
        const h2 = r1Sq - a ** 2; // h squared for efficiency
        const h = h2 > 0 ? h2 ** (1 / 2) : 0; // Ensure h2 is non-negative to avoid NaN

        // The offsets from the midpoint
        const rx = -(dy * h) / d;
        const ry = (dx * h) / d;

        // Intersection points
        const p1x = xm + rx,
            p1y = ym + ry;
        const p2x = xm - rx,
            p2y = ym - ry;

        // Precompute squared distances to the center (cx, cy) for sorting
        const d1Sq = (p1x - cx) ** 2 + (p1y - cy) ** 2;
        const d2Sq = (p2x - cx) ** 2 + (p2y - cy) ** 2;

        // Return points sorted by squared distance to avoid square root computation
        return d1Sq <= d2Sq
            ? [
                  { x: p1x, y: p1y },
                  { x: p2x, y: p2y },
              ]
            : [
                  { x: p2x, y: p2y },
                  { x: p1x, y: p1y },
              ];
    }

    static random(l) {
        return Math.floor(Math.random() * l);
    }
}
