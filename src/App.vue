<script setup lang="ts">

// Hack for iOS 100vh
const setViewportHeight = () => {
	document.documentElement.style.setProperty(
		'--viewport-height',
		`${window.innerHeight}px`,
	);
};
onMounted(() => {
	setViewportHeight();
	useEventListener(window, 'resize', setViewportHeight);
});
</script>

<template>
	<Navigation />
	<main>
		<router-view />
	</main>
	<Footer />
</template>

<style scoped>
main {
	@apply
		px-4
		py-4
		flex-1;
}
</style>
