uniform float uAngle;
uniform float uScale;
uniform float uSpeed;
uniform float uCenter;

out vec4 fragColor;

void main() {
    vec2 uv = distortUV(gl_FragCoord.xy / iResolution.xy);
    float time = iTime * uSpeed;

    vec2 c = uv - vec2(0.5 + uCenter * 0.4, 0.5);
    float ca = cos(uAngle);
    float sa = sin(uAngle);
    vec2 ruv = vec2(ca * c.x - sa * c.y, sa * c.x + ca * c.y);

    float v = 0.0;
    vec2 p = ruv * uScale * 10.0;
    float seed = uVariation * 6.2832;

    v += sin(p.x + time + seed);
    v += sin((p.y + time) * 0.5 + seed);
    v += sin((p.x + p.y + time) * 0.5 + seed);

    float cx = p.x + 0.5 * sin(time * 0.33);
    float cy = p.y + 0.5 * cos(time * 0.5);
    v += sin(sqrt(cx * cx + cy * cy + 1.0) + time);

    v = v * 0.5;
    float t = sin(v * 3.14159) * 0.5 + 0.5;

    vec3 color = paletteColor(t);
    color = applyLighting(color, t, uv);
    fragColor = finish(color, uv);
}
