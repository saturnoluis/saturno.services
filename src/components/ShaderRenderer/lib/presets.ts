import common from '@/components/ShaderRenderer/shaders/common.glsl?raw';
import bars from '@/components/ShaderRenderer/shaders/patterns/bars.glsl?raw';
import circle from '@/components/ShaderRenderer/shaders/patterns/circle.glsl?raw';
import diamond from '@/components/ShaderRenderer/shaders/patterns/diamond.glsl?raw';
import dunes from '@/components/ShaderRenderer/shaders/patterns/dunes.glsl?raw';
import hexagon from '@/components/ShaderRenderer/shaders/patterns/hexagon.glsl?raw';
import plasma from '@/components/ShaderRenderer/shaders/patterns/plasma.glsl?raw';
import spark from '@/components/ShaderRenderer/shaders/patterns/spark.glsl?raw';
import terrain from '@/components/ShaderRenderer/shaders/patterns/terrain.glsl?raw';
import waves from '@/components/ShaderRenderer/shaders/patterns/waves.glsl?raw';

const PREAMBLE = `#version 300 es
precision highp float;
precision highp int;
uniform vec3 iResolution;
uniform float iTime;
`;

/**
 * The canonical list of available shader presets. Each entry maps a `PresetId`
 * to its fragment source. Adding a new preset means adding a `?raw` import here
 * and an entry below — `PresetId` is derived from this list so it can never
 * drift out of sync with the shaders that actually exist.
 */
const PRESET_SOURCES = {
	bars,
	circle,
	diamond,
	dunes,
	hexagon,
	plasma,
	spark,
	terrain,
	waves,
} as const;

export type PresetId = keyof typeof PRESET_SOURCES;

export type Preset = {
	id: PresetId;
	label: string;
	source: string;
};

function capitalize(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

export const PRESETS: Preset[] = (
	Object.entries(PRESET_SOURCES) as [PresetId, string][]
)
	.map(([id, source]) => ({ id, label: capitalize(id), source }))
	.sort((a, b) => a.id.localeCompare(b.id));

export function assembleFragment(id: PresetId): string {
	const preset = PRESETS.find((p) => p.id === id);
	if (!preset) {
		throw new Error(`Unknown shader preset: ${id}`);
	}
	return `${PREAMBLE}\n${common}\n${preset.source}`;
}
