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

const isBlogPost = computed(() => props.frontmatter.date);
const heading = computed(() => props.frontmatter.heading ?? props.frontmatter.title);
const article = ref<HTMLElement>();

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
			anchor.classList.add('scroll-mt-1.5');
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

	<BlogPostFooter
		v-if="isBlogPost"
	/>
</template>
