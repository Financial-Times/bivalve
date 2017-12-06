const {assert} = require('chai');
const testError = require('../../controllers/test-error');

exports['testError controller'] = {
	async 'should throw an error for debugging purposes'() {
		assert.throws(
			testError,
			/error test/
		);
	},
};
