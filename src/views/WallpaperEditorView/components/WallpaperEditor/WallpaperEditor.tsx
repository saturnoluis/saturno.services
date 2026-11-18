import {
	DistortType,
	LightingType,
	PRESET_PATTERN_UNIFORMS,
	type PatternUniformKey,
	type ShaderUniforms,
} from '@/components/ShaderRenderer';
import Checkbox from '@/components/Checkbox';
import Columns from '@/components/Columns';
import Fieldset from '@/components/Fieldset';
import Range from '@/components/Range';
import Select from '@/components/Select';
import { useI18n } from '@/state/I18n';
import { useWallpaper } from '@/state/Wallpaper';
import {
	EDITOR_COLUMN_GAP,
	EDITOR_COLUMN_MIN_WIDTH,
} from '@/views/WallpaperEditorView/constants.ts';
import './WallpaperEditor.css';

type SliderKey = Exclude<
	keyof ShaderUniforms,
	| 'uColor1'
	| 'uColor2'
	| 'uColor3'
	| 'uColor4'
	| 'uDistortType'
	| 'uLightingType'
	| 'uDither'
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
	label: 'editor.slider.distortionStrength',
	min: -10,
	max: 10,
	step: 0.01,
};

const LIGHTING_SLIDERS: SliderConfig[] = [
	{
		key: 'uLightStrength',
		label: 'editor.slider.lightStrength',
		min: 0,
		max: 1,
		step: 0.01,
	},
	{
		key: 'uBevelWidth',
		label: 'editor.slider.bevelWidth',
		min: 0,
		max: 1,
		step: 0.01,
	},
	{
		key: 'uLightAngle',
		label: 'editor.slider.lightAngle',
		min: -Math.PI,
		max: Math.PI,
		step: 0.01,
	},
];

const BASE_SLIDERS: SliderConfig[] = [
	{ key: 'uBlend', label: 'editor.slider.blend', min: 0, max: 1, step: 0.01 },
	{ key: 'uNoise', label: 'editor.slider.noise', min: 0, max: 1, step: 0.01 },
];

const DITHER_SLIDERS: SliderConfig[] = [
	{
		key: 'uDitherStrength',
		label: 'editor.slider.ditherStrength',
		min: 0,
		max: 1,
		step: 0.01,
	},
	{
		key: 'uDitherLevels',
		label: 'editor.slider.ditherLevels',
		min: 2,
		max: 16,
		step: 1,
	},
];

const PIXELATE_MAX = 128;

function toPixelateSlider(u: number): number {
	return u <= 0 ? 0 : PIXELATE_MAX + 1 - u;
}

function toPixelateUniform(s: number): number {
	return s <= 0 ? 0 : PIXELATE_MAX + 1 - s;
}

const PATTERN_SLIDERS: PatternSliderConfig[] = [
	{
		key: 'uVariation',
		label: 'editor.slider.variation',
		min: 0,
		max: 1,
		step: 0.01,
	},
	{
		key: 'uAngle',
		label: 'editor.slider.angle',
		min: -Math.PI,
		max: Math.PI,
		step: 0.01,
	},
	{
		key: 'uScale',
		label: 'editor.slider.scale',
		min: 0.1,
		max: 4,
		step: 0.01,
	},
	{
		key: 'uCenter',
		label: 'editor.slider.center',
		min: -1,
		max: 1,
		step: 0.01,
	},
];

const DISTORT_OPTIONS = [
	{ label: 'editor.distortion.none', value: DistortType.None },
	{ label: 'editor.distortion.swirl', value: DistortType.Swirl },
	{ label: 'editor.distortion.fisheye', value: DistortType.Fisheye },
	{ label: 'editor.distortion.sineWave', value: DistortType.SineWave },
];

const LIGHTING_OPTIONS = [
	{ label: 'editor.lighting.none', value: LightingType.None },
	{ label: 'editor.lighting.bevel', value: LightingType.Bevel },
	{ label: 'editor.lighting.gradient', value: LightingType.Gradient },
	{ label: 'editor.lighting.vignette', value: LightingType.Vignette },
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

interface WallpaperEditorProps {
	minWidth?: string;
	gap?: number;
}

export default function WallpaperEditor({
	minWidth = EDITOR_COLUMN_MIN_WIDTH,
	gap = EDITOR_COLUMN_GAP,
}: WallpaperEditorProps) {
	const { preset, uniforms, setUniform } = useWallpaper();
	const { t } = useI18n();

	const renderSlider = (config: SliderConfig, disabled = false) => {
		const { key, label, min, max, step } = config;
		return (
			<Range
				key={key}
				label={t(label)}
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
			<Columns columns={3} minWidth={minWidth} gap={gap}>
				<Fieldset title={t('editor.properties')}>
					{BASE_SLIDERS.map((config) => renderSlider(config))}

					{PATTERN_SLIDERS.map((config) =>
						renderSlider(
							config,
							!PRESET_PATTERN_UNIFORMS[preset].includes(config.key),
						),
					)}
				</Fieldset>

				<Fieldset title={t('editor.effects')}>
					<label className='WallpaperEditor__field'>
						<Select
							label={t('editor.distortion')}
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
									{t(option.label)}
								</option>
							))}
						</Select>
					</label>

					{renderSlider(
						DISTORT_STRENGTH,
						uniforms.uDistortType === DistortType.None,
					)}

					<Checkbox
						label={t('editor.checkbox.dither')}
						checked={ditherOn}
						onChange={(event) =>
							setUniform('uDither', event.target.checked ? 1 : 0)
						}
					/>

					{DITHER_SLIDERS.map((config) =>
						renderSlider(config, !ditherOn),
					)}

					<Range
						label={t('editor.slider.pixelate')}
						min={0}
						max={PIXELATE_MAX}
						step={1}
						value={toPixelateSlider(uniforms.uPixelate)}
						onChange={(event) =>
							setUniform(
								'uPixelate',
								toPixelateUniform(Number(event.target.value)),
							)
						}
					/>
				</Fieldset>

				<Fieldset title={t('editor.lighting')}>
					<label className='WallpaperEditor__field'>
						<Select
							label={t('editor.type')}
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
									{t(option.label)}
								</option>
							))}
						</Select>
					</label>

					{LIGHTING_SLIDERS.map((config) =>
						renderSlider(
							config,
							!lightingSliderEnabled(
								config.key,
								uniforms.uLightingType,
							),
						),
					)}
				</Fieldset>
			</Columns>
		</div>
	);
}
