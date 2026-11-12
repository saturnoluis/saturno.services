import { useLayoutEffect, useRef, useState } from 'react';
import ShaderRenderer from '@/components/ShaderRenderer';
import WallpaperDownload from '@/views/WallpaperEditorView/components/WallpaperDownload';
import { profileAspect, resolveProfile } from '@/lib/resolution.ts';
import { useWallpaper } from '@/state/wallpaper-context.ts';
import './WallpaperPreview.css';

export default function WallpaperPreview() {
	const { preset, uniforms, targetId } = useWallpaper();
	const containerRef = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState({ width: 0, height: 0 });

	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const update = () => {
			const ratio = profileAspect(resolveProfile(targetId));
			const { width, height } = container.getBoundingClientRect();
			const hasHeight = height > 0;
			setSize(
				hasHeight
					? {
							width: Math.min(width, height * ratio),
							height: Math.min(height, width / ratio),
						}
					: { width, height: width / ratio },
			);
		};

		update();
		const observer = new ResizeObserver(update);
		observer.observe(container);
		window.addEventListener('resize', update);
		return () => {
			observer.disconnect();
			window.removeEventListener('resize', update);
		};
	}, [targetId]);

	return (
		<div className='WallpaperPreview'>
			<div ref={containerRef} className='WallpaperPreview__stage'>
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
			<WallpaperDownload />
		</div>
	);
}
