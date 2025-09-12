<script lang="ts">
	import SidebarItem from '$c/SidebarItem.svelte';
	import type { PackageInfo } from '$lib/types';
	import { Terminal } from 'lucide-svelte';

	let { self }: { self: PackageInfo } = $props();
</script>

<nav class="mr-4 h-full min-h-[50lvh] w-76 border-r pr-4"></nav>

<div class="pt-16">
	<hgroup>
		<div>
			<h1 class=" text-3xl font-light">
				<span class="mr-2 text-6xl font-black">{self.name}</span>
				{#if self.dist}
					<span class="text-muted-foreground">{self.dist}&nbsp;({self.version})</span>
				{:else}
					<span class="text-muted-foreground">{self.version}</span>
				{/if}
			</h1>
		</div>
	</hgroup>
	<article class="prose prose-neutral dark:prose-invert prose-img:my-0 prose-img:inline-block">
		{@html self.html}
	</article>
</div>

<aside class="w-80">
	<SidebarItem title="Install" icon={Terminal}>Install</SidebarItem>
</aside>
