// @flow

import type {AddQuerySubscription, AddQuerySubscriptionResult, Controller, RequestMeta} from './types';

const addQuerySubscriptionController: Controller<
	AddQuerySubscription,
	AddQuerySubscriptionResult
> = async (args, {res}) => {
	res.setHeader('cache-control', 'public, max-age=86400, must-revalidate, no-transform');

	return {
		queryid: 1,
		channel: 'blogs.blog-335.all-posts',
		appkey:'00960339489d6e143949',
	};
};

module.exports = addQuerySubscriptionController;
