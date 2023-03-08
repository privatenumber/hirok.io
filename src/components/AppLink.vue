<script setup lang="ts">
const props = defineProps<{
	href: string;
}>();

const isExternalPattern = /^https?:\/\//i;
const isExternal = computed(() => isExternalPattern.test(props.href));
</script>

<template>
	<a
		v-if="isExternal"
		target="_blank"
		rel="noopener"
		:href="props.href"
		class="inline-flex flex-wrap items-center gap-x-1 align-bottom"
	>
		<slot />
		<PrintUrlLabel :url="href" />
	</a>
	<RouterLink
		v-else
		:to="props.href"
		class="inline-flex flex-wrap items-center gap-x-1 align-bottom"
	>
		<slot />
		<PrintUrlLabel :url="href" />
	</RouterLink>
</template>
