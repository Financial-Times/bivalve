// @flow

import type {FtItem} from '@financial-times/n-flow-ft-content';

const FASTFT_STREAM_ID = require('./stream-id');

export type Tag = {
	tag?: string,
	id?: string,
	query?: string
};

const conceptsToTags = (concepts: $PropertyType<FtItem, 'annotations'>): Tag[] =>
	(concepts || [])
		.filter(concept => concept.id !== FASTFT_STREAM_ID)
		.map(concept => ({
			tag: concept.prefLabel,
			id: concept.id,
			query: concept.id && `concept:${concept.id}`,
		}));

module.exports = conceptsToTags;
