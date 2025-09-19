<script lang="ts">
	let { title, icon, children, first = false } = $props();
	let Icon = $derived(icon);
</script>

<div class="flex w-full flex-col {first ? '' : 'border-t pt-3'} gap-1 p-2">
	{#if title}
		<div class="flex items-center text-sm font-semibold text-muted-foreground uppercase">
			{#if Icon}
				<Icon class="size-4.5" size={18} />
			{/if}
			<h4 class={[icon ? 'ml-1.5' : 'ml-7.5']}>{title}</h4>
		</div>
	{/if}

	<div class="flex flex-col">
		{@render children?.()}
	</div>
</div>
