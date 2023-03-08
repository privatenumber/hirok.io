import MarkdownIt from 'markdown-it'; // eslint-disable-line import/no-extraneous-dependencies
import Token from 'markdown-it/lib/token.js'; // eslint-disable-line import/no-extraneous-dependencies

type Options = {
	linkTag: string;
};

export const LinkComponent = (
	md: MarkdownIt,
	{ linkTag }: Options,
) => {
	const defaultRenderer = (
		tokens,
		index,
		options,
		env,
		self,
	) => self.renderToken(tokens, index, options);
	const getRenderer = (name: string) => md.renderer.rules[name] ?? defaultRenderer;
	const setRenderer = (
		name: string,
		callback: (token: Token) => void,
	) => {
		const renderer = getRenderer(name);
		md.renderer.rules[name] = (tokens, index, options, env, self) => {
			callback(tokens[index]);
			return renderer(tokens, index, options, env, self);
		};
	};

	// TODO: Move out
	setRenderer('heading_open', (token) => {
		if (!token.attrs) {
			token.attrs = [];
		}
		token.attrs.push(['class', `${token.tag}-styles`]);
	});

	setRenderer('link_open', (token) => {
		token.tag = linkTag;
	});
	setRenderer('link_close', (token) => {
		token.tag = linkTag;
	});
};
