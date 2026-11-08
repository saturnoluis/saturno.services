uniform float uAngle;
uniform float uScale;
uniform float uSpeed;
uniform float uCenter;

out vec4 fragColor;

void main() {
    vec2 uv = distortUV(pixelateUV(gl_FragCoord.xy) / iResolution.xy);
    float time = iTime * uSpeed;
    float phase = uVariation * 6.2832;

    // Rotate UV around offset center
    vec2 center = uv - vec2(0.5 + uCenter * 0.4, 0.5);
    float ca = cos(uAngle);
    float sa = sin(uAngle);
    vec2 ruv = vec2(ca * center.x - sa * center.y,
                    sa * center.x + ca * center.y);
    ruv += 0.5;

    // Layered sine waves
    float wave = 0.0;
    wave += sin(ruv.x * uScale * 20.0 + time * 2.0 + phase) * 0.25;
    wave += sin(ruv.x * uScale * 10.0 - time * 1.5 + ruv.y * 5.0 + phase) * 0.25;
    wave += sin(ruv.y * uScale * 15.0 + time * 1.0 + phase) * 0.15;
    wave += sin(length(center) * uScale * 15.0 - time * 2.0 + phase) * 0.2;

    float t = wave + ruv.y;
    t = clamp(t, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);

    vec3 color = paletteColor(t);
    color = applyLighting(color, t, uv);
    fragColor = finish(color, uv);
}
