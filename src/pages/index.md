---
heading: ''
---

<script setup lang="ts">
import { getUnit, numberUnits } from '@/utils/get-unit';
import npmPackages from '@/data/npm-packages.json';

const [downloads, unit] = getUnit(npmPackages.totalDownloads, numberUnits, 1);
const npmDownloads = `${downloads} ${unit}`;
const downloadsPerSecond = Math.round(npmPackages.totalDownloads / 30 / 24 / 60 / 60);
</script>

<WiggleAnimation
	class="
		ml-auto
		w-160px
		h-160px
		sm:w-180px
		sm:h-180px
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

<span class="text-xl font-medium">Hello,</span><h1 class="mt-2">I'm Hiroki.</h1>

I'm a software engineer specializing in JavaScript & TypeScript.

I have a passion for helping engineers be more productive by improving developer experience (_DX_).

My [_DX_ projects](/projects) are open-source and available for anyone to use. Last month, they were downloaded <span class="whitespace-nowrap">_{{ npmDownloads }} times_</span> (~{{ downloadsPerSecond.toLocaleString() }}/sec).

I'm currently based in 🗼 Tokyo and work at [<icon-mdi-square-inc class="inline mb-2px" /> Square](https://squareup.com/) as a frontend engineer.

<div class="m-t-8 sm:m-t-14 flex flex-wrap gap-2 sm:gap-4">

<Button href="/posts" title="Link to my blog posts" class="w-full sm:w-auto">
	<icon-mdi-head-heart class="m-r-1" />
	Read my blog
</Button>

<Button href="https://github.com/privatenumber" type="secondary" title="Link to my GitHub profile" class="flex-1 sm:flex-none">
	<icon-mdi-github class="m-r-1" /> GitHub
</Button>

<Button href="https://twitter.com/privatenumbr" type="secondary" title="Link to my Twitter profile" class="flex-1 sm:flex-none">
	<icon-mdi-twitter class="m-r-1" /> Twitter
</Button>

<Button href="https://www.linkedin.com/in/hirokiosame/" type="secondary" title="Link to my LinkedIn profile" class="flex-1 sm:flex-none">
	<icon-mdi-linkedin class="m-r-1" /> LinkedIn
</Button>

<!--
Deactivated
<Button href="https://www.instagram.com/private.number_" type="secondary" title="Link to my Instagram profile" class="flex-1 sm:flex-none">
	<icon-mdi-instagram class="m-r-1" />
</Button>
-->

</div>
