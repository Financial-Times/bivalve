const FASTFT_STREAM_ID = require('./stream-id');

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

module.exports = queryToES;
