const {assert} = require('chai');
const queryToES = require('../../lib/model/query-to-es');
const FASTFT_STREAM_ID = require('../../lib/model/stream-id');

exports['queryToES'] = {
	'should return term query for fastft id with no arguments'() {
		assert.deepEqual(
			queryToES(),
			{term: {
				'annotations.id': FASTFT_STREAM_ID,
			}},
		);
	},

	'bool query': {
		'should use term query for concept id extracted from search'() {
			const concept = 'ffffffff-ffff-ffff-ffff-ffffffffffff';
			assert.deepEqual(
				queryToES(`concept:${concept}`),
				{bool: {
					must: [
						{term: {
							'annotations.id': FASTFT_STREAM_ID,
						}},
						{term: {
							'annotations.id': concept,
						}},
					],
				}}
			);
		}
	},
};
