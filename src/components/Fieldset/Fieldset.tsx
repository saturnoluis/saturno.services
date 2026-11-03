import type { ReactNode } from 'react';
import './Fieldset.css';

interface FieldsetProps {
	title?: ReactNode;
	children?: ReactNode;
}

export default function Fieldset({ title, children }: FieldsetProps) {
	return (
		<fieldset className='Fieldset'>
			{title !== undefined && (
				<legend className='Fieldset__legend'>{title}</legend>
			)}
			<div className='Fieldset__inner'>{children}</div>
		</fieldset>
	);
}
