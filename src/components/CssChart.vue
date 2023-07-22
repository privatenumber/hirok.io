<script setup lang="ts">
const props = defineProps<{
	data: number[];
}>();

const increments = 100 / (props.data.length - 1);
const maxValue = Math.max(...props.data);
const clipPath = computed(() => {
	const points = props.data.map(
		(point, i) => `${
			(i * increments).toFixed(2)
		}% ${
			(100 - ((point / maxValue) * 100)).toFixed(2)
		}%`,
	);

	return `polygon(0 100%, ${points}, 100% 100%)`;
});
</script>

<template>
	<div
		v-if="data.length > 0"
		class="npm-chart"
		:style="{ clipPath }"
	/>
</template>

<style scoped>
.npm-chart {
	background-image: linear-gradient(-15deg, transparent 0%, #0EA5E9 80%);
}
</style>
