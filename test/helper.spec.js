'use strict';

var swagger = require('../lib/helper');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('swagger.js', function () {
  describe('validationResults', function () {
    var fn;

    before(function () {
      var options = {
        verbose: true
      };
      
      // suppress the output from function
      sinon.stub(console, 'log').returns(void 0);
      fn = swagger.validationResults(options);
      console.log.restore();
    });

    it('should return a function', function () {
      expect(fn).to.be.a('function');
    });

    describe('the returned function', function () {
      var api;
      var validateStub = sinon.stub();

      before(function () {
        api = {
          validate: validateStub
        };
        
        validateStub.returns({
          'errors': [],
          'warnings': []
        });

        // suppress the output from function
        sinon.stub(console, 'log').returns(void 0);
        fn(api);
        console.log.restore();
      });

      it('should call validate on the swagger api', function () {
        expect(validateStub).to.be.called.once;
      });
    });
  });

  describe('validationFailure', function () {
    var consoleSpy;
    var err = {
      message: 'ERROR'
    };

    before(function () {
      // suppress the output from function
      consoleSpy = sinon.stub(console, 'log').returns(void 0);
      swagger.validationFailure(err);
      console.log.restore();
    });

    it('should log the error', function () {
      expect(consoleSpy).to.be.calledWith(' ', err.message);
    });
  });

  describe('reportResults', function () {
    var consoleSpy;
    var results = [
      {
        'code': 'MOCK CODE',
        'message': 'MOCK MESSAGE',
        'path': [
          'MOCK',
          'PATH'
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
      expect(consoleSpy).to.be.calledWith(' ', 'MOCK MESSAGE');
    });

    it('should log the path', function () {
      expect(consoleSpy).to.be.calledWith(' ', results[0].path.join('.'));
    });
  });
});
