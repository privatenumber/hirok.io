<script setup lang="ts">
import { createPopper, type Instance } from '@popperjs/core';
import Subslot from './subslot';

defineProps<{
	tip: string;
}>();

const trigger = ref<InstanceType<typeof Subslot>>();
const tooltip = ref<HTMLDivElement>();
const isOpen = ref(false);

let popper: Instance;
const show = () => {
	isOpen.value = true;

	if (popper) {
		popper.update();
	} else {
		if (!trigger.value?.$el || !tooltip.value) {
			return;
		}

		popper = createPopper(
			trigger.value.$el,
			tooltip.value,
			{
				placement: 'bottom',
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [0, 12],
						},
					},
					// Basically margin so it's not flush against the window box
					{
						name: 'preventOverflow',
						options: {
							padding: 8,
						},
					},
				],
			},
		);
	}
};

onBeforeUnmount(() => {
	popper?.destroy();
});

const hide = () => {
	isOpen.value = false;
};
</script>

<template>
	<Subslot
		ref="trigger"
		limit="1"
		@mouseenter="show"
		@mouseleave="hide"
		@focus="show"
		@blur="hide"
	>
		<slot />
		<template #text-wrapper>
			<span />
		</template>
	</Subslot>
	<Transition
		name="fade"
	>
		<div
			v-show="isOpen"
			ref="tooltip"
			class="tooltip"
			role="tooltip"
		>
			<div
				class="arrow"
				data-popper-arrow
			/>
			{{ tip }}
		</div>
	</Transition>
</template>

<style scoped>

.tooltip {
	@apply
		text-sm
		rounded
		text-white
		bg-zinc-700/95
		py-1
		px-2
		shadow
		z-10;
}

.arrow,
.arrow::before {
	position: absolute;
	width: 8px;
	height: 8px;
	background: inherit;
}

.arrow {
	visibility: hidden;
}

.arrow::before {
	visibility: visible;
	content: '';
	transform: rotate(45deg);
}

.tooltip[data-popper-placement^='top'] > .arrow {
	bottom: -4px;
}

.tooltip[data-popper-placement^='bottom'] > .arrow {
	top: -4px;
}

.tooltip[data-popper-placement^='left'] > .arrow {
	right: -4px;
}

.tooltip[data-popper-placement^='right'] > .arrow {
	left: -4px;
}

.fade-enter-active,
.fade-leave-active {
	@apply
		transition-opacity;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
