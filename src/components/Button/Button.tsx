import { forwardRef } from 'react';
import type { ComponentProps, Ref } from 'react';
import { Link } from 'react-router';
import './Button.css';

type ButtonProps =
	({ to?: undefined } & ComponentProps<'button'>) | ComponentProps<typeof Link>;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
	function Button({ className, ...props }, ref) {
		return (
			<div className={className ? `Button ${className}` : 'Button'}>
				{props.to === undefined ? (
					<button
						ref={ref as Ref<HTMLButtonElement>}
						className='Button__element'
						{...props}
					/>
				) : (
					<Link
						ref={ref as Ref<HTMLAnchorElement>}
						className='Button__element'
						{...props}
					/>
				)}
			</div>
		);
	},
);

export default Button;
