import Button from '@/components/Button';
import type { ReactNode } from 'react';
import './Taskbar.css';

export default function Taskbar() {
	return (
	<div className='Taskbar'>
		<Button className="Taskbar__menu-button">Menú</Button>
	</div>
	);
}
