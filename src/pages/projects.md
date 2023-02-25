---
title: npm packages
---

<script setup lang="ts">
import npmPackages from '@/data/npm-packages.json';
import Popper from 'vue3-popper';

const range = npmPackages.downloadsRange.start + ' ~ ' + npmPackages.downloadsRange.end;
const packagesSortedByPopularity = npmPackages.packages.slice().sort((a, b) => b.downloads - a.downloads);
</script>

My Open Source projects are published as packages on [npm](https://www.npmjs.com) for anyone to use.

<Popper hover :content="range">Last month</Popper>, my packages had a total of **{{ npmPackages.totalDownloads.toLocaleString() }}** downloads.

<template v-for="npmPackage in packagesSortedByPopularity">
	<NpmPackage v-bind="npmPackage" />
</template>
