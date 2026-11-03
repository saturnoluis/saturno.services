import { forwardRef } from 'react';
import type { ComponentProps } from 'react';
import './ColorInput.css';

type ColorInputProps = ComponentProps<'input'> & {
	label?: string;
};

const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
	function ColorInput({ label, ...props }, ref) {
		return (
			<label className='ColorInput'>
				{label !== undefined && (
					<span className='ColorInput__label'>{label}</span>
				)}
				<input ref={ref} type='color' {...props} />
			</label>
		);
	},
);

export default ColorInput;
