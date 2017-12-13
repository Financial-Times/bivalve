// @flow

import type {AddQuerySubscription, AddQuerySubscriptionResult, Controller, RequestMeta} from './types';

const addQuerySubscriptionController: Controller<AddQuerySubscription, AddQuerySubscriptionResult> = async (args, meta) => ({
	queryid: 1,
	channel: 'blogs.blog-335.all-posts',
	appkey:'00960339489d6e143949'
});

module.exports = addQuerySubscriptionController;
