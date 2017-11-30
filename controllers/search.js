const {search} = require('@financial-times/n-es-client');

module.exports = async ({sort, outputfields, query, offset, limit}) => {
	const stream = await search({
		query: {'term': {'annotations.id': '5c7592a8-1f0c-11e4-b0cb-b2227cce2b54'}},
		size: limit,
		from: offset,
	});

	return {
		count: stream.length,
		results: stream.map(item => ({
			id: item.id,
			abstract: item.openingHTML,
			content: item.bodyHTML,
			attachments: [],
			currentversion: 1,
			issticky: false,
			datepublished: new Date(item.publishedDate).getTime() / 1000,
			metadata: {
				primarytagid: "86352", // how to translate between these and topics
			},
			shorturl: item.webUrl,
			sortval: `1-0-0`, // what do the first things mean
			status: 'live',
			tags: [
				{tag: 'Markets', id: 86352, query: 'tag:Markets'},
			],
			title: item.title,
			url: item.webUrl,
			uuidv3: item.id,
		})),
		srh: { query, offset, limit },
	}
};
