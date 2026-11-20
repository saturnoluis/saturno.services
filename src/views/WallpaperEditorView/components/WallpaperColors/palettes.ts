export type ColorPalette = {
	id: string;
	label: string;
	colors: [string, string, string, string];
};

export const COLOR_PALETTES: ColorPalette[] = [
	{
		id: 'default',
		label: 'Default',
		colors: ['#3772bb', '#00698f', '#005c65', '#234456'],
	},
	{
		id: 'bliss',
		label: 'Bliss',
		colors: ['#7abcf9', '#0b43be', '#468c07', '#67b603'],
	},
	{
		id: 'solar',
		label: 'Solar',
		colors: ['#252525', '#81260e', '#f37b12', '#1f1f1f'],
	},
	{
		id: 'sql-injection-purple',
		label: 'SQL Injection Purple',
		colors: ['#0c012d', '#2c015c', '#560187', '#8a02b2'],
	},
	{
		id: 'teal-95',
		label: 'Teal 95',
		colors: ['#005050', '#00807f', '#00807f', '#00807f'],
	},
];
