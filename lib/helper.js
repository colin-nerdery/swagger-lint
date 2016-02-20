'use strict';

module.exports = {
  optionArrayAppender: optionArrayAppender,
  prepareRequest: prepareRequest,
  validationResults: validationResults,
  validationFailure: validationFailure,
  reportResults: reportResults
};

var sway = require('sway');
var colors = require('colors');
var _ = require('lodash');

/**
 * @private
 * @function optionArrayAppender
 * @memberOf swagger-lint
 * @param    {string[]} values - Array of headers
 * @returns  {function} Returns a function that pushes the value onto the array
 * @desc     Pushes the value onto an array.
 */
function optionArrayAppender (values) {
  values = values || [];

  return function (value) {
    values.push(value);

    return values;
  };
}

/**
 * @private
 * @function prepareRequest
 * @memberOf swagger-lint
 * @param    {string[]} options - The array of options passed to slint
 * @returns  {function} Returns a function to be consumed by path-loader.
 * @desc     Add headers to the request before sending the http request.
 */
function prepareRequest (options) {
  var headerDelim = /:/;
  var verbose = options.verbose;

  return function (req, callback) {
    var headers = options.header;

    _.forEach(headers, function (header) {

      if (!headerDelim.test(header)) {
        throw new Error('Invalid header format <header name>:<header value>');
      }

      var headerArray = header.split(/:/);
      var key = headerArray[0].trim();
      var val = headerArray[1].trim();

      req.set(key, val);
    });

    if (verbose) {
      console.log('Getting swagger file from', req.url);
    }

    callback(null, req);
  };
}

/**
 * @private
 * @function validationResults
 * @memberOf swagger-lint
 * @param    {object} options - Options passed in to slint
 * @desc     Prints the results to stdout, removing the JSON formatting.
 */
function validationResults (options) {
  return function (api) {
    var results = api.validate();
    var errors = results.errors;
    var warnings = results.warnings;
    var verbose = options.verbose;

    if (verbose && _.isEmpty(errors)) {
      console.log('  No errors found!'.green);
    }

    if (!_.isEmpty(errors)) {
      console.log('  Errors found'.red);
      reportResults(errors);
    }

    if (verbose && _.isEmpty(warnings)) {
      console.log('  No warnings found!'.green);
    }

    if (!_.isEmpty(warnings)) {
      console.log('  Warnings found'.yellow);
      reportResults(warnings);
    }
  };
}

/**
 * @private
 * @function validationFailure
 * @param    {string} err - Error returned from sway's validation.
 * @desc     Prints the error to stdout.
 */
function validationFailure (err) {
  console.log('  Could not validate the provided swagger file'.red);
  console.log(' ', err.message);
}

/**
 * @private
 * @function reportResults
 * @param    {array} results - Prints the results out without JSON formatting.
 * @desc     Prints the results array passed to it. Can be used for printing the
 *           error or warning blocks.
 */
function reportResults (results) {
  results.forEach(function (result) {
    console.log(' ', result.message);

    if (!_.isEmpty(result.path)) {
      console.log(' ', result.path.join('.'));
    }
  });
}
