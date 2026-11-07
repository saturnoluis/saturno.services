import type { CSSProperties, ComponentProps } from 'react';
import './Stack.css';

interface StackProps extends ComponentProps<'div'> {
	gap?: number;
}

export default function Stack({ gap = 16, style, ...props }: StackProps) {
	return (
		<div
			className='Stack'
			style={
				{
					...style,
					'--stack-gap': `${gap}px`,
				} as CSSProperties
			}
			{...props}
		/>
	);
}
