import { useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import Desktop from '@/components/Desktop';
import MainMenu from '@/components/MainMenu';
import Taskbar from '@/components/Taskbar';
import AboutMeView from '@/views/AboutMeView';
import HomeView from '@/views/HomeView';
import WallpaperEditorView from '@/views/WallpaperEditorView';
import { DesktopModeProvider } from '@/state/DesktopModeProvider.tsx';
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
			<MainMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
		</Desktop>
	);
}

function App() {
	return (
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
	);
}

export default App;
