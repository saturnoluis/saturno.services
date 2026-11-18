import {
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import {
	ThemeContext,
	type Theme,
	type ThemeContextValue,
} from '@/state/theme-context.ts';

const STORAGE_KEY = 'ok-theme';

function readStoredTheme(): Theme | null {
	if (typeof localStorage === 'undefined') {
		return null;
	}
	const stored = localStorage.getItem(STORAGE_KEY);
	return stored === 'light' || stored === 'dark' ? stored : null;
}

function readSystemTheme(): Theme {
	if (typeof window === 'undefined') {
		return 'light';
	}
	return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children?: ReactNode }) {
	const [theme, setTheme] = useState<Theme>(
		() => readStoredTheme() ?? readSystemTheme(),
	);
	const [manual, setManual] = useState(() => readStoredTheme() !== null);

	useLayoutEffect(() => {
		document.documentElement.dataset.theme = theme;
	}, [theme]);

	useEffect(() => {
		if (manual) {
			return;
		}
		const media = matchMedia('(prefers-color-scheme: dark)');
		const onChange = () => setTheme(media.matches ? 'dark' : 'light');
		media.addEventListener('change', onChange);
		return () => media.removeEventListener('change', onChange);
	}, [manual]);

	const value = useMemo<ThemeContextValue>(
		() => ({
			theme,
			toggleTheme: () => {
				setTheme((previous) => {
					const next = previous === 'light' ? 'dark' : 'light';
					localStorage.setItem(STORAGE_KEY, next);
					return next;
				});
				setManual(true);
			},
		}),
		[theme],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}
