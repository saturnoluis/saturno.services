import { useMemo, useState, type ReactNode } from 'react';
import {
	DesktopModeContext,
	type DesktopModeContextValue,
} from '@/state/desktop-mode-context.ts';

export function DesktopModeProvider({ children }: { children?: ReactNode }) {
	const [scrollable, setScrollable] = useState(false);

	const value = useMemo<DesktopModeContextValue>(
		() => ({ scrollable, setScrollable }),
		[scrollable],
	);

	return (
		<DesktopModeContext.Provider value={value}>
			{children}
		</DesktopModeContext.Provider>
	);
}
