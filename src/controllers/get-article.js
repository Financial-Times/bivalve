// @flow

import type {GetArticle, GetArticleResult, Controller} from './types';
const {get: getArticle} = require('@financial-times/n-es-client');
const Item = require('../model/item');

const getArticleController: Controller<GetArticle, GetArticleResult> = async ({uuid}) => {
	const article = await getArticle(uuid);
	return new Item(article);
};

module.exports = getArticleController;
