'use strict';

/**
 * @namespace swagger-lint
 * @description A fully pluggable tool for identifying and reporting on patterns
 * in your {@link http://swagger.io/|Swagger} documents.
 * @example
 * $ npm install swagger-lint -g
 * $ slint swagger.json
 * No errors found!
 * No warnings found!
 * $ slint http://petstore.swagger.io/v2/swagger.json
 * No errors found!
 * No warnings found!
 * @requires commander
 * @requires sway
 * @requires url
 * @requires fs
 */
var program = require('commander');
var fs = require('fs');
var url = require('url');
var swagger = require('./lib/swagger');
var version = require('./package.json').version;
var swaggerFile;

program
  .version(version)
  .option('-H, --headers <header>', 'http headers to include in the original request', optionArrayAppender(), [])
  .arguments('<file>')
  .action(function (file) {
    // check to see if this a local or remote file
    var protocol = url.parse(file).protocol;

    // if local and it doesn't exist, display help
    if (protocol === null && !fs.existsSync(file)) {
      console.log('  Unable to find', file);
      _helpOnError(1);
    }

    swaggerFile = file;
  })
  .parse(process.argv);

// if swagger file isn't passed, display help
if (!swaggerFile) {
  _helpOnError(2);
}

swagger.validate(swaggerFile, program);

/**
 * @private
 * @function helpOnError
 * @memberOf swagger-lint
 * @param {int} code - Exit status code
 * @description Displays the program's help and exits with the code passed to
 * it, or -1 if not passed.
 */
function _helpOnError (code) {
  program.outputHelp();
  process.exit(code || -1);
}

/**
 * @private
 * @function optionArrayAppender
 * @memberOf swagger-lint
 * @param {string[]} values - Array of headers
 * @returns {function} Returns a function that pushes the value onto the array
 * @description Pushes the value onto an array. Used to push all headers passed
 *              in to the slint.
 */
function optionArrayAppender (values) {
  values = values || [];

  return function (value) {
    values.push(value);

    return values;
  };
}
