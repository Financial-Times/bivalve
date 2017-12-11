// @flow

import type {FtItem} from '@financial-times/n-flow-ft-content';

const FASTFT_STREAM_ID = require('./stream-id');

export type Tag = {
	tag?: string,
	id?: string,
	query?: string
};

type $ArrayElementType<T> = $ElementType<T, number>;
type Annotation = $ArrayElementType<
	$NonMaybeType<
		$PropertyType<FtItem, 'annotations'>
	>
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
