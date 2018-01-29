/**
 * Module imports several methods to test.
 */
'use strict';
module.exports = {
  init: (backend) => {
    return {
      sum_p: (a, b) => backend.sum_p(a, b),
      sum_cb: (a, b, cb) => cb(backend.sum(a, b)),
      sum: (a, b) => backend.sum(a, b)
    };
  }
};
