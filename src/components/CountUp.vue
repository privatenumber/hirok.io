<script setup lang="ts">
const $element = ref<HTMLElement>();
const props = withDefaults(defineProps<{
	value: number;
	duration?: number;
}>(), {
	duration: 1000,
});

const easeOutQuartic = (t: number) => 1 - (1 - t) ** 4;

const countDecimals = (number: number) => number.toString().split('.')[1]?.length ?? 0;
const decimals = countDecimals(props.value);

onMounted(() => {
	const $element_ = $element.value!;
	const { duration, value: finalValue } = props;

	const startTime = Date.now();
	const countUp = () => {
		let progress = (Date.now() - startTime) / duration;
		if (progress > 1) {
			progress = 1;
		}

		const currentValue = finalValue * easeOutQuartic(progress);
		$element_.textContent = currentValue.toFixed(decimals);

		if (progress < 1) {
			window.requestAnimationFrame(countUp);
		} else {
			$element_.style.removeProperty('width');
		}
	};

	/**
	 * Sometimes the CSS hasn't loaded in `onMounted` yet (esp. iOS Safari)
	 * so we need to check the width here to get an accurate value.
	 */
	window.requestAnimationFrame(() => {
		// getComputedStyle is used to get sub-pixel accuracy
		const { width } = getComputedStyle($element_);
		$element_.style.width = width;

		countUp();
	});
});
</script>

<!--
Some styles are inline because this could be rendered before
the CSS is loaded. Still missing the font-size though.
-->
<template>
	<span
		ref="$element"
		:style="{
			display: 'inline-block',
			fontVariantNumeric: 'tabular-nums',
		}"
		class="text-right"
	>{{ value }}</span>
</template>
