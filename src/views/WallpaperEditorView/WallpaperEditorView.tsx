import Columns from '@/components/Columns';
import Content from '@/components/Content';
import Stack from '@/components/Stack';
import Window from '@/components/Window';
import Fieldset from '@/components/Fieldset';
import { useRandomWindowPosition } from '@/state/useRandomWindowPosition';
import WallpaperColors from '@/views/WallpaperEditorView/components/WallpaperColors';
import WallpaperEditor from '@/views/WallpaperEditorView/components/WallpaperEditor';
import WallpaperPreset from '@/views/WallpaperEditorView/components/WallpaperPreset';
import WallpaperPreview from '@/views/WallpaperEditorView/components/WallpaperPreview';
import WallpaperSize from '@/views/WallpaperEditorView/components/WallpaperSize';
import WallpaperTheme from '@/views/WallpaperEditorView/components/WallpaperTheme';

const WINDOW_WIDTH = 900;
const WINDOW_HEIGHT = 900;

export default function WallpaperEditorView() {
	const position = useRandomWindowPosition(WINDOW_WIDTH, WINDOW_HEIGHT);

	return (
		<Window
			width={WINDOW_WIDTH}
			height={WINDOW_HEIGHT}
			top={position.top}
			left={position.left}
			title='Wallpaper Editor'
			controls={[
				{ label: '?', title: 'Help', action: () => console.log('help') },
				{ label: '✖', title: 'Close', action: '/' },
			]}
		>
			<Stack>
				<Content overflowY='auto'>
					<Columns columns={2} minWidth='10rem'>
						<WallpaperPreview />
						<Fieldset title='Style'>
							<WallpaperTheme />
							<WallpaperPreset />
							<WallpaperSize />
							<WallpaperColors label='Colors' />
						</Fieldset>
					</Columns>
				</Content>
				<Content>
					<WallpaperEditor />
				</Content>
			</Stack>
		</Window>
	);
}
