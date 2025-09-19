<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import Navigation from '$c/Navigation.svelte';
	import {
		SiDeno,
		SiJavascript,
		SiJsr,
		SiNodedotjs,
		SiNpm,
		SiRust,
		SiTypescript
	} from '@icons-pack/svelte-simple-icons';
	import { Book, Package, Rocket, Wrench } from 'lucide-svelte';

	let { children } = $props();

	const nav = [
		{
			title: 'JavaScript',
			children: [
				{
					title: 'Package registries'
				},
				{
					title: 'NPM',
					description: 'Node.js',
					href: '/js',
					icon: SiNpm
				},
				{
					title: 'JSR',
					description: 'Deno (new)',
					href: '/jsr',
					icon: SiJsr
				},
				{
					title: 'Deno Modules',
					description: 'Deno (legacy)',
					href: '/deno',
					icon: SiDeno
				},
				{
					title: ''
				},
				{
					title: 'Runtime environments'
				},
				{
					title: 'Browser',
					description: 'client-side',
					href: '/-/reference.js',
					icon: SiJavascript
				},
				{
					title: 'Node.js',
					description: 'server-side',
					href: '/-/node.js',
					icon: SiNodedotjs
				},
				{
					title: 'Deno',
					description: 'secure runtime',
					href: '/-/runtime.deno',
					icon: SiDeno
				},
				{
					title: ''
				},
				{
					title: 'TypeScript',
					description: 'typed JavaScript',
					href: '/-/typescript.ts',
					icon: SiTypescript
				},
				{
					title: 'Tools',
					description: 'build, test, lint',
					href: '/-/tools.js',
					icon: Wrench
				},
				{
					title: 'Web frameworks',
					description: 'ship faster',
					href: '/-/frameworks.js',
					icon: Rocket
				}
			]
		},
		{
			title: 'Rust',
			children: [
				{
					title: 'Crates.io',
					description: 'package registry',
					href: '/rs',
					icon: Package
				},
				{
					title: ''
				},
				{
					title: 'Language references'
				},
				{
					title: 'Learn Rust',
					description: 'the rust book',
					href: '/-/book.rs',
					icon: Book
				},
				{
					title: 'Stdlib',
					description: 'standard library',
					href: '/-/std.rs',
					icon: SiRust
				},
				{
					title: 'Core',
					description: 'language core',
					href: '/-/core.rs',
					icon: SiRust
				},
				{
					title: ''
				},
				{
					title: 'Tools'
				},
				{
					title: 'Cargo',
					description: 'package manager',
					href: '/-/cargo.rs',
					icon: SiRust
				},
				{
					title: 'Clippy',
					description: 'linter',
					href: '/-/clippy.rs',
					icon: SiRust
				},
				{
					title: 'Rustfmt',
					description: 'code formatter',
					href: '/-/rustfmt.rs',
					icon: SiRust
				},
				{
					title: 'Rustdoc',
					description: 'code formatter',
					href: '/-/rustdoc.rs',
					icon: SiRust
				},
				{
					title: 'Rustc',
					description: 'the compiler',
					href: '/-/rustc.rs',
					icon: SiRust
				},
				{
					title: 'Rustup',
					description: 'toolchain manager',
					href: '/-/rustup.rs',
					icon: SiRust
				}
			]
		},
		{
			title: 'More',
			href: '/all'
		}
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<header class="fixed top-2 right-2 left-2 z-100 flex h-12 rounded-lg backdrop-blur-xl">
	<a href="/" class="flex h-full basis-1/4 items-center gap-0.5 pl-3 text-2xl font-bold">
		<span>docs</span>
		<span
			class="flex h-full max-w-24 grow items-center rounded-l-lg bg-linear-to-r from-teal-700 to-transparent pl-0.5 font-medium text-white"
			>8</span
		>
	</a>
	<Navigation {nav} />
</header>

<main class="flex pt-16">
	{@render children?.()}
</main>

<footer class="mx-12 my-4 text-right text-sm text-muted-foreground">
	<a href="https://net8.cloud/developers/docs">hosted with &lt;3 by net8</a>
</footer>
