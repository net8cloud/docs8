import { Marked } from 'marked';
const marked = new Marked({
	async: true
});

export async function md(text: string): Promise<string> {
	const html = await marked.parse(text);
	return html;
}
