/**
 * `sinon` is used to stub method of imported object.
 * There is no assertion for spies/stubs.
 */
'use strict';
const chai = require('chai');
const should = chai.should();

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const sinon = require('sinon');

const request = require('request');
const rp = require('request-promise');

const objDependency = require('../src/objDependency');

describe('objDependency', function() {
  describe('useRequestAsPromise', function() {
    before(() => {
      sinon.stub(rp, "get").resolves('Найти');
    });
    after(function () {
      rp.get.restore();
    });
    it('should return content with `Найти` substring',
      () => objDependency.useRequestAsPromise().should.eventually.contains('Найти'));
  });
  describe('useRequest', function() {
    before(() => {
      sinon.stub(request, "get").callsArgWith(1, null, null, 'Найти');
    });
    after(function () {
      request.get.restore();
    });
    it('should return content with `Найти` substring', done => {
      objDependency.useRequest((err, response, body) => {
        //should.not.exist(err);
        body.should.contain('Найти');
        done();
      });
    });
  });
});
