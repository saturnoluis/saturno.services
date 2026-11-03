import type { PresetId } from '@/components/ShaderRenderer/lib/presets.ts';

export const PATTERN_UNIFORM_KEYS = [
	'uAngle',
	'uScale',
	'uSpeed',
	'uCenter',
	'uVariation',
] as const;

export type PatternUniformKey = (typeof PATTERN_UNIFORM_KEYS)[number];

/**
 * Maps each preset to the pattern uniforms its shader actually reads. Controls
 * for any key not listed here are disabled in the editor for that preset.
 * Keep in sync with the `uniform float` declarations used by each pattern.
 */
export const PRESET_PATTERN_UNIFORMS: Record<
	PresetId,
	readonly PatternUniformKey[]
> = {
	bars: ['uAngle', 'uScale', 'uSpeed', 'uCenter'],
	circle: ['uAngle', 'uScale', 'uSpeed', 'uCenter', 'uVariation'],
	diamond: ['uAngle', 'uScale', 'uSpeed', 'uCenter', 'uVariation'],
	dunes: ['uAngle', 'uScale', 'uSpeed', 'uCenter', 'uVariation'],
	hexagon: ['uAngle', 'uScale', 'uSpeed', 'uCenter', 'uVariation'],
	plasma: ['uAngle', 'uScale', 'uSpeed', 'uCenter', 'uVariation'],
	spark: ['uAngle', 'uScale', 'uSpeed', 'uCenter', 'uVariation'],
	terrain: ['uAngle', 'uScale', 'uSpeed', 'uCenter', 'uVariation'],
	waves: ['uAngle', 'uScale', 'uSpeed', 'uCenter', 'uVariation'],
};
