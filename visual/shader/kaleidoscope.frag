precision mediump float;

// =============================================================================
// MARK: Constants
// =============================================================================
#define PI 3.1415926535897932384626433832795
#define TWO_PI 6.283185307179586476925286766559
#define OCTAVES 6

uniform float u_time;
uniform vec2 u_resolution;

// =============================================================================
// MARK: Math & Noise
// =============================================================================

float random(in vec3 st) {
    return fract(sin(dot(st.xyz, vec3(12.9898, 78.233, 45.164))) * 43758.5453123);
}

float noise(in vec3 st) {
    vec3 i = floor(st);
    vec3 f = fract(st);

    // 8 corners of the cube
    float a = random(i);
    float b = random(i + vec3(1.0, 0.0, 0.0));
    float c = random(i + vec3(0.0, 1.0, 0.0));
    float d = random(i + vec3(1.0, 1.0, 0.0));

    float e = random(i + vec3(0.0, 0.0, 1.0));
    float f2 = random(i + vec3(1.0, 0.0, 1.0));
    float g = random(i + vec3(0.0, 1.0, 1.0));
    float h = random(i + vec3(1.0, 1.0, 1.0));

    vec3 u = f * f * (3.0 - 2.0 * f);

    return mix(mix(mix(a, b, u.x), mix(c, d, u.x), u.y), mix(mix(e, f2, u.x), mix(g, h, u.x), u.y), u.z);
}

float fbm(in vec3 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for(int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// =============================================================================
// MARK: Coord Transforms
// =============================================================================

// Calculates the Ultraviolet coordinates relative to the screen center and aspect ratio
vec2 getNormalizedUV(vec2 coord, vec2 resolution, float zoom) {
    return (coord - 0.5 * resolution.xy) / resolution.y * zoom;
}

// Applies FBM displacement to UV coordinates
vec2 displace(vec2 uv, float amount) {
    float fbmAmount = fbm(vec3(uv * 0.5, 2.1));
    return uv + uv * fbmAmount * amount;
}

// Applies time-based warping movement
vec2 applyWarp(vec2 uv, float r) {
    uv.x -= sin(u_time * 0.313 + r * 2.1 * cos(u_time * 0.17)) * 0.37;
    uv.y += cos(u_time * 0.213 + r * 1.7 * sin(u_time * 0.23)) * 0.45;
    return uv;
}

// Applies kaleidoscope mirroring effect
vec2 getKaleidoscopeGrid(vec2 uv, float sides) {
    uv *= 3.0; // Scale
    float r = length(uv);
    float a = atan(uv.y, uv.x) + PI; // Angle 0 to 2PI

    float segment = TWO_PI / sides;
    float index = floor(a / segment);
    float localAngle = mod(a, segment);

    // Mirror every other segment
    if(mod(index, 2.0) >= 1.0) {
        localAngle = segment - localAngle;
    }

    return vec2(cos(localAngle), sin(localAngle)) * pow(r, 0.6);
}

// =============================================================================
// MARK: Pattern Gen
// =============================================================================

// Generates FBM noise texture
float noiseTexture(vec2 uv, float scale) {
    vec3 pos = vec3(uv * 3.0, u_time * 0.5);
    return fbm(pos);
}

// Generates diagonal stripes pattern
float stripes(vec2 uv, float scale) {
    float angle = PI / 2.0; // 90 degrees rotation
    mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    vec2 rotatedUV = rotation * uv * scale;
    return smoothstep(0.35, 0.65, abs(sin(rotatedUV.x + rotatedUV.y)));
}

// Generates diagonal gradient
float diagonalGradient(vec2 uv, float scale) {
    return (uv.x - uv.y + scale / 2.0) / scale;
}

// =============================================================================
// MARK: Color Logic
// =============================================================================

vec3 colorMapping(float noisePos, float time) {
    float n = smoothstep(0.2, 0.7, noisePos);
    vec3 color = vec3(n);

    // Color transition logic
    float redAmount = 1.0 - smoothstep(0.0, 0.05, n);
    vec3 accentColor = vec3(0.31, 0.76, 0.29 - sin(time * 0.12));

    return mix(color, accentColor, redAmount);
}

// =============================================================================
// MARK: Main
// =============================================================================

void main() {
    float zoom = 13.0;
    vec2 uv = getNormalizedUV(gl_FragCoord.xy, u_resolution, zoom);

    // Apply distortions
    uv = displace(uv, 4.0);

    // Generate pattern
    float pattern = diagonalGradient(uv, 20.0);

    // Compute Color
    vec3 color = vec3(pattern);

    gl_FragColor = vec4(color, 1.0);
}