import { useLayoutEffect } from 'react';
import Window from '@/components/Window';
import Button from '@/components/Button';
import Content from '@/components/Content';
import Columns from '@/components/Columns';
import Information from '@/components/Information';
import { useDesktopMode } from '@/state/desktop-mode-context.ts';
import { useI18n } from '@/state/i18n-context.ts';
import { usePageTitle } from '@/state/usePageTitle';
import './HomeView.css';

const EXPERIENCE_KEYS = ['1', '2', '3'];

export default function HomeView() {
	const { setScrollable } = useDesktopMode();
	const { t } = useI18n();
	usePageTitle();

	useLayoutEffect(() => {
		setScrollable(true);
		return () => setScrollable(false);
	}, [setScrollable]);

	return (
		<div className='HomeView'>
			{/* ---- Hero Section ---------------------------------------------- */}
			<section className='HomeView__hero'>
				<Window title={t('home.hero.windowTitle')} static>
					<Content variant='sunken'>
						<Columns columns={2} ratios={[1, 2]}>
							<div className='HomeView__hero-image'>
								<img
									src='/images/me_and_napo.jpg'
									alt={t('home.hero.imageAlt')}
								/>
							</div>
							<div className='HomeView__hero-content'>
								<Content variant='raised' overflowY='hidden'>
									<h1>{t('home.hero.h1')}</h1>
									<p>{t('home.hero.body')}</p>
								</Content>
								<Button to='/about-me'>
									{t('home.hero.cta')}
								</Button>
							</div>
						</Columns>
					</Content>
				</Window>
			</section>

			{/* ---- Services Section ------------------------------------------ */}
			<section className='HomeView__services'>
				<div className='HomeView__services-container'>
					<h1>{t('home.services.title')}</h1>
					<p>{t('home.services.body')}</p>
					<Columns minWidth='16rem' columns={3}>
						<Window static>
							<h2>{t('home.services.card1.title')}</h2>
							<p>{t('home.services.card1.body')}</p>
							<Information title={t('home.services.infoTitle')}>
								{t('home.services.card1.info')}
							</Information>
						</Window>

						<Window static>
							<h2>{t('home.services.card2.title')}</h2>
							<p>{t('home.services.card2.body')}</p>
							<Information title={t('home.services.infoTitle')}>
								{t('home.services.card2.info')}
							</Information>
						</Window>

						<Window static>
							<h2>{t('home.services.card3.title')}</h2>
							<p>{t('home.services.card3.body')}</p>
							<Information title={t('home.services.infoTitle')}>
								{t('home.services.card3.info')}
							</Information>
						</Window>
					</Columns>
				</div>
			</section>

			{/* ---- Sales Section ---------------------------------------------- */}
			<section className='HomeView__sales'>
				<Window title={t('home.sales.windowTitle')} static>
					<Content variant='sunken'>
						<h1>{t('home.sales.title')}</h1>
						<p>
							<img
								src='/images/me_selling_stuff.jpg'
								alt={t('home.sales.imageAlt')}
							/>
							{t('home.sales.body')}
						</p>
					</Content>
				</Window>
			</section>

			{/* ---- Experience Section ------------------------------------------ */}
			<section className='HomeView__experience'>
				<div className='HomeView__experience-container'>
					<h1>{t('home.experience.title')}</h1>
					<Columns columns={3} minWidth='16rem' gap={32} divided>
						{EXPERIENCE_KEYS.map((id) => (
							<div key={id} className='HomeView__experience-card'>
								<h2 className='HomeView__experience-title'>
									{t(`home.experience.${id}.title`)}
								</h2>
								<p>{t(`home.experience.${id}.body`)}</p>
							</div>
						))}
					</Columns>
				</div>
			</section>
		</div>
	);
}
