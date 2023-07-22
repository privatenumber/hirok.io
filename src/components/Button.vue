<script setup lang="ts">
const attributes = useAttrs();
const props = defineProps({
	variant: {
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
		<AppLink
			v-if="isExternal"
			v-bind="attributes"
			:href="href"
			:class="[variant, size]"
			role="button"
		>
			<slot />
		</AppLink>
		<RouterLink
			v-else
			v-bind="attributes"
			:class="[variant, size]"
			role="button"
			:to="href"
		>
			<slot />
		</RouterLink>
	</template>
	<button
		v-else
		:class="[variant, size]"
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
		flex-nowrap
		items-center
		py-2
		px-4
		rounded-lg
		no-underline
		hover:no-underline
		transition-colors
		duration-100
		justify-center
		gap-1
		;
}

button:disabled {
	@apply
		opacity-60
		cursor-not-allowed
		pointer-events-none
		;
}

.primary {
	@apply
		font-medium
		text-white
		bg-sky-500
		border-2
		border-sky-500
		hover:bg-sky-600;
}

.secondary {
	@apply
		border-2
		border-sky-600
		hover:bg-sky-700/20;
}

.large {
	@apply
		px-6
		text-lg;
}

.small {
	@apply
		px-2
		py-1
		text-sm;
}
</style>
