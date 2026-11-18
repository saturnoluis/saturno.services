import { useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { en, es, type MessageCatalog } from '@/lib/i18n/index.ts';
import {
	I18nContext,
	type I18nContextValue,
	type Locale,
} from './I18nContext.ts';

const CATALOGS: Record<Locale, MessageCatalog> = { es, en };

export function I18nProvider({ children }: { children?: ReactNode }) {
	const [locale, setLocale] = useState<Locale>('es');

	useLayoutEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	const value = useMemo<I18nContextValue>(
		() => ({
			locale,
			setLocale,
			t: (key) => CATALOGS[locale][key] ?? key,
		}),
		[locale],
	);

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
