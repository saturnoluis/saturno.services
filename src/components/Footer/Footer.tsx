import { useDesktopMode } from '@/state/desktop-mode-context.ts';
import './Footer.css';

export default function Footer() {
	const { scrollable } = useDesktopMode();

	return (
		<footer className={scrollable ? 'Footer' : 'Footer Footer--fixed'}>
			<span className='Footer__text'>© 2026 Luis Saturno</span>
		</footer>
	);
}
