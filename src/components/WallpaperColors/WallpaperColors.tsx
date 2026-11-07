import Select from '@/components/Select';
import ColorInput from '@/components/ColorInput';
import { hexToSrgb, srgbToHex } from '@/lib/color.ts';
import { useWallpaper } from '@/state/wallpaper-context.ts';
import './WallpaperColors.css';

type ColorKey = 'uColor1' | 'uColor2' | 'uColor3' | 'uColor4';

const COLOR_KEYS: ColorKey[] = ['uColor1', 'uColor2', 'uColor3', 'uColor4'];

interface WallpaperColorsProps {
	label?: string;
}

export default function WallpaperColors({ label }: WallpaperColorsProps) {
	const { uniforms, setUniform } = useWallpaper();

	return (
		<div className='WallpaperColors'>
			{label !== undefined && (
				<span className='WallpaperColors__label'>{label}</span>
			)}
			<Select>
				<option key='foo' value='foo'>
					Foo
				</option>
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
