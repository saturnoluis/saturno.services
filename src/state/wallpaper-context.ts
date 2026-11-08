import { createContext, useContext } from 'react';
import type { PresetId, ShaderUniforms } from '@/components/ShaderRenderer';

export interface WallpaperConfig {
	preset: PresetId;
	uniforms: ShaderUniforms;
	targetId: string;
}

export interface WallpaperContextValue extends WallpaperConfig {
	setPreset: (preset: PresetId) => void;
	setUniform: <K extends keyof ShaderUniforms>(
		key: K,
		value: ShaderUniforms[K],
	) => void;
	setTarget: (targetId: string) => void;
	setConfig: (config: WallpaperConfig) => void;
}

export const WallpaperContext = createContext<WallpaperContextValue | null>(null);

export function useWallpaper(): WallpaperContextValue {
	const context = useContext(WallpaperContext);
	if (!context) {
		throw new Error('useWallpaper must be used within a WallpaperProvider');
	}
	return context;
}
