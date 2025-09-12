import { providers } from '$lib';
import { suffixes } from '$lib/suffix';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const [pkgPath, version] = params.package.split('@');
	const pkgSplit = pkgPath.split('.');
	const suffix = pkgSplit.length > 1 ? pkgSplit.pop() : undefined;
	const pkg = pkgSplit.join('.');
	const resolvedSuffix = suffixes[suffix ?? ''];

	if (!resolvedSuffix) return error(404, 'Not Found');
	try {
		return await providers[resolvedSuffix](params.user, pkg, '', version);
	} catch {
		return error(400, 'Bad Request');
	}
}
