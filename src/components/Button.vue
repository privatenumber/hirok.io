<script setup lang="ts">
const attributes = useAttrs();
const props = defineProps({
	type: {
		type: String,
		default: 'primary',
	},
	size: {
		type: String,
		default: 'medium',
	},
	href: {
		type: String,
		default: undefined,
	},
});

const isExternal = computed(() => props.href?.startsWith('http'));
</script>

<template>
	<template v-if="href">
		<ExternalLink
			v-if="isExternal"
			v-bind="attributes"
			:href="href"
			:class="[type, size]"
			role="button"
		>
			<slot />
		</ExternalLink>
		<RouterLink
			v-else
			v-bind="attributes"
			:class="[type, size]"
			role="button"
			:to="href"
		>
			<slot />
		</RouterLink>
	</template>
	<button
		v-else
		:class="[type, size]"
		type="button"
	>
		<slot />
	</button>
</template>

<style scoped>
a,
button {
	@apply
		inline-flex
		items-center
		p-y-2
		p-x-4
		rounded-lg
		no-underline
		transition-colors
		duration-100
		justify-center
		;
}

.primary {
	@apply
		font-medium
		color-white
		bg-sky-500
		border-2
		border-sky-500
		hover:bg-sky-600;
}

.secondary {
	@apply
		border-2
		color-sky-600
		hover:bg-sky-600/15;
}

.large {
	@apply
		p-x-6
		text-lg;
}
</style>
