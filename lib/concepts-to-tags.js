const FASTFT_STREAM_ID = require('./stream-id');

const conceptsToTags = concepts =>
	concepts
		.filter(concept => concept.id !== FASTFT_STREAM_ID)
		.map(concept => ({
			tag: concept.prefLabel,
			id: concept.id,
			query: `concept:${concept.id}`,
		}));

module.exports = conceptsToTags;
