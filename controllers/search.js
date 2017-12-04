const {search} = require('@financial-times/n-es-client');

const FASTFT_STREAM_ID = '5c7592a8-1f0c-11e4-b0cb-b2227cce2b54';

const conceptsToTags = concepts =>
	concepts
		.filter(concept => concept.id !== FASTFT_STREAM_ID)
		.map(concept => ({
			tag: concept.prefLabel,
			id: concept.id,
			query: `concept:${concept.id}`,
		}));

const termQuery = term => ({term});

const boolTermQuery = queries => ({
	bool: {
		must: queries
	}
});

const parseQuery = types => (query = '') => {
	const [type, id] = query.split(':');

	if(types[type]) {
		return boolTermQuery([
			types.default,
			types[type](id),
		]);
	}

	return types.default;
}

const queryToES = parseQuery({
	concept: id => ({
		term: {'annotations.id': id}
	}),

	default: {term: {
		'annotations.id': FASTFT_STREAM_ID
	}}
});

module.exports = async ({sort, outputfields, query, offset, limit, showOriginal}) => {
	const stream = await search({
		query: queryToES(query),
		size: limit,
		from: offset,
	});

	return {
		original: showOriginal && stream,
		count: stream.length,
		results: stream.map(item => new Item(item, {outputfields})),
		srh: { query, offset, limit },
	}
};
