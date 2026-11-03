import { useEffect, useRef } from 'react';
import * as twgl from 'twgl.js';
import vertexShaderSource from '@/components/ShaderRenderer/shaders/vertex.glsl?raw';
import type { ShaderRendererOptions } from '@/components/ShaderRenderer/types.ts';
import {
	assembleFragment,
	type PresetId,
} from '@/components/ShaderRenderer/lib/presets.ts';
import { resolveUniforms } from '@/components/ShaderRenderer/lib/uniforms.ts';

const arrays = {
	aPos: {
		numComponents: 2,
		data: [-1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1],
	},
};

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

export function useShaderRenderer(
	preset: PresetId,
	options: ShaderRendererOptions = {},
) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const optionsRef = useRef(options);
	const drawRef = useRef<(() => void) | null>(null);
	const startLoopRef = useRef<(() => void) | null>(null);

	useEffect(() => {
		optionsRef.current = options;
	});

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const gl = canvas.getContext('webgl2');
		if (!gl) {
			console.error('WebGL2 not supported');
			optionsRef.current.onUnsupported?.();
			return;
		}

		const bufferInfo = twgl.createBufferInfoFromArrays(
			gl as WebGLRenderingContext,
			arrays,
		);
		const programInfo = twgl.createProgramInfo(gl as WebGLRenderingContext, [
			vertexShaderSource,
			assembleFragment(preset),
		]);

		const startTime = performance.now();
		let animationFrame = 0;

		const draw = () => {
			const {
				uniforms,
				timeScale = 1,
				timeOffset = 0,
				dpr,
				animate = false,
			} = optionsRef.current;

			twgl.resizeCanvasToDisplaySize(
				canvas,
				Math.max(1, dpr ?? window.devicePixelRatio),
			);
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
				iTime: animate
					? ((performance.now() - startTime) / 1000) * timeScale +
						timeOffset
					: timeOffset,
			});
			twgl.drawBufferInfo(
				gl as WebGLRenderingContext,
				bufferInfo,
				gl.TRIANGLES,
			);
		};

		const step = () => {
			draw();
			if (optionsRef.current.animate) {
				animationFrame = requestAnimationFrame(step);
			} else {
				animationFrame = 0;
			}
		};

		const startLoop = () => {
			if (optionsRef.current.animate && animationFrame === 0) {
				animationFrame = requestAnimationFrame(step);
			}
		};

		drawRef.current = draw;
		startLoopRef.current = startLoop;

		const resizeObserver = new ResizeObserver(() => {
			drawRef.current?.();
		});
		resizeObserver.observe(canvas);

		draw();
		startLoop();

		return () => {
			cancelAnimationFrame(animationFrame);
			resizeObserver.disconnect();
			drawRef.current = null;
			startLoopRef.current = null;
			gl.deleteProgram(programInfo.program);
			deleteBufferInfo(gl, bufferInfo);
		};
	}, [preset]);

	useEffect(() => {
		drawRef.current?.();
		startLoopRef.current?.();
	});

	return canvasRef;
}
