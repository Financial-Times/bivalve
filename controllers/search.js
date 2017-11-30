module.exports = ({sort, outputfields, query, offset, limit}) => {
	return {
		count: 0,
		results: [],
		resultsummarytext: 'Bunch of results lol',
		srh: { query, limit, offset },
		total: 12345,
	}
};
