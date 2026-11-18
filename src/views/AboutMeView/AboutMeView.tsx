import Content from '@/components/Content';
import Window from '@/components/Window';
import { useI18n } from '@/state/i18n-context.ts';
import { usePageTitle } from '@/state/usePageTitle';
import { useRandomWindowPosition } from '@/state/useRandomWindowPosition';

const WINDOW_WIDTH = 480;
const WINDOW_HEIGHT = 360;

export default function AboutMeView() {
	const position = useRandomWindowPosition(WINDOW_WIDTH, WINDOW_HEIGHT);
	const { t } = useI18n();
	usePageTitle(t('about.title'));

	return (
		<Window
			width={WINDOW_WIDTH}
			height={WINDOW_HEIGHT}
			top={position.top}
			left={position.left}
			title={t('about.title')}
			controls={[
				{
					label: '?',
					title: t('about.help'),
					action: () => console.log('help'),
				},
				{ label: '✖', title: t('about.close'), action: '/' },
			]}
		>
			<Content>
				<h1>{t('about.title')}</h1>
			</Content>
		</Window>
	);
}
