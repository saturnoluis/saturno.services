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
	divided?: boolean;
}

interface Divider {
	key: string;
	axis: 'vertical' | 'horizontal';
	style: CSSProperties;
}

export default function Columns({
	columns = 3,
	minWidth = 'var(--size-column-min)',
	gap = 16,
	ratios,
	divided = false,
	style,
	children,
	...props
}: ColumnsProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const [stacked, setStacked] = useState(false);
	const [dividers, setDividers] = useState<Divider[]>([]);

	useLayoutEffect(() => {
		const container = containerRef.current;
		const content = contentRef.current;
		if (!container || !content) return;

		const update = () => {
			const children = Array.from(content.children) as HTMLElement[];
			const tops = children.map((child) =>
				Math.round(child.getBoundingClientRect().top),
			);
			setStacked(
				children.length > 1 && new Set(tops).size === children.length,
			);

			if (!divided) return;

			const origin = container.getBoundingClientRect();
			const rects = children.map((child) => {
				const rect = child.getBoundingClientRect();
				return {
					top: rect.top - origin.top,
					left: rect.left - origin.left,
					right: rect.right - origin.left,
					bottom: rect.bottom - origin.top,
				};
			});

			const groups = new Map<number, number[]>();
			rects.forEach((rect, index) => {
				const top = Math.round(rect.top);
				const group = groups.get(top) ?? [];
				group.push(index);
				groups.set(top, group);
			});

			const rows = Array.from(groups.values())
				.map((indices) =>
					indices.sort((a, b) => rects[a].left - rects[b].left),
				)
				.sort((a, b) => rects[a[0]].top - rects[b[0]].top);

			const next: Divider[] = [];

			for (const row of rows) {
				const rowTop = Math.round(
					Math.min(...row.map((index) => rects[index].top)),
				);
				const rowBottom = Math.round(
					Math.max(...row.map((index) => rects[index].bottom)),
				);
				for (let i = 0; i < row.length - 1; i++) {
					const left = rects[row[i]];
					const right = rects[row[i + 1]];
					next.push({
						key: `v-${row[i]}-${row[i + 1]}`,
						axis: 'vertical',
						style: {
							left: Math.round((left.right + right.left) / 2) - 1,
							top: rowTop,
							height: rowBottom - rowTop,
						},
					});
				}
			}

			for (let i = 0; i < rows.length - 1; i++) {
				const upper = rows[i];
				const lower = rows[i + 1];
				const upperBottom = Math.round(
					Math.max(...upper.map((index) => rects[index].bottom)),
				);
				const lowerTop = Math.round(
					Math.min(...lower.map((index) => rects[index].top)),
				);
				const combined = [...upper, ...lower];
				const left = Math.round(
					Math.min(...combined.map((index) => rects[index].left)),
				);
				const right = Math.round(
					Math.max(...combined.map((index) => rects[index].right)),
				);
				next.push({
					key: `h-${i}`,
					axis: 'horizontal',
					style: {
						left,
						width: right - left,
						top: Math.round((upperBottom + lowerTop) / 2) - 1,
					},
				});
			}

			setDividers(next);
		};

		update();
		const observer = new ResizeObserver(update);
		observer.observe(container);
		return () => observer.disconnect();
	}, [divided, gap, columns, ratios, minWidth]);

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
			className={divided ? 'Columns Columns--divided' : 'Columns'}
			style={
				{
					...style,
					'--columns-gap': `${gap}px`,
					'--columns-basis': basis,
				} as CSSProperties
			}
			{...props}
		>
			<div ref={contentRef} className='Columns__content'>
				{sizedChildren}
			</div>
			{divided && (
				<div className='Columns__dividers' aria-hidden='true'>
					{dividers.map((divider) => (
						<span
							key={divider.key}
							className={`Columns__divider Columns__divider--${divider.axis}`}
							style={divider.style}
						/>
					))}
				</div>
			)}
		</div>
	);
}
