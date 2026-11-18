import { useEffect } from 'react';

const SITE_NAME = 'Luis Saturno';
const BASE_TITLE = `${SITE_NAME} — Desarrollo Web`;

export function usePageTitle(title?: string) {
	useEffect(() => {
		document.title = title ? `${title} — ${SITE_NAME}` : BASE_TITLE;
		return () => {
			document.title = BASE_TITLE;
		};
	}, [title]);
}
