// @flow

import type {Results, ResultSummary} from './types';

const resultSummary = <R: Results> (resultPromise: Promise<R>): Promise<ResultSummary<R>> =>
	resultPromise.then(
		result => ({ status: 'ok', data: result }),
		err => ({ status: 'error', error: err })
	);

module.exports = resultSummary;
