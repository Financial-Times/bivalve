// @flow

import type {TestError, TestErrorResult, Controller} from './types';

const testErrorController: Controller<TestError, TestErrorResult> = () => { throw new Error('error test') };

module.exports = testErrorController;
