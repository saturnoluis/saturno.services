import Button from '@/components/Button';
import './Taskbar.css';

interface TaskbarProps {
	menuOpen: boolean;
	onMenuClick: () => void;
}

export default function Taskbar({ menuOpen, onMenuClick }: TaskbarProps) {
	return (
		<div className='Taskbar'>
			<Button
				className='Taskbar__menu-button'
				active={menuOpen}
				onClick={onMenuClick}
				onPointerDown={(event) => event.stopPropagation()}
			>
				Menú
			</Button>
		</div>
	);
}
