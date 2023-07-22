<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
	<footer>
		<a
			href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
			title="Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)"
		>
			© {{ year }}
		</a>
	</footer>
</template>

<style scoped>
footer {
	@apply
		text-center
		text-sm
		px-4
		py-6
		font-light;
}

a {
	@apply text-inherit;
}
</style>
