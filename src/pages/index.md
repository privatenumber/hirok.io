---
heading: ''
---

<script setup lang="ts">
import { getUnit, numberUnits } from '@/utils/get-unit';
import npmPackages from '@/data/npm-downloads.json';

const [, lastMonthDownloads] = npmPackages.lastMonth;

const lastMonthDownloadsPretty = computed(() => {
	const [downloads, unit] = getUnit(lastMonthDownloads, numberUnits, 1);
	return `${downloads} ${unit}`;
});

const downloadsPerSecond = Math.round(lastMonthDownloads / 30 / 24 / 60 / 60);
</script>

<WiggleAnimation
	class="
		ml-auto
		w-40
		h-40
		sm:w-48
		sm:h-48
		sm:mt-6
		-mb-8
		sm:-mb-12
		mr-2
	"
>
	<img
		alt="Hiroki's portrait"
		src="/hiroki.webp"
		width="180"
		height="180"
		class="rounded-md shadow-sm shadow-gray-900/70"
	/>
</WiggleAnimation>
<span class="text-xl font-medium">Hello,</span>
<h1 class="mt-2">I'm Hiroki.</h1>

I'm a software engineer specializing in JavaScript & TypeScript.

I have a passion for helping engineers be more productive by improving Developer Experience (_DX_).

My [_DX_ projects](/projects) are open-source and available for anyone to use. Last month, they were downloaded <span class="whitespace-nowrap">_{{ lastMonthDownloadsPretty }} times_</span> (~{{ downloadsPerSecond.toLocaleString() }}/sec).

I'm currently based in 🗼 Tokyo and work at <AppLink href="https://squareup.com/"><icon-mdi-square-inc class="inline-block align-middle mb-0.5" /> Square</AppLink> as a frontend engineer.

<div class="mt-8 sm:mt-14 flex flex-wrap gap-2 sm:gap-4">

<Button href="/posts" title="Link to my blog posts" class="w-full sm:w-auto">
	<icon-mdi-head-heart />
	Read my blog
</Button>

<Button
	href="https://github.com/privatenumber"
	variant="secondary"
	title="Link to my GitHub profile"
	class="flex-1 sm:flex-none"
>
	<icon-mdi-github /> GitHub
</Button>

<Button
	href="https://twitter.com/privatenumbr"
	variant="secondary"
	title="Link to my Twitter profile"
	class="flex-1 sm:flex-none"
>
	<icon-mdi-twitter /> Twitter
</Button>

<Button
	href="https://www.linkedin.com/in/hirokiosame/"
	variant="secondary"
	title="Link to my LinkedIn profile"
	class="flex-1 sm:flex-none"
>
	<icon-mdi-linkedin /> LinkedIn
</Button>

<!--
Deactivated
<Button
	href="https://www.instagram.com/private.number_"
	variant="secondary"
	title="Link to my Instagram profile"
	class="flex-1 sm:flex-none"
>
	<icon-mdi-instagram class="mr-1" />
</Button>
-->

</div>
