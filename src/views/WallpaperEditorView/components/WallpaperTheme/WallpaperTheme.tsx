import type { ChangeEvent } from 'react';
import Select from '@/components/Select';
import { useWallpaper } from '@/state/wallpaper-context.ts';
import { CUSTOM_ID, matchesTheme, WALLPAPER_THEMES } from './themes.ts';

export default function WallpaperTheme() {
	const { preset, uniforms, targetId, setConfig } = useWallpaper();

	const selectedId =
		WALLPAPER_THEMES.find((theme) => matchesTheme(theme, preset, uniforms))
			?.id ?? CUSTOM_ID;

	const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const theme = WALLPAPER_THEMES.find((t) => t.id === event.target.value);
		if (!theme) {
			return;
		}
		setConfig({
			preset: theme.preset,
			uniforms: theme.uniforms,
			targetId,
		});
	};

	return (
		<Select label='Theme' value={selectedId} onChange={onChange}>
			<option key={CUSTOM_ID} value={CUSTOM_ID}>
				Custom
			</option>
			{WALLPAPER_THEMES.map((theme) => (
				<option key={theme.id} value={theme.id}>
					{theme.label}
				</option>
			))}
		</Select>
	);
}
