/**
 * There is no sinon to stub a dependency.
 */
'use strict';
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const should = chai.should();

const funcDependency = require('../src/funcDependency');

describe('funcDependency', function() {
  describe('useRequestAsPromise', function() {
    it('should return content with `Найти` substring', function() {
      return funcDependency.useRequestAsPromise().should.eventually.contains('Найти');
    });
  });
  describe('useRequest', function() {
    it('should return content with `Найти` substring', function() {
      return new Promise(resolve => {
        funcDependency.useRequest((err, response, body) => {
          should.not.exist(err);
          body.should.contain('Найти');
          resolve();
        });
      });
    });
  });
});

