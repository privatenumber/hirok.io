import MarkdownIt from 'markdown-it'; // eslint-disable-line import/no-extraneous-dependencies
import Token from 'markdown-it/lib/token.js'; // eslint-disable-line import/no-extraneous-dependencies

type Options = {
	linkTag: string;
};

type DefaultRenderer = NonNullable<MarkdownIt['renderer']['rules'][string]>;

const defaultRenderer: DefaultRenderer = (
	tokens,
	index,
	options,
	env,
	self,
) => self.renderToken(tokens, index, options);

const getRenderer = (md: MarkdownIt, name: string) => md.renderer.rules[name] ?? defaultRenderer;
const setRenderer = (
	md: MarkdownIt,
	name: string,
	callback: (token: Token) => void,
) => {
	const renderer = getRenderer(md, name);
	md.renderer.rules[name] = (tokens, index, options, env, self) => {
		callback(tokens[index]);
		return renderer(tokens, index, options, env, self);
	};
};

export const LinkComponent = (
	md: MarkdownIt,
	{ linkTag }: Options,
) => {
	setRenderer(md, 'link_open', (token) => {
		token.tag = linkTag;
	});
	setRenderer(md, 'link_close', (token) => {
		token.tag = linkTag;
	});
};

export const StyleHeadings = (
	md: MarkdownIt,
) => {
	setRenderer(md, 'heading_open', (token) => {
		if (!token.attrs) {
			token.attrs = [];
		}
		token.attrs.push(['class', `${token.tag}-styles`]);
	});
};
