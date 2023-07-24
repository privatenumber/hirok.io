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
			class="button"
			:class="[variant, size]"
			role="button"
		>
			<slot />
		</AppLink>
		<RouterLink
			v-else
			v-bind="attributes"
			class="button"
			:class="[variant, size]"
			role="button"
			:to="href"
		>
			<slot />
		</RouterLink>
	</template>
	<button
		v-else
		class="button"
		:class="[variant, size]"
		type="button"
	>
		<slot />
	</button>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
	.button {
		@apply
			inline-flex
			flex-nowrap
			items-center
			py-2
			rounded-lg
			no-underline
			hover:no-underline
			transition-colors
			duration-100
			justify-center
			gap-1
			border-2
			border-transparent
			text-white
			;
	}

	.button:disabled {
		@apply
			opacity-60
			cursor-not-allowed
			pointer-events-none
			;
	}

	.primary {
		@apply
			font-medium
			bg-sky-500
			border-sky-500
			hover:bg-sky-600;
	}

	.secondary {
		@apply
			text-sky-500
			border-sky-600
			hover:bg-sky-700/20;
	}

	.large {
		@apply
			px-6
			text-lg;
	}

	.medium {
		@apply
			px-4
			text-base;
	}

	.small {
		@apply
			px-3
			py-1
			text-sm;
	}
}
</style>
