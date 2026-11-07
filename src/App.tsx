import Desktop from '@/components/Desktop';
import WallpaperView from '@/views/WallpaperView';
import { WallpaperProvider } from '@/state/WallpaperProvider.tsx';
import './App.css';

function App() {
	return (
		<WallpaperProvider>
			<div className='App'>
				<Desktop>
					<WallpaperView />
				</Desktop>
			</div>
		</WallpaperProvider>
	);
}

export default App;
