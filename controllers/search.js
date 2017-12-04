const {search} = require('@financial-times/n-es-client');
const Item = require('../lib/item');
const queryToES = require('../lib/query-to-es');

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
