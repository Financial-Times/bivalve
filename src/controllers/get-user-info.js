// @flow

import type {GetUserInfo, GetUserInfoResult, Controller} from './types';

const getUserInfoController: Controller<GetUserInfo, GetUserInfoResult> = async () => ({
	id: 1,
	pseudonym: 'Anonymous User',
	timezone: 'Europe/London',
	avatar: 'https://secure.gravatar.com/avatar/beb21939f6a5a1e3b48faa2d5eed358a?d=mm',
	role: 'anonymous',
	searchviews: ['All', 'US', 'Eurozone', 'Asia', 'Economy', 'Companies'].map((term, i) => ({
		id: i + 1,
		offsetlimit: '0,50',
		querydefid: i + 1,
		dateread: {
			date: '2014-01-06 18:05:32.000000',
			timezone_type: 3,
			timezone: 'Europe/London',
		},
		islocked: false,
		isprimary: false,
		perpage: 50,
		query: term === 'All' ? '' : `tag:${term.toLowerCase()}`,
		dispopts: '',
		sort: 'date',
		title: term,
		unreadcount: 0,
		classname: null
	})),
});

module.exports = getUserInfoController;
