export type Srgb = [number, number, number];

export interface Oklch {
	l: number;
	c: number;
	h: number;
}

function clamp(v: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, v));
}

function clampChannel(v: number): number {
	return clamp(v, 0, 1);
}

function srgbToLinear(channel: number): number {
	if (channel <= 0.04045) {
		return channel / 12.92;
	}
	return ((channel + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(channel: number): number {
	if (channel <= 0.0031308) {
		return channel * 12.92;
	}
	return 1.055 * channel ** (1 / 2.4) - 0.055;
}

function srgbToOklab(rgb: Srgb): [number, number, number] {
	const [r, g, b] = rgb.map(srgbToLinear);
	const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
	const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
	const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

	const l_ = Math.cbrt(l);
	const m_ = Math.cbrt(m);
	const s_ = Math.cbrt(s);

	return [
		0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
		1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
		0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
	];
}

function oklabToSrgb(lab: [number, number, number]): Srgb {
	const [L, a, b] = lab;
	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.291485548 * b;

	const l = l_ ** 3;
	const m = m_ ** 3;
	const s = s_ ** 3;

	return [
		clampChannel(
			linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
		),
		clampChannel(
			linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
		),
		clampChannel(
			linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
		),
	];
}

/** Parse a CSS `oklch(L C H)` string (hue in degrees) into its components. */
export function parseOklch(input: string): Oklch {
	const match = input.trim().match(/^oklch\(\s*([^)]+)\)$/i);
	if (!match) {
		throw new Error(`Invalid oklch color: ${input}`);
	}

	const [body] = match[1].split('/');
	const parts = body.trim().split(/\s+/);
	if (parts.length < 3) {
		throw new Error(`Invalid oklch color: ${input}`);
	}

	return {
		l: parseComponent(parts[0]),
		c: parseComponent(parts[1]),
		h: parseComponent(parts[2]),
	};
}

function parseComponent(value: string): number {
	let raw = value.trim();
	if (raw.endsWith('%')) {
		raw = raw.slice(0, -1);
	}
	const parsed = Number(raw);
	if (!Number.isFinite(parsed)) {
		throw new Error(`Invalid oklch component: ${value}`);
	}
	return parsed;
}

export function oklchToSrgb(l: number, c: number, h: number): Srgb {
	const hRad = (h * Math.PI) / 180;
	const a = c * Math.cos(hRad);
	const b = c * Math.sin(hRad);
	return oklabToSrgb([l, a, b]);
}

export function srgbToOklch(rgb: Srgb): Oklch {
	const [l, a, b] = srgbToOklab(rgb);
	const c = Math.sqrt(a * a + b * b);
	let h = (Math.atan2(b, a) * 180) / Math.PI;
	if (h < 0) {
		h += 360;
	}
	return { l, c, h };
}

function formatNumber(value: number): string {
	return String(Math.round(value * 10000) / 10000);
}

/** Serialize sRGB back to a CSS `oklch(...)` string (for writing to `:root`). */
export function srgbToOklchString(rgb: Srgb): string {
	const { l, c, h } = srgbToOklch(rgb);
	return `oklch(${formatNumber(l)} ${formatNumber(c)} ${formatNumber(h)})`;
}

const CONTRAST_LIGHTNESS_THRESHOLD = 0.55;
const DARK_TEXT_L = 0.15;
const DARK_TEXT_C = 0.05;
const LIGHT_TEXT_L = 0.95;
const LIGHT_TEXT_C = 0.05;

/** Pick a legible text color for a given accent sRGB, preserving its hue. */
export function contrastColorFor(rgb: Srgb): Srgb {
	const { l, h } = srgbToOklch(rgb);
	const light = l >= CONTRAST_LIGHTNESS_THRESHOLD;
	return oklchToSrgb(
		light ? DARK_TEXT_L : LIGHT_TEXT_L,
		light ? DARK_TEXT_C : LIGHT_TEXT_C,
		h,
	);
}

/** Pick a shadow color opposite to the accent's legible text color. */
export function contrastShadowFor(rgb: Srgb): Srgb {
	const { l, h } = srgbToOklch(rgb);
	const light = l >= CONTRAST_LIGHTNESS_THRESHOLD;
	return oklchToSrgb(
		light ? LIGHT_TEXT_L : DARK_TEXT_L,
		light ? LIGHT_TEXT_C : DARK_TEXT_C,
		h,
	);
}

export function srgbToHex([r, g, b]: Srgb): string {
	const to = (v: number) =>
		Math.round(clampChannel(v) * 255)
			.toString(16)
			.padStart(2, '0');
	return `#${to(r)}${to(g)}${to(b)}`;
}

export function hexToSrgb(hex: string): Srgb {
	const n = Number.parseInt(hex.replace('#', ''), 16);
	return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function srgbEquals(a: Srgb, b: Srgb, epsilon = 1e-3): boolean {
	return (
		Math.abs(a[0] - b[0]) < epsilon &&
		Math.abs(a[1] - b[1]) < epsilon &&
		Math.abs(a[2] - b[2]) < epsilon
	);
}
