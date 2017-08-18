/**
 * Module1 integration tests.
 */
'use strict';
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const should = chai.should();

const module1 = require('../src/module1');

describe('module1', function() {
  describe('useRequestAsPromise', function() {
    it('should return content with `Найти` substring', function() {
      return module1.useRequestAsPromise().should.eventually.contains('Найти');
    });
  });
  describe('useRequest', function() {
    it('should return content with `Найти` substring', function() {
      return new Promise(resolve => {
        module1.useRequest((err, response, body) => {
          should.not.exist(err);
          body.should.contain('Найти');
          resolve();
        });
      });
    });
  });
});

