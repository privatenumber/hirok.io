---
title: npm packages
---

<script setup lang="ts">
import { getUnit, numberUnits } from '@/utils/get-unit';
import npmPackages from '@/data/npm-downloads.json';

const [downloadMonth, downloadCount] = npmPackages.lastMonth;
const downloadsMonthPretty = new Date(downloadMonth).toLocaleDateString(undefined, {
	timeZone: 'UTC',
	month: 'long',
	year: 'numeric',
});

const packagesSortedByPopularity = npmPackages.packages.slice().sort((a, b) => {
	const aDownloads = Object.values(a.downloads).reduce((acc, curr) => acc + curr, 0);
	const bDownloads = Object.values(b.downloads).reduce((acc, curr) => acc + curr, 0);

	return bDownloads - aDownloads;
});

const [downloads, unit] = getUnit(downloadCount, numberUnits, 1);
const npmDownloads = `${downloads} ${unit}`;
</script>

My Open Source projects are published as packages on [npm](https://www.npmjs.com) for anyone to use.

<Popper :tip="downloadsMonthPretty">Last month</Popper>, my packages had a total of <Popper :tip="downloadCount.toLocaleString()"><strong>{{ npmDownloads }}</strong></Popper> downloads.

<template v-for="npmPackage in packagesSortedByPopularity">
	<NpmPackage v-bind="npmPackage" />
</template>
