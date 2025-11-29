const { PI, sin, cos, asin, sqrt } = Math;
const HALF_PI = PI / 2;
const TWO_PI = 2 * PI;

// Define only the "In" variants - all other variants are derived from these
const EasingIn = {
    Sine: (v) => 1 - cos(v * HALF_PI),
    Pow: (v, exp = 2) => v ** exp,
    Quad: (v) => EasingIn.Pow(v, 2),
    Cubic: (v) => EasingIn.Pow(v, 3),
    Quart: (v) => EasingIn.Pow(v, 4),
    Quint: (v) => EasingIn.Pow(v, 5),
    Expo: (v) => (v === 0 ? 0 : 2 ** (10 * (v - 1))),
    Circ: (v) => 1 - sqrt(1 - v * v),
    Back: (v, s = 1.70158) => v * v * ((s + 1) * v - s),
    Elastic: (v, amplitude = 1, period = 0.3) => {
        if (v === 0 || v === 1) return v;
        const s = amplitude < 1 ? period / 4 : (period / TWO_PI) * asin(1 / amplitude);
        return -(amplitude * 2 ** (10 * (v - 1)) * sin(((v - 1 - s) * TWO_PI) / period));
    },
    Bounce: (v, acceleration = 7.5625, divisor = 2.75) => {
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
