const {assert} = require('chai');
const sinon = require('sinon');
const makeControllerMeta = require('../../test-util/make-controller-meta');

const addQuerySubscription = require('../../lib/controllers/add-query-subscription');

exports['addQuerySubscription controller'] = {
	async 'should return dummy data'() {
		assert.deepEqual(
			await addQuerySubscription(
				[],
				makeControllerMeta(),
			),
			{
				queryid: 1,
				channel: 'blogs.blog-335.all-posts',
				appkey:'00960339489d6e143949'
			}
		);
	},

	async 'should set cache-control header to one day'() {
		const meta = makeControllerMeta();
		await addQuerySubscription([], meta);

		sinon.assert.calledWith(
			meta.res.setHeader,
			'cache-control',
			'public, max-age=86400, must-revalidate, no-transform'
		);
	},
};
