import {
	DEFAULT_UNIFORMS,
	type PresetId,
	type ShaderUniformOverrides,
	type ShaderUniforms,
} from '@/components/ShaderRenderer';
import { resolveUniforms } from '@/components/ShaderRenderer/lib/uniforms.ts';
import { srgbEquals } from '@/lib/color.ts';
import type { WallpaperConfig } from '@/state/Wallpaper';

export interface WallpaperTheme extends Omit<WallpaperConfig, 'targetId'> {
	id: string;
	label: string;
}

export const CUSTOM_ID = 'custom';

function makeUniforms(overrides: ShaderUniformOverrides): ShaderUniforms {
	return resolveUniforms({ ...DEFAULT_UNIFORMS, ...overrides });
}

export const WALLPAPER_THEMES: WallpaperTheme[] = [
	{
		id: 'default',
		label: 'Default',
		preset: 'bars',
		uniforms: makeUniforms({
			uColor1: [
				0.1450980392156863, 0.23921568627450981, 0.24705882352941178,
			],
			uColor2: [
				0.3058823529411765, 0.2549019607843137, 0.21176470588235294,
			],
			uColor3: [
				0.1450980392156863, 0.1568627450980392, 0.15294117647058825,
			],
			uColor4: [0, 0, 0],
			uBlend: 0,
			uDistortType: 0,
			uDistortStrength: 2.85,
			uLightingType: 0,
			uLightStrength: 0.13,
			uBevelWidth: 0,
			uLightAngle: -0.421592653589793,
			uNoise: 0.02,
			uDither: 0,
			uDitherStrength: 0.69,
			uDitherLevels: 4,
			uVariation: 1,
			uAngle: -0.961592653589793,
			uScale: 0.99,
			uSpeed: 0,
			uCenter: 0.6,
			uPixelate: 128,
		}),
	},
	{
		id: 'blissful-experience',
		label: 'Blissful Experience',
		preset: 'dunes',
		uniforms: makeUniforms({
			uColor1: [
				0.043137254901960784, 0.2627450980392157, 0.7450980392156863,
			],
			uColor2: [
				0.47843137254901963, 0.7372549019607844, 0.9764705882352941,
			],
			uColor3: [
				0.27450980392156865, 0.5490196078431373, 0.027450980392156862,
			],
			uColor4: [
				0.00784313725490196, 0.09019607843137255, 0.1450980392156863,
			],
			uBlend: 1,
			uDistortType: 0,
			uDistortStrength: 0.67,
			uLightingType: 1,
			uLightStrength: 0.23,
			uBevelWidth: 0.19,
			uLightAngle: 1.67840734641021,
			uNoise: 0.06,
			uDither: 0,
			uDitherStrength: 0.5,
			uDitherLevels: 4,
			uVariation: 0.44,
			uAngle: -0.131592653589793,
			uScale: 0.36,
			uSpeed: 0,
			uCenter: -0.59,
			uPixelate: 0,
		}),
	},
	{
		id: 'ok-luis',
		label: 'ok-Luis',
		preset: 'dunes',
		uniforms: makeUniforms({
			uColor1: [
				0.047058823529411764, 0.00392156862745098, 0.17647058823529413,
			],
			uColor2: [
				0.17254901960784313, 0.00392156862745098, 0.3607843137254902,
			],
			uColor3: [
				0.33725490196078434, 0.00392156862745098, 0.5294117647058824,
			],
			uColor4: [
				0.5411764705882353, 0.00784313725490196, 0.6980392156862745,
			],
			uBlend: 1,
			uDistortType: 3,
			uDistortStrength: 2.85,
			uLightingType: 3,
			uLightStrength: 0.25,
			uBevelWidth: 0.11,
			uLightAngle: 1.67840734641021,
			uNoise: 0.1,
			uDither: 0,
			uDitherStrength: 1,
			uDitherLevels: 2,
			uVariation: 1,
			uAngle: -2.96159265358979,
			uScale: 0.41,
			uSpeed: 0,
			uCenter: 0.07,
		}),
	},
	{
		id: 'solar-flare',
		label: 'Solar Flare',
		preset: 'bars',
		uniforms: makeUniforms({
			uColor1: [0.1450980392156863, 0.1450980392156863, 0.1450980392156863],
			uColor2: [
				0.5058823529411764, 0.14901960784313725, 0.054901960784313725,
			],
			uColor3: [
				0.9529411764705882, 0.4823529411764706, 0.07058823529411765,
			],
			uColor4: [
				0.12156862745098039, 0.12156862745098039, 0.12156862745098039,
			],
			uBlend: 1,
			uDistortType: 0,
			uDistortStrength: 1.61,
			uLightingType: 3,
			uLightStrength: 0.77,
			uBevelWidth: 0.13,
			uLightAngle: 1.67840734641021,
			uNoise: 0.08,
			uDither: 0,
			uDitherStrength: 0.5,
			uDitherLevels: 4,
			uVariation: 0.37,
			uAngle: 1.05840734641021,
			uScale: 1.46,
			uSpeed: 0,
			uCenter: -0.14,
		}),
	},
	{
		id: 'teal-95',
		label: 'Teal 95',
		preset: 'circle',
		uniforms: makeUniforms({
			uColor1: [0, 0.3137254901960784, 0.3137254901960784],
			uColor2: [0, 0.5019607843137255, 0.4980392156862745],
			uColor3: [0, 0.5019607843137255, 0.4980392156862745],
			uColor4: [0, 0.5019607843137255, 0.4980392156862745],
			uBlend: 0,
			uDistortType: 0,
			uDistortStrength: 1.97,
			uLightingType: 2,
			uLightStrength: 0.22,
			uBevelWidth: 0.32,
			uLightAngle: 1.52840734641021,
			uNoise: 0,
			uDither: 0,
			uDitherStrength: 0.5,
			uDitherLevels: 4,
			uVariation: 0.37,
			uAngle: -1.44159265358979,
			uScale: 0.1,
			uSpeed: 0,
			uCenter: 1,
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
