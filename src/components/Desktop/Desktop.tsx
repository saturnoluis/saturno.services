import type { ReactNode } from 'react';
import ShaderRenderer from '@/components/ShaderRenderer';
import { useWallpaper } from '@/state/wallpaper-context.ts';

import './Desktop.css';

export default function Desktop({ children }: { children?: ReactNode }) {
	const { preset, uniforms } = useWallpaper();

	return (
		<div className='Desktop'>
			<div className='Desktop__content'>{children}</div>
			<div className='Desktop__wallpaper'>
				<ShaderRenderer preset={preset} uniforms={uniforms} />
			</div>
		</div>
	);
}
