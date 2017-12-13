// @flow

import type {Results, ResultSummary, ResultCollation} from './types';

const collateResults = (results: ResultSummary<Results>[]): ResultCollation<Results> => results.reduce(
	(collation: ResultCollation<Results>, result, i) => Object.assign(collation, {
		[i]: result.status === 'ok'
			? result
			: {status: result.error.message},
		status: collation.status !== 'ok'
			? collation.status
			: result.status === 'ok'
				? 'ok'
				: result.error.message,
	}),
	{status: 'ok'}
);

module.exports = collateResults;
