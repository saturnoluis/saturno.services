import { useLayoutEffect } from 'react';
import Window from '@/components/Window';
import Button from '@/components/Button';
import Content from '@/components/Content';
import Columns from '@/components/Columns';
import Information from '@/components/Information';
import { useDesktopMode } from '@/state/desktop-mode-context.ts';
import './HomeView.css';

const EXPERIENCE = [
	{
		title: 'Equipos Internacionales y Producto',
		body: 'Más de 10 años desarrollando software en remoto para empresas tecnológicas y consultoras de EE. UU., Alemania y Latinoamérica, acostumbrado a integrarme rápido en equipos distribuidos y sistemas en producción.',
	},
	{
		title: 'Interfaces Complejas, IA y Datos',
		body: 'Experiencia construyendo aplicaciones web con integraciones de inteligencia artificial, visión por computador y flujos de datos en tiempo real, transformando lógica compleja en herramientas claras para el usuario.',
	},
	{
		title: 'Ingeniería + Diseño Gráfico',
		body: 'Doble formación que une arquitectura frontend sólida (TypeScript, Vue.js, SvelteKit, React) con criterio visual, accesibilidad y rendimiento web desde la primera línea de código.',
	},
];

export default function HomeView() {
	const { setScrollable } = useDesktopMode();

	useLayoutEffect(() => {
		setScrollable(true);
		return () => setScrollable(false);
	}, [setScrollable]);

	return (
		<div className='HomeView'>
			{/* ---- Hero Section ---------------------------------------------- */}
			<section className='HomeView__hero'>
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
								<Content variant='raised' overflowY='hidden'>
									<h1>
										Desarrollo web a medida, interfaces
										limpias y soluciones digitales sin
										complicaciones.
									</h1>
									<p>
										Soy Desarrollador Frontend Senior e
										Ingeniero en Computación con base en
										Barcelona. Con más de 10 años de
										experiencia y formación en diseño gráfico,
										ayudo tanto a equipos tecnológicos como a
										pequeños negocios a construir software
										rápido, mantenible y bien diseñado.{' '}
									</p>
								</Content>
								<Button to='/about-me'>
									Conoce más sobre mí -
								</Button>
							</div>
						</Columns>
					</Content>
				</Window>
			</section>

			{/* ---- Services Section ------------------------------------------ */}
			<section className='HomeView__services'>
				<div className='HomeView__services-container'>
					<h1>Cómo puedo ayudarte</h1>
					<p>
						Trabajo de forma directa, sin intermediarios ni
						estructuras innecesarias. Ya sea integrándome en tu equipo
						técnico para acelerar un producto o creando desde cero la
						herramienta digital que tu negocio necesita, me enfoco en
						entregar resultados claros, documentación, y código que
						perdura.
					</p>
					<Columns minWidth='32%' columns={3}>
						<Window static>
							<h2>Desarrollo Frontend Senior para Equipos</h2>
							<p>
								Me integro directamente en tu flujo de trabajo
								para reforzar el desarrollo de producto, liderar
								arquitecturas frontend o escalar sistemas de
								componentes. Con más de una década de experiencia
								en TypeScript, SvelteKit, Vue.js, React y
								estándares web, apoyo mi flujo en herramientas de
								IA para acelerar entregas manteniendo código
								limpio, testeado y mantenible.
							</p>
							<Information title='Ideal para...'>
								Startups y empresas de producto que necesitan
								ejecución técnica inmediata, criterio de UI y
								código limpio sin curva de aprendizaje.{' '}
							</Information>
						</Window>

						<Window static>
							<h2>Páginas Web a Medida (De Cero a Producción)</h2>
							<p>
								Diseño, construyo y pongo en marcha sitios web
								rápidos, accesibles y adaptados a cualquier
								dispositivo. Combinando base de diseño gráfico con
								estándares web modernos, creo desde páginas
								corporativas hasta aplicaciones web completas,
								encargándome también de su despliegue y puesta a
								punto.
							</p>
							<Information title='Ideal para...'>
								Autónomos, estudios y pequeños comercios que
								buscan una presencia profesional propia sin
								depender de plantillas pesadas ni agencias
								interminables.
							</Information>
						</Window>

						<Window static>
							<h2>Herramientas a Medida y Automatización</h2>
							<p>
								No todo problema requiere una gran plataforma.
								Desarrollo scripts, extractores de datos (web
								scrapers), automatizaciones con o sin IA y
								pequeñas herramientas internas para eliminar
								tareas repetitivas, además de ofrecer asesoría
								técnica para ordenar tus procesos digitales.
							</p>
							<Information title='Ideal para...'>
								Negocios y profesionales que pierden tiempo en
								tareas manuales o necesitan criterio técnico
								honesto para tomar decisiones digitales.
							</Information>
						</Window>
					</Columns>
				</div>
			</section>

			{/* ---- Sales Section ---------------------------------------------- */}
			<section className='HomeView__sales'>
				<Window title='¿Por qué contratarme?' static>
					<Content variant='sunken'>
						<h1>Transparencia total y control sobre tu proyecto</h1>
						<p>
							<img
								src='/images/me_selling_stuff.jpg'
								alt='Pixel-art representation of me selling something'
							/>
							Trabajo bajo un modelo abierto (open-book) como
							profesional autónomo registrado en España. Hablas
							directamente con la persona que diseña y programa tu
							solución, sin intermediarios ni costes ocultos: si tu
							proyecto requiere contratar un dominio, servidor o
							servicio externo, te asesoro para que lo contrates
							directamente a tu nombre y al precio real del
							proveedor. Sin comisiones opacas ni ataduras; el
							código y la infraestructura son tuyos desde el primer
							día.
						</p>
					</Content>
				</Window>
			</section>

			{/* ---- Experience Section ------------------------------------------ */}
			<section className='HomeView__experience'>
				<div className='HomeView__experience-container'>
					<h1>Experiencia probada en entornos reales</h1>
					<Columns columns={3} minWidth='30%' gap={32} divided>
						{EXPERIENCE.map(({ title, body }) => (
							<div
								key={title}
								className='HomeView__experience-card'
							>
								<h2 className='HomeView__experience-title'>
									{title}
								</h2>
								<p>{body}</p>
							</div>
						))}
					</Columns>
				</div>
			</section>
		</div>
	);
}
