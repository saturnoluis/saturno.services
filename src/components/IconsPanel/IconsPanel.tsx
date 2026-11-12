import { Link } from 'react-router';
import type { ReactNode } from 'react';
import './IconsPanel.css';

export default function IconsPanel({ children }: IconsPanelProps) {
	return (
		<nav className='IconsPanel'>
			<Link className='Icon' to='/about-me'>
				<img
					src='/icons/about-me.opti.webp'
					alt='My face as an icon for about-me'
				/>
				<span>About me</span>
			</Link>

			<Link className='Icon' to='/wallpaper-editor'>
				<img
					src='/icons/about-me.opti.webp'
					alt='My face as an icon for about-me'
				/>
				<span>Wallpaper Editor</span>
			</Link>
		</nav>
	);
}
