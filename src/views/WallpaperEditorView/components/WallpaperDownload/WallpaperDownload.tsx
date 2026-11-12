import { useState } from 'react';
import Button from '@/components/Button';
import { renderWallpaperToCanvas } from '@/lib/downloadWallpaper.ts';
import { resolveProfile } from '@/lib/resolution.ts';
import { useWallpaper } from '@/state/wallpaper-context.ts';
import './WallpaperDownload.css';

export default function WallpaperDownload() {
	const { preset, uniforms, targetId } = useWallpaper();
	const [error, setError] = useState<string | null>(null);

	const onClick = () => {
		try {
			const profile = resolveProfile(targetId);
			const canvas = renderWallpaperToCanvas({
				preset,
				uniforms,
				width: profile.width,
				height: profile.height,
			});

			canvas.toBlob((blob) => {
				if (!blob) {
					setError('Failed to export image');
					return;
				}
				const url = URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = url;
				link.download = `wallpaper-${preset}-${profile.width}x${profile.height}.png`;
				link.click();
				URL.revokeObjectURL(url);
				setError(null);
			}, 'image/png');
		} catch {
			setError('Failed to export image');
		}
	};

	return (
		<div className='WallpaperDownload'>
			<Button onClick={onClick}>Download Wallpaper</Button>
			{error !== null && (
				<span className='WallpaperDownload__error'>{error}</span>
			)}
		</div>
	);
}
