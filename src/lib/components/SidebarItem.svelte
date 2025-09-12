<script lang="ts">
	let { title, icon, children } = $props();
	let Icon = $derived(icon);
</script>

<div class="flex flex-col">
	{#if title}
		<div class="flex">
			<Icon class="size-6" size={24} />
			<h4 class={[icon ? 'ml-2' : 'ml-8']}>{title}</h4>
		</div>
	{/if}
	{@render children?.()}
</div>
