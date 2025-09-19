import { Marked } from 'marked';
import markedAlert from 'marked-alert';
import { baseUrl } from 'marked-base-url';
import markedBidi from 'marked-bidi';
import { markedEmoji } from 'marked-emoji';
import markedFootnote from 'marked-footnote';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import emojis from '../data/emojis.json';
import type { Toc } from '$lib/types';

const marked = new Marked({
	async: true,
	gfm: true,
	silent: true
});

const langs: Record<string, string> = {
	svelte: 'html'
};

marked.use(
	markedAlert(),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(markedBidi as () => any)(),
	markedEmoji({
		emojis,
		renderer: (token) => {
			if (token.emoji.startsWith('http'))
				return `<img alt="${token.name}" src="${token.emoji}" class="marked-emoji-img" data-nopreview>`;
			return `<span class="marked-emoji">${token.emoji}</span>`;
		}
	}),
	markedFootnote(),
	gfmHeadingId(),
	markedHighlight({
		highlight: (code, lang) => {
			lang = langs[lang] || lang;
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	})
);

export async function md(text: string, base?: string): Promise<[string, Toc[]]> {
	const html = await marked
		.use(baseUrl(base || '/'))
		// eslint-disable-next-line no-misleading-character-class
		.parse(text.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''));

	const toc = [];
	const regex = /<h([1-6]) id="(.*?)".*?>(.*?)<\/h\1>/g;
	let match;
	while ((match = regex.exec(html)) !== null) {
		toc.push({ level: parseInt(match[1]), id: match[2], title: match[3].replace(/<[^>]+>/g, '') });
	}

	return [html, toc];
}
