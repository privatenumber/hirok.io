<script setup lang="ts">
import { formatDate } from '@/utils/format-date';

const props = defineProps<{
	frontmatter: {
		title?: string;
		subtitle?: string;
		heading?: boolean;
		date?: string;
		duration?: string;
		link?: {
			href?: string;
			media?: string;
			rel?: string;
		}[];
	};
}>();

const route = useRoute();
const isBlogPost = computed(() => props.frontmatter.date);
const heading = computed(() => props.frontmatter.heading ?? props.frontmatter.title);
const article = ref<HTMLElement>();

const { scrollMarginTop } = useCssModule();

onMounted(() => {
	const { innerHeight: windowHeight } = window;
	const pageHeight = document.body.offsetHeight;

	// If page is shorter than double the screen size, disable
	if (pageHeight < windowHeight * 2) {
		return;
	}

	const lastPage = pageHeight - windowHeight;

	// Add scroll margin to anchors on last page
	article.value!.querySelectorAll('[id]').forEach((anchor) => {
		if ((anchor as HTMLElement).offsetTop > lastPage) {
			anchor.classList.add(scrollMarginTop);
		}
	});
});

useHead({
	meta: [{
		property: 'og:type',
		content: 'article',
	}],
});

if (props.frontmatter.title) {
	useHead({
		title: `${props.frontmatter.title} | Hiroki Osame`,
		meta: [{
			property: 'og:title',
			content: props.frontmatter.title,
		}],
	});
}

if (props.frontmatter.subtitle) {
	useHead({
		meta: [
			{
				property: 'description',
				content: props.frontmatter.subtitle,
			},
			{
				property: 'og:description',
				content: props.frontmatter.subtitle,
			},
		],
	});
}

if (props.frontmatter.link) {
	useHead({
		link: props.frontmatter.link,
	});
}
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
			<span
				:title="formatDate(frontmatter.date!, true)"
			>
				{{ formatDate(frontmatter.date!) }}
			</span>
			<span v-if="frontmatter.duration">
				· {{ frontmatter.duration }}
			</span>
		</p>
		<p
			v-if="frontmatter.subtitle"
			class="opacity-70 italic text-lg"
		>
			{{ frontmatter.subtitle }}
		</p>
	</div>
	<article
		ref="article"
		class="prose m-auto"
	>
		<slot />
	</article>

	<div
		v-if="isBlogPost"
		class="prose m-auto mt-20"
	>
		<hr>

		<div class="flex gap-8 items-center justify-center">
			<AppLink
				to="/"
				class="min-w-fit"
			>
				<img
					src="/hiroki.webp"
					class="h-28 rounded-full"
				>
			</AppLink>
			<div>
				<div class="text-xl font-medium">
					Thanks for reading! Hope you'll stick around.
				</div>
				<div class="mt-2">
					— Hiroki Osame
				</div>
				<div class="mt-1 opacity-70">
					Open source Engineer. Living in Tokyo. Working at Square.
				</div>

				<div class="mt-8 flex flex-col sm:flex-row gap-2">
					<Button
						href="https://twitter.com/privatenumbr"
						size="small"
					>
						<icon-mdi-twitter /> Follow @privatenumbr
					</Button>
					<Button
						href="https://github.com/sponsors/privatenumber"
						size="small"
						variant="custom"
						class="bg-rose-500 border-rose-500 hover:bg-rose-600"
					>
						<icon-mdi-heart /> Buy me a coffee
					</Button>

				</div>
			</div>
		</div>

		<div class="mt-16 flex justify-between text-xs">
			<div>
				<div class="text-sm font-bold">
					Have a question for me?
				</div>
				Reach out via
				<AppLink href="/contact">
					email
				</AppLink>
				or
				<AppLink href="https://twitter.com/privatenumbr">
					Twitter
				</AppLink>
			</div>

			<div>
				<div class="text-sm font-bold">
					Want to propose an edit?
				</div>
				<AppLink
					:href="`https://github.com/privatenumber/hirok.io/blob/master${route.meta.filePath}`"
				>
					Open a pull request
				</AppLink>
			</div>
		</div>
	</div>
</template>

<style module>
.scroll-margin-top {
	scroll-margin-top: 60px;
}
</style>
