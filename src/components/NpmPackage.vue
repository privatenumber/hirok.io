<script setup lang="ts">
import { getUnit, timeUnits, shortNumberUnits } from '@/utils/get-unit';
import githubStars from '@/data/github-stars.json';
import npmDownloads from '@/data/npm-downloads.json';

const props = defineProps<{
	name: string;
	description: string;
	repository: string | undefined;
	latestVersion: string;
	lastPublishDate: string;
	downloads: Record<string, number>;
}>();

if (!props.repository) {
	console.warn(`No repository URL provided for ${props.name}`);
}

const npmUrl = computed(() => `https://www.npmjs.com/package/${props.name}`);
const repoStars = computed(() => {
	const repo = props.repository
		? props.repository
			.replace('https://github.com/', '')
			.replace('hirokiosame', 'privatenumber')
		: `privatenumber/${props.name}`;
	const stars = githubStars.repositories[repo as keyof typeof githubStars.repositories];

	if (stars === undefined) {
		console.warn(`No stars found for ${repo} ${props.repository ?? ''}`);
		return 0;
	}

	return stars;
});

const repoStarsPretty = computed(() => {
	const [value, unit] = getUnit(repoStars.value, shortNumberUnits, 1);
	return `${value}${unit ?? ''}`;
});

const repositoryUrl = computed(() => props.repository ?? `https://github.com/privatenumber/${props.name}`);
const searchUrl = computed(() => `https://github.com/search?type=code&q=path%3A%2Fpackage.json%24%2F+%22%5C%22${props.name}%5C%22%3A%22`);

const [lastMonthKey] = npmDownloads.lastMonth;

const lastMonthDownloads = computed(() => props.downloads[lastMonthKey] ?? 0);

const lastMonthDownloadsPretty = computed(
	() => {
		const [value, unit] = getUnit(lastMonthDownloads.value, shortNumberUnits, 1)!;
		return `${value % 1 === 0 ? value : value.toFixed(1)} ${unit ?? ''}`;
	},
);

const downloadsChartData = Object.entries(props.downloads)
	.sort((a, b) => a[0].localeCompare(b[0]))
	.map(([, downloads]) => downloads)
	.slice(-12);

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

		<div
			class="
			relative
					basis-full
					md:basis-2/3
					mt-4
					md:mt-0
			"
		>
			<CssChart
				:data="downloadsChartData"
				class="
					absolute
					top-0
					bottom-0
					left-0
					right-0
					-z-1
				"
			/>
			<div
				class="
					h-full
					flex
					gap-4
					px-2
					justify-between
					bg-white/50
					dark:bg-zinc-900/50
				"
			>
				<div class="text-center">
					<div class="text-xl">
						v{{ latestVersion }}
					</div>
					<Popper :tip="lastPublishDatePretty">
						<div class="text-xs mt-1 opacity-80">
							Published <span class="whitespace-nowrap">{{ lastPublishRelative }}</span> ago
						</div>
					</Popper>
				</div>
				<div class="text-center">
					<Popper :tip="repoStars.toLocaleString()">
						<div>
							<div class="text-xl whitespace-nowrap">
								<icon-mdi:star class="inline-block text-base mb-1" />
								<span class="ml-1">
									{{ repoStarsPretty }}
								</span>
							</div>
							<div class="text-xs mt-1 opacity-80">
								GitHub Stars
							</div>
						</div>
					</Popper>
				</div>
				<div class="text-center">
					<Popper :tip="lastMonthDownloads.toLocaleString()">
						<div>
							<div class="text-xl whitespace-nowrap">
								<icon-mdi:download class="inline-block text-base" />
								{{ lastMonthDownloadsPretty }}
							</div>
							<div class="text-xs mt-1 opacity-80">
								downloads last month
							</div>
						</div>
					</Popper>
				</div>
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

.css-chart {
	width: 100px;
}
</style>
