import type { ReactNode } from 'react';
import './Information.css';

interface InformationProps {
	title?: string;
	children?: ReactNode;
}

export default function Information({ title, children }: InformationProps) {
	return (
		<div className='Information'>
			{title && <span className='Information__title'>{title}</span>}
			<p className='Information__body'>{children}</p>
		</div>
	);
}
