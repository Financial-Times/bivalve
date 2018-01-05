// @flow

import type Item from '../model/item';
import type {IncomingMessage, ServerResponse} from 'http';

export type AddQuerySubscription = {
	action: 'addQuerySubscription',
	arguments: {||},
}

export type AddQuerySubscriptionResult = {
	queryid: number,
	channel: string,
	appkey: string,
};

export type GetUserInfo = {
	action: 'getUserInfo',
	arguments: {||},
}

// let flow infer this type, because it'd be huge and it's just passed straight back
export type GetUserInfoResult = *;

export type Search = {
	action: 'search',
	arguments: {
		sort: string,
		outputfields?: Object,
		query: string,
		offset: number,
		limit: number,
	},
};

export type SearchResult = {|
	count: number,
	results: Item[],
	srh: {
		query: string,
		offset: number,
		limit: number
	},
|};

export type TestError = {
	action: 'testError',
	arguments: {||},
};

export type TestErrorResult = *;

export type GetArticle = {
	action: 'getArticle',
	arguments: {
		uuid: string,
	},
};

export type GetArticleResult = Item;

export type Actions =
	| AddQuerySubscription
	| GetUserInfo
	| Search
	| TestError
	| GetArticle;

export type Results =
	| AddQuerySubscriptionResult
	| GetUserInfoResult
	| SearchResult
	| TestErrorResult
	| GetArticleResult;

export type RequestMeta = {
	req: IncomingMessage,
	res: ServerResponse,
};

type ErrorSummary = {
	status: 'error',
	error: Error,
};

type SuccessSummary<R: Results> = {
	status: 'ok',
	data: R,
};

export type ResultSummary<R: Results> =
	| SuccessSummary<R>
	| ErrorSummary;

export type ResultCollation<R: Results> = {
	status: string,
	[string]: ResultSummary<R>,
};

export type Controller<A: Actions, R: Results> = ($PropertyType<A, 'arguments'>, RequestMeta) => Promise<R>;
