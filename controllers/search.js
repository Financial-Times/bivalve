const {search} = require('@financial-times/n-es-client');
const pick = require('lodash.pick');

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

class ResultMapper {
	constructor(data, options = {}) {
		this._data = data;
		this._fields = options.outputfields || this._defaultFields();
	}

	_defaultFields() {
		return Object.getOwnPropertyNames(
			this.constructor.prototype
		).filter(name =>
			!name.startsWith('_') && name !== 'constructor'
		);
	}

	toJSON() {
		return pick(this, this._fields);
	}
}

class Item extends ResultMapper {
	get id() {
		return this._data.id;
	}

	get abstract() {
		return this._data.openingHTML;
	}

	get content() {
		return this._data.bodyHTML;
	}

	get attachments() {
		return [];
	}

	get currentversion() {
		return 1;
	}

	get issticky() {
		return false;
	}

	get datepublished() {
		return new Date(this._data.publishedDate).getTime() / 1000;
	}

	get metadata() {
		return {
			primarytagid: this._data.displayConcept.id === FASTFT_STREAM_ID ? void(0) : this._data.displayConcept.id,
		};
	}

	get shorturl() {
		return this._data.webUrl;
	}

	get sortval() {
		return this.datepublished.toString();
	}

	get status() {
		return 'live';
	}

	get tags() {
		return conceptsToTags(this._data.annotations);
	}

	get title() {
		return this._data.title;
	}

	get url() {
		return this._data.webUrl;
	}

	get uuidv3() {
		return this._data.id;
	}
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
