import fs from 'fs/promises';
import path from 'path';
import { Feed, type Item } from 'feed';
import grayMatter from 'gray-matter';

const link = 'https://hirok.io';
const feed = new Feed({
	id: link,
	title: 'Hiroki Osame',
	author: {
		name: 'Hiroki Osame',
		link,
	},
	link,
	copyright: 'CC BY-NC-SA 4.0',
	feedLinks: {
		json: '/feed.json',
		atom: '/feed.atom',
		rss: '/feed.xml',
	},
});

const postsDirectoryPath = './pages/posts';

const postFiles = await fs.readdir(postsDirectoryPath);
const feedItems: Item[] = [];

await Promise.all(postFiles.map(async (fileName) => {
	if (fileName === 'index.md' || !fileName.endsWith('.md')) {
		return;
	}

	const content = await fs.readFile(path.join(postsDirectoryPath, fileName));
	const { data: frontmatter } = grayMatter(content);

	if (!frontmatter.date) {
		return;
	}

	feedItems.push({
		title: frontmatter.title,
		link: `/posts/${fileName.replace('.md', '')}`,
		date: frontmatter.date,
		description: frontmatter.description,
	});
}));

feedItems
	.sort((a, b) => b.date.getTime() - a.date.getTime())
	.forEach(item => feed.addItem(item));

await Promise.all([
	fs.writeFile('./dist/feed.xml', feed.rss2(), 'utf8'),
	fs.writeFile('./dist/feed.atom', feed.atom1(), 'utf8'),
	fs.writeFile('./dist/feed.json', feed.json1(), 'utf8'),
]);
