var path = require('path');
var fs = require('fs');
var assert = require('assert');
var transformFileSync = require('babel-core').transformFileSync;
var plugin = require('../lib');

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

describe('babel-plugin-transform-es2015-modules-umd', function() {
  var fixturesDir = path.join(__dirname, 'fixtures/umd');
  fs.readdirSync(fixturesDir).map(function(caseName) {
    it(caseName.replace(/-/g, ' '), function() {
      var fixtureDir = path.join(fixturesDir, caseName);
      var actualPath = path.join(fixtureDir, 'actual.js');
      var actual = transformFileSync(actualPath).code;

      var expected = fs.readFileSync(
        path.join(fixtureDir, 'expected.js')
      ).toString();

      assert.equal(trim(actual), trim(expected));
    });
  });
});
