<script setup lang="ts">
const props = defineProps<{
	url: string;
}>();

const isPrint = useMediaQuery('print');

const label = computed(
	() => {
		let { url } = props;

		if (url.startsWith('#')) {
			return;
		}

		if (url.startsWith('/')) {
			url = window.location.origin + url;
		}

		return url
			// removes https://, http://www., mailto:
			.replace(/^\w+:(\/\/(www\.)?)?/, '')
			.replace(/\/$/, '');
	},
);
</script>

<template>
	<span
		v-if="isPrint && label"
		class="
			opacity-60
			text-sm
			font-light
		"
	>(<span class="readable-link">{{ label }}</span>)</span>
</template>

<style scoped>
.readable-link {
	@apply
		underline
		underline-offset-2;
}
</style>
