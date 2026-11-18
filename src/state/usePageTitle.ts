import { useEffect } from 'react';
import { useI18n } from '@/state/i18n-context.ts';

export function usePageTitle(title?: string) {
	const { t } = useI18n();
	const baseTitle = t('site.title');
	const siteName = t('site.name');

	useEffect(() => {
		document.title = title ? `${title} — ${siteName}` : baseTitle;
		return () => {
			document.title = baseTitle;
		};
	}, [title, baseTitle, siteName]);
}
