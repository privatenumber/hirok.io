<script setup lang="ts">
import markdownit from 'markdown-it';
import { LinkComponent } from '../../markdown-it/link-component';

const markdown = markdownit().use(LinkComponent, {
	linkTag: 'AppLink',
});

type Project = {
	name: string;
	npm: string | false;
	description: string;
	category: string;
	repoUrl: string;
	featured?: true;
};

const props = defineProps<{
	projects: Project[];
}>();

// const featuredProjects = computed(
// 	() => props.projects.filter(
// 		(project) => project.featured,
// 	),
// );

const categoriesByCategory = computed(() => {
	const categories = new Map<string, Project[]>();

	for (const project of props.projects) {
		let projects = categories.get(project.category);

		if (!projects) {
			projects = [];
			categories.set(project.category, projects);
		}

		projects.push(project);
	}

	return categories;
});
</script>

<template>
	<h2>All projects</h2>

	<template
		v-for="[categoryName, projects] in categoriesByCategory"
		:key="categoryName"
	>
		<h3>
			{{ categoryName }}
		</h3>
		<ul class="list">
			<li
				v-for="project in projects"
				:key="project.name"
			>
				<a
					class="project-link"
					:href="project.repoUrl"
					target="_blank"
					rel="noopener"
				>
					<div class="project-name">
						{{ project.name }}
					</div>

					<div class="right">
						<a
							:href="`https://www.npmjs.com/package/${project.npm}`"
							target="_blank"
							rel="noopener"
						>
							<img
								v-if="project.npm"
								:src="`https://badgen.net/npm/dm/${project.npm}`"
							>
						</a>
					</div>
					<div
						class="project-description"
						v-html="markdown.render(project.description)"
					/>
				</a>
			</li>
		</ul>
	</template>
</template>

<style scoped>
.list {
	@apply
		m-0
		p-0
		list-none;
}

.project-link {
	@apply
		flex
		flex-wrap
		justify-between
		no-underline
		m-y-2
		p-y-2
		rounded
		color-gray-800
		dark:color-zinc-300
		transition
		duration-100;
}

.project-name {
	@apply
		font-medium
		text-lg
		;
}

.project-link:hover .project-name {
	@apply
		color-sky-600;
}

.project-description {
	@apply
		w-full
		opacity-80;
}

</style>
