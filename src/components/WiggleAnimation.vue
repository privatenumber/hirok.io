<script setup lang="ts">
const resetAnimation = ({ target }) => {
	target.style.animation = 'none';

	// eslint-disable-next-line no-unused-expressions
	target.offsetHeight; // trigger reflow
	target.style.animation = null;
};
</script>

<template>
	<div @mouseenter="resetAnimation">
		<slot />
	</div>
</template>

<style scoped>
div {
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
