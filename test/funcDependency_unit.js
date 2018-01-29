/**
 * `proxyquire` is used to stub imported function.
 */
'use strict';
const proxyquire = require('proxyquire');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const should = chai.should();

// stub imported by module functions
const funcDependency = proxyquire('../src/funcDependency', {
  'request': (url, done) => done(null, {}, 'Найти'),
  'request-promise': url => Promise.resolve('Найти')
});

describe('funcDependency', function() {
  describe('sum', function() {
    it('should return 3 when 1+2', function() {
      funcDependency.sum(2, 1).should.be.equal(3);
    });
  });
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
