<script setup lang="ts">
const zeroHeight = (element: Element) => {
	Object.assign((element as HTMLElement).style, {
		height: '0px',
	});
};

const removeHeight = (element: Element) => {
	(element as HTMLElement).style.removeProperty('height');
};

const setContentHeight = (element: Element) => {
	const { scrollHeight } = element;
	(element as HTMLElement).style.height = `${scrollHeight}px`;
};

const onLeave = (element: Element) => {
	setContentHeight(element);
	zeroHeight(element);
};

</script>

<template>
	<Transition
		v-bind="$attrs"

		:enter-active-class="$s.transitioning"
		:leave-active-class="$s.transitioning"

		@before-enter="zeroHeight"
		@enter="setContentHeight"
		@after-enter="removeHeight"

		@before-leave="setContentHeight"
		@leave="onLeave"
		@after-leave="removeHeight"
	>
		<slot />
	</Transition>
</template>

<style module="$s">
.transitioning {
	transition: height .3s ease-in-out;

	/* stylelint-disable-next-line property-no-vendor-prefix */
	-webkit-mask-image: linear-gradient(180deg, #000, transparent);
}
</style>
