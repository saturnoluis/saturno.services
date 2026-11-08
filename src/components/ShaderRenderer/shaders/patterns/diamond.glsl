uniform float uAngle;
uniform float uScale;
uniform float uSpeed;
uniform float uCenter;

out vec4 fragColor;

void main() {
    vec2 uv = distortUV(pixelateUV(gl_FragCoord.xy) / iResolution.xy);

    vec2 p = uv - vec2(0.5 + uCenter * 0.4, 0.5);

    float ca = cos(uAngle);
    float sa = sin(uAngle);
    p = vec2(ca * p.x - sa * p.y, sa * p.x + ca * p.y);

    // Chebyshev distance = diamond (rotated square)
    float d = max(abs(p.x), abs(p.y));

    float t = 1.0 - abs(fract(d * uScale * 2.0 + iTime * uSpeed + uVariation) * 2.0 - 1.0);

    vec3 color = paletteColor(t);
    color = applyLighting(color, t, uv);
    fragColor = finish(color, uv);
}
