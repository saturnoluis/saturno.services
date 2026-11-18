import { useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import Desktop from '@/components/Desktop';
import Footer from '@/components/Footer';
import MainMenu from '@/components/MainMenu';
import Taskbar from '@/components/Taskbar';
import AboutMeView from '@/views/AboutMeView';
import HomeView from '@/views/HomeView';
import WallpaperEditorView from '@/views/WallpaperEditorView';
import { DesktopModeProvider } from '@/state/DesktopModeProvider.tsx';
import { ThemeProvider } from '@/state/ThemeProvider.tsx';
import { WallpaperProvider } from '@/state/WallpaperProvider.tsx';
import './App.css';

function DesktopLayout() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<Desktop>
			<Taskbar
				menuOpen={menuOpen}
				onMenuClick={() => setMenuOpen((open) => !open)}
			/>
			<Outlet />
			<Footer />
			<MainMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
		</Desktop>
	);
}

function App() {
	return (
		<ThemeProvider>
			<WallpaperProvider>
				<DesktopModeProvider>
					<div className='App'>
						<BrowserRouter>
							<Routes>
								<Route element={<DesktopLayout />}>
									<Route index element={<HomeView />} />
									<Route
										path='about-me'
										element={<AboutMeView />}
									/>
									<Route
										path='wallpaper-editor'
										element={<WallpaperEditorView />}
									/>
								</Route>
							</Routes>
						</BrowserRouter>
					</div>
				</DesktopModeProvider>
			</WallpaperProvider>
		</ThemeProvider>
	);
}

export default App;
