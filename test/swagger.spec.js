'use strict';

(function () {
  var swagger = require('../lib/swagger');

  var chai = require('chai');
  var expect = chai.expect;
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');

  chai.use(sinonChai);

  describe('swagger.js', function () {
    describe('validationResults', function () {
      var validateStub = sinon.stub();

      before(function () {
        var api = {
          'validate': validateStub
        };

        validateStub.returns({
          'errors': [],
          'warnings': []
        });

        // suppress the output from function
        sinon.stub(console, 'log').returns(void 0);
        swagger.validationResults(api);
        console.log.restore();
      });

      it('should call validate on the swagger api', function () {
        expect(validateStub).to.be.called.once;
      });
    });

    describe('validationFailure', function () {
      var consoleSpy;
      var error = {
        message: 'ERROR'
      };

      before(function () {
        // suppress the output from function
        consoleSpy = sinon.stub(console, 'log').returns(void 0);
        swagger.validationFailure(error);
        console.log.restore();
      });

      it('should log the error', function () {
        expect(consoleSpy).to.be.calledWith('  ', 'ERROR');
      });
    });

    describe('reportResults', function () {
      var consoleSpy;
      var results = [
        {
          'code': 'MOCK CODE',
          'message': 'MOCK MESSAGE',
          'path': [
            'MOCK PATH'
          ]
        }
      ];

      before(function () {
        // suppress the output from function
        consoleSpy = sinon.stub(console, 'log').returns(void 0);
        swagger.reportResults(results);
        console.log.restore();
      });

      it('should log the message', function () {
        expect(consoleSpy).to.be.calledWith('  ', 'MOCK MESSAGE');
      });
    });
  });
}());
