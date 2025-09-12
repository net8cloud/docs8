export interface NavItem {
	title: string;
	description?: string;
	href?: string;
	children?: NavItem[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon?: any;
}

export enum PackageType {
	Javascript
}

export interface PackageInfo {
	name: string;
	version: string;
	dist?: string;
	pkgType: PackageType;
	html: string;
	lastUpdated?: Date;
}
