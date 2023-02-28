---
title: npm packages
---

<script setup lang="ts">
import { getUnit, numberUnits } from '@/utils/get-unit';
import npmPackages from '@/data/npm-packages.json';

const range = new Date(npmPackages.totalDownloadsMonth).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
});

const packagesSortedByPopularity = npmPackages.packages.slice().sort((a, b) => b.downloads - a.downloads);

const [downloads, unit] = getUnit(npmPackages.totalDownloads, numberUnits, 1);
const npmDownloads = `${downloads} ${unit}`;
</script>

My Open Source projects are published as packages on [npm](https://www.npmjs.com) for anyone to use.

<Popper :tip="range">Last month</Popper>, my packages had a total of <Popper :tip="npmPackages.totalDownloads.toLocaleString()"><strong>{{ npmDownloads }}</strong></Popper> downloads.

<template v-for="npmPackage in packagesSortedByPopularity">
	<NpmPackage v-bind="npmPackage" />
</template>
