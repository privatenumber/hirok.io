<script setup lang="ts">
let animating = $ref(false); // eslint-disable-line no-undef

const resetAnimation = ({ target }: PointerEvent) => {
	if (!target || animating) {
		return;
	}

	animating = true;

	const element = target as HTMLDivElement;
	element.style.animation = 'none';

	// eslint-disable-next-line no-unused-expressions
	element.offsetHeight; // trigger reflow
	element.style.animation = '';
};

const animationDone = () => {
	animating = false;
};
</script>

<template>
	<div
		@pointerenter="resetAnimation"
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
