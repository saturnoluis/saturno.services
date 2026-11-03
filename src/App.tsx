import Content from '@/components/Content';
import Desktop from '@/components/Desktop';
import Surface from '@/components/Surface';
import WallpaperEditor from '@/components/WallpaperEditor';
import { WallpaperProvider } from '@/state/WallpaperProvider.tsx';
import './App.css';

function App() {
	return (
		<WallpaperProvider>
			<div className='App'>
				<Desktop>
					<Surface
						width='640px'
						height='480px'
						top='100px'
						left='120px'
					>
						<Content>
							<WallpaperEditor />
						</Content>
					</Surface>
				</Desktop>
			</div>
		</WallpaperProvider>
	);
}

export default App;
