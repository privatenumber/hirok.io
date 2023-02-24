---
title: npm packages
---

<script setup lang="ts">
import npmPackages from '@/data/npm-packages.json';

const range = npmPackages.downloadsRange.start + ' ~ ' + npmPackages.downloadsRange.end;
const packagesSortedByPopularity = npmPackages.packages.slice().sort((a, b) => b.downloads - a.downloads);
</script>

My Open Source projects are published as packages on [npm](https://www.npmjs.com) for anyone to use.

<span :title="range">Last month</span>, my packages had a total of **{{ npmPackages.totalDownloads.toLocaleString() }}** downloads.

<template v-for="npmPackage in packagesSortedByPopularity">
	<NpmPackage v-bind="npmPackage" />
</template>
