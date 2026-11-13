import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import Desktop from '@/components/Desktop';
import IconsPanel from '@/components/IconsPanel';
import Taskbar from '@/components/Taskbar';
import AboutMeView from '@/views/AboutMeView';
import HomeView from '@/views/HomeView';
import WallpaperEditorView from '@/views/WallpaperEditorView';
import { WallpaperProvider } from '@/state/WallpaperProvider.tsx';
import './App.css';

function DesktopLayout() {
	return (
		<Desktop>
			<Taskbar />
			<Outlet />
		</Desktop>
	);
}

function App() {
	return (
		<WallpaperProvider>
			<div className='App'>
				<BrowserRouter>
					<Routes>
						<Route element={<DesktopLayout />}>
							<Route index element={<HomeView />} />
							<Route path='about-me' element={<AboutMeView />} />
							<Route
								path='wallpaper-editor'
								element={<WallpaperEditorView />}
							/>
						</Route>
					</Routes>
				</BrowserRouter>
			</div>
		</WallpaperProvider>
	);
}

export default App;
