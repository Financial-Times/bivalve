module.exports = controllers => async requests => (await Promise.all(requests.map(
	async ({action, arguments}) => {
		try {
			if(!controllers[action]) throw new Error(`No controller ${action}`);

			const data = await controllers[action](arguments);
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
