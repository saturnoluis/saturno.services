export type ColorPalette = {
	id: string;
	label: string;
	colors: [string, string, string, string];
};

export const COLOR_PALETTES: ColorPalette[] = [
	{
		id: 'sunset',
		label: 'Sunset',
		colors: ['#cc5500', '#ee8809', '#ffbe27', '#ffeb59'],
	},
	{
		id: 'ocean',
		label: 'Ocean',
		colors: ['#0a2f5c', '#1b6ca8', '#38a3d1', '#7fd8e0'],
	},
	{
		id: 'forest',
		label: 'Forest',
		colors: ['#123524', '#2d6a3f', '#5ca85a', '#a9d18e'],
	},
	{
		id: 'berry',
		label: 'Berry',
		colors: ['#3d0f3d', '#7a1f5c', '#c0447a', '#f29bc0'],
	},
	{
		id: 'mono',
		label: 'Mono',
		colors: ['#111111', '#555555', '#999999', '#dddddd'],
	},
	{
		id: 'pastel',
		label: 'Pastel',
		colors: ['#b8c0ff', '#c8b6ff', '#ffd6ff', '#ffc8dd'],
	},
	{
		id: '404',
		label: 'Not Found',
		colors: ['#0d1117', '#161b22', '#f0883e', '#f0b429'],
	},
];
