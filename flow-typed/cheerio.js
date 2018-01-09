// @flow

declare module 'cheerio' {
	declare class Selection {
		first(): Selection,
		prevAll(): Selection
	}

	declare type Dollar = {
		(string): Selection,
		html: (Selection) => string,
	}

	declare export function load(string): Dollar;
}
