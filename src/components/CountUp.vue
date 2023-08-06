<script setup lang="ts">
const $el = ref();
const props = withDefaults(defineProps<{
	value: number;
	duration?: number;
}>(), {
	duration: 1000,
});

const easeOutQuartic = (t: number) => 1 - Math.pow(1 - t, 4);

const countDecimals = (number: number) => number.toString().split('.')[1]?.length ?? 0;
const decimals = countDecimals(props.value);

onMounted(() => {
	const { duration, value: finalValue } = props;

	// Set container width
	const width = $el.value.offsetWidth;
	$el.value!.style.width = `${width}px`;

	const startTime = Date.now();
	const countUp = () => {
		let progress = (Date.now() - startTime) / duration;
		if (1 < progress) {
			progress = 1;
		}

		const currentValue = finalValue * easeOutQuartic(progress);
		$el.value.textContent = currentValue.toFixed(decimals);

		if (progress < 1) {
			window.requestAnimationFrame(countUp);
		}
	};
	window.requestAnimationFrame(countUp);
});
</script>

<template>
	<span
		ref="$el"
		class="tabular-nums inline-block text-right"
	>{{ value }}</span>
</template>
