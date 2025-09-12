<script lang="ts">
	import NavItem from '$c/NavItem.svelte';
	import type { NavItem as NavItemType } from '$lib/types';
	import * as NavigationMenu from '$ui/navigation-menu';

	let { mobile = false, nav }: { mobile?: boolean; nav: NavItemType[] } = $props();
</script>

{#if mobile}
	// TODO
{:else}
	<div class="flex basis-1/2 items-center justify-center">
		<NavigationMenu.Root class="gap-2" viewport={false}>
			<NavigationMenu.List>
				{#each nav as item}
					<NavItem self={item} />
				{/each}
			</NavigationMenu.List>
		</NavigationMenu.Root>
	</div>
{/if}
