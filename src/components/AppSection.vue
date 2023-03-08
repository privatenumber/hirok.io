<script setup lang="ts">
defineProps<{
	title?: string;
	subtitle?: string;
}>();
</script>

<template>
	<section class="mb-2">
		<div
			class="
				flex
				items-center
				justify-between
				gap-2
			"
		>
			<div>
				<slot name="title">
					{{ title }}
				</slot>
			</div>
			<div>
				<slot name="subtitle">
					{{ subtitle }}
				</slot>
			</div>
		</div>
		<slot />
	</section>
</template>
