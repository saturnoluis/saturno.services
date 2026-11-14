import { useLayoutEffect, useRef, useState } from 'react';
import Columns from '@/components/Columns';
import Content from '@/components/Content';
import Stack from '@/components/Stack';
import Window from '@/components/Window';
import { remToPx } from '@/lib/length';
import { useRandomWindowPosition } from '@/state/useRandomWindowPosition';
import WallpaperEditor from '@/views/WallpaperEditorView/components/WallpaperEditor';
import WallpaperPreview from '@/views/WallpaperEditorView/components/WallpaperPreview';
import WallpaperStyle from '@/views/WallpaperEditorView/components/WallpaperStyle';
import {
	EDITOR_COLUMN_GAP,
	EDITOR_COLUMN_MIN_WIDTH,
} from '@/views/WallpaperEditorView/constants';
import './WallpaperEditorView.css';

const WINDOW_WIDTH = 900;
const WINDOW_HEIGHT = 900;

export default function WallpaperEditorView() {
	const position = useRandomWindowPosition(WINDOW_WIDTH, WINDOW_HEIGHT);
	const previewRef = useRef<HTMLDivElement>(null);
	const [stacked, setStacked] = useState(false);

	useLayoutEffect(() => {
		const element = previewRef.current;
		if (!element) return;

		const update = () => {
			setStacked(
				element.clientWidth <
					remToPx(EDITOR_COLUMN_MIN_WIDTH) * 2 + EDITOR_COLUMN_GAP,
			);
		};

		update();
		const observer = new ResizeObserver(update);
		observer.observe(element);
		return () => observer.disconnect();
	}, []);

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
					<div
						ref={previewRef}
						className='WallpaperEditorView__preview'
					>
						<Columns
							columns={2}
							minWidth={EDITOR_COLUMN_MIN_WIDTH}
							gap={EDITOR_COLUMN_GAP}
						>
							<WallpaperPreview />
							{!stacked && <WallpaperStyle />}
						</Columns>
					</div>
				</Content>
				<Content overflowY='auto'>
					{stacked && (
						<div className='WallpaperEditorView__style'>
							<WallpaperStyle />
						</div>
					)}
					<WallpaperEditor
						minWidth={EDITOR_COLUMN_MIN_WIDTH}
						gap={EDITOR_COLUMN_GAP}
					/>
				</Content>
			</Stack>
		</Window>
	);
}
