<script setup lang="ts">
import CvLinks from './CvLinks.vue';

const isPrint = useMediaQuery('print');
const todayPretty = new Date().toLocaleDateString();
</script>

<template>
	<A4Paper>
		<div class="flex gap-x-4">
			<div>
				<Heading size="1">
					Hiroki Osame

					<template #annotation>
						<CvLinks v-if="!isPrint" />
					</template>
				</Heading>
				<section class="print:text-justify">
					<slot
						name="about"
					/>
				</section>
			</div>

			<CvLinks v-if="isPrint" />
		</div>

		<slot />

		<div
			class="
			hidden
			print:block
			absolute
			bottom-2
			right-4
			text-xs
			italic
		"
		>
			Printed on {{ todayPretty }}. Latest version available at <u>hirok.io/cv</u>
		</div>
	</A4Paper>
</template>

<style scoped>

.cv-header {
	@apply
		grid
		justify-between;

	grid-template-columns: repeat(2, auto);
	grid-template-rows: repeat(2, auto);
}
</style>
