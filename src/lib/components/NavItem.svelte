<script lang="ts">
	import type { NavItem } from '$lib/types';
	import * as NavigationMenu from '$ui/navigation-menu';

	let { self }: { self: NavItem } = $props();
</script>

{#if self.children}
	<NavigationMenu.List>
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>{self.title}</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="grid w-50 gap-2 p-2">
					{#each self.children as child}
						{#if child.title === ''}
							<hr />
						{:else if !child.href}
							<span class="px-1.5 pt-3 pb-1 text-xs leading-0 text-muted-foreground">
								{child.title}
							</span>
						{:else}
							<li>
								<NavigationMenu.Link href={child.href} class="flex-row items-center gap-4">
									{#if child.icon}
										<child.icon />
									{/if}
									<div>
										<div class="font-medium">{child.title}</div>
										<div class="leading-tight text-muted-foreground">{child.description}</div>
									</div>
								</NavigationMenu.Link>
							</li>
						{/if}
					{/each}
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
	</NavigationMenu.List>
{:else}
	<NavigationMenu.Item>
		<NavigationMenu.Link href={self.href} class="px-4">
			{self.title}
		</NavigationMenu.Link>
	</NavigationMenu.Item>
{/if}
