import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { readTaskbarHeight } from '@/lib/taskbar';
import './MainMenu.css';

const MENU_GAP = 16;

interface MainMenuProps {
	open: boolean;
	onClose: () => void;
}

export default function MainMenu({ open, onClose }: MainMenuProps) {
	const menuRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!open) return;

		const onPointerDown = (event: PointerEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		globalThis.addEventListener('pointerdown', onPointerDown);

		return () => {
			globalThis.removeEventListener('pointerdown', onPointerDown);
		};
	}, [open, onClose]);

	if (!open) return null;

	return (
		<nav
			ref={menuRef}
			className='MainMenu'
			style={{ top: readTaskbarHeight() + MENU_GAP, left: MENU_GAP }}
		>
			<Link className='MainMenu__icon' to='/about-me' onClick={onClose}>
				<img
					src='/icons/about-me.opti.webp'
					alt='My face as an icon for about-me'
				/>
				<span>About me</span>
			</Link>

			<Link
				className='MainMenu__icon'
				to='/wallpaper-editor'
				onClick={onClose}
			>
				<img
					src='/icons/about-me.opti.webp'
					alt='My face as an icon for about-me'
				/>
				<span>Wallpaper Editor</span>
			</Link>
		</nav>
	);
}
