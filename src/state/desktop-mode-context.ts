import { createContext, useContext } from 'react';

export interface DesktopModeContextValue {
	scrollable: boolean;
	setScrollable: (scrollable: boolean) => void;
}

export const DesktopModeContext = createContext<DesktopModeContextValue | null>(
	null,
);

export function useDesktopMode(): DesktopModeContextValue {
	const context = useContext(DesktopModeContext);
	if (!context) {
		throw new Error(
			'useDesktopMode must be used within a DesktopModeProvider',
		);
	}
	return context;
}
