const controllers = require('./controllers');
const {send} = require('micro');
const url = require('url');
const {BadRequest} = require('http-errors');

module.exports = async (req, res) => {
	const {query: {request}} = url.parse(req.url, true);
	if(!request) throw new BadRequest();

	const requestArr = JSON.parse(request);
	if(!Array.isArray(requestArr)) throw new BadRequest();

	return (await Promise.all(requestArr.map(
		async ({action, args}) => {
			try {
				const data = await controllers[action](args, {req, res});
				return {data, status: 'ok'};
			} catch(e) {
				return {status: e.message};
			}
		}
	))).reduce(
		(results, result, i) => Object.assign(results, {
			[i]: result,
			status: results.status !== 'ok' ? results.status : result.status,
		}),
		{status: 'ok'}
	);
};
