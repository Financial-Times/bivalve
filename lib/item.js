const ResultMapper = require('./result-mapper');
const conceptsToTags = require('./concepts-to-tags');
const FASTFT_STREAM_ID = require('./stream-id');

module.exports = class Item extends ResultMapper {
	get id() {
		return this._data.id;
	}

	get abstract() {
		return this._data.openingHTML;
	}

	get content() {
		return this._data.bodyHTML;
	}

	get attachments() {
		return [];
	}

	get currentversion() {
		return 1;
	}

	get issticky() {
		return false;
	}

	get datepublished() {
		return new Date(this._data.publishedDate).getTime() / 1000;
	}

	get metadata() {
		return {
			primarytagid: this._data.displayConcept.id === FASTFT_STREAM_ID ? void(0) : this._data.displayConcept.id,
		};
	}

	get shorturl() {
		return this._data.webUrl;
	}

	get sortval() {
		return this.datepublished.toString();
	}

	get status() {
		return 'live';
	}

	get tags() {
		return conceptsToTags(this._data.annotations);
	}

	get title() {
		return this._data.title;
	}

	get url() {
		return this._data.webUrl;
	}

	get uuidv3() {
		return this._data.id;
	}
}
