import { md } from '$lib/md';
import { PackageType, type PackageInfo } from '$lib/types';

// npmjs.com
export async function getJsPackageDocs(
	user: string | undefined,
	pkg: string,
	path: string,
	version?: string
): Promise<PackageInfo> {
	const npm = await (
		await fetch(`https://registry.npmjs.com/${user ? `@${user}/${pkg}` : pkg}`)
	).json();
	const dist = version ? (npm['dist-tags'][version] ? version : undefined) : 'latest';
	const ver =
		npm.versions[version && version !== dist ? version : npm['dist-tags'][dist ?? 'latest']];

	console.log(ver);

	return {
		name: user ? npm.name.slice(1) : npm.name,
		version: ver.version,
		dist,
		pkgType: PackageType.Javascript,
		html: await md(npm.readme)
	};
}
