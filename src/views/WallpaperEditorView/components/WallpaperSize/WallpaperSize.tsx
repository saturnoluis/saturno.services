import type { ChangeEvent } from 'react';
import Select from '@/components/Select';
import { AUTO_TARGET_ID, RESOLUTION_PROFILES } from '@/lib/resolution.ts';
import { useWallpaper } from '@/state/wallpaper-context.ts';

export default function WallpaperSize() {
	const { targetId, setTarget } = useWallpaper();

	const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setTarget(event.target.value);
	};

	return (
		<Select label='Size' value={targetId} onChange={onChange}>
			<option value={AUTO_TARGET_ID}>Auto (detect)</option>
			{RESOLUTION_PROFILES.map((profile) => (
				<option key={profile.id} value={profile.id}>
					{profile.label}
				</option>
			))}
		</Select>
	);
}
