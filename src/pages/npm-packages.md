---
title: npm packages
---

<script setup>
import npmPackages from '@/data/npm-packages.json';

npmPackages.sort((a, b) => b.downloads - a.downloads);

const totalDownloads = npmPackages.reduce((acc, { downloads }) => acc + downloads, 0);
</script>

My Open Source projects are published as packages on [npm](https://www.npmjs.com) for anyone to use.

Last month, my packages had a total of **{{ totalDownloads.toLocaleString() }}** downloads.

<table>
  <template v-for="npmPackage in npmPackages">
    <NpmPackage v-bind="npmPackage" />
  </template>
</table>
