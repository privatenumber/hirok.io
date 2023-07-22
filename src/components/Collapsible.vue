<script setup lang="ts">
const isOpen = ref(false);
</script>

<template>
	<div>
		<TransitionCollapse>
			<div v-show="isOpen">
				<slot />
			</div>
		</TransitionCollapse>
		<div
			class="
				p-y-1
				cursor-pointer
				text-xs
				text-center
				opacity-50
				transition-transform
				hover:translate-y-.5
			"
			@click="isOpen = !isOpen"
		>
			<div v-show="!isOpen">
				More
			</div>
			<icon-mdi:chevron-down
				class="inline-block arrow"
				:class="{
					up: isOpen
				}"
			/>
		</div>
	</div>
</template>

<style scoped>
.arrow {
	transform: rotate(0deg);
	transition: transform 0.2s ease-in-out;
}

.up {
	transform: rotate(-180deg);
}
</style>
