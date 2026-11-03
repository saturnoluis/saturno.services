uniform float uAngle;
uniform float uScale;
uniform float uSpeed;
uniform float uCenter;

out vec4 fragColor;

void main() {
    vec2 uv = distortUV(gl_FragCoord.xy / iResolution.xy);
    float widthHeightRatio = iResolution.x / iResolution.y;
    uv.y /= widthHeightRatio;

    vec2 c = uv - vec2(0.5, 0.5 + uCenter * 0.4);
    float ca = cos(uAngle);
    float sa = sin(uAngle);
    uv = vec2(ca * c.x - sa * c.y, sa * c.x + ca * c.y) + vec2(0.5);

    // Wave parameters
    float slowing = 4.0;
    float frequency = 4.0 * uScale;
    float amplitudeLim = 2.0;

    float t_time = iTime * uSpeed;
    float phase = uVariation * 6.2832;

    float curvature = -pow(uv.y - 0.5, 2.0) / 0.5 + 0.5;
    float wave = cos((uv.y + t_time / slowing + phase) * frequency) / amplitudeLim;
    float line = wave * curvature + 0.55;

    vec2 centre = vec2(line, uv.y);
    vec2 pos = centre - uv;

    // 1/x hyperbola glow — intense near line, rapid falloff
    float dist = 1.0 / length(pos);
    dist *= 0.1;
    dist = pow(dist, 1.1);

    // Map position along the line to palette color
    float palT = uv.y * widthHeightRatio;
    palT = fract(palT + t_time * 0.1);

    vec3 color = dist * paletteColor(palT);

    // Tone mapping — soft highlight compression
    color = 1.0 - exp(-color);

    color = applyLighting(color, palT, gl_FragCoord.xy / iResolution.xy);
    fragColor = finish(color, gl_FragCoord.xy / iResolution.xy);
}
