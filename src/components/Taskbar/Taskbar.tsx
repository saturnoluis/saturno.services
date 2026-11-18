import Button from '@/components/Button';
import { useDesktopMode } from '@/state/desktop-mode-context.ts';
import './Taskbar.css';

interface TaskbarProps {
	menuOpen: boolean;
	onMenuClick: () => void;
}

export default function Taskbar({ menuOpen, onMenuClick }: TaskbarProps) {
	const { scrollable } = useDesktopMode();

	return (
		<div
			role='toolbar'
			aria-label='Navegación del sitio'
			className={scrollable ? 'Taskbar Taskbar--fixed' : 'Taskbar'}
		>
			<Button
				className='Taskbar__menu-button'
				active={menuOpen}
				onClick={onMenuClick}
				aria-haspopup='menu'
				aria-expanded={menuOpen}
				data-menu-toggle
			>
				Menú
			</Button>
		</div>
	);
}
