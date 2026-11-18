import type { ChangeEvent } from 'react';
import { PRESETS, type PresetId } from '@/components/ShaderRenderer';
import Select from '@/components/Select';
import { useI18n } from '@/state/i18n-context.ts';
import { useWallpaper } from '@/state/wallpaper-context.ts';

export default function WallpaperPreset() {
	const { preset, setPreset } = useWallpaper();
	const { t } = useI18n();

	const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setPreset(event.target.value as PresetId);
	};

	return (
		<Select label={t('editor.pattern')} value={preset} onChange={onChange}>
			{PRESETS.map((p) => (
				<option key={p.id} value={p.id}>
					{p.label}
				</option>
			))}
		</Select>
	);
}
