const server = require('./lib');
const serve = require('micro');
const cluster = require('@quarterto/heroku-cluster');

cluster({
	defaultPort: 3000,
	app: serve(server),
});
