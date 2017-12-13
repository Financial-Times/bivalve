// @flow

const mainController = require('./controllers');
const {send} = require('micro');
const url = require('url');
const {BadRequest} = require('http-errors');
const {createHandler: createCorsHandler} = require('@quarterto/micro-cors');

import type {IncomingMessage, ServerResponse} from 'http';
import type {ResultCollation, Results} from './controllers/types';

require('dotenv/config');

const cors = createCorsHandler({
	supportsCredentials: true
});

module.exports = async (req: IncomingMessage, res: ServerResponse): Promise<ResultCollation<Results>> => {
	await cors(req, res);

	const {query: {request} = {}} = url.parse(req.url, true);
	if(!request) throw new BadRequest();

	const requestArr = JSON.parse(request);
	if(!Array.isArray(requestArr)) throw new BadRequest();

	return mainController(requestArr, {req, res});
};
