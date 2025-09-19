<script lang="ts">
	import PackageDisplay from '$c/PackageDisplay.svelte';

	let { data } = $props();
</script>

<PackageDisplay self={data} />
