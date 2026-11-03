import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	'../src/components',
);

function toPascalCase(value) {
	const words = value
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.split(/[-_\s]+/)
		.filter(Boolean);
	if (words.length === 0) {
		return '';
	}
	return words
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
}

function readComponentArg(argv) {
	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (arg === '--component' || arg === '-c') {
			return argv[i + 1];
		}
		if (arg.startsWith('--component=')) {
			return arg.slice('--component='.length);
		}
	}
	return null;
}

const tsx = (name) =>
	`import type { ReactNode } from 'react';
import './${name}.css';

interface ${name}Props {
	children?: ReactNode;
}

export default function ${name}({ children }: ${name}Props) {
	return <div className='${name}'>{children}</div>;
}
`;

const css = (name) => `.${name} {
	display: block;
}
`;

const index = (name) => `export { default } from './${name}.tsx';
`;

const rawName = readComponentArg(process.argv.slice(2));

if (!rawName) {
	console.error('Usage: npm run create -- --component=Heading');
	process.exit(1);
}

const name = toPascalCase(rawName);

if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
	console.error(`Invalid component name: "${rawName}"`);
	process.exit(1);
}

const folder = path.join(componentsRoot, name);

if (existsSync(folder)) {
	console.error(`Component already exists: ${folder}`);
	process.exit(1);
}

const files = {
	[`${name}.tsx`]: tsx(name),
	[`${name}.css`]: css(name),
	'index.ts': index(name),
};

await mkdir(folder, { recursive: true });

for (const [file, content] of Object.entries(files)) {
	await writeFile(path.join(folder, file), content);
}

console.log(
	`Created component "${name}" in ${path.relative(process.cwd(), folder)}`,
);
