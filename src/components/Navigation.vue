<script setup lang="ts">
const isDark = useDark();
const toggleDarkMode = useToggle(isDark);

const { y: scrollY } = useWindowScroll();

const isPageBottom = computed(() => {
	if (typeof window === 'undefined') {
		return false;
	}

	const { innerHeight: windowHeight } = window;

	// This needs to be here for reactivity
	const scrollPosition = windowHeight + scrollY.value;

	const pageHeight = document.body.offsetHeight;

	// If page is shorter than double the screen size, disable
	if (pageHeight < windowHeight * 2) {
		return false;
	}

	const bottomThreshold = pageHeight - (windowHeight * 0.1);
	return scrollPosition >= bottomThreshold;
});
</script>

<template>
	<header :class="{ 'is-sticky': isPageBottom }">
		<nav class="prose">
			<router-link
				to="/"
				class="title"
			>
				Hiroki Osame
			</router-link>
			<div class="nav-links">
				<router-link
					class="nav-link"
					to="/projects"
				>
					Projects
				</router-link>

				<router-link
					class="nav-link"
					to="/posts"
				>
					Posts
				</router-link>

				<button
					:title="`Change to ${isDark ? 'light' : 'dark'} mode`"
					@click="toggleDarkMode"
				>
					<icon-ri-sun-line v-if="isDark" />
					<icon-ri-moon-line v-else />
				</button>
			</div>
		</nav>
	</header>
</template>

<style scoped>
header {
	@apply
		p-x-4
		p-y-6;
}

.is-sticky {
	@apply
		sticky
		top-0
		bg-white/90
		dark:bg-zinc-900/90
		z-1;
}

nav {
	@apply
		w-full
		m-auto
		flex
		justify-between;
}

.title {
	@apply
		font-medium
		text-lg;

	font-family: Lexend, sans-serif;
}

.nav-links {
	@apply
		flex
		items-center
		gap-6;
}

a {
	@apply
		color-gray-900
		hover:no-underline
		dark:color-gray-100;
}
</style>
