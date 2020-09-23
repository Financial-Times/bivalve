// @flow

const mainController = require('./controllers');
const {send} = require('micro');
const url = require('url');
const {BadRequest} = require('http-errors');
const {createHandler: createCorsHandler} = require('@quarterto/micro-cors');
const os = require('os');
const tcpFetch = require('@quarterto/tcp-fetch');
const {createProxyServer} = require('http-proxy');
const hr = require('@quarterto/hr');

const {version} = require('../package.json');

const proxyUrl = 'https://www.ft.com/fastft/api'
const proxyEverything = process.env.ENABLE_PROXY === 'yes';
const proxy = createProxyServer({
	target: proxyUrl,
	changeOrigin: true,
	secure: true,
});

if(proxyEverything) {
	const message = `Starting in proxy mode. All requests will be proxied to ${proxyUrl}`;
	console.log(`
${hr('╴', message.length)}
${message}
${hr('╴', message.length)}
`);
}

import type {IncomingMessage, ServerResponse} from 'http';
import type {ResultCollation, Results} from './controllers/types';

require('dotenv/config');

const cors = createCorsHandler({
	supportsCredentials: true
});

const about = {
	schemaVersion: 1,
	name: 'bivalve',
	purpose: 'Clamo API shim for the App',
	audience: 'public',
	systemCode: 'apps-bivalve',
	primaryUrl: 'https://bivalve.ft.com',
	appVersion: version,
	serviceTier: 'bronze',
	_hostname: process.env.HEROKU_DYNO_ID || os.hostname(),
	contacts: [{
		name: 'Customer Products App team',
		email: 'ftmobile@ft.com',
	}],
};

const health = async () => {
	let ok, checkOutput;

	try {
		checkOutput = await(tcpFetch('next-elasticsearch.nlb.ft.com', 443));
		ok = true;
	} catch(err) {
		checkOutput = err.message;
		ok = false;
	}

	return {
		schemaVersion: 1,
		name: 'bivalve',
		description: 'Clamo API shim for the App',
		systemCode: 'apps-bivalve',
		checks: [{
			lastUpdated: (new Date).toISOString(),
			severity: 1,
			id: 'elastic-search',
			name: 'Check TCP/IP connectivity to this app\'s configured Elastic Search hostname on port 443',
			businessImpact: 'fastFT posts will not be available in the Web App/iOS App/Android App',
			technicalSummary: 'Attempts to connect to next-elasticsearch.nlb.ft.com:443. All content is requested from this host; without connectivity, fastFT content will not be available in the Apps',
			panicGuide: `Check connectivity by running \`heroku run --app ${process.env.HEROKU_APP_NAME || '$HEROKU_APP_NAME'} nc -w 5 -z next-elasticsearch.nlb.ft.com 443\`.`,
			ok,
			checkOutput,
		}]
	};
}

type Response = Promise<
	| ResultCollation<Results>
	| Object // yolo
	| 'OK'
	| void
>;

const uncachedResponse = res => response => {
	res.setHeader('cache-control', 'max-age=0, must-revalidate, no-cache, no-store');
	return response;
}

module.exports = async (req: IncomingMessage, res: ServerResponse): Response => {
	const {
		query: {request} = {},
		pathname,
	} = url.parse(req.url, true);

	const uncached = uncachedResponse(res);

	switch(pathname) {
		case '/__gtg': return uncached('OK');
		case '/__health': return uncached(await health());
		case '/__about': return uncached(about);
		case '/favicon.ico': return send(res, 404);
		default: {
			if(proxyEverything) {
				proxy.web(req, res);
			} else {
				await cors(req, res);

				if(!request) throw new BadRequest();

				const requestArr = JSON.parse(request);
				if(!Array.isArray(requestArr)) throw new BadRequest();

				return mainController(requestArr, {req, res});
			}
		}
	}
};
