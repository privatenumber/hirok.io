<script setup lang="ts">
const isPrint = useMediaQuery('print');
const email = typeof window !== 'undefined' && window.atob('aGlyb2tpLm9zYW1lQGdtYWlsLmNvbQ==');
</script>

<template>
	<div
		class="
			text-base
			font-normal
			flex
			gap-4
			items-center
			print:gap-2
			print:flex-col
			print:min-w-min
			print:items-start
		"
	>
		<span
			v-if="isPrint"
			class="inline-flex gap-1 items-center"
		>
			<icon-mdi:email /> {{ email }}
		</span>

		<AppLink
			href="https://github.com/privatenumber"
			title="Link to my GitHub profile"
			class="inline-flex gap-1 items-center"
		>
			<icon-mdi:github /> GitHub
		</AppLink>

		<AppLink
			href="https://www.linkedin.com/in/hirokiosame/"
			title="Link to my LinkedIn profile"
			class="inline-flex gap-1 items-center"
		>
			<icon-mdi:linkedin /> LinkedIn
		</AppLink>

		<span
			class="inline-flex gap-1 items-center"
		>
			<icon-mdi:map-marker-radius-outline /> Tokyo, Japan
		</span>
	</div>
</template>
