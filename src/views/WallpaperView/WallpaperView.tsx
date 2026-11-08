import Columns from '@/components/Columns';
import Content from '@/components/Content';
import Stack from '@/components/Stack';
import Surface from '@/components/Surface';
import Fieldset from '@/components/Fieldset';
import WallpaperColors from '@/views/WallpaperView/components/WallpaperColors';
import WallpaperEditor from '@/views/WallpaperView/components/WallpaperEditor';
import WallpaperPreset from '@/views/WallpaperView/components/WallpaperPreset';
import WallpaperPreview from '@/views/WallpaperView/components/WallpaperPreview';
import WallpaperTheme from '@/views/WallpaperView/components/WallpaperTheme';

export default function WallpaperView() {
	return (
		<Surface width='640px' height='480px' top='100px' left='120px'>
			<Stack>
				<Content overflowY='auto'>
				<Columns columns={2} minWidth='10rem'>
					<WallpaperPreview />
					<Fieldset title='Style'>
						<WallpaperTheme />
						<WallpaperPreset />
						<WallpaperColors label='Colors' />
					</Fieldset>
					</Columns>
				</Content>
				<Content>
					<WallpaperEditor />
				</Content>
			</Stack>
		</Surface>
	);
}
