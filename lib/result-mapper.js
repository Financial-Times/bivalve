const pick = require('lodash.pick');

class ResultMapper {
	constructor(data, options = {}) {
		this._data = data;
		this._fields = options.outputfields || this._defaultFields();
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
}
