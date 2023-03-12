<template>
	<!-- https://github.com/n3r4zzurr0/svg-spinners/blob/main/svg-css/ring-resize.svg -->
	<svg
		v-pre
		viewBox="0 0 24 24"
	>
		<g class="spinner">
			<circle
				cx="12"
				cy="12"
				r="9.5"
				fill="none"
				stroke-width="3"
			/>
		</g>
	</svg>
</template>

<style scoped>
.spinner{
	stroke: currentcolor;
	transform-origin: center;
	animation: rotate 2s linear infinite;
}

@keyframes rotate {
	100% {
		transform: rotate(360deg);
	}
}

.spinner circle {
	stroke-linecap: round;
	animation: spinner 1.5s ease-in-out infinite;
}

@keyframes spinner{
	0%{
		stroke-dasharray: 0 150;
		stroke-dashoffset: 0;
	}

	47.5%{
		stroke-dasharray: 42 150;
		stroke-dashoffset: -16
	}

	95%, 100%{
		stroke-dasharray: 42 150;
		stroke-dashoffset: -59
	}
}

</style>
