import { forwardRef } from 'react';
import type { ComponentProps, Ref } from 'react';
import { Link } from 'react-router';
import './Button.css';

type ButtonProps = {
	active?: boolean;
} & (
	({ to?: undefined } & ComponentProps<'button'>) | ComponentProps<typeof Link>
);

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
	function Button({ className, active = false, ...props }, ref) {
		const classes = ['Button', className, active ? 'Button--active' : null]
			.filter(Boolean)
			.join(' ');

		return (
			<div className={classes}>
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
