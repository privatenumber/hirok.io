import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import markdown from 'vite-plugin-md';
import markdownLinkAttributes from 'markdown-it-link-attributes';
import markdownAnchor from 'markdown-it-anchor';
import Shiki from 'markdown-it-shiki';
import vue from '@vitejs/plugin-vue';
import pages from 'vite-plugin-pages';
import unocss from 'unocss/vite';
import { presetUno } from 'unocss';
import transformerDirective from '@unocss/transformer-directives';
import autoImport from 'unplugin-auto-import/vite'; // eslint-disable-line import/no-unresolved
import components from 'unplugin-vue-components/vite'; // eslint-disable-line import/no-unresolved
import icons from 'unplugin-icons/vite';
import iconsResolver from 'unplugin-icons/resolver';
import grayMatter from 'gray-matter';
import slugify from '@sindresorhus/slugify';
import generateSitemap from 'vite-ssg-sitemap';

export default defineConfig({
	plugins: [
		unocss({
			transformers: [
				transformerDirective(),
			],
			presets: [
				presetUno(),
			],
			theme: {
				boxShadow: {
					border: '0 0 0 2px var(--un-shadow-color)',
				},
			},
		}),

		vue({
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
			pagesDir: 'pages',
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
			headEnabled: true,
			wrapperComponent: 'MarkdownPage',
			markdownItSetup(md) {
				md.use(markdownAnchor, {
					slugify,
					permalink: markdownAnchor.permalink.linkInsideHeader({
						symbol: '#',
						renderAttrs: () => ({ 'aria-hidden': 'true' }),
					}),
				});

				const isExternalLink = /^https?:\/\//;
				md.use(markdownLinkAttributes, {
					matcher: (link: string) => isExternalLink.test(link),
					attrs: {
						target: '_blank',
						rel: 'noopener',
					},
				});

				md.use(Shiki, {
					theme: 'nord',
				});
			},
		}),

		autoImport({
			imports: [
				'vue',
				'vue-router',
				'@vueuse/core',
			],
			dts: 'src/@types/unplugin-auto-import.d.ts',
		}),

		components({
			include: [
				/\.vue$/,
				/\.md$/,
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
		script: 'async',
		formatting: 'minify',
		onFinished() {
			generateSitemap({
				hostname: 'https://hirok.io/',
			});
		},
	},
});
