const pick = require('lodash.pick');

module.exports = class ResultMapper {
	constructor(data, options = {}) {
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
