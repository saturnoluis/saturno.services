import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { readTaskbarHeight } from '@/lib/taskbar';
import './MainMenu.css';

const MENU_GAP_X = 16;
const MENU_GAP_Y = 4;

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
		<div
			ref={menuRef}
			className='MainMenu'
			style={{ top: readTaskbarHeight() + MENU_GAP_Y, left: MENU_GAP_X }}
		>
		<nav
			className='MainMenu__nav'
		>
			<Link className='MainMenu__link' to='/about-me' onClick={onClose}>
				<img
					className='MainMenu__link-icon'
					src='/icons/about-me.opti.webp'
					alt='My face as an icon for about-me'
				/>
				<div className='MainMenu__link-description'>
					<span>About me</span>
					<p>Who I am? Will I am? Lorem Ipsum</p>
				</div>
			</Link>
			<Link className='MainMenu__link' to='/about-me' onClick={onClose}>
				<img
					className='MainMenu__link-icon'
					src='/icons/about-me.opti.webp'
					alt='My face as an icon for about-me'
				/>
				<div className='MainMenu__link-description'>
					<span>About me</span>
					<p>Who I am? Will I am? Lorem Ipsum</p>
				</div>
			</Link>
			<Link className='MainMenu__link' to='/about-me' onClick={onClose}>
				<img
					className='MainMenu__link-icon'
					src='/icons/about-me.opti.webp'
					alt='My face as an icon for about-me'
				/>
				<div className='MainMenu__link-description'>
					<span>About me</span>
					<p>Who I am? Will I am? Lorem Ipsum</p>
				</div>
			</Link>
		</nav>
		</div>
	);
}
