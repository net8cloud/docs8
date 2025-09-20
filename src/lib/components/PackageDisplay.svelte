<script lang="ts">
	import SidebarItem from '$c/SidebarItem.svelte';
	import { getLocalStorageItem, relativeDate } from '$lib';
	import { PackageType, type PackageInfo } from '$lib/types';
	import { Check, Copy, Download, History, Megaphone, Terminal } from 'lucide-svelte';
	import { LineChart } from 'layerchart';
	import { scaleUtc } from 'd3-scale';
	import { curveBumpX } from 'd3-shape';
	import * as Chart from '$ui/chart';

	let { self }: { self: PackageInfo } = $props();

	let installCmd = $derived(() => {
		switch (self.pkgType) {
			case PackageType.Javascript:
				return `${getLocalStorageItem('d8-js-pm', 'npm')} i ${self.name}`;
			default:
				return `# not available`;
		}
	});
	let installCmdCopied = $state(false);

	let rd = $derived(relativeDate(self.lastUpdated ?? new Date()));

	function maintained(score: number) {
		switch (score) {
			case 3:
				return 'thriving';
			case 2:
				return 'active';
			case 1:
				return 'stale';
			default:
				return 'abandoned';
		}
	}

	let chartData = $derived(
		self.downloads?.[1].map((v, i) => {
			return {
				date: new Date(v.day),
				a: v.downloads,
				b: self.downloads2 ? self.downloads2[1][i].downloads : undefined
			};
		})
	);

	let chartConfig = $derived({
		a: {
			label: self.downloadsStr ?? 'A',
			color: self.downloadsColor ?? 'var(--chart-1)'
		},
		b: {
			label: self.downloads2Str ?? 'B',
			color: self.downloads2Color ?? 'var(--chart-2)'
		}
	} satisfies Chart.ChartConfig);

	function numberToString(num: number) {
		if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
		if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
		if (num >= 1_000) return (num / 1_000).toFixed(1) + 'k';
		return num.toString();
	}
</script>

<svelte:head>
	<title>{self.title || self.name} | docs8</title>
</svelte:head>

<nav
	class="fixed left-0 flex h-[calc(100vh-4rem)] w-76 flex-col items-start overflow-x-hidden overflow-y-auto border-r pt-2 pr-4 pl-4"
>
	{#if self.pkgRoot}
		<a
			href={self.pkgRoot}
			class={[
				'mb-2 w-full text-xs font-semibold text-muted-foreground uppercase',
				'underline decoration-transparent transition hover:decoration-current'
			]}
		>
			&larr; {self.name}
		</a>
	{/if}

	<a
		href="#top"
		class={[
			'mb-1 w-full text-lg font-semibold',
			'underline decoration-transparent transition hover:decoration-current'
		]}
	>
		{self.title || self.name}
	</a>

	{#if self.toc}
		{#each self.toc as item}
			<a
				href="#{item.id}"
				class={[
					'w-full text-ellipsis',
					item.level > 2 && 'border-l text-muted-foreground',
					item.level < 3 && 'mt-1 mb-0.5',
					'underline decoration-transparent transition hover:decoration-current'
				]}
				style="padding-left: {item.level - 2}rem;"
			>
				{@html item.title}
				<!-- HTML is already escaped. -->
			</a>
		{/each}
	{/if}
</nav>

<div class="mx-80 w-full pt-16 2xl:mr-100">
	<div class="mx-auto max-w-3xl">
		<hgroup class="border-b pb-4">
			<div>
				<h1 class="text-3xl font-light">
					<span class="mr-2 text-6xl font-black">{self.name}</span>
					{#if self.dist}
						<span class="text-muted-foreground">{self.dist}&nbsp;({self.version})</span>
					{:else}
						<span class="text-muted-foreground">{self.version}</span>
					{/if}
				</h1>
			</div>
		</hgroup>
		<article
			class={[
				'prose mt-6 max-w-none prose-neutral dark:prose-invert',
				'prose-headings:mt-8 prose-headings:mb-4',
				[
					'prose-code:inline-block prose-code:rounded-sm prose-code:bg-muted prose-code:px-1.5',
					'prose-code:font-medium prose-code:text-foreground',
					'prose-code:before:content-none prose-code:after:content-none'
				],
				'prose-pre:bg-muted prose-pre:px-2.5',
				'prose-img:my-0 prose-img:inline-block'
			]}
		>
			{@html self.html}
		</article>
		<footer class="mt-8 border-t py-2 text-right text-sm text-muted-foreground">
			fetched from <a href={self.provider[1]} class="underline">{self.provider[0]}</a>
		</footer>
	</div>
</div>

<aside class="absolute right-0 w-78 pr-2 2xl:w-100 2xl:pr-8">
	<SidebarItem first title="Install" icon={Terminal}>
		{#if self.pkgType === PackageType.Other}
			<a href={self.pkgName} class="ml-1 text-sm text-muted-foreground underline"
				>from external website</a
			>
		{:else}
			<button
				class="flex w-full cursor-pointer items-center gap-2 rounded-lg border border-muted p-2 text-muted-foreground"
				onclick={() => {
					navigator.clipboard.writeText(installCmd());
					installCmdCopied = true;
					setTimeout(() => (installCmdCopied = false), 2000);
				}}
			>
				<span
					class="relative w-full overflow-hidden text-start font-mono text-sm font-light whitespace-nowrap text-primary"
				>
					{installCmd()}
					<div
						class="absolute top-0 right-0 h-full w-4 bg-gradient-to-r from-transparent to-background"
					></div>
				</span>
				{#if installCmdCopied}
					<Check class="size-4" />
				{:else}
					<Copy class="size-4" />
				{/if}
			</button>
		{/if}
	</SidebarItem>

	{#if self.lastUpdated}
		<SidebarItem title="Last Updated" icon={History}>
			<span class="ml-1 text-xs font-semibold text-muted-foreground uppercase"
				>{`${self.versions ?? 'unknown'} releases`}</span
			>
			<span class="ml-1 text-xl leading-6">{rd[0]} ago</span>
			<span class="ml-1 text-xs font-semibold text-muted-foreground">
				{self.lastUpdated.toLocaleDateString(undefined, {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit'
				})}

				<span
					class={[
						'float-right mr-1 font-bold uppercase',
						rd[1] === 0 && 'text-red-600',
						rd[1] === 1 && 'text-yellow-600',
						rd[1] === 2 && 'text-lime-600',
						rd[1] === 3 && 'text-sky-600'
					]}
				>
					{maintained(rd[1])}
				</span>
			</span>
		</SidebarItem>
	{/if}
	{#if self.downloads}
		<SidebarItem title="Downloads" icon={Download}>
			<div class="ml-1 flex w-full items-start gap-4">
				<div class="flex flex-col items-start">
					<span class="text-xs font-semibold text-muted-foreground uppercase">this week</span>
					<span class="text-xl leading-6"
						>{numberToString(self.downloads[0] + (self.downloads2?.[0] ?? 0))}</span
					>
					<span class="text-xl leading-6" style="color: {chartConfig.a.color};">
						{numberToString(self.downloads[0])}
					</span>
					{#if self.downloads2}
						<span class="text-xl leading-6" style="color: {chartConfig.b.color};"
							>{numberToString(self.downloads2[0])}</span
						>
					{/if}
				</div>

				<Chart.Container config={chartConfig} class="grow">
					<LineChart
						data={chartData}
						x="date"
						xScale={scaleUtc()}
						axis="x"
						series={[
							{
								key: 'a',
								label: chartConfig.a.label,
								color: chartConfig.a.color
							},
							{
								key: 'b',
								label: chartConfig.b.label,
								color: chartConfig.b.color
							}
						]}
						props={{
							spline: { curve: curveBumpX, motion: 'tween', strokeWidth: 2 },
							xAxis: {
								format: (v: Date) => v.toLocaleDateString('en-US', { weekday: 'short' })
							},
							highlight: { points: { r: 4 } }
						}}
					>
						{#snippet tooltip()}
							<Chart.Tooltip hideLabel />
						{/snippet}
					</LineChart>
				</Chart.Container>
			</div>
		</SidebarItem>
	{/if}
	<SidebarItem title="Advertisement" icon={Megaphone}>
		<div
			class="my-1 flex aspect-5/1 w-full items-center justify-center rounded-lg bg-gradient-to-bl from-purple-300 to-blue-400 text-2xl font-bold text-white dark:from-purple-700 dark:to-blue-600"
		>
			thank you &lt;3
		</div>
	</SidebarItem>
</aside>
