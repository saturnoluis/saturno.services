import Columns from '@/components/Columns';
import Content from '@/components/Content';
import Fieldset from '@/components/Fieldset';
import Stack from '@/components/Stack';
import Surface from '@/components/Surface';
import WallpaperEditor from '@/components/WallpaperEditor';
import WallpaperPreview from '@/components/WallpaperPreview';

export default function WallpaperView() {
	return (
		<Surface width='640px' height='480px' top='100px' left='120px'>
			<Stack>
				<Content overflowY="auto">
					<Columns columns={3} minWidth='10rem'>
						<WallpaperPreview />
						<Fieldset title='Colors'>
							<div>foo</div>
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
