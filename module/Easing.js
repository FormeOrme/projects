const { PI, sin, cos, asin, pow, sqrt, abs } = Math;
const HALF_PI = PI / 2;
const TWO_PI = 2 * PI;
// Constant to convert to radians
const ELASTIC_CONSTANT = (2 * PI) / 3;

/**
 * Creates an ease-out elastic easing function
 * @param {Object} options - Easing parameters
 * @param {number} options.frequency - Number of oscillations (default: 10)
 * @param {number} options.decay - How quickly oscillations die out (default: 10)
 * @param {number} options.phase - Wave phase shift (default: 0.75)
 * @returns {Function} Easing function that takes t (0-1) and returns eased value (0-1)
 */
export function makeEaseOutElastic({ frequency = 10, decay = 10, phase = 0.75 } = {}) {
    return (t) => {
        if (t === 0) return 0;
        if (t === 1) return 1;
        // frequency controls number of oscillations across t in [0,1]
        // decay controls how quickly the oscillations die out (smaller = slower decay)
        // phase shifts the wave left/right
        return pow(2, -decay * t) * sin((t * frequency - phase) * ELASTIC_CONSTANT) + 1;
    };
}

/**
 * Creates an ease-out bounce easing function
 * @param {number} n1 - Bounce strength/intensity (default: 7.5625). Higher = stronger bounces
 * @param {number} d1 - Bounce timing/distribution (default: 2.75). Higher = bounces compressed at end
 * @returns {Function} Easing function that takes t (0-1) and returns eased value (0-1)
 */
export function makeEaseOutBounce(n1 = 7.5625, d1 = 2.75) {
    return (t) => {
        // First bounce phase - largest bounce
        if (t < 1 / d1) {
            return n1 * t * t;
            // Second bounce phase - medium bounce
        } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
            // Third bounce phase - small bounce
        } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
            // Final bounce phase - tiny bounce to settle
        } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
    };
}

// Define only the "In" variants - all other variants are derived from these
const EasingIn = {
    Tween: (v, min = 0, max = 1) => min + (max - min) * v,
    Sine: (v) => 1 - cos(v * HALF_PI),
    Pow: (v, exp = 2) => v ** exp,
    Quad: (v) => EasingIn.Pow(v, 2),
    Cubic: (v) => EasingIn.Pow(v, 3),
    Quart: (v) => EasingIn.Pow(v, 4),
    Quint: (v) => EasingIn.Pow(v, 5),
    Expo: (v) => (v === 0 ? 0 : 2 ** (10 * (v - 1))),
    Circ: (v) => 1 - sqrt(1 - v * v),
    Back: (v, s = 1.70158) => v * v * ((s + 1) * v - s),
    Elastic: (v, frequency = 10, decay = 10, phase = 0.75) =>
        1 - makeEaseOutElastic({ frequency, decay, phase })(1 - v),
    ElasticClassic: (v, amplitude = 1, period = 0.3) => {
        if (v === 0 || v === 1) return v;
        const s = amplitude < 1 ? period / 4 : (period / TWO_PI) * asin(1 / amplitude);
        return -(amplitude * 2 ** (10 * (v - 1)) * sin(((v - 1 - s) * TWO_PI) / period));
    },
    BounceClassic: (v, acceleration = 7.5625, divisor = 2.75) => {
        const t = 1 - v;
        let bounceOut;
        if (t < 1 / divisor) {
            bounceOut = acceleration * t * t;
        } else if (t < 2 / divisor) {
            const t2 = t - 1.5 / divisor;
            bounceOut = acceleration * t2 * t2 + 0.75;
        } else if (t < 2.5 / divisor) {
            const t2 = t - 2.25 / divisor;
            bounceOut = acceleration * t2 * t2 + 0.9375;
        } else {
            const t2 = t - 2.625 / divisor;
            bounceOut = acceleration * t2 * t2 + 0.984375;
        }
        return 1 - bounceOut;
    },
    Bounce(v, p1 = 1.6, t2 = 3.5, p2 = 2) {
        const powK = EasingIn.Pow(v, p1);
        const t = 1 - v;
        const k2 = EasingIn.Tween(t, 1, t2) * EasingIn.Pow(t, p2);
        return powK * abs(cos(t * PI * k2));
    },
};

// Generate Out variants using the rule: easeOut(v) = 1 - easeIn(1 - v)
const EasingOut = {};
for (const [name, fn] of Object.entries(EasingIn)) {
    EasingOut[name] = (...args) => 1 - fn(1 - args[0], ...args.slice(1));
}

// Generate InOut variants using the rule: first half is easeIn scaled, second half is easeOut scaled
const EasingInOut = {};
for (const [name, fnIn] of Object.entries(EasingIn)) {
    const fnOut = EasingOut[name];
    EasingInOut[name] = (...args) =>
        args[0] < 0.5
            ? fnIn(2 * args[0], ...args.slice(1)) / 2
            : (1 + fnOut(2 * args[0] - 1, ...args.slice(1))) / 2;
}

// Combine into final API with conventional naming (easeInSine, easeOutSine, etc.)
const Easing = {};
for (const name of Object.keys(EasingIn)) {
    Easing[`easeIn${name}`] = EasingIn[name];
    Easing[`easeOut${name}`] = EasingOut[name];
    Easing[`easeInOut${name}`] = EasingInOut[name];
}

export default Object.freeze(Easing);
