<script setup lang="ts">
import { useRouter, type RouteRecordNormalized } from 'vue-router';
import { formatDate } from '../utils/format-date';

type Frontmatter = {
	title?: string;
	date: Date;
	duration?: string;
}

const isPublishedPost = (
	route: RouteRecordNormalized,
): route is RouteRecordNormalized & { meta: Frontmatter } => Boolean(
	route.path.startsWith('/posts')
	&& (route.meta as Frontmatter).date,
);

const postRoutes = useRouter().getRoutes()
	.filter(isPublishedPost)
	.map((route) => {
		route.meta.date = new Date(route.meta.date);
		return route;
	})
	.sort(
		(a, b) => b.meta.date.getTime() - a.meta.date.getTime(),
	);
</script>

<template>
	<ul class="post-list">
		<li
			v-for="route in postRoutes"
			:key="route.path"
		>
			<router-link
				:key="route.path"
				class="post-link"
				:to="route.path"
			>
				<div class="flex justify-between items-center">
					<div>
						<span class="title text-lg font-medium">
							{{ route.meta.title }}
						</span>
						<span
							v-if="route.meta.duration"
							class="opacity-60"
						>
							· {{ route.meta.duration }}
						</span>
					</div>

					<div class="time">
						{{ formatDate(route.meta.date) }}
					</div>
				</div>
				<div class="opacity-70">
					{{ route.meta.subtitle }}
				</div>
			</router-link>
		</li>
	</ul>
</template>

<style scoped>
.post-list {
	@apply
		m-0
		p-0
		list-none;
}

.post-link {
	@apply
		block
		no-underline
		m-y-4
		p-y-4
		p-x-4
		rounded
		color-gray-800
		dark:color-zinc-300
		transition
		duration-100;
}

.post-link:hover {
	@apply
		shadow-border
		shadow-sky-600;
}

.post-link:hover .title {
	@apply
		color-sky-500;
}

</style>
