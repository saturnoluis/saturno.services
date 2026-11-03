import { forwardRef } from 'react';
import type { ComponentProps } from 'react';
import './Checkbox.css';

type CheckboxProps = ComponentProps<'input'> & {
	label?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
	{ label, ...props },
	ref,
) {
	return (
		<label className='Checkbox'>
			<input ref={ref} type='checkbox' {...props} />
			{label !== undefined && (
				<span className='Checkbox__label'>{label}</span>
			)}
		</label>
	);
});

export default Checkbox;
