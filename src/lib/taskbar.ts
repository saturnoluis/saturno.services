const TASKBAR_SIZE_VAR = '--size-taskbar';
const TASKBAR_HEIGHT_FALLBACK = 64;

export function readTaskbarHeight(): number {
	if (typeof document === 'undefined') {
		return TASKBAR_HEIGHT_FALLBACK;
	}
	const styles = getComputedStyle(document.documentElement);
	const raw = styles.getPropertyValue(TASKBAR_SIZE_VAR).trim();
	const value = Number.parseFloat(raw);
	if (!Number.isFinite(value)) {
		return TASKBAR_HEIGHT_FALLBACK;
	}
	if (raw.endsWith('rem')) {
		const root = Number.parseFloat(styles.fontSize);
		if (Number.isFinite(root)) {
			return value * root;
		}
	}
	return value;
}
