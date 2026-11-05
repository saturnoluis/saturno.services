import Content from '@/components/Content';
import Desktop from '@/components/Desktop';
import Stack from '@/components/Stack';
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
						<Stack>
							<Content variant="plain">
								<h1>Arbitrary Content</h1>
							</Content>
							<Content>
								<WallpaperEditor />
							</Content>
						</Stack>
					</Surface>
				</Desktop>
			</div>
		</WallpaperProvider>
	);
}

export default App;
