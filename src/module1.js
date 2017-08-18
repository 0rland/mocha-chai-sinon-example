/**
 * Module imports `request` and uses it as a function.
 */
'use strict';
const request = require('request');
const rp = require('request-promise');
module.exports = {
  sum: (x, y) => {
    return x + y;
  },
	useRequestAsPromise: () => {
		return rp('http://ya.ru');
	},
	useRequest: done => {
		return request('http://ya.ru', done);
	}
};
