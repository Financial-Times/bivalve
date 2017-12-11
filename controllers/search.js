const {search} = require('@financial-times/n-es-client');
const Item = require('../lib/item');
const queryToES = require('../lib/query-to-es');
const pickBy = require('lodash.pickby');

module.exports = async ({sort, outputfields, query, offset, limit, showOriginal}) => {
	const stream = await search({
		query: queryToES(query),
		size: limit,
		from: offset,
	});

	let fields = null;
	if(outputfields) {
		outputfields.sortval = true;
		fields = Object.keys(pickBy(outputfields));
	}

	return {
		count: stream.length,
		results: stream.map(item => new Item(item, {fields})),
		srh: { query, offset, limit },
	}
};
