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

		<div class="flex justify-between text-xs">
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
					Want to propse an edit?
				</div>
				<ExternalLink
					:href="`https://github.com/privatenumber/hirok.io${route.meta.filePath}`"
				>
					Open a pull request
				</ExternalLink>
			</div>
		</div>
	</div>
</template>
