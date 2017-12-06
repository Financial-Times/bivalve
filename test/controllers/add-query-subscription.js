const {assert} = require('chai');
const addQuerySubscription = require('../../controllers/add-query-subscription');

exports['addQuerySubscription controller'] = {
	async 'should return dummy data'() {
		assert.deepEqual(
			await addQuerySubscription(),
			{
				queryid: 1,
				channel: 'blogs.blog-335.all-posts',
				appkey:'00960339489d6e143949'
			}
		);
	},
};
