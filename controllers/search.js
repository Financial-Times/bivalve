

module.exports = ({sort, outputfields, query, offset, limit}) => {
	const date = (new Date().getTime() / 1000).toString();
	return {
		count: 1,
		results: [{
			id: 12345,
			abstract: '<p>hello</p>',
			content: '<p>hello</p>',
			attachments: [],
			currentversion: 1,
			issticky: false,
			datepublished: date,
			metadata: {
				primarytagid: "86352", // how to translate between these and topics
			},
			shorturl: 'https://www.ft.com/content/3b979261-0d62-3cd8-aeaf-58ea4cf3a318',
			sortval: `1-0-0${date}`, // what do the first things mean
			status: 'live',
			tags: [
				{tag: 'Markets', id: 86352, query: 'tag:Markets'},
			],
			title: 'Test',
			url: 'https://www.ft.com/content/3b979261-0d62-3cd8-aeaf-58ea4cf3a318',
			uuidv3: '3b979261-0d62-3cd8-aeaf-58ea4cf3a318',
		}],
		resultsummarytext: 'Bunch of results lol',
		srh: { query, limit, offset },
		total: 12345,
	}
};
