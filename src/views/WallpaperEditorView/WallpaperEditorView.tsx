import { useState } from 'react';
import Columns from '@/components/Columns';
import Content from '@/components/Content';
import Stack from '@/components/Stack';
import Window from '@/components/Window';
import Fieldset from '@/components/Fieldset';
import WallpaperColors from '@/views/WallpaperEditorView/components/WallpaperColors';
import WallpaperEditor from '@/views/WallpaperEditorView/components/WallpaperEditor';
import WallpaperPreset from '@/views/WallpaperEditorView/components/WallpaperPreset';
import WallpaperPreview from '@/views/WallpaperEditorView/components/WallpaperPreview';
import WallpaperSize from '@/views/WallpaperEditorView/components/WallpaperSize';
import WallpaperTheme from '@/views/WallpaperEditorView/components/WallpaperTheme';

const WINDOW_SIZE = 900;
const JITTER = 32;

function randomWindowPosition(size: number) {
	const maxX = Math.max(0, globalThis.innerWidth - size);
	const maxY = Math.max(0, globalThis.innerHeight - size);
	const jitterX = Math.min(maxX / 2, JITTER);
	const jitterY = Math.min(maxY / 2, JITTER);

	return {
		left: maxX / 2 + (Math.random() * 2 - 1) * jitterX,
		top: maxY / 2 + (Math.random() * 2 - 1) * jitterY,
	};
}

export default function WallpaperEditorView() {
	const [position] = useState(() => randomWindowPosition(WINDOW_SIZE));

	return (
		<Window
			width={WINDOW_SIZE}
			height={WINDOW_SIZE}
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
