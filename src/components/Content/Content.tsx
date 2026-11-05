import type { ReactNode } from 'react';
import './Content.css';

type ContentVariant = 'sunken' | 'raised' | 'flat' | 'plain';
type ContentOverflowY = 'scroll' | 'auto' | 'hidden';

interface ContentProps {
	children?: ReactNode;
	variant?: ContentVariant;
	overflowY?: ContentOverflowY;
}

export default function Content({
	children,
	variant = 'sunken',
	overflowY = 'scroll',
}: ContentProps) {
	return (
		<div
			className={`Content Content--${variant}`}
			onPointerDown={(event) => event.stopPropagation()}
		>
			<div className='Content__inner' style={{ overflowY }}>
				{children}
			</div>
		</div>
	);
}
