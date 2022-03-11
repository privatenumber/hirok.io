<script setup lang='ts'>
import { formatDate } from '../utils/format-date';

const props = defineProps<{
	frontmatter: {
		title?: string;
		subtitle?: string;
		heading?: boolean;
		date?: string;
		duration?: string;
	};
}>();

const route = useRoute();
const isBlogPost = computed(() => props.frontmatter.date);
const heading = computed(() => props.frontmatter.heading ?? props.frontmatter.title);
</script>

<template>
	<div
		v-if="heading"
		class="prose m-auto mb-8"
	>
		<h1>
			{{ heading }}
		</h1>
		<p
			v-if="isBlogPost"
			class="opacity-80 text-lg"
		>
			{{ formatDate(props.frontmatter.date!) }}
			<span v-if="props.frontmatter.duration">
				· {{ props.frontmatter.duration }}
			</span>
		</p>
		<p
			v-if="props.frontmatter.subtitle"
			class="opacity-70 italic text-lg"
		>
			{{ props.frontmatter.subtitle }}
		</p>
	</div>
	<article class="prose m-auto">
		<slot />
	</article>

	<div
		v-if="isBlogPost"
		class="prose m-auto m-t-20"
	>
		<hr>

		<div class="flex gap-8 items-center justify-center">
			<router-link to="/">
				<img
					src="/profile-square.png"
					class="min-w-30 h-30 rounded-50"
				>
			</router-link>
			<div>
				<div class="text-xl font-medium">
					Thanks for reading! Hope you'll stick around.
				</div>
				<div class="m-t-2">
					— Hiroki Osame
				</div>
				<div class="m-t-1 opacity-70">
					Open source Engineer. Living in NYC. Working at Square.
				</div>
			</div>
		</div>

		<div class="m-t-15 flex justify-between text-xs">
			<div>
				<div class="text-sm font-bold">
					Have a question for me?
				</div>
				Reach out on
				<ExternalLink href="https://twitter.com/privatenumbr">
					Twitter
				</ExternalLink>
				or
				<ExternalLink href="https://github.com/privatenumber/hirok.io/discussions">
					GitHub
				</ExternalLink>
			</div>

			<div>
				<div class="text-sm font-bold">
					Want to propose an edit?
				</div>
				<ExternalLink
					:href="`https://github.com/privatenumber/hirok.io/blob/master${route.meta.filePath}`"
				>
					Open a pull request
				</ExternalLink>
			</div>
		</div>
	</div>
</template>
