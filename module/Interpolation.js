const { PI, sin, cos, asin, sqrt } = Math;
const HALF_PI = PI / 2;
const TWO_PI = 2 * PI;

export default Interpolation = Object.freeze({
    easeInSine: (v) => 1 - cos(v * HALF_PI),
    easeOutSine: (v) => sin(v * HALF_PI),
    easeInOutSine: (v) => -0.5 * (cos(PI * v) - 1),

    easeInPow: (v, exp) => v ** exp,
    easeOutPow: (v, exp) => 1 - (1 - v) ** exp,
    easeInOutPow: (v, exp) => (v < 0.5 ? (2 * v) ** exp / 2 : 1 - (-2 * v + 2) ** exp / 2),

    easeInQuad: (v) => v * v,
    easeOutQuad: (v) => v * (2 - v),
    easeInOutQuad: (v) => (v < 0.5 ? 2 * v * v : -1 + (4 - 2 * v) * v),

    easeInExpo: (v) => (v === 0 ? 0 : 2 ** (10 * (v - 1))),
    easeOutExpo: (v) => (v === 1 ? 1 : 1 - 2 ** (-10 * v)),
    easeInOutExpo: (v) => {
        if (v === 0 || v === 1) return v;
        return v < 0.5 ? 2 ** (20 * v - 10) / 2 : (2 - 2 ** (-20 * v + 10)) / 2;
    },

    easeInCirc: (v) => 1 - sqrt(1 - v * v),
    easeOutCirc: (v) => sqrt(1 - (v - 1) * (v - 1)),
    easeInOutCirc: (v) =>
        v < 0.5 ? (1 - sqrt(1 - (2 * v) ** 2)) / 2 : (sqrt(1 - (-2 * v + 2) ** 2) + 1) / 2,

    easeInBack: (v, s = 1.70158) => v * v * ((s + 1) * v - s),
    easeOutBack: (v, s = 1.70158) => (v - 1) * (v - 1) * ((s + 1) * (v - 1) + s) + 1,
    easeInOutBack: (v, s = 1.70158) => {
        const s1 = s * 1.525;
        return v < 0.5
            ? ((2 * v) ** 2 * ((s1 + 1) * 2 * v - s1)) / 2
            : ((2 * v - 2) ** 2 * ((s1 + 1) * (v * 2 - 2) + s1) + 2) / 2;
    },

    easeInElastic: (v, amplitude = 1, period = 0.3) => {
        if (v === 0 || v === 1) return v;
        const s = amplitude < 1 ? period / 4 : (period / TWO_PI) * asin(1 / amplitude);
        return -(amplitude * 2 ** (10 * (v - 1)) * sin(((v - 1 - s) * TWO_PI) / period));
    },
    easeOutElastic: (v, amplitude = 1, period = 0.3) => {
        if (v === 0 || v === 1) return v;
        const s = amplitude < 1 ? period / 4 : (period / TWO_PI) * asin(1 / amplitude);
        return amplitude * 2 ** (-10 * v) * sin(((v - s) * TWO_PI) / period) + 1;
    },
    easeInOutElastic: (v, amplitude = 1, period = 0.45) => {
        if (v === 0 || v === 1) return v;
        const s = amplitude < 1 ? period / 4 : (period / TWO_PI) * asin(1 / amplitude);
        return v < 0.5
            ? -((amplitude * 2 ** (20 * v - 10) * sin(((20 * v - 10 - s) * TWO_PI) / period)) / 2)
            : (amplitude * 2 ** (-20 * v + 10) * sin(((20 * v - 10 - s) * TWO_PI) / period)) / 2 +
                  1;
    },

    easeInBounce: (v) => 1 - Interpolation.easeOutBounce(1 - v),
    easeOutBounce: (v) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (v < 1 / d1) {
            return n1 * v * v;
        } else if (v < 2 / d1) {
            return n1 * (v -= 1.5 / d1) * v + 0.75;
        } else if (v < 2.5 / d1) {
            return n1 * (v -= 2.25 / d1) * v + 0.9375;
        } else {
            return n1 * (v -= 2.625 / d1) * v + 0.984375;
        }
    },
    easeInOutBounce: (v) =>
        v < 0.5
            ? (1 - Interpolation.easeOutBounce(1 - 2 * v)) / 2
            : (1 + Interpolation.easeOutBounce(2 * v - 1)) / 2,
});
