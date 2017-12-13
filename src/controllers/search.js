// @flow

const {search} = require('@financial-times/n-es-client');
const Item = require('../model/item');
const queryToES = require('../model/query-to-es');
const pickBy = require('lodash.pickby');

import type {Search, SearchResult, Controller} from './types';

const searchController: Controller<Search, SearchResult> = async ({sort, outputfields, query, offset, limit}, {res}) => {
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

	res.setHeader('cache-control', 'public, max-age=120, must-revalidate, no-transform');

	return {
		count: stream.length,
		results: stream.map(item => new Item(item, {fields})),
		srh: { query, offset, limit },
	}
};

module.exports = searchController;
