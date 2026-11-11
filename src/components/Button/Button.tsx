import { forwardRef } from 'react';
import type { ComponentProps, Ref } from 'react';
import './Button.css';

type ButtonProps =
	| ({ href?: undefined } & ComponentProps<'button'>)
	| ({ href: string } & ComponentProps<'a'>);

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
	function Button(props, ref) {
		return (
			<div className='Button'>
				{typeof props.href === 'string' ? (
					<a
						ref={ref as Ref<HTMLAnchorElement>}
						className='Button__element'
						{...props}
					/>
				) : (
					<button
						ref={ref as Ref<HTMLButtonElement>}
						className='Button__element'
						{...props}
					/>
				)}
			</div>
		);
	},
);

export default Button;
