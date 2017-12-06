const {assert} = require('chai');
const ResultMapper = require('../../lib/result-mapper');

exports['ResultMapper'] = {
	'should make first constructor argument available as _data'() {
		class Foo extends ResultMapper {
			get bar() {
				return this._data.bar;
			}
		}

		assert.equal(new Foo({bar: 1}).bar, 1);
	},

	'should return subclass\' own fields when converted to JSON'() {
		class Foo extends ResultMapper {
			get bar() {
				return this._data.bar;
			}
		}

		assert.deepEqual(
			new Foo({bar: 1}).toJSON(),
			{bar: 1}
		);
	},

	'should return only fields in options when specified'() {
		class Foo extends ResultMapper {
			get bar() {
				return this._data.bar;
			}

			get baz() {
				return this._data.bar;
			}
		}

		assert.deepEqual(
			new Foo({bar: 1}, {fields: ['bar']}).toJSON(),
			{bar: 1}
		);
	}
}
