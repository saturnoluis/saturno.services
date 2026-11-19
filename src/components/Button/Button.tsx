import { forwardRef } from 'react';
import type { ComponentProps, CSSProperties, Ref } from 'react';
import { Link } from 'react-router';
import './Button.css';

type ButtonProps = {
	active?: boolean;
	height?: CSSProperties['height'];
	width?: CSSProperties['width'];
	fontSize?: CSSProperties['fontSize'];
	backgroundColor?: CSSProperties['backgroundColor'];
} & (
	({ to?: undefined } & ComponentProps<'button'>) | ComponentProps<typeof Link>
);

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
	function Button(
		{
			className,
			active = false,
			height,
			width,
			fontSize,
			backgroundColor,
			style,
			...props
		},
		ref,
	) 
		const classes = ['Button', className, active ? 'Button--active' : null]
			.filter(Boolean)
			.join(' ');

		const mergedStyle = {
			...style,
			...(height !== undefined && { height }),
			...(width !== undefined && { width }),
			...(fontSize !== undefined && { fontSize }),
			...(backgroundColor !== undefined && { backgroundColor }),
		};

		return props.to === undefined ? (
			<button
				ref={ref as Ref<HTMLButtonElement>}
				className={classes}
				style={mergedStyle}
				{...props}
			/>
		) : (
			<Link
				ref={ref as Ref<HTMLAnchorElement>}
				className={classes}
				style={mergedStyle}
				{...props}
			/>
		);
	},
);

export default Button;
