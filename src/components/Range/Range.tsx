import { forwardRef } from 'react';
import type { ComponentProps } from 'react';
import './Range.css';

type RangeProps = ComponentProps<'input'> & {
	label?: string;
};

const Range = forwardRef<HTMLInputElement, RangeProps>(function Range(
	{ label, disabled, ...props },
	ref,
) {
	return (
		<div className={`Range${disabled ? ' Range--disabled' : ''}`}>
			{label !== undefined && <span className='Range__label'>{label}</span>}
			<div className='Range__element-wrapper'>
				<input ref={ref} type='range' disabled={disabled} {...props} />
			</div>
		</div>
	);
});

export default Range;
