import { useEffect, useMemo, useReducer, type ReactNode } from 'react';
import {
	DEFAULT_UNIFORMS,
	type PresetId,
	type ShaderUniforms,
} from '@/components/ShaderRenderer';
import { srgbEquals } from '@/lib/color.ts';
import {
	loadStoredConfig,
	readSeedRgbFromCss,
	saveConfig,
	SEED_COLOR_COUNT,
	uniformsToSeedRgb,
	withSeedColors,
	writeSeedColorsToCss,
} from '@/state/seedColors.ts';
import {
	WallpaperContext,
	type WallpaperConfig,
	type WallpaperContextValue,
} from '@/state/wallpaper-context.ts';

type SetUniformAction = {
	type: 'setUniform';
	key: keyof ShaderUniforms;
	value: ShaderUniforms[keyof ShaderUniforms];
};

type WallpaperAction =
	| { type: 'setPreset'; preset: PresetId }
	| { type: 'setConfig'; config: WallpaperConfig }
	| SetUniformAction;

function reducer(
	state: WallpaperConfig,
	action: WallpaperAction,
): WallpaperConfig {
	switch (action.type) {
		case 'setPreset':
			return { ...state, preset: action.preset };
		case 'setConfig':
			return {
				preset: action.config.preset,
				uniforms: action.config.uniforms,
			};
		case 'setUniform':
			return {
				...state,
				uniforms: { ...state.uniforms, [action.key]: action.value },
			};
		default:
			return state;
	}
}

function buildInitialConfig(): WallpaperConfig {
	const stored = loadStoredConfig();
	if (stored) {
		return stored;
	}
	return {
		preset: 'plasma',
		uniforms: withSeedColors({ ...DEFAULT_UNIFORMS }),
	};
}

export function WallpaperProvider({ children }: { children?: ReactNode }) {
	const [state, dispatch] = useReducer(reducer, undefined, buildInitialConfig);

	useEffect(() => {
		saveConfig(state);
	}, [state]);

	useEffect(() => {
		const stateRgb = uniformsToSeedRgb(state.uniforms);
		const cssRgb = readSeedRgbFromCss();
		const inSync =
			cssRgb.length === SEED_COLOR_COUNT &&
			cssRgb.every(
				(rgb, i) => rgb !== null && srgbEquals(rgb, stateRgb[i]),
			);
		if (inSync) {
			return;
		}
		writeSeedColorsToCss(stateRgb);
	}, [state.uniforms]);

	const value = useMemo<WallpaperContextValue>(
		() => ({
			...state,
			setPreset: (preset) => dispatch({ type: 'setPreset', preset }),
			setUniform: (key, value) =>
				dispatch({ type: 'setUniform', key, value }),
			setConfig: (config) => dispatch({ type: 'setConfig', config }),
		}),
		[state],
	);

	return (
		<WallpaperContext.Provider value={value}>
			{children}
		</WallpaperContext.Provider>
	);
}
