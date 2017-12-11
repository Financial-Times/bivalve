const {assert} = require('chai');
const dispatch = require('../../lib/controllers/dispatch');
const sinon = require('sinon');

const tick = () => new Promise(resolve => process.nextTick(resolve));

exports['dispatch controller'] = {
	async 'should call named controller and return result'() {
		const controller = dispatch({
			foo: () => ({foo: 'bar'})
		});

		assert.deepEqual(
			await controller([{action: 'foo'}]),
			{
				status: 'ok',
				0: {
					data: {foo: 'bar'},
					status: 'ok',
				}
			}
		);
	},

	async 'should await async controllers'() {
		const controller = dispatch({
			async foo() {
				await tick();
				return {foo: 'bar'};
			},
		});

		assert.deepEqual(
			await controller([{action: 'foo'}]),
			{
				status: 'ok',
				0: {
					data: {foo: 'bar'},
					status: 'ok',
				}
			}
		);
	},

	async 'should collate multiple controllers'() {
		const controller = dispatch({
			foo: () => ({foo: 'bar'}),
			bar: () => ({bar: 'baz'}),
		});

		assert.deepEqual(
			await controller([{action: 'foo'}, {'action': 'bar'}]),
			{
				status: 'ok',
				0: {
					data: {foo: 'bar'},
					status: 'ok',
				},
				1: {
					data: {bar: 'baz'},
					status: 'ok',
				}
			}
		);
	},

	async 'should pass arguments to controller'() {
		const foo = sinon.spy();
		const controller = dispatch({foo});

		const arguments = {bar: 'baz'}
		await controller([{action: 'foo', arguments}]);

		sinon.assert.calledWith(foo, arguments);
	},

	async 'should return error as top level status if any controller fails'() {
		const controller = dispatch({
			foo: () => ({foo: 'bar'}),
			bar: () => Promise.reject(new Error('nope')),
		});

		assert.deepEqual(
			await controller([{action: 'foo'}, {'action': 'bar'}]),
			{
				status: 'nope',
				0: {
					data: {foo: 'bar'},
					status: 'ok',
				},
				1: {
					status: 'nope',
				}
			}
		);
	}
};
