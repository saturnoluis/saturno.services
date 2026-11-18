import { useMemo, useState, type ReactNode } from 'react';
import {
	DesktopModeContext,
	type DesktopModeContextValue,
} from './DesktopModeContext.ts';

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
