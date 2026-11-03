import { useEffect, useRef, useState } from 'react';
import type {
	CSSProperties,
	PointerEvent as ReactPointerEvent,
	ReactNode,
} from 'react';
import './Surface.css';

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const MIN_WIDTH = 64;
const MIN_HEIGHT = 48;
const GAP = 16;

interface SurfaceProps {
	height?: CSSProperties['height'];
	width?: CSSProperties['width'];
	top?: CSSProperties['top'];
	left?: CSSProperties['left'];
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
): boolean {
	return (
		window.innerWidth < requestedWidth + GAP * 2 ||
		window.innerHeight < requestedHeight + GAP * 2
	);
}

export default function Surface({
	height: initialHeight,
	width: initialWidth,
	top: initialTop,
	left: initialLeft,
	children,
}: SurfaceProps) {
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
		computeCompact(requestedWidth, requestedHeight),
	);
	const dragState = useRef<DragState | null>(null);

	useEffect(() => {
		const update = () => {
			setIsCompact(computeCompact(requestedWidth, requestedHeight));
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

				if (width < MIN_WIDTH) {
					if (state.mode.includes('w')) x -= MIN_WIDTH - width;
					width = MIN_WIDTH;
				}
				if (height < MIN_HEIGHT) {
					if (state.mode.includes('n')) y -= MIN_HEIGHT - height;
					height = MIN_HEIGHT;
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
			className={isCompact ? 'Surface Surface--compact' : 'Surface'}
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
			{children}
			{!isCompact &&
				RESIZE_HANDLES.map((direction) => (
					<div
						key={direction}
						className={`Surface__handle Surface__handle--${direction}`}
						onPointerDown={(event) => beginDrag(event, direction)}
					/>
				))}
		</div>
	);
}
