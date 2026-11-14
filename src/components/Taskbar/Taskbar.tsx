import Button from '@/components/Button';
import './Taskbar.css';

interface TaskbarProps {
	onMenuClick: () => void;
}

export default function Taskbar({ onMenuClick }: TaskbarProps) {
	return (
		<div className='Taskbar'>
			<Button
				className='Taskbar__menu-button'
				onClick={onMenuClick}
				onPointerDown={(event) => event.stopPropagation()}
			>
				Menú
			</Button>
		</div>
	);
}
