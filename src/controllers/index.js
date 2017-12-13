// @flow

const collateResults = require('./collate-results');
const resultSummary = require('./result-summary');
const dispatch = require('./dispatch');

import type {Actions, ResultCollation, Results, RequestMeta} from './types';

const mainController = async (requests: Actions[], meta: RequestMeta): Promise<ResultCollation<Results>> =>
	collateResults(await Promise.all(requests.map(action => resultSummary(dispatch(action, meta)))));

module.exports = mainController;
