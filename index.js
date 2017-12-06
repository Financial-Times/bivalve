const mainController = require('./controllers');
const {send} = require('micro');
const url = require('url');
const {BadRequest} = require('http-errors');
const cors = require('@quarterto/micro-cors');

require('dotenv/config');

module.exports = async (req, res) => {
	await cors(req, res);

	const {query: {request}} = url.parse(req.url, true);
	if(!request) throw new BadRequest();

	console.log(request);

	const requestArr = JSON.parse(request);
	if(!Array.isArray(requestArr)) throw new BadRequest();

	return mainController(requestArr);
};
