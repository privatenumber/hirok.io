<script setup lang="ts">
import { getUnit, shortNumberUnits } from '@/utils/get-unit';
import npmPackages from '@/data/npm-packages.json';

const props = defineProps<{
	name: string;
	url?: string;
}>();

const npmPackage = $computed(() => npmPackages.packages.find(pkg => pkg.name === props.name));

const npmUrl = $computed(() => `https://npm.im/${props.name}`);

const downloads = $computed(() => {
	if (!npmPackage?.downloads) {
		return;
	}

	const [count, unit] = getUnit(npmPackage.downloads, shortNumberUnits, 1);
	return `↓ ${count}${unit}/month`;
});
</script>

<template>
	<div>
		<Heading size="4">
			<template v-if="url ?? npmPackage">
				<AppLink
					class="color-gray-600 dark:color-zinc-200"
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
				{{ downloads }}
			</template>
		</Heading>

		<slot />
	</div>
</template>
