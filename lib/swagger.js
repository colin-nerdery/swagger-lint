'use strict';

module.exports = {
  validate: validate,
  validationResults: validationResults,
  validationFailure: validationFailure,
  reportResults: reportResults
};

var sway = require('sway');
var colors = require('colors');
var _ = require('lodash');

/**
 * @private
 * @function validater
 * @memberOf swagger-lint
 * @param {string} location - Location of the swagger file to validate
 * @param {object} program - The commander.js program object
 * @description Validates the swagger file (local or remote), by using sway's
 * validate.
 */
function validate (location, program) {
  var headers = program.opts().headers;

  var swaggerOpts = {
    definition: location,
    jsonRefs: {
      loaderOptions: {
        prepareRequest: prepareRequest(headers)
      }
    }
  };

  var SwaggerApi = sway.create(swaggerOpts);

  SwaggerApi.then(validationResults, validationFailure);
}

/**
 * @private
 * @function prepareRequest
 * @memberOf swagger-lint
 * @param {string[]} headers - An array of headers
 * @description Modify the request before its sent off to grab the swagger
 *              document.
 */
function prepareRequest (headers) {
  var headerDelim = /:/;

  return function (req, callback) {
    _.forEach(headers, function (header) {

      if (!headerDelim.test(header)) {
        throw new Error('Invalid header format <header name>:<header value>');
      }

      var headerArray = header.split(/:/);
      var key = headerArray[0].trim();
      var val = headerArray[1].trim();

      req.set(key, val);
    });

    callback(null, req);
  };
}

/**
 * @private
 * @function validationResults
 * @memberOf swagger-lint
 * @param {object} api - The results object returned from sway's
 * validation.
 * @description Prints the results to stdout, removing the JSON formatting.
 */
function validationResults (api) {
  var results = api.validate();
  var errors = results.errors;
  var warnings = results.warnings;

  if (errors.length === 0) {
    console.log('No errors found!'.green);
  } else {
    console.log('Errors found'.red);
    reportResults(errors);
  }

  if (warnings.length === 0) {
    console.log('No warnings found!'.green);
  } else {
    console.log('Warnings found'.yellow);
    reportResults(warnings);
  }
}

/**
 * @private
 * @function validationFailure
 * @param {string} err - Error returned from sway's validation.
 * @description Prints the error to stdout.
 */
function validationFailure (err) {
  console.log('Failed validation!'.red);
  console.log('  ', err.message);
}

/**
 * @private
 * @function reportResults
 * @param {array} results - Prints the results out without JSON formatting.
 * @description Prints the results array passed to it. Can be used for
 * printing the error or warning blocks.
 */
function reportResults (results) {
  results.forEach(function (result) {
    console.log('  ', result.message);

    if (!_.isEmpty(result.path)) {
      console.log('  ', result.path.join('.'));
    }
  });
}
