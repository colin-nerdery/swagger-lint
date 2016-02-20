'use strict';

/**
 * @desc      A fully pluggable tool for identifying and reporting on patterns
 *            in your {@link http://swagger.io/|Swagger} documents.
 * @module    swagger-lint
 * @example
 * npm install swagger-lint -g
 * slint swagger.json
 * slint swagger.yaml
 * slint http://petstore.swagger.io/v2/swagger.json
 */

var helper = require('./lib/helper');
var sway = require('sway');
var _ = require('lodash');

module.exports = {
  validate: validate
};

/**
 * @function validate
 * @param    {string} file - Location of swagger file, can be remote or local.
 * @param    {object} options - Options object from commander.js.
 * @desc     Validates the provided swagger document. If any headers options are
 *           specified, it will modify the request before sending it out.
 */
function validate (file, options) {
  var swaggerOpts = {
    definition: file
  };

  // add headers if present
  if (!_.isEmpty(options.header)) {
    swaggerOpts.jsonRefs = {
      loaderOptions: {
        prepareRequest: helper.prepareRequest(options)
      }
    };
  }

  // let sway do the validation
  sway
    .create(swaggerOpts)
    .then(helper.validationResults(options), helper.validationFailure);
}
