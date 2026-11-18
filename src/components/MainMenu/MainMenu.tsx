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
			const target = event.target;
			if (
				menuRef.current?.contains(target as Node) ||
				(target instanceof Element &&
					target.closest('[data-menu-toggle]'))
			) {
				return;
			}
			onClose();
		};

		globalThis.addEventListener('pointerdown', onPointerDown, true);

		return () => {
			globalThis.removeEventListener('pointerdown', onPointerDown, true);
		};
	}, [open, onClose]);

	useEffect(() => {
		if (!open) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		globalThis.addEventListener('keydown', onKeyDown);

		return () => {
			globalThis.removeEventListener('keydown', onKeyDown);
		};
	}, [open, onClose]);

	useEffect(() => {
		if (!open) return;

		menuRef.current?.querySelector<HTMLElement>('a')?.focus();

		const toggle = document.querySelector<HTMLElement>('[data-menu-toggle]');
		return () => {
			toggle?.focus();
		};
	}, [open]);

	if (!open) return null;

	return (
		<div
			ref={menuRef}
			className={['MainMenu', isCompact ? 'MainMenu--compact' : '']
				.filter(Boolean)
				.join(' ')}
		>
			<div className='MainMenu__title'>
				<span>
					<strong>saturno</strong>
					.services
				</span>
			</div>
			<nav
				className='MainMenu__nav'
				role='menu'
				aria-label='Menú principal'
			>
				<Link
					className='MainMenu__link'
					role='menuitem'
					to='/'
					onClick={onClose}
				>
					<img
						className='MainMenu__link-icon'
						src='/icons/about-me.opti.webp'
						alt=''
					/>
					<div className='MainMenu__link-description'>
						<span>Inicio</span>
						<p>Página principal del sitio</p>
					</div>
				</Link>
				<Link
					className='MainMenu__link'
					role='menuitem'
					to='/about-me'
					onClick={onClose}
				>
					<img
						className='MainMenu__link-icon'
						src='/icons/about-me.opti.webp'
						alt=''
					/>
					<div className='MainMenu__link-description'>
						<span>Sobre mí</span>
						<p>Quién soy, mi experiencia y mi formación</p>
					</div>
				</Link>
				<Link
					className='MainMenu__link'
					role='menuitem'
					to='/wallpaper-editor'
					onClick={onClose}
				>
					<img
						className='MainMenu__link-icon'
						src='/icons/about-me.opti.webp'
						alt=''
					/>
					<div className='MainMenu__link-description'>
						<span>Editor de wallpaper</span>
						<p>Crea y descarga tu propio wallpaper abstracto</p>
					</div>
				</Link>
			</nav>
		</div>
	);
}
