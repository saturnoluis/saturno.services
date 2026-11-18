import Fieldset from '@/components/Fieldset';
import { useI18n } from '@/state/I18n';
import WallpaperColors from '@/views/WallpaperEditorView/components/WallpaperColors';
import WallpaperPreset from '@/views/WallpaperEditorView/components/WallpaperPreset';
import WallpaperSize from '@/views/WallpaperEditorView/components/WallpaperSize';
import WallpaperTheme from '@/views/WallpaperEditorView/components/WallpaperTheme';

export default function WallpaperStyle() {
	const { t } = useI18n();

	return (
		<Fieldset title={t('editor.style')}>
			<WallpaperTheme />
			<WallpaperPreset />
			<WallpaperSize />
			<WallpaperColors label={t('editor.colors')} />
		</Fieldset>
	);
}
