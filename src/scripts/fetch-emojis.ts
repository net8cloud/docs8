import { writeFileSync } from 'fs';
import path from 'path';

function toUnicode(str: string) {
	return str
		.split('-')
		.map((char) => String.fromCodePoint(parseInt(char, 16)))
		.join('');
}

fetch('https://api.github.com/emojis').then(async (response) => {
	const ghEmojis = await response.json();
	const emojisArr = Object.keys(ghEmojis).map((name) => {
		const ghEmoji = ghEmojis[name];
		if (ghEmoji.includes('unicode'))
			return {
				key: name,
				value: toUnicode(ghEmoji.replace(/(.*\/)|(\..*)/g, ''))
			};
		return {
			key: name,
			value: ghEmoji
		};
	});
	const emojis = emojisArr.reduce(
		(acc, { key, value }) => {
			acc[key] = value;
			return acc;
		},
		{} as Record<string, string>
	);
	writeFileSync(path.resolve('./src/data/emojis.json'), JSON.stringify(emojis));
});
