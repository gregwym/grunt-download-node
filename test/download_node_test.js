'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.download_node = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  linux: function(test) {
    test.expect(1);

    var exists = grunt.file.exists('tmp/linux-x86/node');
    test.ok(exists);

    test.done();
  },
  linux_noextract: function(test) {
    test.expect(1);

    var exists = grunt.file.exists('tmp/linux-x64/node-v0.10.29-linux-x64.tar.gz');
    test.ok(exists);

    test.done();
  },
  windows: function(test) {
    test.expect(1);

    var exists = grunt.file.exists('tmp/windows-x86/node.exe');
    test.ok(exists);

    test.done();
  },
  windows_x64: function(test) {
    test.expect(1);

    var exists = grunt.file.exists('tmp/windows-x86/node.exe');
    test.ok(exists);

    test.done();
  },
  not_exists: function(test) {
    test.expect(1);

    test.throws();

    test.done();
  },
};
