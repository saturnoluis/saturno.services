import * as twgl from 'twgl.js';
import vertexShaderSource from '@/components/ShaderRenderer/shaders/vertex.glsl?raw';
import {
	assembleFragment,
	type PresetId,
} from '@/components/ShaderRenderer/lib/presets.ts';
import {
	resolveUniforms,
	type ShaderUniformOverrides,
} from '@/components/ShaderRenderer/lib/uniforms.ts';

const FULLSCREEN_QUAD_ARRAYS = {
	aPos: {
		numComponents: 2,
		data: [-1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1],
	},
};

export interface WallpaperRenderer {
	gl: WebGL2RenderingContext;
	programInfo: twgl.ProgramInfo;
	bufferInfo: twgl.BufferInfo;
}

export interface WallpaperFrameOptions {
	uniforms?: ShaderUniformOverrides;
	/** Fixed shader clock value, in seconds. */
	time: number;
	/** Device pixel ratio; defaults to `window.devicePixelRatio`, min 1. */
	dpr?: number;
	/** When set, render at exactly this native resolution (no DPR scaling). */
	width?: number;
	height?: number;
}

function deleteBufferInfo(
	gl: WebGL2RenderingContext,
	bufferInfo: twgl.BufferInfo,
) {
	if (bufferInfo.indices) {
		gl.deleteBuffer(bufferInfo.indices);
	}
	for (const attrib of Object.values(bufferInfo.attribs ?? {})) {
		gl.deleteBuffer(attrib.buffer);
	}
}

export function createWallpaperRenderer(
	gl: WebGL2RenderingContext,
	preset: PresetId,
): WallpaperRenderer {
	const bufferInfo = twgl.createBufferInfoFromArrays(
		gl as WebGLRenderingContext,
		FULLSCREEN_QUAD_ARRAYS,
	);
	const programInfo = twgl.createProgramInfo(gl as WebGLRenderingContext, [
		vertexShaderSource,
		assembleFragment(preset),
	]);
	return { gl, programInfo, bufferInfo };
}

export function drawWallpaperFrame(
	renderer: WallpaperRenderer,
	canvas: HTMLCanvasElement,
	options: WallpaperFrameOptions,
) {
	const { gl, programInfo, bufferInfo } = renderer;
	const { uniforms, time, dpr, width, height } = options;

	if (width !== undefined && height !== undefined) {
		canvas.width = width;
		canvas.height = height;
	} else {
		twgl.resizeCanvasToDisplaySize(
			canvas,
			Math.max(1, dpr ?? window.devicePixelRatio),
		);
	}
	gl.viewport(0, 0, canvas.width, canvas.height);

	const mergedUniforms = resolveUniforms(uniforms);

	gl.useProgram(programInfo.program);
	twgl.setBuffersAndAttributes(
		gl as WebGLRenderingContext,
		programInfo,
		bufferInfo,
	);
	twgl.setUniforms(programInfo, {
		...mergedUniforms,
		iResolution: [canvas.width, canvas.height, 1],
		iTime: time,
	});
	twgl.drawBufferInfo(gl as WebGLRenderingContext, bufferInfo, gl.TRIANGLES);
}

export function deleteWallpaperRenderer(renderer: WallpaperRenderer) {
	const { gl, programInfo, bufferInfo } = renderer;
	gl.deleteProgram(programInfo.program);
	deleteBufferInfo(gl, bufferInfo);
}
