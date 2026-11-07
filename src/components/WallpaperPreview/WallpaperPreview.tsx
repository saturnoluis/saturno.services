import { useLayoutEffect, useRef, useState } from 'react';
import ShaderRenderer from '@/components/ShaderRenderer';
import { useWallpaper } from '@/state/wallpaper-context.ts';
import './WallpaperPreview.css';

const PREVIEW_RATIO = 16 / 9;

export default function WallpaperPreview() {
	const { preset, uniforms } = useWallpaper();
	const containerRef = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState({ width: 0, height: 0 });

	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const update = () => {
			const { width, height } = container.getBoundingClientRect();
			const hasHeight = height > 0;
			setSize(
				hasHeight
					? {
							width: Math.min(width, height * PREVIEW_RATIO),
							height: Math.min(height, width / PREVIEW_RATIO),
						}
					: { width, height: width / PREVIEW_RATIO },
			);
		};

		update();
		const observer = new ResizeObserver(update);
		observer.observe(container);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={containerRef} className='WallpaperPreview'>
			<div
				className='WallpaperPreview__frame'
				style={{ width: size.width, height: size.height }}
			>
				<ShaderRenderer
					preset={preset}
					uniforms={uniforms}
					width='100%'
					height='100%'
				/>
			</div>
		</div>
	);
}
