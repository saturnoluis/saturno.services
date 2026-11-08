export const DistortType = {
	None: 0,
	Swirl: 1,
	Fisheye: 2,
	SineWave: 3,
} as const;

export type DistortType = (typeof DistortType)[keyof typeof DistortType];

export const LightingType = {
	None: 0,
	Bevel: 1,
	Gradient: 2,
	Vignette: 3,
} as const;

export type LightingType = (typeof LightingType)[keyof typeof LightingType];

export type ShaderUniforms = {
	/** Palette stop 1, RGB in [0,1]. */
	uColor1: [number, number, number];
	/** Palette stop 2, RGB in [0,1]. */
	uColor2: [number, number, number];
	/** Palette stop 3, RGB in [0,1]. */
	uColor3: [number, number, number];
	/** Palette stop 4, RGB in [0,1]. */
	uColor4: [number, number, number];
	/** Softness of palette band transitions, [0,1]. */
	uBlend: number;
	/** Distortion mode, see `DistortType`. */
	uDistortType: DistortType;
	/** Distortion amount; effect depends on mode. */
	uDistortStrength: number;
	/** Lighting mode, see `LightingType`. */
	uLightingType: LightingType;
	/** Lighting intensity, [0,1]. */
	uLightStrength: number;
	/** Bevel width for `LightingType.Bevel`, [0,1]. */
	uBevelWidth: number;
	/** Light direction angle (radians) for `LightingType.Gradient`. */
	uLightAngle: number;
	/** Grain amount, [0,1]; 0 disables noise. */
	uNoise: number;
	/** Dither on/off threshold: >= 0.5 enables ordered dithering. */
	uDither: number;
	/** Dither strength, [0,1]. */
	uDitherStrength: number;
	/** Number of quantization levels for dithering, >= 1. */
	uDitherLevels: number;
	/** Pattern variation/seed, [0,1] (used by some presets). */
	uVariation: number;
	/** Rotation/angle (radians) for angle-based presets. */
	uAngle: number;
	/** Pattern scale (preset-dependent). */
	uScale: number;
	/** Animation speed multiplier (multiplies `iTime`). */
	uSpeed: number;
	/** Center offset, [-1,1] (used by some presets). */
	uCenter: number;
	/** Pixelation: number of blocks across the width; 0 disables. */
	uPixelate: number;
};

export const DEFAULT_UNIFORMS: ShaderUniforms = {
	uColor1: [0.8, 0.33, 0.0],
	uColor2: [0.93, 0.53, 0.07],
	uColor3: [1.0, 0.75, 0.15],
	uColor4: [1.0, 0.92, 0.35],
	uBlend: 0.5,
	uDistortType: DistortType.None,
	uDistortStrength: 0.4,
	uLightingType: LightingType.None,
	uLightStrength: 0.0,
	uBevelWidth: 0.05,
	uLightAngle: -Math.PI / 4,
	uNoise: 0.0,
	uDither: 0.0,
	uDitherStrength: 0.5,
	uDitherLevels: 4.0,
	uVariation: 0.0,
	uAngle: Math.PI / 4,
	uScale: 1.0,
	uSpeed: 0.0,
	uCenter: 0.0,
	uPixelate: 0.0,
};

export type ShaderUniformOverrides = Partial<ShaderUniforms>;

function clamp(v: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, v));
}

function clampChannel(v: number): number {
	return clamp(v, 0, 1);
}

function clampColor(c: [number, number, number]): [number, number, number] {
	return [clampChannel(c[0]), clampChannel(c[1]), clampChannel(c[2])];
}

/**
 * Merge `overrides` onto `DEFAULT_UNIFORMS` and clamp every value into its
 * valid range so the shader can never receive values that produce NaN or
 * undefined behavior (e.g. division by zero, reversed smoothstep edges).
 */
export function resolveUniforms(
	overrides: ShaderUniformOverrides = {},
): ShaderUniforms {
	const u = { ...DEFAULT_UNIFORMS, ...overrides };

	u.uColor1 = clampColor(u.uColor1);
	u.uColor2 = clampColor(u.uColor2);
	u.uColor3 = clampColor(u.uColor3);
	u.uColor4 = clampColor(u.uColor4);
	u.uBlend = clamp(u.uBlend, 0, 1);
	u.uDistortType = clamp(
		Math.round(u.uDistortType),
		DistortType.None,
		DistortType.SineWave,
	) as DistortType;
	u.uLightingType = clamp(
		Math.round(u.uLightingType),
		LightingType.None,
		LightingType.Vignette,
	) as LightingType;
	u.uLightStrength = clamp(u.uLightStrength, 0, 1);
	u.uBevelWidth = clamp(u.uBevelWidth, 0, 1);
	u.uNoise = clamp(u.uNoise, 0, 1);
	u.uDither = clamp(u.uDither, 0, 1);
	u.uDitherStrength = clamp(u.uDitherStrength, 0, 1);
	u.uDitherLevels = Math.max(1, u.uDitherLevels);
	u.uVariation = clamp(u.uVariation, 0, 1);
	u.uCenter = clamp(u.uCenter, -1, 1);
	u.uPixelate = Math.max(0, u.uPixelate);

	return u;
}
