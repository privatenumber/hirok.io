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
		p-x-4
		p-y-6
		font-light;
}

a {
	@apply color-inherit;
}
</style>
