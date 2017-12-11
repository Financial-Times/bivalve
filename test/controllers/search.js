const {assert} = require('chai');
const search = require('../../lib/controllers/search');
const nock = require('nock');
const resolveCname = require('@quarterto/promisify')(require('dns').resolveCname);
const Item = require('../../lib/model/item');

const searchFixture = {
	took: 5,
	timed_out: false,
	_shards: {
		total: 4,
		successful: 4,
		failed: 0
	},
	hits: {
		total: 34205,
		max_score: null,
		hits: [
			{_source: {id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', title: 'Article 1'}},
		],
	},
};

exports['search controller'] = {
	async before() {
		this.elasticSearchHost = await resolveCname('next-elastic.ft.com');
	},

	afterEach() {
		nock.cleanAll();
	},

	async 'should get stuff from Elastic Search and turn it into stuff'() {
		const es = nock(`https://${this.elasticSearchHost}`)
			.post('/content/item/_search')
			.reply(200, searchFixture);

		const {results} = await search({});

		results.every(result => {
			assert.instanceOf(result, Item);
		});
	},

	async 'should pass outputfields to Item, always outputting sortval'() {
		const es = nock(`https://${this.elasticSearchHost}`)
			.post('/content/item/_search')
			.reply(200, searchFixture);

		const {results} = await search({
			outputfields: {
				id: true
			}
		});

		results.every(result => {
			assert.hasAllKeys(result.toJSON(), ['id', 'sortval']);
		});
	}
};
