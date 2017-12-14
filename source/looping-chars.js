/* eslint indent: [ 2, 'tab' ], no-tabs: 0, */

module.exports = function LoopingChars(options = {}) {
	const {
		template = '╠═╬╦╩╝║╚╗╔╬╣',
		showcaseStringLength = template.length,
		shouldRandomizeStartingIndex = true,
		repeatStringsToSlowDownLooping = 19,
		shouldInvertLoopingDirection = false,
	} = options;

	const usedTemplate = template.repeat(Math.ceil((showcaseStringLength - 1) / template.length));

	const allStrings = usedTemplate.split('')
		.map((e, i) => {
			const seg1IdealTailIndex = i + showcaseStringLength;

			const seg1 = usedTemplate.slice(i, seg1IdealTailIndex);
			const seg2 = (seg1IdealTailIndex <= usedTemplate.length) ?
				'' :
				usedTemplate.slice(0, (seg1IdealTailIndex - usedTemplate.length));

			return `${seg1}${seg2}`;
		});

	let currentStringIndex = shouldRandomizeStartingIndex ?
		Math.floor(Math.random() * template.length) :
		0;

	let currentRepeatingCount = shouldRandomizeStartingIndex ?
		Math.floor(Math.random() * repeatStringsToSlowDownLooping) :
		0;

	const allStringsCount = allStrings.length;

	this.getNext = () => {
		const usingString = allStrings[currentStringIndex];
		currentRepeatingCount = (currentRepeatingCount + 1) % repeatStringsToSlowDownLooping;
		if (currentRepeatingCount === 0) {
			let nextIndex = currentStringIndex + (shouldInvertLoopingDirection ? -1 : 1);
			if (nextIndex < 0) {
				nextIndex += allStringsCount;
			}
			currentStringIndex = nextIndex % allStringsCount;
		}
		return usingString;
	};
};
