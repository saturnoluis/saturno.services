import Button from '@/components/Button';
import { readTaskbarHeight } from '@/lib/taskbar';
import { useEffect, useRef, useState } from 'react';
import type {
	CSSProperties,
	PointerEvent as ReactPointerEvent,
	ReactNode,
} from 'react';
import './Window.css';

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const GAP = 16;
const MIN_SIZE_FALLBACK = 400;

function readColumnMin(): number {
	if (typeof document === 'undefined') {
		return MIN_SIZE_FALLBACK;
	}
	const styles = getComputedStyle(document.documentElement);
	const raw = styles.getPropertyValue('--size-column-min').trim();
	const value = Number.parseFloat(raw);
	if (!Number.isFinite(value)) {
		return MIN_SIZE_FALLBACK;
	}
	if (raw.endsWith('rem')) {
		const root = Number.parseFloat(styles.fontSize);
		if (Number.isFinite(root)) {
			return value * root;
		}
	}
	return value;
}

export interface WindowControl {
	label: string;
	title?: string;
	action?: string | (() => void);
}

interface WindowProps {
	height?: CSSProperties['height'];
	width?: CSSProperties['width'];
	top?: CSSProperties['top'];
	left?: CSSProperties['left'];
	title?: ReactNode;
	controls?: WindowControl[];
	children?: ReactNode;
}

interface DragState {
	mode: 'move' | ResizeDirection;
	startX: number;
	startY: number;
	x: number;
	y: number;
	width: number;
	height: number;
}

const RESIZE_HANDLES: ResizeDirection[] = [
	'n',
	's',
	'e',
	'w',
	'ne',
	'nw',
	'se',
	'sw',
];

function toPixels(
	value:
		| CSSProperties['height']
		| CSSProperties['width']
		| CSSProperties['top']
		| CSSProperties['left'],
	fallback: number,
): number {
	const num =
		typeof value === 'number' ? value : Number.parseFloat(String(value));
	return Number.isFinite(num) ? num : fallback;
}

function computeCompact(
	requestedWidth: number,
	requestedHeight: number,
	taskbarHeight: number,
): boolean {
	return (
		window.innerWidth < requestedWidth + GAP * 2 ||
		window.innerHeight - taskbarHeight < requestedHeight + GAP * 2
	);
}

export default function Window({
	height: initialHeight,
	width: initialWidth,
	top: initialTop,
	left: initialLeft,
	title,
	controls,
	children,
}: WindowProps) {
	const [position, setPosition] = useState(() => ({
		x: toPixels(initialLeft, 0),
		y: toPixels(initialTop, 0),
	}));
	const [size, setSize] = useState(() => ({
		width: toPixels(initialWidth, 320),
		height: toPixels(initialHeight, 200),
	}));
	const requestedWidth = toPixels(initialWidth, 320);
	const requestedHeight = toPixels(initialHeight, 200);
	const [isCompact, setIsCompact] = useState(() =>
		computeCompact(requestedWidth, requestedHeight, readTaskbarHeight()),
	);
	const dragState = useRef<DragState | null>(null);

	useEffect(() => {
		const update = () => {
			setIsCompact(
				computeCompact(
					requestedWidth,
					requestedHeight,
					readTaskbarHeight(),
				),
			);
			dragState.current = null;
		};

		globalThis.addEventListener('resize', update);

		return () => {
			globalThis.removeEventListener('resize', update);
		};
	}, [requestedWidth, requestedHeight]);

	useEffect(() => {
		const onPointerMove = (event: PointerEvent) => {
			const state = dragState.current;
			if (!state) return;

			const dx = event.clientX - state.startX;
			const dy = event.clientY - state.startY;

			let { x, y, width, height } = state;
			const minSize = readColumnMin();

			if (state.mode === 'move') {
				x += dx;
				y += dy;
			} else {
				if (state.mode.includes('e')) width += dx;
				if (state.mode.includes('s')) height += dy;
				if (state.mode.includes('w')) {
					width -= dx;
					x += dx;
				}
				if (state.mode.includes('n')) {
					height -= dy;
					y += dy;
				}

				if (width < minSize) {
					if (state.mode.includes('w')) x -= minSize - width;
					width = minSize;
				}
				if (height < minSize) {
					if (state.mode.includes('n')) y -= minSize - height;
					height = minSize;
				}
			}

			setPosition({ x, y });
			setSize({ width, height });
		};

		const onPointerUp = () => {
			dragState.current = null;
		};

		globalThis.addEventListener('pointermove', onPointerMove);
		globalThis.addEventListener('pointerup', onPointerUp);
		globalThis.addEventListener('pointercancel', onPointerUp);

		return () => {
			globalThis.removeEventListener('pointermove', onPointerMove);
			globalThis.removeEventListener('pointerup', onPointerUp);
			globalThis.removeEventListener('pointercancel', onPointerUp);
		};
	}, []);

	const beginDrag = (event: ReactPointerEvent, mode: DragState['mode']) => {
		if (isCompact) return;
		event.preventDefault();
		event.stopPropagation();
		dragState.current = {
			mode,
			startX: event.clientX,
			startY: event.clientY,
			x: position.x,
			y: position.y,
			width: size.width,
			height: size.height,
		};
	};

	return (
		<div
			className={[
				'Window',
				isCompact ? 'Window--compact' : '',
				title ? 'Window--titled' : '',
			]
				.filter(Boolean)
				.join(' ')}
			style={
				isCompact
					? undefined
					: {
							left: position.x,
							top: position.y,
							width: size.width,
							height: size.height,
						}
			}
			onPointerDown={(event) => beginDrag(event, 'move')}
		>
			{title && (
				<header className='Window__header'>
					<span className='Window__header-title'>{title}</span>
					{controls && controls.length > 0 && (
						<div className='Window__header-controls'>
							{controls.map(
								(
									{ label, title: controlTitle, action },
									index,
								) =>
									typeof action === 'string' ? (
										<Button
											key={`${label}-${index}`}
											to={action}
											title={controlTitle}
										>
											{label}
										</Button>
									) : (
										<Button
											key={`${label}-${index}`}
											onClick={action}
											title={controlTitle}
										>
											{label}
										</Button>
									),
							)}
						</div>
					)}
				</header>
			)}
			<div className='Window__body'>{children}</div>
			{!isCompact &&
				RESIZE_HANDLES.map((direction) => (
					<div
						key={direction}
						className={`Window__handle Window__handle--${direction}`}
						onPointerDown={(event) => beginDrag(event, direction)}
					/>
				))}
		</div>
	);
}
