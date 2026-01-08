const { round, abs } = Math;

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
        : hslToRgb({
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

export function hslToRgb({ h, s, l }) {
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
