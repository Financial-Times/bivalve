// @flow

import type {FtItem} from '@financial-times/n-flow-ft-content';

declare module '@financial-times/n-es-client' {
	declare export type ESQuery = {
		term: {
			[string]: string
		}
	} | {
		bool: {
			must: Array<ESQuery>
		}
	};

	declare type ESSearch = {
		query: ESQuery,
		size: number,
		from: number,
	};

	declare export function search(ESSearch): Promise<Array<FtItem>>;
	declare export function get(string): Promise<FtItem>;
}
