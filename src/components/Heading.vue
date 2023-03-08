<script setup lang="ts">
defineProps<{
	size: number | string;
	annotation?: string;
	underline?: boolean;
}>();
</script>

<template>
	<div
		class="
			flex
			flex-wrap
			print:flex-nowrap
			print:gap-x-0
			justify-between
			items-center
			gap-x-6
			gap-y-1
		"
		:class="`h${size}-styles`"
	>
		<component
			:is="`h${size}`"
			class="
				flex
				items-center
				gap-1
			"
		>
			<slot />
		</component>
		<component
			:is="`h${Number(size) + 1}`"
			class="
				annotation
				flex
				items-center
				gap-1
				whitespace-nowrap
			"
		>
			<slot name="annotation">
				{{ annotation }}
			</slot>
		</component>
	</div>
</template>

<style scoped>
.annotation {
	@apply
		font-extralight;
}
</style>
