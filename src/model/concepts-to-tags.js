// @flow

import type {FtItem} from '@financial-times/n-flow-ft-content';

const FASTFT_STREAM_ID = require('./stream-id');

export type Tag = {
	tag?: string,
	id?: string,
	query?: string
};

// extract the type of Annotation in `type FtItem = { annotations?: Annotation[] }`
type Annotation = $ElementType<
	$NonMaybeType<
		$PropertyType<FtItem, 'annotations'>
	>,
	number
>;

const conceptsToTags = (concepts: Annotation[] = []): Tag[] =>
	concepts
		.filter(concept => concept.id !== FASTFT_STREAM_ID)
		.map(concept => ({
			tag: concept.prefLabel,
			id: concept.id,
			query: concept.id && `concept:${concept.id}`,
		}));

module.exports = conceptsToTags;
