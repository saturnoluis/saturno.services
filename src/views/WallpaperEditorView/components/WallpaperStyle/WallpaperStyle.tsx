import Fieldset from '@/components/Fieldset';
import WallpaperColors from '@/views/WallpaperEditorView/components/WallpaperColors';
import WallpaperPreset from '@/views/WallpaperEditorView/components/WallpaperPreset';
import WallpaperSize from '@/views/WallpaperEditorView/components/WallpaperSize';
import WallpaperTheme from '@/views/WallpaperEditorView/components/WallpaperTheme';

export default function WallpaperStyle() {
	return (
		<Fieldset title='Style'>
			<WallpaperTheme />
			<WallpaperPreset />
			<WallpaperSize />
			<WallpaperColors label='Colors' />
		</Fieldset>
	);
}
