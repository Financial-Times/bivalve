const controllers = require('./controllers');
const {send} = require('micro');
const url = require('url');
const {BadRequest} = require('http-errors');
const cors = require('@quarterto/micro-cors');

module.exports = async (req, res) => {
	await cors(req, res);

	const {query: {request}} = url.parse(req.url, true);
	if(!request) throw new BadRequest();

	const requestArr = JSON.parse(request);
	if(!Array.isArray(requestArr)) throw new BadRequest();

	return (await Promise.all(requestArr.map(
		async ({action, arguments}) => {
			try {
				if(!controllers[action]) throw new Error(`No controller ${action}`);

				const data = await controllers[action](arguments, {req, res});
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
