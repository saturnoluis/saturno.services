import { useLayoutEffect } from 'react';
import Window from '@/components/Window';
import Button from '@/components/Button';
import Content from '@/components/Content';
import Columns from '@/components/Columns';
import { useDesktopMode } from '@/state/desktop-mode-context.ts';
import './HomeView.css';

export default function HomeView() {
	const { setScrollable } = useDesktopMode();

	useLayoutEffect(() => {
		setScrollable(true);
		return () => setScrollable(false);
	}, [setScrollable]);

	return (
		<div className='HomeView'>
			<Window title='Luis Saturno - Home' static>
				<Content variant='sunken'>
					<Columns columns={2} ratios={[1, 2]}>
						<div className='HomeView__hero-image'>
							<img
								src='/images/me_and_napo.jpg'
								alt='Pixel-art representation of me and my dog'
							/>
						</div>
						<div className='HomeView__hero-content'>
							<h1>
								Desarrollo web a medida, interfaces limpias y
								soluciones digitales sin complicaciones.
							</h1>
							<p>
								Soy Desarrollador Frontend Senior e Ingeniero en
								Computación con base en Barcelona. Con más de 10
								años de experiencia y formación en diseño gráfico,
								ayudo tanto a equipos tecnológicos como a pequeños
								negocios a construir software rápido, mantenible y
								bien diseñado.{' '}
							</p>
							<Button to='/about-me'>Conoce mas sobre mi -</Button>
						</div>
					</Columns>
				</Content>
			</Window>
		</div>
	);
}
