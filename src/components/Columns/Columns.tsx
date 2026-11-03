import type { CSSProperties, ComponentProps } from 'react';
import './Columns.css';

interface ColumnsProps extends ComponentProps<'div'> {
	columns?: 1 | 2 | 3;
	minWidth?: string;
	gap?: number;
}

export default function Columns({
	columns = 3,
	minWidth = 'var(--size-column-min)',
	gap = 16,
	style,
	...props
}: ColumnsProps) {
	const basis = `min(100%, max(calc(100% / ${columns} - ${((columns - 1) * gap) / columns}px), ${minWidth}))`;

	return (
		<div
			className='Columns'
			style={
				{
					...style,
					'--columns-gap': `${gap}px`,
					'--columns-basis': basis,
				} as CSSProperties
			}
			{...props}
		/>
	);
}
