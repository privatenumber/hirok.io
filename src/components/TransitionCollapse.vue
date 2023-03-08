<script setup lang="ts">
const zeroHeight = (element: HTMLElement) => {
	Object.assign(element.style, {
		height: '0px',
	});
};

const removeHeight = (element: HTMLElement) => {
	element.style.removeProperty('height');
};

const getHeight = (element: Element) => {
	const styles = window.getComputedStyle(element);
	return (
		element.scrollHeight
		+ Number.parseFloat(styles.marginTop.slice(0, -2)) // Strip px
	);
};

const setContentHeight = (element: HTMLElement) => {
	const targetHeight = Array.from(element.children)
		.map(getHeight)
		.reduce((current, sum) => current + sum, 0);

	element.style.height = `${targetHeight}px`;
};

const onLeave = (element: HTMLElement) => {
	setContentHeight(element);
	zeroHeight(element);
};

</script>

<template>
	<transition
		v-bind="$attrs"

		:enter-active-class="$s.transitioning"
		:leave-active-class="$s.transitioning"

		@before-enter="zeroHeight"
		@enter="setContentHeight"
		@after-enter="removeHeight"

		@before-leave="setContentHeight"
		@leave="onLeave"
		@after-leave="removeHeight"
	>
		<slot />
	</transition>
</template>

<style module="$s">
.transitioning {
	transition: height .3s ease-in-out;

	/* stylelint-disable-next-line property-no-vendor-prefix */
	-webkit-mask-image: linear-gradient(180deg, #000, transparent);
}
</style>
