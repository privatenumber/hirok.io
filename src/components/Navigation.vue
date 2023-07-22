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
				class="title text-center"
			>
				Hiroki Osame
			</router-link>
			<div class="nav-links">
				<router-link
					class="nav-link"
					to="/projects"
					title="Projects"
				>
					Projects
				</router-link>

				<router-link
					class="nav-link"
					to="/cv"
					title="CV"
				>
					CV
				</router-link>

				<router-link
					class="nav-link"
					to="/posts"
					title="Posts"
				>
					Posts
				</router-link>

				<router-link
					class="nav-link"
					to="/contact"
					title="Contact me"
				>
					<icon-ci:paper-plane />
				</router-link>

				<button
					:title="`Change to ${isDark ? 'light' : 'dark'} mode`"
					@click="toggleDarkMode()"
				>
					<icon-ci:sun v-if="isDark" />
					<icon-ci:moon v-else />
				</button>
			</div>
		</nav>
	</header>
</template>

<style scoped>
header {
	@apply
		px-4
		py-6;
}

.is-sticky {
	@apply
		sticky
		top-0
		bg-white/90
		dark:bg-zinc-900/90
		/* z-10; */
}

nav {
	@apply
		w-full
		m-auto
		flex
		justify-between;
}

@font-face {
	font-family: Lexend;
	font-style: normal;
	font-weight: 400;
	src: url('/Lexend.woff2') format('woff2');
}

.title {
	@apply
		font-medium
		text-lg
		transition-transform;

	font-family: Lexend, Helvetica, sans-serif;
}

.title:active {
	@apply
		scale-95;
}

.nav-links {
	@apply
		flex
		items-center
		gap-4
		sm:gap-6;
}

a {
	@apply
		text-gray-900
		hover:no-underline
		dark:text-gray-100;
}
</style>
