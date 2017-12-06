const {assert} = require('chai');
const FASTFT_STREAM_ID = require('../../lib/stream-id');

exports['stream id'] = {
	'is the fastft concept id'() {
		assert.equal(FASTFT_STREAM_ID, '5c7592a8-1f0c-11e4-b0cb-b2227cce2b54');
	},
};
