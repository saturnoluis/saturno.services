import { useEffect, useMemo, useReducer, type ReactNode } from 'react';
import {
	DEFAULT_UNIFORMS,
	type PresetId,
	type ShaderUniforms,
} from '@/components/ShaderRenderer';
import { srgbEquals } from '@/lib/color.ts';
import { DEFAULT_TARGET_ID } from '@/lib/resolution.ts';
import {
	loadStoredConfig,
	readSeedRgbFromCss,
	saveConfig,
	SEED_COLOR_COUNT,
	uniformsToSeedRgb,
	withSeedColors,
	writeSeedColorsToCss,
} from '@/state/seedColors.ts';
import { WALLPAPER_THEMES } from '@/views/WallpaperView/components/WallpaperTheme/themes.ts';
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
	| { type: 'setTarget'; targetId: string }
	| { type: 'setConfig'; config: WallpaperConfig }
	| SetUniformAction;

function reducer(
	state: WallpaperConfig,
	action: WallpaperAction,
): WallpaperConfig {
	switch (action.type) {
		case 'setPreset':
			return { ...state, preset: action.preset };
		case 'setTarget':
			return { ...state, targetId: action.targetId };
		case 'setConfig':
			return {
				preset: action.config.preset,
				uniforms: action.config.uniforms,
				targetId: action.config.targetId,
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
	const defaultTheme = WALLPAPER_THEMES.find((theme) => theme.id === 'ok-luis');
	if (defaultTheme) {
		return {
			preset: defaultTheme.preset,
			uniforms: defaultTheme.uniforms,
			targetId: DEFAULT_TARGET_ID,
		};
	}
	return {
		preset: 'plasma',
		uniforms: withSeedColors({ ...DEFAULT_UNIFORMS }),
		targetId: DEFAULT_TARGET_ID,
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
			setTarget: (targetId) => dispatch({ type: 'setTarget', targetId }),
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
