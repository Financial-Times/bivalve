const controllers = {
	getUserInfo: require('./get-user-info'),
	testError: require('./test-error'),
	addQuerySubscription: require('./add-query-subscription'),
	search: require('./search'),
};

const dispatch = require('./dispatch');
module.exports =  dispatch(controllers);
