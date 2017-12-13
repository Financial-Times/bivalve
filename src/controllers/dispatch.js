// @flow

import type {Actions, Results, RequestMeta} from './types';

const addQuerySubscriptionController = require('./add-query-subscription');
const getUserInfoController = require('./get-user-info');
const searchController = require('./search');
const testErrorController = require('./test-error');

const exhaustive = (_: empty) => { throw new Error(`No controller ${_}`) };

const dispatch = async (action: Actions, meta: RequestMeta): Promise<Results> => {
	switch(action.action) {
		case 'addQuerySubscription': return addQuerySubscriptionController(action.arguments, meta);
		case 'getUserInfo':          return getUserInfoController(action.arguments, meta);
		case 'search':               return searchController(action.arguments, meta);
		case 'testError':            return testErrorController(action.arguments, meta);
		// assert to flow that we've handled all the actions we support, and error at runtime for other actions
		default:                     exhaustive(action.action);
	}
}

module.exports = dispatch;
