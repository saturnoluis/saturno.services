import Button from '@/components/Button';
import { useDesktopMode } from '@/state/desktop-mode-context.ts';
import { useI18n } from '@/state/i18n-context.ts';
import { useTheme } from '@/state/theme-context.ts';
import './Taskbar.css';

interface TaskbarProps {
	menuOpen: boolean;
	onMenuClick: () => void;
}

export default function Taskbar({ menuOpen, onMenuClick }: TaskbarProps) {
	const { scrollable } = useDesktopMode();
	const { theme, toggleTheme } = useTheme();
	const { t } = useI18n();

	return (
		<div
			role='toolbar'
			aria-label={t('taskbar.aria')}
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
				{t('taskbar.menu')}
			</Button>
			<Button
				className='Taskbar__theme-button'
				onClick={toggleTheme}
				aria-label={t('taskbar.toggleTheme')}
			>
				{theme === 'dark' ? '☾' : '☀'}
			</Button>
		</div>
	);
}
