const sinon = require('sinon');

module.exports = () => ({
	res: {
		setHeader: sinon.spy(),
	},
});
