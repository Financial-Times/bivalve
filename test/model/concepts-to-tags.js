const {assert} = require('chai');
const conceptsToTags = require('../../lib/model/concepts-to-tags');
const FASTFT_STREAM_ID = require('../../lib/model/stream-id');

exports['conceptsToTags'] = {
	'shouldn\'t care about no arguments'() {
		assert.deepEqual(conceptsToTags(), []);
	},

	'should turn ES-annotation-like objects into clamo-like tags'() {
		assert.deepEqual(
			conceptsToTags(
				[
					{prefLabel: 'Topic', id: 'ffffffff-ffff-ffff-ffff-ffffffffffff'},
					{prefLabel: 'Topic 2', id: 'ffffffff-ffff-ffff-ffff-fffffffffff0'},
				]
			),
			[
				{
					tag: 'Topic',
					id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
					query: 'concept:ffffffff-ffff-ffff-ffff-ffffffffffff'
				},
				{
					tag: 'Topic 2',
					id: 'ffffffff-ffff-ffff-ffff-fffffffffff0',
					query: 'concept:ffffffff-ffff-ffff-ffff-fffffffffff0'
				},
			]
		)
	},

	'should skip fastFT annotations'() {
		assert.deepEqual(
			conceptsToTags(
				[
					{prefLabel: 'Topic', id: 'ffffffff-ffff-ffff-ffff-ffffffffffff'},
					{prefLabel: 'fastFT', id: FASTFT_STREAM_ID},
				]
			),
			[
				{
					tag: 'Topic',
					id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
					query: 'concept:ffffffff-ffff-ffff-ffff-ffffffffffff'
				},
			]
		)
	},
};
