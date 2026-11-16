import type { CSSProperties, ComponentProps, ReactElement } from 'react';
import {
	Children,
	cloneElement,
	isValidElement,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import './Columns.css';

interface ColumnsProps extends ComponentProps<'div'> {
	columns?: 1 | 2 | 3;
	minWidth?: string;
	gap?: number;
	ratios?: number[];
}

export default function Columns({
	columns = 3,
	minWidth = 'var(--size-column-min)',
	gap = 16,
	ratios,
	style,
	children,
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

	const count = ratios?.length ?? columns;

	const basis = `min(100%, max(calc(100% / ${count} - ${((count - 1) * gap) / count}px), ${minWidth}))`;

	const sizedChildren = ratios
		? Children.map(children, (child, index) => {
				if (!isValidElement(child)) return child;
				const ratio = ratios[index] ?? 1;
				const element = child as ReactElement<{ style?: CSSProperties }>;
				return cloneElement(element, {
					style: {
						flexGrow: ratio,
						flexBasis: 0,
						minWidth: `min(${minWidth}, 100%)`,
						...element.props.style,
					},
				});
			})
		: children;

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
		>
			{sizedChildren}
		</div>
	);
}
