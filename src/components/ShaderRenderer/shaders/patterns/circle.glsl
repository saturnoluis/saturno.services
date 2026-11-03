uniform float uAngle;
uniform float uScale;
uniform float uSpeed;
uniform float uCenter;

out vec4 fragColor;

void main() {
    vec2 uv = distortUV(gl_FragCoord.xy / iResolution.xy);

    // Offset center by uCenter, in the direction given by uAngle
    vec2 center = vec2(0.5) + vec2(cos(uAngle), sin(uAngle)) * uCenter * 0.4;

    // Distance from offset center
    float d = length(uv - center);

    // Map distance to palette range, scaled
    float d_scaled = d * uScale * 2.0 + iTime * uSpeed + uVariation;

    // Ping-pong: 1,2,3,4,3,2,1,2,3,4,...
    // Triangle wave maps d_scaled into repeating 0→1→0 pattern
    float t = 1.0 - abs(fract(d_scaled * 0.5) * 2.0 - 1.0);

    vec3 color = paletteColor(t);
    color = applyLighting(color, t, uv);
    fragColor = finish(color, uv);
}
