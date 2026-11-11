import { useState } from 'react';
import Columns from '@/components/Columns';
import Content from '@/components/Content';
import Stack from '@/components/Stack';
import Window from '@/components/Window';
import Fieldset from '@/components/Fieldset';
import WallpaperColors from '@/views/WallpaperView/components/WallpaperColors';
import WallpaperEditor from '@/views/WallpaperView/components/WallpaperEditor';
import WallpaperPreset from '@/views/WallpaperView/components/WallpaperPreset';
import WallpaperPreview from '@/views/WallpaperView/components/WallpaperPreview';
import WallpaperSize from '@/views/WallpaperView/components/WallpaperSize';
import WallpaperTheme from '@/views/WallpaperView/components/WallpaperTheme';

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

export default function WallpaperView() {
	const [position] = useState(() => randomWindowPosition(WINDOW_SIZE));

	return (
		<Window
			width={WINDOW_SIZE}
			height={WINDOW_SIZE}
			top={position.top}
			left={position.left}
			title='Wallpaper Editor'
			controls={[
				{ label: 'X', title: 'Close', action: '/' },
				{ label: '?', title: 'Help', action: () => console.log('help') },
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
