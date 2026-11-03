import type { ReactNode } from 'react';
import './Heading.css';

interface HeadingProps {
	children?: ReactNode;
}

export default function Heading({ children }: HeadingProps) {
	return <div className='Heading'>{children}</div>;
}
