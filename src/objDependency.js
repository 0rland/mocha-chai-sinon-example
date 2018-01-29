/**
 * Module imports `request` as object and uses its method `get`.
 */
'use strict';
const request = require('request');
const rp = require('request-promise');
module.exports = {
	useRequestAsPromise: () => {
		return rp.get('http://ya.ru');
	},
	useRequest: done => {
		return request.get('http://ya.ru', done);
	}
};
