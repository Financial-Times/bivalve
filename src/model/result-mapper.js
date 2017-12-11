// @flow

const pick = require('lodash.pick');

module.exports = class ResultMapper {
	_data: Object;
	_fields: string[];

	constructor(data: Object, options: {fields?: string[]} = {}) {
		this._data = data;
		this._fields = options.fields || this._defaultFields();
	}

	_defaultFields() {
		return Object.getOwnPropertyNames(
			this.constructor.prototype
		).filter(name =>
			!name.startsWith('_') && name !== 'constructor'
		);
	}

	toJSON() {
		return pick(this, this._fields);
	}
};
