<script setup lang="ts">
import { getUnit, shortNumberUnits } from '@/utils/get-unit';
import npmDownloads from '@/data/npm-downloads.json';

const props = defineProps<{
	name: string;
	url?: string;
}>();

const npmPackage = computed(() => npmDownloads.packages.find(pkg => pkg.name === props.name));

const npmUrl = computed(() => `https://npm.im/${props.name}`);

const downloads = computed(() => {
	const npmPackageValue = npmPackage.value;
	if (!npmPackageValue) {
		return;
	}

	const lastMonthKey = npmDownloads.lastMonth[0] as keyof typeof npmPackageValue.downloads;
	const lastMonthDownloads = npmPackageValue.downloads[lastMonthKey] ?? 0;
	const [count, unit] = getUnit(lastMonthDownloads, shortNumberUnits, 1);
	return `${count}${unit}/month`;
});
</script>

<template>
	<div>
		<Heading size="4">
			<template v-if="url ?? npmPackage">
				<AppLink
					class="text-gray-600 dark:text-zinc-200"
					:href="url ?? npmUrl"
				>
					{{ name }}
				</AppLink>
			</template>
			<template v-else>
				{{ name }}
			</template>

			<template
				v-if="downloads"
				#annotation
			>
				<icon-mdi:download class="inline-block text-sm mb--0.5" />
				{{ downloads }}
			</template>
		</Heading>

		<slot />
	</div>
</template>
