import type { ChangeEvent } from 'react';
import { PRESETS, type PresetId } from '@/components/ShaderRenderer';
import Select from '@/components/Select';
import { useWallpaper } from '@/state/wallpaper-context.ts';

export default function WallpaperPreset() {
	const { preset, setPreset } = useWallpaper();

	const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setPreset(event.target.value as PresetId);
	};

	return (
		<Select label='Pattern' value={preset} onChange={onChange}>
			{PRESETS.map((p) => (
				<option key={p.id} value={p.id}>
					{p.label}
				</option>
			))}
		</Select>
	);
}
