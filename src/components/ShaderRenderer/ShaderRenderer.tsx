import { useShaderRenderer } from '@/components/ShaderRenderer/lib/useShaderRenderer.ts';
import type {
	PresetId,
	ShaderRendererOptions,
} from '@/components/ShaderRenderer/types.ts';

interface ShaderRendererProps extends ShaderRendererOptions {
	/** Which procedural pattern to render. */
	preset: PresetId;
	/** CSS width of the canvas. */
	width?: string;
	/** CSS height of the canvas. */
	height?: string;
}

export default function ShaderRenderer({
	preset,
	width = '100vw',
	height = '100vh',
	...options
}: ShaderRendererProps) {
	const canvasRef = useShaderRenderer(preset, options);

	return (
		<canvas
			ref={canvasRef}
			style={{ width, height, display: 'block', background: '#000' }}
		/>
	);
}
