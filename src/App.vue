<script setup lang="ts">
const websiteDescription = 'Hiroki Osame\'s personal website & blog';
useHead({
	title: 'Hiroki Osame',
	meta: [
		{
			property: 'og:site_name',
			content: 'Hiroki Osame',
		},
		{
			property: 'og:title',
			content: 'Hiroki Osame',
		},
		{
			property: 'description',
			content: websiteDescription,
		},
		{
			property: 'og:description',
			content: websiteDescription,
		},
	],
});
</script>

<template>
	<Navigation />
	<main>
		<router-view />
	</main>
	<Footer />
</template>
