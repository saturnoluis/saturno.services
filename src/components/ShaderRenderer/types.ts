import type { ShaderUniformOverrides } from '@/components/ShaderRenderer/lib/uniforms.ts';

export type {
	Preset,
	PresetId,
} from '@/components/ShaderRenderer/lib/presets.ts';
export type {
	PatternUniformKey,
} from '@/components/ShaderRenderer/lib/presetUniforms.ts';
export type {
	DistortType,
	LightingType,
	ShaderUniformOverrides,
	ShaderUniforms,
} from '@/components/ShaderRenderer/lib/uniforms.ts';

export interface ShaderRendererOptions {
	/** Partial overrides of the shader uniforms; merged onto defaults and clamped. */
	uniforms?: ShaderUniformOverrides;
	/** Multiplier on elapsed time (animation speed). Ignored while `animate` is false. */
	timeScale?: number;
	/** Fixed time offset in seconds; when `animate` is false this is the frozen clock value. */
	timeOffset?: number;
	/** Device pixel ratio for the backing store; defaults to `window.devicePixelRatio`, min 1. */
	dpr?: number;
	/** When true, run a continuous render loop; when false, render only on change. */
	animate?: boolean;
	/** Called when a WebGL2 context cannot be created. */
	onUnsupported?: () => void;
}
