import type { ReactNode } from 'react';
import ShaderRenderer from '@/components/ShaderRenderer';
import { useDesktopMode } from '@/state/DesktopMode';
import { useWallpaper } from '@/state/Wallpaper';

import './Desktop.css';

export default function Desktop({ children }: { children?: ReactNode }) {
	const { preset, uniforms } = useWallpaper();
	const { scrollable } = useDesktopMode();

	return (
		<div className={scrollable ? 'Desktop Desktop--scrollable' : 'Desktop'}>
			<div className='Desktop__content'>{children}</div>
			<div className='Desktop__wallpaper'>
				<ShaderRenderer preset={preset} uniforms={uniforms} />
			</div>
		</div>
	);
}
