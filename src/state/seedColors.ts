import {
	DEFAULT_UNIFORMS,
	PRESETS,
	type PresetId,
	type ShaderUniformOverrides,
	type ShaderUniforms,
} from '@/components/ShaderRenderer';
import { resolveUniforms } from '@/components/ShaderRenderer/lib/uniforms.ts';
import {
	oklchToSrgb,
	parseOklch,
	srgbToOklchString,
	contrastColorFor,
	contrastShadowFor,
	type Srgb,
} from '@/lib/color.ts';
import {
	AUTO_TARGET_ID,
	DEFAULT_TARGET_ID,
	isProfileId,
} from '@/lib/resolution.ts';
import type { WallpaperConfig } from '@/state/wallpaper-context.ts';

export const SEED_COLOR_COUNT = 4;

export const SEED_COLOR_VARS = [
	'--color-seed-1',
	'--color-seed-2',
	'--color-seed-3',
	'--color-seed-4',
] as const;

export const COLOR_UNIFORM_KEYS = [
	'uColor1',
	'uColor2',
	'uColor3',
	'uColor4',
] as const;

export type ColorKey = (typeof COLOR_UNIFORM_KEYS)[number];

const STORAGE_KEY = 'ok-wallpaper-config';

function isRgbTuple(value: unknown): value is Srgb {
	return (
		Array.isArray(value) &&
		value.length === 3 &&
		value.every((n) => typeof n === 'number' && Number.isFinite(n))
	);
}

export function readSeedColorsFromCss(): string[] {
	if (typeof document === 'undefined') {
		return [];
	}
	const styles = getComputedStyle(document.documentElement);
	return SEED_COLOR_VARS.map((name) => styles.getPropertyValue(name).trim());
}

export function readSeedRgbFromCss(): (Srgb | null)[] {
	return readSeedColorsFromCss().map((raw) => {
		if (!raw) {
			return null;
		}
		try {
			const { l, c, h } = parseOklch(raw);
			return oklchToSrgb(l, c, h);
		} catch {
			return null;
		}
	});
}

export function resolveSeedRgb(): Srgb[] {
	const fromCss = readSeedRgbFromCss();
	return COLOR_UNIFORM_KEYS.map((key, i) => {
		const rgb = fromCss[i];
		if (rgb) {
			return rgb;
		}
		return DEFAULT_UNIFORMS[key];
	});
}

export function uniformsToSeedRgb(uniforms: ShaderUniforms): Srgb[] {
	return COLOR_UNIFORM_KEYS.map((key) => uniforms[key]);
}

export function withSeedColors(uniforms: ShaderUniforms): ShaderUniforms {
	const seeds = resolveSeedRgb();
	const result = { ...uniforms };
	COLOR_UNIFORM_KEYS.forEach((key, i) => {
		result[key] = seeds[i];
	});
	return result;
}

export function writeSeedColorsToCss(rgb: Srgb[]): void {
	if (typeof document === 'undefined') {
		return;
	}
	const root = document.documentElement;
	SEED_COLOR_VARS.forEach((name, i) => {
		root.style.setProperty(name, srgbToOklchString(rgb[i]));
	});
	const accent = rgb[0];
	if (accent) {
		root.style.setProperty(
			'--color-accent-contrast',
			srgbToOklchString(contrastColorFor(accent)),
		);
		root.style.setProperty(
			'--color-accent-shadow',
			srgbToOklchString(contrastShadowFor(accent)),
		);
	}
}

export function loadStoredConfig(): WallpaperConfig | null {
	if (typeof localStorage === 'undefined') {
		return null;
	}
	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) {
		return null;
	}

	try {
		const data = JSON.parse(raw) as {
			preset?: unknown;
			uniforms?: unknown;
			targetId?: unknown;
		};

		const preset = PRESETS.some((p) => p.id === data.preset)
			? (data.preset as PresetId)
			: null;
		if (!preset) {
			return null;
		}

		const uniforms = sanitizeUniforms(data.uniforms);
		const targetId =
			typeof data.targetId === 'string' &&
			(data.targetId === AUTO_TARGET_ID || isProfileId(data.targetId))
				? data.targetId
				: DEFAULT_TARGET_ID;

		return { preset, uniforms, targetId };
	} catch {
		return null;
	}
}

export function saveConfig(config: WallpaperConfig): void {
	if (typeof localStorage === 'undefined') {
		return;
	}
	localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

function sanitizeUniforms(value: unknown): ShaderUniforms {
	const overrides: ShaderUniformOverrides = {};
	if (typeof value !== 'object' || value === null) {
		return resolveUniforms(overrides);
	}

	const record = value as Record<string, unknown>;

	for (const key of COLOR_UNIFORM_KEYS) {
		const entry = record[key];
		if (isRgbTuple(entry)) {
			overrides[key] = entry;
		}
	}

	for (const key of Object.keys(DEFAULT_UNIFORMS) as (keyof ShaderUniforms)[]) {
		if ((COLOR_UNIFORM_KEYS as readonly string[]).includes(key)) {
			continue;
		}
		const entry = record[key];
		if (typeof entry === 'number' && Number.isFinite(entry)) {
			(overrides as Record<string, unknown>)[key] = entry;
		}
	}

	return resolveUniforms(overrides);
}
