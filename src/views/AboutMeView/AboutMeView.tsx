import Content from '@/components/Content';
import Window from '@/components/Window';

export default function AboutMeView() {
	return (
		<Window
			width={480}
			height={360}
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
