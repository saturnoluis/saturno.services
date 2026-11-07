import type { ChangeEvent } from 'react';
import Select from '@/components/Select';
import ColorInput from '@/components/ColorInput';
import { hexToSrgb, srgbEquals, srgbToHex } from '@/lib/color.ts';
import { useWallpaper } from '@/state/wallpaper-context.ts';
import { COLOR_PALETTES } from './palettes.ts';
import './WallpaperColors.css';

type ColorKey = 'uColor1' | 'uColor2' | 'uColor3' | 'uColor4';

const COLOR_KEYS: ColorKey[] = ['uColor1', 'uColor2', 'uColor3', 'uColor4'];

const CUSTOM_ID = 'custom';

interface WallpaperColorsProps {
	label?: string;
}

export default function WallpaperColors({ label }: WallpaperColorsProps) {
	const { uniforms, setUniform } = useWallpaper();

	const selectedId =
		COLOR_PALETTES.find((palette) =>
			palette.colors.every((hex, index) =>
				srgbEquals(uniforms[COLOR_KEYS[index]], hexToSrgb(hex)),
			),
		)?.id ?? CUSTOM_ID;

	const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const palette = COLOR_PALETTES.find((p) => p.id === event.target.value);
		if (!palette) {
			return;
		}
		palette.colors.forEach((hex, index) =>
			setUniform(COLOR_KEYS[index], hexToSrgb(hex)),
		);
	};

	return (
		<div className='WallpaperColors'>
			{label !== undefined && (
				<span className='WallpaperColors__label'>{label}</span>
			)}
			<Select value={selectedId} onChange={onChange}>
				<option key={CUSTOM_ID} value={CUSTOM_ID}>
					Custom
				</option>
				{COLOR_PALETTES.map((palette) => (
					<option key={palette.id} value={palette.id}>
						{palette.label}
					</option>
				))}
			</Select>
			<div className='WallpaperColors__row'>
				{COLOR_KEYS.map((key) => (
					<ColorInput
						key={key}
						value={srgbToHex(uniforms[key])}
						onChange={(event) =>
							setUniform(key, hexToSrgb(event.target.value))
						}
					/>
				))}
			</div>
		</div>
	);
}
