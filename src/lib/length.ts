const ROOT_FONT_SIZE_FALLBACK = 16;

export function remToPx(value: string): number {
	const rem = Number.parseFloat(value);
	if (!Number.isFinite(rem)) {
		return 0;
	}
	if (typeof document === 'undefined') {
		return rem * ROOT_FONT_SIZE_FALLBACK;
	}
	const root = Number.parseFloat(
		getComputedStyle(document.documentElement).fontSize,
	);
	return rem * (Number.isFinite(root) ? root : ROOT_FONT_SIZE_FALLBACK);
}
