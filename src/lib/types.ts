export interface NavItem {
	title: string;
	description?: string;
	href?: string;
	children?: NavItem[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon?: any;
}

export enum PackageType {
	Javascript,
	Other
}

export interface PackageInfo {
	name: string;
	pkgName: string;
	pkgRoot?: string;
	title?: string;
	toc?: Toc[];
	downloads?: [number, { downloads: number; day: string }[]];
	downloadsStr?: string;
	downloadsColor?: string;
	downloads2?: [number, { downloads: number; day: string }[]];
	downloads2Str?: string;
	downloads2Color?: string;
	version: string;
	versions?: number;
	dist?: string;
	pkgType: PackageType;
	html: string;
	lastUpdated?: Date;
	provider: [string, string];
}

export interface Toc {
	title: string;
	id: string;
	level: number;
}
