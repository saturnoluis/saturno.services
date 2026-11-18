import { useState } from 'react';
import { readFooterHeight } from '@/lib/footer';
import { readTaskbarHeight } from '@/lib/taskbar';

const JITTER = 32;

export function useRandomWindowPosition(
	width: number,
	height: number,
): { left: number; top: number } {
	const [position] = useState(() => {
		const taskbarHeight = readTaskbarHeight();
		const footerHeight = readFooterHeight();
		const maxX = Math.max(0, globalThis.innerWidth - width);
		const maxY = Math.max(
			0,
			globalThis.innerHeight - taskbarHeight - footerHeight - height,
		);
		const jitterX = Math.min(maxX / 2, JITTER);
		const jitterY = Math.min(maxY / 2, JITTER);

		return {
			left: maxX / 2 + (Math.random() * 2 - 1) * jitterX,
			top: taskbarHeight + maxY / 2 + (Math.random() * 2 - 1) * jitterY,
		};
	});

	return position;
}
