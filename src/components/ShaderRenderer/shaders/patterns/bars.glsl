uniform float uAngle;
uniform float uScale;
uniform float uSpeed;
uniform float uCenter;

out vec4 fragColor;

void main() {
    vec2 uv = distortUV(pixelateUV(gl_FragCoord.xy) / iResolution.xy);
    // Rotate the gradient direction
    vec2 dir = vec2(cos(uAngle), sin(uAngle));
    float t = dot(uv - 0.5 - vec2(uCenter * 0.5, 0.0), dir) * uScale + 0.5 + iTime * uSpeed;
    t = clamp(t, 0.0, 1.0);
    vec3 color = paletteColor(t);
    color = applyLighting(color, t, uv);
    fragColor = finish(color, uv);
}
