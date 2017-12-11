const {assert} = require('chai');
const Item = require('../../lib/model/item');
const ResultMapper = require('../../lib/model/result-mapper');
const FASTFT_STREAM_ID = require('../../lib/model/stream-id');

exports['Item'] = {
	'should be a ResultMapper'() {
		assert.instanceOf(new Item, ResultMapper);
	},

	'should get things from places and other things from dummy data'() {
		const item = new Item({
			id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
			openingHTML: 'opening',
			bodyHTML: 'body',
			webUrl: 'https://www.ft.com/content/ffffffff-ffff-ffff-ffff-ffffffffffff',
			title: 'Title',
			publishedDate: '2017-12-06T14:00:11.018Z',
		});

		assert.deepEqual(
			item.toJSON(),
			{
				id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
				abstract: 'opening',
				content: 'body',
				attachments: [],
				currentversion: 1,
				issticky: false,
				datepublished: '1512568811',
				metadata: {
					primarytagid: void(0),
				},
				shorturl: 'https://www.ft.com/content/ffffffff-ffff-ffff-ffff-ffffffffffff',
				sortval: '1512568811',
				status: 'live',
				tags: [],
				title: 'Title',
				url: 'https://www.ft.com/content/ffffffff-ffff-ffff-ffff-ffffffffffff',
				uuidv3: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
			}
		)
	},

	'primarytagid': {
		'should get primarytagid from displayConcept if present'() {
			const item = new Item({
				displayConcept: {
					id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
				}
			});

			assert.deepEqual(
				item.metadata,
				{
					primarytagid: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
				},
			);
		},

		'but not if it\'s fastft'() {
			const item = new Item({
				displayConcept: {
					id: FASTFT_STREAM_ID,
				}
			});

			assert.deepEqual(item.metadata, {primarytagid: void(0) });
		}
	},
};
