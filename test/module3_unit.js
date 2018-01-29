'use strict';

const chai = require('chai');
const should = chai.should();

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const sinon = require('sinon');
chai.use(require('sinon-chai'));

const module3 = require('../src/module3');

// mocks
const backend = {
  sum: (a, b) => a + b,
  sum_p: (a, b) => Promise.resolve(a + b)
};

describe('module3', () => {
  // service to test
  const service = module3.init(backend);

  describe('sum_p()', () => {
    it('should return sum', () => service.sum_p(2, 3).should.eventually.equal(5));

    describe('on test with spy', () => {
      let sum_pSpy;
      before(() => {
        sum_pSpy = sinon.spy(backend, 'sum_p');
      });
      after(() => {
        sum_pSpy.restore();
      });
      it('should call backend.sum_p', () =>
        service.sum_p(2, 3).should.be.fulfilled.then(() => {
          sum_pSpy.should.have.been.calledWith(2, 3);
        })
      );
    });

    describe('on test with stub', () => {
      let sum_pStub;
      before(() => {
        sum_pStub = sinon.stub(backend, 'sum_p').resolves(5);
      });
      after(() => {
        sum_pStub.restore();
      });

      it('should call backend.sum_p', () =>
        service.sum_p(2, 3).should.be.fulfilled.then(() => {
          sum_pStub.should.have.been.calledWith(2, 3);
        })
      );
    });
  });

  describe('sum_cb()', () => {
    it('should call cb with sum', done =>
      service.sum_cb(2, 3, sum => {
        sum.should.be.equal(5);
        done();
      })
    );

    describe('on test with spy', () => {
      let sumSpy;
      before(() => {
        sumSpy = sinon.spy(backend, 'sum');
      });
      after(() => {
        sumSpy.restore();
      });
      it('should call backend.sum', done =>
        service.sum_cb(2, 3, () => {
          sumSpy.should.have.been.calledWith(2, 3);
          done();
        })
      );
    });

  });

});
