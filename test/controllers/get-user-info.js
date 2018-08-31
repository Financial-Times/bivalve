const {assert} = require('chai');
const sinon = require('sinon');
const makeControllerMeta = require('../../test-util/make-controller-meta');

const getUserInfo = require('../../lib/controllers/get-user-info');

exports['getUserInfo controller'] = {
	async 'should return dummy data'() {
		assert.deepEqual(
			await getUserInfo(
				[],
				makeControllerMeta()
			),
			{
				id: 1,
				pseudonym: 'Anonymous User',
				timezone: 'Europe/London',
				avatar: 'https://secure.gravatar.com/avatar/beb21939f6a5a1e3b48faa2d5eed358a?d=mm',
				role: 'anonymous',
				searchviews: [{
					id: 1,
					offsetlimit: '0,50',
					querydefid: 1,
					dateread: {
						date: '2014-01-06 18:05:32.000000',
						timezone_type: 3,
						timezone: 'Europe/London'
					},
					islocked: false,
					isprimary: true,
					perpage: 50,
					query: '',
					dispopts: '',
					sort: 'date',
					title: 'All',
					unreadcount: 0,
					classname: null
				}],
			},
		);
	},

	async 'should set cache-control header to one day'() {
		const meta = makeControllerMeta();
		await getUserInfo([], meta);

		sinon.assert.calledWith(
			meta.res.setHeader,
			'cache-control',
			'public, max-age=86400, must-revalidate, no-transform'
		);
	},
};
