import { md } from '$lib/md';
import { PackageType, type PackageInfo } from '$lib/types';

const NODE_LATEST = '24';

// npmjs.com
export async function getJsPackageDocs(
	user: string | undefined,
	pkg: string,
	path: string,
	version?: string
): Promise<PackageInfo> {
	if (user === '-') {
		switch (pkg) {
			case 'node':
				return getNodeDocs(path, version);
			default:
				throw new Error('Unknown special package');
		}
	}

	const npm = await (
		await fetch(`https://registry.npmjs.com/${user ? `@${user}/${pkg}` : pkg}`)
	).json();
	const dist = version ? (npm['dist-tags'][version] ? version : undefined) : 'latest';
	const ver =
		npm.versions[version && version !== dist ? version : npm['dist-tags'][dist ?? 'latest']];

	let readme = npm.readme;
	if (!readme)
		readme = await (
			await fetch(`https://cdn.jsdelivr.net/npm/${npm.name}@${ver.version}/README.md`)
		).text();

	const { downloads } = (await (
		await fetch(`https://api.npmjs.org/downloads/range/last-week/${npm.name}`)
	).json()) as { downloads: { downloads: number; day: string }[] };

	const downloads2 = await (
		await fetch(`https://data.jsdelivr.com/v1/stats/packages/npm/${npm.name}?period=week`)
	).json();

	const [html, toc] = await md(readme);
	const name = user ? npm.name.slice(1) : npm.name;

	return {
		name,
		pkgName: npm.name,
		title: name + ' from NPM',
		toc,
		version: ver.version,
		versions: Object.keys(npm.versions).length,
		downloads: [downloads.reduce((acc, val) => acc + val.downloads, 0), downloads],
		downloadsStr: 'NPM',
		downloadsColor: 'var(--color-red-500)',
		downloads2: [
			downloads2.hits.total,
			Object.entries(downloads2.hits.dates).map(([day, val]) => ({ day, downloads: val as number }))
		],
		downloads2Str: 'JSDelivr',
		downloads2Color: 'var(--color-amber-500)',
		dist,
		pkgType: PackageType.Javascript,
		html,
		lastUpdated: new Date(npm.time[ver.version]),
		provider: ['NPM Package Registry', 'https://www.npmjs.com/']
	};
}

// nodejs.org/docs
export async function getNodeDocs(path: string, version?: string): Promise<PackageInfo> {
	const ver = parseInt(version === 'latest' ? NODE_LATEST : version || NODE_LATEST);

	// eslint-disable-next-line prefer-const
	let [html, toc] = await md(
		await (
			await fetch(
				`https://raw.githubusercontent.com/nodejs/node/refs/heads/v${ver}.x/doc/api/${path ? path : ver < 10 ? '_toc' : 'index'}.md`
			)
		).text(),
		'/-/node.js/'
	);

	console.log(toc);

	html = html.replaceAll('.md"', '"');

	const title = html.match(/<h1.*?>(.*?)<\/h1>/)?.[1];

	if (ver < 10) html = html.split('</p>').slice(1).join('</p>');

	return {
		name: 'Node.js',
		pkgName: 'https://nodejs.org/en/download',
		title: `Node.js${title ? ': ' + title : ''}`,
		toc,
		version: ver.toString(),
		dist: version && version !== 'latest' ? undefined : 'latest',
		pkgType: PackageType.Other,
		html,
		provider: ['Node.js Documentation', 'https://nodejs.org/docs']
	};
}
