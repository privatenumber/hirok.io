<script setup lang="ts">
const $el = ref();
const props = withDefaults(defineProps<{
	value: number;
	duration?: number;
}>(), {
	duration: 1000,
});

const detectDecimals = (number: number) => number.toString().split('.')[1]?.length ?? 0;

const decimals = detectDecimals(props.value);
const easeOutQuartic = (t: number) => 1 - Math.pow(1 - t, 4);

onMounted(() => {
	const { duration } = props;

	// Set container width
	const width = $el.value.offsetWidth;
	$el.value!.style.width = `${width}px`;

	$el.value.textContent = 0;

	const startTime = Date.now();
	const countUp = () => {
		const progress = (Date.now() - startTime) / duration;
		let value = (props.value * easeOutQuartic(progress));
		if (value > props.value) {
			value = props.value;
		}

		$el.value.textContent = value.toFixed(decimals);

		if (progress < 1) {
			window.requestAnimationFrame(countUp);
		} else {
			$el.value.textContent = props.value;
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
