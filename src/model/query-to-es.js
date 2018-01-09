// @flow

const FASTFT_STREAM_ID = require('./stream-id');

import type {ESQuery} from '@financial-times/n-es-client';

const boolQuery = queries => ({
	bool: {
		must: queries
	}
});

const parseQuery = types => (query: string = ''): ESQuery => {
	const [type, id] = query.split(':');

	if(types[type]) {
		return boolQuery([
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
