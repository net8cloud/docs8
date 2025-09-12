import { getJsPackageDocs } from '$lib/providers/javascript';
import type { PackageInfo } from '$lib/types';

export { suffixes } from '$lib/suffix';

export const providers: Record<
	string,
	(user: string | undefined, pkg: string, path: string, version?: string) => Promise<PackageInfo>
> = {
	javascript: getJsPackageDocs,
	react: (a, b, c, d) => getJsPackageDocs(a, b + '-react', c, d),
	svelte: (a, b, c, d) => getJsPackageDocs(a, b + '-svelte', c, d)
};
