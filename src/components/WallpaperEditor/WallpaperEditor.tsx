import type { ChangeEvent } from 'react';
import {
	DistortType,
	LightingType,
	PRESETS,
	PRESET_PATTERN_UNIFORMS,
	type PatternUniformKey,
	type PresetId,
	type ShaderUniforms,
} from '@/components/ShaderRenderer';
import Checkbox from '@/components/Checkbox';
import ColorInput from '@/components/ColorInput';
import Columns from '@/components/Columns';
import Fieldset from '@/components/Fieldset';
import Range from '@/components/Range';
import Select from '@/components/Select';
import { hexToSrgb, srgbToHex } from '@/lib/color.ts';
import { useWallpaper } from '@/state/wallpaper-context.ts';
import './WallpaperEditor.css';

type ColorKey = 'uColor1' | 'uColor2' | 'uColor3' | 'uColor4';

const COLOR_KEYS: { key: ColorKey; label: string }[] = [
	{ key: 'uColor1', label: 'Color 1' },
	{ key: 'uColor2', label: 'Color 2' },
	{ key: 'uColor3', label: 'Color 3' },
	{ key: 'uColor4', label: 'Color 4' },
];

type SliderKey = Exclude<
	keyof ShaderUniforms,
	ColorKey | 'uDistortType' | 'uLightingType' | 'uDither'
>;

type SliderConfig = {
	key: SliderKey;
	label: string;
	min: number;
	max: number;
	step: number;
};

type PatternSliderConfig = Omit<SliderConfig, 'key'> & {
	key: PatternUniformKey;
};

const DISTORT_STRENGTH: SliderConfig = {
	key: 'uDistortStrength',
	label: 'Strength',
	min: -10,
	max: 10,
	step: 0.01,
};

const LIGHTING_SLIDERS: SliderConfig[] = [
	{
		key: 'uLightStrength',
		label: 'Light Strength',
		min: 0,
		max: 1,
		step: 0.01,
	},
	{ key: 'uBevelWidth', label: 'Bevel Width', min: 0, max: 1, step: 0.01 },
	{
		key: 'uLightAngle',
		label: 'Light Angle',
		min: -Math.PI,
		max: Math.PI,
		step: 0.01,
	},
];

const BASE_SLIDERS: SliderConfig[] = [
	{ key: 'uBlend', label: 'Blend', min: 0, max: 1, step: 0.01 },
	{ key: 'uNoise', label: 'Noise', min: 0, max: 1, step: 0.01 },
];

const DITHER_SLIDERS: SliderConfig[] = [
	{
		key: 'uDitherStrength',
		label: 'Dither Strength',
		min: 0,
		max: 1,
		step: 0.01,
	},
	{ key: 'uDitherLevels', label: 'Dither Levels', min: 2, max: 16, step: 1 },
];

const PATTERN_SLIDERS: PatternSliderConfig[] = [
	{ key: 'uVariation', label: 'Variation', min: 0, max: 1, step: 0.01 },
	{ key: 'uAngle', label: 'Angle', min: -Math.PI, max: Math.PI, step: 0.01 },
	{ key: 'uScale', label: 'Scale', min: 0.1, max: 4, step: 0.01 },
	{ key: 'uCenter', label: 'Center', min: -1, max: 1, step: 0.01 },
];

const DISTORT_OPTIONS = [
	{ label: 'None', value: DistortType.None },
	{ label: 'Swirl', value: DistortType.Swirl },
	{ label: 'Fisheye', value: DistortType.Fisheye },
	{ label: 'Sine Wave', value: DistortType.SineWave },
];

const LIGHTING_OPTIONS = [
	{ label: 'None', value: LightingType.None },
	{ label: 'Bevel', value: LightingType.Bevel },
	{ label: 'Gradient', value: LightingType.Gradient },
	{ label: 'Vignette', value: LightingType.Vignette },
];

function lightingSliderEnabled(key: SliderKey, type: LightingType): boolean {
	if (type === LightingType.None) {
		return false;
	}
	if (key === 'uBevelWidth') {
		return type === LightingType.Bevel;
	}
	if (key === 'uLightAngle') {
		return type === LightingType.Gradient;
	}
	return true;
}

export default function WallpaperEditor() {
	const { preset, uniforms, setPreset, setUniform } = useWallpaper();

	const onPresetChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setPreset(event.target.value as PresetId);
	};

	const renderSlider = (config: SliderConfig, disabled = false) => {
		const { key, label, min, max, step } = config;
		return (
			<Range
				key={key}
				label={label}
				min={min}
				max={max}
				step={step}
				value={uniforms[key]}
				disabled={disabled}
				onChange={(event) => setUniform(key, Number(event.target.value))}
			/>
		);
	};

	const ditherOn = uniforms.uDither >= 0.5;

	return (
		<div className='WallpaperEditor'>
			<label className='WallpaperEditor__field'>
				<Select label='Preset' value={preset} onChange={onPresetChange}>
					{PRESETS.map((p) => (
						<option key={p.id} value={p.id}>
							{p.label}
						</option>
					))}
				</Select>
			</label>

			<Columns columns={3} minWidth='10rem'>
				<Fieldset title='Colors'>
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
				</Fieldset>

				<Fieldset title='Distortion'>
					<label className='WallpaperEditor__field'>
						<Select
							label='Type'
							value={uniforms.uDistortType}
							onChange={(event) =>
								setUniform(
									'uDistortType',
									Number(event.target.value) as DistortType,
								)
							}
						>
							{DISTORT_OPTIONS.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</Select>
					</label>

					{renderSlider(
						DISTORT_STRENGTH,
						uniforms.uDistortType === DistortType.None,
					)}
				</Fieldset>

				<Fieldset title='Lighting'>
					<label className='WallpaperEditor__field'>
						<Select
							label='Type'
							value={uniforms.uLightingType}
							onChange={(event) =>
								setUniform(
									'uLightingType',
									Number(event.target.value) as LightingType,
								)
							}
						>
							{LIGHTING_OPTIONS.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</Select>
					</label>

					{LIGHTING_SLIDERS.map((config) =>
						renderSlider(
							config,
							!lightingSliderEnabled(config.key, uniforms.uLightingType),
						),
					)}
				</Fieldset>

				<Fieldset title='Effects'>
					<Checkbox
						label='Dither'
						checked={ditherOn}
						onChange={(event) =>
							setUniform('uDither', event.target.checked ? 1 : 0)
						}
					/>

					{DITHER_SLIDERS.map((config) => renderSlider(config, !ditherOn))}

					{BASE_SLIDERS.map((config) => renderSlider(config))}

					{PATTERN_SLIDERS.map((config) =>
						renderSlider(
							config,
							!PRESET_PATTERN_UNIFORMS[preset].includes(config.key),
						),
					)}
				</Fieldset>
			</Columns>
		</div>
	);
}
