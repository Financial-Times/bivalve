// @flow

declare module 'cheerio' {
	declare class Selection {
		first(): Selection,
		prevAll(): Selection,
		addClass(string): Selection,
		each((number, Element) => void): Selection,
		attr(string, ?string): string,
	}

	declare type Dollar = {
		(string | Element): Selection,
		html: (?Selection) => string,
	}

	declare type loadOptions = {
		xmlMode: boolean,
	};

	declare export function load(string | Selection, ?loadOptions): Dollar;
}
