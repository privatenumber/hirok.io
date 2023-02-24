<script setup lang="ts">
import humanNumber from 'human-number';

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	repository: {
		type: String,
	},
	latestVersion: {
		type: String,
		required: true,
	},
	lastPublishDate: {
		type: String,
		required: true,
	},
	downloads: {
		type: Number,
		required: true,
	},
});

const npmUrl = computed(() => `https://www.npmjs.com/package/${props.name}`);
const prettyDownloads = computed(
	() => humanNumber(
		props.downloads,
		shortNumber => (
			shortNumber % 1 === 0
				? shortNumber.toString()
				: shortNumber.toFixed(1)
		),
	),
);

const units = [
	{
		label: 'year',
		seconds: 60 * 60 * 24 * 365,
	},
	{
		label: 'month',
		seconds: 60 * 60 * 24 * 30,
	},
	{
		label: 'day',
		seconds: 60 * 60 * 24,
	},
	{
		label: 'hour',
		seconds: 60 * 60,
	},
	{
		label: 'minute',
		seconds: 60,
	},
	{
		label: 'second',
		seconds: 1,
	},
] as const;

const lastPublishedRelative = computed(() => {
	const publishDate = new Date(props.lastPublishDate);
	const secondsAgo = Math.floor((Date.now() - publishDate.getTime()) / 1000);
	const unit = units.find(interval => interval.seconds < secondsAgo)!;
	const time = Math.round(secondsAgo / unit.seconds);

	return `${time} ${unit.label}${time > 1 ? 's' : ''}`;
});
</script>

<template>
	<div class="flex justify-between flex-wrap md:flex-nowrap my-14">
		<div class="basis-full">
			<div>
				<ExternalLink
					:href="npmUrl"
					class="text-2xl font-bold align-middle"
				>
					{{ name }}
				</ExternalLink>
				<ExternalLink
					v-if="repository"
					:href="repository"
					class="
						ml-2
						text-lg
						align-middle
						color-black
						dark:color-white
						transition-opacity
						opacity-50
						hover:opacity-90
					"
					title="Go to GitHub repository"
				>
					<icon-mdi-github-box class="inline-block" />
				</ExternalLink>
			</div>
			<div class="text-sm mt-2">
				{{ description }}
			</div>
		</div>
		<div class="flex basis-full md:basis-1/2 gap-2 px-2 justify-between mt-4 md:mt-0">
			<div class=" text-center">
				<div class="text-xl">
					v{{ latestVersion }}
				</div>
				<div
					class="text-xs mt-1 opacity-75"
					:title="lastPublishDate"
				>
					Published <span class="whitespace-nowrap">{{ lastPublishedRelative }}</span> ago
				</div>
			</div>
			<div class=" text-center">
				<div
					class="text-xl"
					:title="downloads.toLocaleString()"
				>
					{{ prettyDownloads }}
				</div>
				<div class="text-xs mt-1 opacity-75">
					downloads last month
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
td {
	@apply p-y-8 align-top;
}
</style>
