// @flow

declare module 'cheerio' {
	declare class Selection {
		first(): Selection,
		prevAll(): Selection,
		addClass: (string) => Selection,
	}

	declare type Dollar = {
		(string): Selection,
		html: (?Selection) => string,
	}

	declare type loadOptions = {
		xmlMode: boolean,
	};

	declare export function load(string, ?loadOptions): Dollar;
}
