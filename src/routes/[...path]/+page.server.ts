import { providers } from '$lib';
import { suffixes } from '$lib/suffix';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { path } = params;
	const pathSplit = path.split('/');

	const user = pathSplit[0].includes('.') ? undefined : pathSplit[0];
	const pack = pathSplit[0].includes('.') ? pathSplit[0] : pathSplit[1];

	const [pkgPath, version] = pack.split('@');
	const pkgSplit = pkgPath.split('.');
	const suffix = pkgSplit.length > 1 ? pkgSplit.pop() : undefined;
	const pkg = pkgSplit.join('.');
	const resolvedSuffix = suffixes[suffix ?? ''];

	if (!resolvedSuffix) return error(404, 'Not Found');
	try {
		return await providers[resolvedSuffix](user, pkg, pathSplit.slice(2).join('/'), version);
	} catch (e) {
		console.error(e);
		return error(400, 'Bad Request');
	}
}
