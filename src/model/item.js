// @flow

const cheerio = require('cheerio');

const ResultMapper = require('./result-mapper');
const conceptsToTags = require('./concepts-to-tags');
const FASTFT_STREAM_ID = require('./stream-id');

import type {FtItem} from '@financial-times/n-flow-ft-content';
import type {Tag} from './concepts-to-tags';

type Metadata = {
	primarytagid?: string
};

module.exports = class Item extends ResultMapper {
	_data: FtItem;

	get id(): ?string {
		return this._data.id;
	}

	get abstract(): ?string {
		if(this._data.openingHTML) {
			return this._data.openingHTML;
		}

		if(this._data.bodyHTML) {
			const $ = cheerio.load(this._data.bodyHTML);

			const firstPara = $('p').first();
			const beforeFirst = firstPara.prevAll();
			return $.html(beforeFirst) + $.html(firstPara);
		}
	}

	get content(): ?string {
		return this._data.bodyHTML;
	}

	get attachments(): void[] {
		return [];
	}

	get currentversion(): number {
		return 1;
	}

	get issticky(): boolean {
		return false;
	}

	get datepublished(): ?string {
		if(this._data.publishedDate) {
			return (new Date(this._data.publishedDate).getTime() / 1000).toFixed(0);
		}
	}

	get metadata(): Metadata {
		return {
			primarytagid: !this._data.displayConcept || this._data.displayConcept.id === FASTFT_STREAM_ID
				? void(0)
				: this._data.displayConcept.id,
		};
	}

	get shorturl(): ?string {
		return this._data.webUrl;
	}

	get sortval(): ?string {
		return this.datepublished;
	}

	get status(): string {
		return 'live';
	}

	get tags(): Tag[] {
		return conceptsToTags(this._data.annotations);
	}

	get title(): ?string {
		return this._data.title;
	}

	get url(): ?string {
		return this._data.webUrl;
	}

	get uuidv3(): ?string {
		return this._data.id;
	}
}
