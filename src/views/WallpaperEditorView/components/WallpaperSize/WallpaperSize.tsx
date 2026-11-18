import type { ChangeEvent } from 'react';
import Select from '@/components/Select';
import { AUTO_TARGET_ID, RESOLUTION_PROFILES } from '@/lib/resolution.ts';
import { useI18n } from '@/state/I18n';
import { useWallpaper } from '@/state/Wallpaper';

export default function WallpaperSize() {
	const { targetId, setTarget } = useWallpaper();
	const { t } = useI18n();

	const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setTarget(event.target.value);
	};

	return (
		<Select label={t('editor.size')} value={targetId} onChange={onChange}>
			<option value={AUTO_TARGET_ID}>{t('editor.sizeAuto')}</option>
			{RESOLUTION_PROFILES.map((profile) => (
				<option key={profile.id} value={profile.id}>
					{profile.label}
				</option>
			))}
		</Select>
	);
}
