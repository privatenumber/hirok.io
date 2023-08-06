import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import markdown from 'vite-plugin-vue-markdown';
import markdownAnchor from 'markdown-it-anchor';
import Shiki from 'markdown-it-shiki';
import vue from '@vitejs/plugin-vue';
import pages from 'vite-plugin-pages';

import autoImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';
import icons from 'unplugin-icons/vite';
import iconsResolver from 'unplugin-icons/resolver';
import grayMatter from 'gray-matter';
import slugify from '@sindresorhus/slugify';
import generateSitemap from 'vite-ssg-sitemap';
import { LinkComponent, StyleHeadings } from './markdown-it/plugins.js';
import 'vite-ssg'; // For `ssgOptions` types

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
		},
	},
	plugins: [
		vue({
			reactivityTransform: true,
			template: {
				compilerOptions: {
					comments: false,
				},
			},
			include: [
				/\.vue$/,
				/\.md$/,
			],
		}),

		pages({
			extensions: [
				'vue',
				'md',
			],
			extendRoute(route) {
				const routeFilePath = path.join(__dirname, route.component);

				if (routeFilePath.endsWith('.md')) {
					const md = fs.readFileSync(routeFilePath, 'utf8');
					const { data: frontmatter } = grayMatter(md);

					route.meta = Object.assign(
						route.meta ?? {},
						frontmatter,
						{
							filePath: route.component,
						},
					);
				}

				return route;
			},
		}),

		markdown({
			wrapperComponent: 'MarkdownPage',
			markdownItSetup(md) {
				md.use(markdownAnchor, {
					slugify,
					permalink: markdownAnchor.permalink.linkInsideHeader({
						symbol: '#',
						renderAttrs: () => ({ 'aria-hidden': 'true' }),
					}),
				});

				// Set AppLink component to all links
				md.use(LinkComponent, {
					linkTag: 'AppLink',
				});

				md.use(StyleHeadings);

				md.use(Shiki, {
					theme: 'nord',
				});
			},
		}),

		autoImport({
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.vue$/,
				/\.vue\?vue/, // .vue
				/\.md$/, // .md
			],
			imports: [
				'vue',
				'vue-router',
				'@vueuse/core',
				'@vueuse/head',
			],
			dts: 'src/@types/unplugin-auto-import.d.ts',
		}),

		components({
			include: [
				/\.vue($|\?vue)/,
				/\.md($|\?vue)/,
			],
			dts: 'src/@types/unplugin-vue-components.d.ts',
			resolvers: [
				iconsResolver({
					prefix: 'icon',
				}),
			],
		}),

		icons(),
	],
	ssgOptions: {
		script: 'defer',
		formatting: 'minify',
		onFinished() {
			generateSitemap({
				hostname: 'https://hirok.io/',
			});
		},
	},
});
