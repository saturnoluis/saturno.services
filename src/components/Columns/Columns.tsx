import type { CSSProperties, ComponentProps } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
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
	const containerRef = useRef<HTMLDivElement>(null);
	const [stacked, setStacked] = useState(false);

	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const update = () => {
			const children = Array.from(container.children) as HTMLElement[];
			const tops = children.map((child) =>
				Math.round(child.getBoundingClientRect().top),
			);
			setStacked(
				children.length > 1 && new Set(tops).size === children.length,
			);
		};

		update();
		const observer = new ResizeObserver(update);
		observer.observe(container);
		return () => observer.disconnect();
	}, []);

	const basis = `min(100%, max(calc(100% / ${columns} - ${((columns - 1) * gap) / columns}px), ${minWidth}))`;

	return (
		<div
			ref={containerRef}
			data-stacked={stacked ? '' : undefined}
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
