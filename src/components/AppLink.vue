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
	>
		<slot />
	</a>
	<RouterLink
		v-else
		:to="props.href"
	>
		<slot />
	</RouterLink>
</template>
