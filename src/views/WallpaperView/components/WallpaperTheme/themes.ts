import {
	DEFAULT_UNIFORMS,
	type PresetId,
	type ShaderUniformOverrides,
	type ShaderUniforms,
} from '@/components/ShaderRenderer';
import { resolveUniforms } from '@/components/ShaderRenderer/lib/uniforms.ts';
import { hexToSrgb, srgbEquals } from '@/lib/color.ts';
import type { WallpaperConfig } from '@/state/wallpaper-context.ts';

export interface WallpaperTheme extends WallpaperConfig {
	id: string;
	label: string;
}

export const CUSTOM_ID = 'custom';

function color(hex: string): [number, number, number] {
	return hexToSrgb(hex);
}

function makeUniforms(
	overrides: ShaderUniformOverrides,
): ShaderUniforms {
	return resolveUniforms({ ...DEFAULT_UNIFORMS, ...overrides });
}

export const WALLPAPER_THEMES: WallpaperTheme[] = [
	{
		id: 'neon-bars',
		label: 'Neon Bars',
		preset: 'bars',
		uniforms: makeUniforms({
			uColor1: color('#ff006e'),
			uColor2: color('#8338ec'),
			uColor3: color('#3a86ff'),
			uColor4: color('#00f5d4'),
			uBlend: 0.25,
			uAngle: 0.6,
			uScale: 2.2,
			uSpeed: 0.2,
			uDither: 1,
			uDitherStrength: 0.35,
			uDitherLevels: 4,
		}),
	},
	{
		id: 'orbit',
		label: 'Orbit',
		preset: 'circle',
		uniforms: makeUniforms({
			uColor1: color('#ff7b00'),
			uColor2: color('#ffb703'),
			uColor3: color('#219ebc'),
			uColor4: color('#8ecae6'),
			uBlend: 0.5,
			uScale: 1.3,
			uSpeed: 0.1,
			uVariation: 0.4,
		}),
	},
	{
		id: 'crystal',
		label: 'Crystal',
		preset: 'diamond',
		uniforms: makeUniforms({
			uColor1: color('#e0aaff'),
			uColor2: color('#c77dff'),
			uColor3: color('#9d4edd'),
			uColor4: color('#5a189a'),
			uBlend: 0.6,
			uAngle: Math.PI / 4,
			uScale: 1.8,
			uVariation: 0.3,
			uDither: 1,
			uDitherStrength: 0.25,
			uDitherLevels: 5,
		}),
	},
	{
		id: 'golden-dunes',
		label: 'Golden Dunes',
		preset: 'dunes',
		uniforms: makeUniforms({
			uColor1: color('#e76f51'),
			uColor2: color('#f4a261'),
			uColor3: color('#e9c46a'),
			uColor4: color('#fefae0'),
			uBlend: 0.7,
			uAngle: 0.2,
			uScale: 1.5,
			uCenter: 0.3,
			uVariation: 0.8,
			uNoise: 0.15,
		}),
	},
	{
		id: 'hexagon-forest',
		label: 'Hexagon Forest',
		preset: 'hexagon',
		uniforms: makeUniforms({
			uColor1: color('#123524'),
			uColor2: color('#2d6a3f'),
			uColor3: color('#5ca85a'),
			uColor4: color('#a9d18e'),
			uBlend: 1,
			uDistortType: 0,
			uDistortStrength: 0.4,
			uLightingType: 0,
			uLightStrength: 0,
			uBevelWidth: 0.05,
			uLightAngle: -0.7853981633974483,
			uNoise: 0,
			uDither: 1,
			uDitherStrength: 1,
			uDitherLevels: 3,
			uVariation: 0.6,
			uAngle: -2.88159265358979,
			uScale: 0.42,
			uSpeed: 0,
			uCenter: -0.29,
		}),
	},
	{
		id: 'plasma',
		label: 'Plasma',
		preset: 'plasma',
		uniforms: makeUniforms({
			uColor1: color('#10002b'),
			uColor2: color('#3c096c'),
			uColor3: color('#7b2cbf'),
			uColor4: color('#e0aaff'),
			uBlend: 0.5,
			uScale: 1.2,
			uSpeed: 0.15,
			uVariation: 0.7,
			uDither: 1,
			uDitherStrength: 0.3,
			uDitherLevels: 5,
		}),
	},
	{
		id: 'ember',
		label: 'Ember',
		preset: 'spark',
		uniforms: makeUniforms({
			uColor1: color('#000000'),
			uColor2: color('#7f1d1d'),
			uColor3: color('#f97316'),
			uColor4: color('#fde047'),
			uBlend: 0.4,
			uSpeed: 0.3,
			uVariation: 0.9,
			uNoise: 0.2,
		}),
	},
	{
		id: 'topographic',
		label: 'Topographic',
		preset: 'terrain',
		uniforms: makeUniforms({
			uColor1: color('#0b3d2e'),
			uColor2: color('#1b6d4f'),
			uColor3: color('#7cb96a'),
			uColor4: color('#e0e1c4'),
			uBlend: 0.6,
			uScale: 2.4,
			uVariation: 0.6,
			uDither: 1,
			uDitherStrength: 0.5,
			uDitherLevels: 4,
		}),
	},
	{
		id: 'ocean-waves',
		label: 'Ocean Waves',
		preset: 'waves',
		uniforms: makeUniforms({
			uColor1: color('#03045e'),
			uColor2: color('#0077b6'),
			uColor3: color('#00b4d8'),
			uColor4: color('#90e0ef'),
			uBlend: 0.5,
			uScale: 1.8,
			uSpeed: 0.2,
		}),
	},
];

export function matchesTheme(
	theme: WallpaperTheme,
	preset: PresetId,
	uniforms: ShaderUniforms,
): boolean {
	if (theme.preset !== preset) {
		return false;
	}
	return (Object.keys(theme.uniforms) as (keyof ShaderUniforms)[]).every(
		(key) => {
			const a = theme.uniforms[key];
			const b = uniforms[key];
			if (Array.isArray(a)) {
				return Array.isArray(b) && srgbEquals(a, b);
			}
			return a === b;
		},
	);
}
