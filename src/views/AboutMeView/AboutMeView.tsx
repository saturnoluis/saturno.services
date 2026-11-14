import Content from '@/components/Content';
import Window from '@/components/Window';
import { useRandomWindowPosition } from '@/state/useRandomWindowPosition';

const WINDOW_WIDTH = 480;
const WINDOW_HEIGHT = 360;

export default function AboutMeView() {
	const position = useRandomWindowPosition(WINDOW_WIDTH, WINDOW_HEIGHT);

	return (
		<Window
			width={WINDOW_WIDTH}
			height={WINDOW_HEIGHT}
			top={position.top}
			left={position.left}
			title='About me'
			controls={[
				{ label: '?', title: 'Help', action: () => console.log('help') },
				{ label: '✖', title: 'Close', action: '/' },
			]}
		>
			<Content>
				<h1>About me</h1>
			</Content>
		</Window>
	);
}
