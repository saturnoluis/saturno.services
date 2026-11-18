const FOOTER_SIZE_VAR = '--size-footer';
const FOOTER_HEIGHT_FALLBACK = 38;

export function readFooterHeight(): number {
	if (typeof document === 'undefined') {
		return FOOTER_HEIGHT_FALLBACK;
	}
	const styles = getComputedStyle(document.documentElement);
	const raw = styles.getPropertyValue(FOOTER_SIZE_VAR).trim();
	const value = Number.parseFloat(raw);
	if (!Number.isFinite(value)) {
		return FOOTER_HEIGHT_FALLBACK;
	}
	if (raw.endsWith('rem')) {
		const root = Number.parseFloat(styles.fontSize);
		if (Number.isFinite(root)) {
			return value * root;
		}
	}
	return value;
}
