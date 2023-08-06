<script setup lang="ts">
const wrapper = ref<HTMLDivElement>();
const animating = ref(false);

const resetAnimation = () => {
	const element = wrapper.value;
	if (!element || animating.value) {
		return;
	}

	element.style.animationName = 'none';
	// eslint-disable-next-line no-unused-expressions
	element.offsetHeight; // trigger reflow
	element.style.animationName = '';
};

const animationStart = () => {
	animating.value = true;
};

const animationDone = () => {
	animating.value = false;
	wrapper.value!.style.animationDelay = '0s';
};
</script>

<template>
	<div
		ref="wrapper"
		@pointerenter="resetAnimation"
		@animationstart="animationStart"
		@animationend="animationDone"
	>
		<slot />
	</div>
</template>

<style scoped>
div {
	/* Disable tap-to-zoom on iOS */
	@apply touch-manipulation;

	animation: wiggle 500ms ease-in 1 normal forwards;

	/*
	If the element is rendered with the animation, it was starting too fast
	It's removed after the first animation
	*/
	animation-delay: 0.1s;
}

@keyframes wiggle {
	0% {
		transform: rotate(2deg);
	}

	40% {
		transform: rotate(8deg);
	}

	60% {
		transform: rotate(1deg);
	}

	80% {
		transform: rotate(6deg);
	}

	100% {
		transform: rotate(3deg);
	}
}
</style>
