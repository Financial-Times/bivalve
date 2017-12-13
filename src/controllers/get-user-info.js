// @flow

import type {GetUserInfo, GetUserInfoResult, Controller} from './types';

const getUserInfoController: Controller<GetUserInfo, GetUserInfoResult> = async (args, {res}) => {
	res.setHeader('cache-control', 'public, max-age=86400, must-revalidate, no-transform');

	return {
		id: 1,
		pseudonym: 'Anonymous User',
		timezone: 'Europe/London',
		avatar: 'https://secure.gravatar.com/avatar/beb21939f6a5a1e3b48faa2d5eed358a?d=mm',
		role: 'anonymous',
		searchviews: [],
	};
};

module.exports = getUserInfoController;
