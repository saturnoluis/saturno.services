import type { ChangeEvent } from 'react';
import { PRESETS, type PresetId } from '@/components/ShaderRenderer';
import ColorInput from '@/components/ColorInput';
import Select from '@/components/Select';
import { hexToSrgb, srgbToHex } from '@/lib/color.ts';
import { useWallpaper } from '@/state/wallpaper-context.ts';

type ColorKey = 'uColor1' | 'uColor2' | 'uColor3' | 'uColor4';

const COLOR_KEYS: { key: ColorKey; label: string }[] = [
	{ key: 'uColor1', label: 'Color 1' },
	{ key: 'uColor2', label: 'Color 2' },
	{ key: 'uColor3', label: 'Color 3' },
	{ key: 'uColor4', label: 'Color 4' },
];

export default function WallpaperColors() {
	const { preset, uniforms, setPreset, setUniform } = useWallpaper();

	const onPresetChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setPreset(event.target.value as PresetId);
	};

	return (
		<>
			<Select label='Preset' value={preset} onChange={onPresetChange}>
				{PRESETS.map((p) => (
					<option key={p.id} value={p.id}>
						{p.label}
					</option>
				))}
			</Select>

			{COLOR_KEYS.map(({ key, label }) => (
				<ColorInput
					key={key}
					label={label}
					value={srgbToHex(uniforms[key])}
					onChange={(event) =>
						setUniform(key, hexToSrgb(event.target.value))
					}
				/>
			))}
		</>
	);
}
