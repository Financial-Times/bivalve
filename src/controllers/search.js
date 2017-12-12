// @flow

const {search} = require('@financial-times/n-es-client');
const Item = require('../model/item');
const queryToES = require('../model/query-to-es');
const pickBy = require('lodash.pickby');

type SearchOptions = {
	sort: string,
	outputfields?: Object,
	query: string,
	offset: number,
	limit: number
};

type SearchResult = {
	count: number,
	results: Item[],
	srh: {
		query: string,
		offset: number,
		limit: number
	}
};

module.exports = async ({sort, outputfields, query, offset, limit}: SearchOptions): Promise<SearchResult> => {
	const stream = await search({
		query: queryToES(query),
		size: limit,
		from: offset,
	});

	let fields;
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
