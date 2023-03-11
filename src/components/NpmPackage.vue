<script setup lang="ts">
import { getUnit, timeUnits, shortNumberUnits } from '@/utils/get-unit';

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

if (!props.repository) {
	console.warn(`No repository URL provided for ${props.name}`);
}

const npmUrl = computed(() => `https://www.npmjs.com/package/${props.name}`);
const repositoryUrl = computed(() => props.repository ?? `https://github.com/privatenumber/${props.name}`);
const searchUrl = computed(() => `https://github.com/search?type=code&q=path%3A%2Fpackage.json%24%2F+%22%5C%22${props.name}%5C%22%3A%22`);
const prettyDownloads = computed(
	() => {
		const [value, unit] = getUnit(props.downloads, shortNumberUnits, 1)!;
		return `${value % 1 === 0 ? value : value.toFixed(1)} ${unit ?? ''}`;
	},
);

const lastPublishDatePretty = computed(() => {
	const publishDate = new Date(props.lastPublishDate);
	return publishDate.toLocaleString();
});

const lastPublishRelative = computed(() => {
	const publishDate = new Date(props.lastPublishDate);
	const secondsAgo = Math.floor((Date.now() - publishDate.getTime()) / 1000);
	const [value, unit] = getUnit(secondsAgo, timeUnits, 0)!;
	return `${value} ${unit}${value > 1 ? 's' : ''}`;
});
</script>

<template>
	<div class="flex justify-between flex-wrap md:flex-nowrap my-14">
		<div class="basis-full">
			<div>
				<AppLink
					:href="npmUrl"
					class="text-2xl font-bold align-middle"
				>
					{{ name }}
				</AppLink>
				<Popper tip="GitHub repository">
					<AppLink
						:href="repositoryUrl"
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
						title="GitHub repository"
					>
						<icon-mdi-github-box class="inline-block" />
					</AppLink>
				</Popper>
				<Popper tip="Find projects that use this package">
					<AppLink
						:href="searchUrl"
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
						title="Find projects that use this package"
					>
						<icon-tabler-viewfinder class="inline-block" />
					</AppLink>
				</Popper>
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
				<Popper :tip="lastPublishDatePretty">
					<div class="text-xs mt-1 opacity-75">
						Published <span class="whitespace-nowrap">{{ lastPublishRelative }}</span> ago
					</div>
				</Popper>
			</div>
			<div class="text-center">
				<Popper :tip="downloads.toLocaleString()">
					<div>
						<div class="text-xl">
							<icon-mdi:download class="inline-block text-base" />
							{{ prettyDownloads }}
						</div>
						<div class="text-xs mt-1 opacity-75">
							downloads last month
						</div>
					</div>
				</Popper>
			</div>
		</div>
	</div>
</template>

<style scoped>
td {
	@apply
		p-y-8
		align-top;
}
</style>
