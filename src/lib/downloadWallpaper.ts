import type { PresetId, ShaderUniforms } from '@/components/ShaderRenderer';
import {
	createWallpaperRenderer,
	deleteWallpaperRenderer,
	drawWallpaperFrame,
} from '@/components/ShaderRenderer/lib/render.ts';

export interface RenderWallpaperOptions {
	preset: PresetId;
	uniforms: ShaderUniforms;
	width: number;
	height: number;
}

export function renderWallpaperToCanvas({
	preset,
	uniforms,
	width,
	height,
}: RenderWallpaperOptions): HTMLCanvasElement {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;

	const gl = canvas.getContext('webgl2', { preserveDrawingBuffer: true });
	if (!gl) {
		throw new Error('WebGL2 not supported');
	}

	const renderer = createWallpaperRenderer(gl, preset);
	try {
		drawWallpaperFrame(renderer, canvas, {
			uniforms,
			time: 0,
			width,
			height,
		});
	} finally {
		deleteWallpaperRenderer(renderer);
	}

	return canvas;
}
