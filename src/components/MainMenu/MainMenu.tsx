import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import './MainMenu.css';

const MOBILE_MAX_WIDTH = 640;

interface MainMenuProps {
	open: boolean;
	onClose: () => void;
}

export default function MainMenu({ open, onClose }: MainMenuProps) {
	const menuRef = useRef<HTMLDivElement>(null);
	const [isCompact, setIsCompact] = useState(
		() => window.innerWidth <= MOBILE_MAX_WIDTH,
	);

	useEffect(() => {
		const update = () => setIsCompact(window.innerWidth <= MOBILE_MAX_WIDTH);

		globalThis.addEventListener('resize', update);

		return () => {
			globalThis.removeEventListener('resize', update);
		};
	}, []);

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
			className={['MainMenu', isCompact ? 'MainMenu--compact' : '']
				.filter(Boolean)
				.join(' ')}
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
			<Link className='MainMenu__link' to='/wallpaper-editor' onClick={onClose}>
				<img
					className='MainMenu__link-icon'
					src='/icons/about-me.opti.webp'
					alt='My face as an icon for about-me'
				/>
				<div className='MainMenu__link-description'>
					<span>Wallpaper Editor</span>
					<p>Tool to create and download an abstract wallpaper</p>
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
