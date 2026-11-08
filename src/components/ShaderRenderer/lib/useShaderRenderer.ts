import { useEffect, useRef } from 'react';
import type {
	PresetId,
	ShaderRendererOptions,
} from '@/components/ShaderRenderer/types.ts';
import {
	createWallpaperRenderer,
	deleteWallpaperRenderer,
	drawWallpaperFrame,
} from '@/components/ShaderRenderer/lib/render.ts';

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

		const renderer = createWallpaperRenderer(gl, preset);

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

			const time = animate
				? ((performance.now() - startTime) / 1000) * timeScale +
					timeOffset
				: timeOffset;

			drawWallpaperFrame(renderer, canvas, { uniforms, time, dpr });
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
			deleteWallpaperRenderer(renderer);
		};
	}, [preset]);

	useEffect(() => {
		drawRef.current?.();
		startLoopRef.current?.();
	});

	return canvasRef;
}
