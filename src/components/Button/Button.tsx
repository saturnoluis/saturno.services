import { forwardRef } from 'react';
import type { ComponentProps } from 'react';
import './Button.css';

type ButtonProps = ComponentProps<'button'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	function Button(props, ref) {
		return (
			<div className='Button'>
				<button ref={ref} className='Button__element' {...props} />
			</div>
		);
	},
);

export default Button;
