<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex size-full flex-col items-center justify-center pt-48">
	<div class="size-fit">
		<h1 class="text-left text-9xl font-black lowercase">Error {page.status}</h1>
		<h2 class="text-right text-7xl font-black text-muted-foreground lowercase">
			{page.error?.message}
		</h2>
	</div>
</div>
