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

export function relativeDate(d: Date): [string, 0 | 1 | 2 | 3] {
	const now = new Date();
	const diff = now.getTime() - d.getTime();
	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (years > 0) {
		return [years === 1 ? '1 year' : `${years} years`, 0];
	}

	if (months > 0) {
		return [months === 1 ? '1 month' : `${months} months`, 1];
	}

	if (weeks > 0) {
		return [weeks === 1 ? '1 week' : `${weeks} weeks`, 2];
	}

	if (days > 0) {
		return [days === 1 ? '1 day' : `${days} days`, 3];
	}

	if (hours > 0) {
		return [hours === 1 ? '1 hour' : `${hours} hours`, 3];
	}

	if (minutes > 0) {
		return [minutes === 1 ? '1 minute' : `${minutes} minutes`, 3];
	}

	return [seconds === 1 ? '1 second' : `${seconds} seconds`, 3];
}

export function getLocalStorageItem<T>(key: string, defaultValue: T): T {
	if (typeof localStorage === 'undefined') return defaultValue;
	const item = localStorage.getItem(key);
	if (item === null) return defaultValue;
	try {
		return JSON.parse(item) as T;
	} catch {
		return defaultValue;
	}
}

export function setLocalStorageItem<T>(key: string, value: T): void {
	if (typeof localStorage === 'undefined') return;
	localStorage.setItem(key, JSON.stringify(value));
}
