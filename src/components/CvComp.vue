<script setup lang="ts">
const isPrint = useMediaQuery('print');
const email = window.atob('aGlyb2tpLm9zYW1lQGdtYWlsLmNvbQ==');
const todayPretty = new Date().toLocaleDateString(
	'en-US',
	{ month: 'long', day: 'numeric', year: 'numeric' },
);
</script>

<template>
	<A4Paper>
		<div class="flex gap-x-2">
			<div>
				<Heading size="1">
					Hiroki Osame

					<template #annotation>
						<CvLinks v-if="!isPrint" />
					</template>
				</Heading>
				<section>
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
			bottom-1
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
