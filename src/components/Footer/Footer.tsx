import { useDesktopMode } from '@/state/DesktopMode';
import { useI18n } from '@/state/I18n';
import './Footer.css';

export default function Footer() {
	const { scrollable } = useDesktopMode();
	const { t } = useI18n();

	return (
		<footer className={scrollable ? 'Footer' : 'Footer Footer--fixed'}>
			<span className='Footer__text'>{t('footer.copyright')}</span>
		</footer>
	);
}
