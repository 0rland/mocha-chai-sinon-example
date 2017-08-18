/**
 * Module2 unit tests.
 * `sinon` is used to stub method of imported object.
 */
'use strict';
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const should = chai.should();
const sinon = require('sinon');

const request = require('request');
const rp = require('request-promise');

const module1 = require('../src/module1');

describe('module2', function() {
  describe('useRequestAsPromise', function() {
    before(() => {
      sinon.stub(rp, "get").resolves('Найти');
    });
    after(function () {
      rp.get.restore();
    });
    it('should return content with `Найти` substring', function() {
      return module1.useRequestAsPromise().should.eventually.contains('Найти');
    });
  });
  describe('useRequest', function() {
    before(() => {
      sinon.stub(request, "get").callsArgWith(1, 'Найти');
    });
    after(function () {
      request.get.restore();
    });
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
