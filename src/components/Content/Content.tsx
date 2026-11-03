import type { ReactNode } from 'react';
import './Content.css';

interface ContentProps {
	children?: ReactNode;
}

export default function Content({ children }: ContentProps) {
	return (
		<div
			className='Content'
			onPointerDown={(event) => event.stopPropagation()}
		>
			<div className='Content__inner'>{children}</div>
		</div>
	);
}
