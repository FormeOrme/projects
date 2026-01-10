const { round, abs, max, min } = Math;

function hueFromString(str) {
    if (!str) return 0; // Fallback hue
    const hash = [...str].reduce((acc, char, i) => abs(acc + char.charCodeAt(0)) * 99 * i, 0);
    return (hash % 360) / 360; // Hue value between 0 and 1
}

export function rgbFromString(
    str,
    { saturation = 0.7, lightness = 0.5, fallback = [100, 100, 100] } = {},
) {
    return !str
        ? fallback
        : hsl2rgb({
              h: hueFromString(str),
              s: saturation,
              l: lightness,
          });
}

export function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

export function hsl2rgb({ h, s, l }) {
    let r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [round(r * 255), round(g * 255), round(b * 255)];
}

export function rgb2hsl([r, g, b] = [0, 0, 0]) {
    // Destructure RGB values and normalize to [0, 1]
    const [r, g, b] = rgb.map((value) => value / 255);

    // Find min and max values
    const maxC = max(r, g, b);
    const minC = min(r, g, b);
    const delta = maxC - minC;

    // Calculate lightness
    const l = (maxC + minC) / 2;

    // Calculate saturation
    let s = 0;
    if (delta !== 0) {
        s = delta / (1 - abs(2 * l - 1));
    }

    // Calculate hue
    let h = 0;
    if (delta !== 0) {
        if (maxC === r) {
            h = ((g - b) / delta) % 6;
        } else if (maxC === g) {
            h = (b - r) / delta + 2;
        } else if (maxC === b) {
            h = (r - g) / delta + 4;
        }
    }
    h = round(h * 60);
    if (h < 0) h += 360;

    // Convert saturation and lightness to percentages
    return {
        h: h / 360,
        s,
        l,
    };
}

export function hex2rgb(hex) {
    // Remove the leading '#' if present
    hex = hex.replace(/^#/, "");
    // Parse the hex string into RGB components
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

export function rgb2hex([r, g, b]) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

export function rgb2cymk([r, g, b]) {
    const c = 1 - r / 255;
    const m = 1 - g / 255;
    const y = 1 - b / 255;
    const k = min(c, m, y);
    return {
        c: (c - k) / (1 - k) || 0,
        m: (m - k) / (1 - k) || 0,
        y: (y - k) / (1 - k) || 0,
        k,
    };
}

export function cymk2rgb({ c, m, y, k }) {
    return [
        round(255 * (1 - c) * (1 - k)),
        round(255 * (1 - m) * (1 - k)),
        round(255 * (1 - y) * (1 - k)),
    ];
}
