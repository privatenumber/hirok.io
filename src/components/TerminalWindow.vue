<script setup lang="ts">
const props = withDefaults(defineProps<{
	title?: string;
	size?: 'small' | 'medium' | 'large';
}>(), {
	title: 'Terminal',
	size: 'medium',
});
</script>

<template>
	<div
		class="window"
		:class="props.size"
	>
		<div class="title-bar">
			<div class="buttons">
				<div class="button red" />
				<div class="button yellow" />
				<div class="button green" />
			</div>
			<span class="title">
				{{ props.title }}
			</span>
		</div>
		<slot />
	</div>
</template>

<style scoped>
.window {
	@apply
		rounded-lg
		overflow-hidden
		my-8
		mx--2
		sm:!mx-0
		shadow-lg
		shadow-gray-200
		dark:shadow
		dark:shadow-dark-700;

	font-style: initial;
	background-color: rgb(46 52 64);
}

.title-bar {
	@apply
		px-4
		py-1
		relative
		bg-black/20
		text-center;
}

.title {
	@apply
		color-light-200
		text-xs
		font-light;
}

.buttons {
	@apply
		absolute
		left-4;
}

.button {
	@apply
		inline-block
		rounded-1/2
		w-10px
		h-10px
		mr-6px;
}

.button.red {
	background-color: #ed695e;
}

.button.yellow {
	background-color: #f4be4f;
}

.button.green {
	background-color: #61c454;
}

:deep(pre) {
	@apply
		m-0
		p-x-5
		p-y-4;
}

.window.small :deep(code) {
	font-size: 0.7em;
}

.window.medium :deep(code) {
	font-size: 0.8em;
}

.window.large :deep(code) {
	font-size: 0.875em;
}
</style>
