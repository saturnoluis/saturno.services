uniform float uAngle;
uniform float uScale;
uniform float uSpeed;
uniform float uCenter;

out vec4 fragColor;

// Exact flat-top hexagon signed distance (0 = on the edge)
float sdHexagon(vec2 p, float r) {
    const vec3 k = vec3(-0.866025404, 0.5, 0.577350269);
    p = abs(p);
    p -= 2.0 * min(dot(k.xy, p), 0.0) * k.xy;
    p -= vec2(clamp(p.x, -k.z * r, k.z * r), r);
    return length(p) * sign(p.y);
}

void main() {
    vec2 uv = distortUV(pixelateUV(gl_FragCoord.xy) / iResolution.xy);

    vec2 p = uv - vec2(0.5 + uCenter * 0.4, 0.5);

    // Rotate by uAngle
    float ca = cos(uAngle);
    float sa = sin(uAngle);
    p = vec2(ca * p.x - sa * p.y, sa * p.x + ca * p.y);

    float r = 0.5 * uScale;
    float d = sdHexagon(p, r);

    // Concentric rings: triangle wave on distance
    float t = 1.0 - abs(fract(d * 1.5 + iTime * uSpeed + uVariation) * 2.0 - 1.0);

    vec3 color = paletteColor(t);
    color = applyLighting(color, t, uv);
    fragColor = finish(color, uv);
}
