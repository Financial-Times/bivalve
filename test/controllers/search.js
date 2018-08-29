const {assert} = require('chai');
const nock = require('nock');
const sinon = require('sinon');
const makeControllerMeta = require('../../test-util/make-controller-meta');
const resolveCname = require('@quarterto/promisify')(require('dns').resolveCname);

const Item = require('../../lib/model/item');
const search = require('../../lib/controllers/search');

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

const makeSearchMock = host =>

exports['search controller'] = {
	async before() {
		this.elasticSearchHost = await resolveCname('next-elastic.ft.com');
	},

	beforeEach() {
		nock(`https://${this.elasticSearchHost}`)
			.post('/content/item/_search')
			.reply(200, searchFixture);
	},

	afterEach() {
		nock.cleanAll();
	},

	async 'should get stuff from Elastic Search and turn it into stuff'() {
		const {results} = await search({}, makeControllerMeta());

		results.every(result => {
			assert.instanceOf(result, Item);
		});
	},

	async 'should pass outputfields to Item, always outputting sortval'() {
		const {results} = await search({
			outputfields: {
				id: true
			},
		}, makeControllerMeta());

		results.every(result => {
			assert.hasAllKeys(result.toJSON(), ['id', 'sortval']);
		});
	},

	async 'should set cache-control header to two minutes'() {
		const meta = makeControllerMeta();
		await search({}, meta);

		sinon.assert.calledWith(
			meta.res.setHeader,
			'cache-control',
			'public, max-age=120, must-revalidate, no-transform'
		);
	},
};
