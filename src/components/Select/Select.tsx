import { forwardRef } from 'react';
import type { ComponentProps } from 'react';
import './Select.css';

type SelectProps = ComponentProps<'select'> & {
	label?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
	{ label, ...props },
	ref,
) {
	return (
		<div className='Select'>
			{label !== undefined && (
				<span className='Select__label'>{label}</span>
			)}
			<div className='Select__element-wrapper'>
				<select ref={ref} {...props} />
			</div>{' '}
		</div>
	);
});

export default Select;
