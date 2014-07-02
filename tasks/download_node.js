/*
 * grunt-download-node
 * https://github.com/gregwym/grunt-download-node
 *
 * Copyright (c) 2014 Greg Wang
 * Licensed under the MIT license.
 */

var fs = require('fs-extra');
var path = require('path');
var async = require('async');
var request = require('request');
var targz = require('tar.gz');

module.exports = function(grunt) {
  'use strict';

  // Please see the Grunt documentation for more information regarding task
  // creation: https://github.com/gregwym/grunt-download-node.git

  grunt.registerMultiTask('download_node', 'Grunt task to download node binaries for multiple platform', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      version: '',
      platforms: [],
      extract: true,
      dest: '.'
    });
    var done = this.async();

    grunt.log.debug('Downloading node with options', JSON.stringify(options));

    if (options.version.length === 0) {
      grunt.log.error('No node version has been specified!');
    }

    var files = options.platforms.map(function(platform) {
      var dest = [options.dest, platform, ''].join('/');
      var src = ['http://nodejs.org', 'dist', options.version, ''].join('/');
      var filename = '';

      grunt.file.mkdir(dest);
      if (platform.indexOf('windows') >= 0) {
        if (platform.indexOf('x64') >= 0) {
          src += 'x64/';
        }
        filename = 'node.exe';
      } else {
        filename = ['node', options.version, platform].join('-') + '.tar.gz';
      }

      return {
        src: src + filename,
        dest: dest + filename
      };
    });

    async.map(files, function(file, cb) {
      var req = request(file.src);

      // On error, callback
      req.on('error', cb);

      // On response, callback for writing out the stream
      req.on('response', function handleResponse (res) {
        // Assert the statusCode was good
        var statusCode = res.statusCode;
        if (statusCode < 200 || statusCode >= 300) {
          return cb(new Error('Fetching ' + file.src + ' failed with HTTP status code ' + statusCode));
        }

        // Otherwise, write out the content
        var destdir = path.dirname(file.dest);
        grunt.file.mkdir(destdir);
        var writeStream = fs.createWriteStream(file.dest);
        res.pipe(writeStream);

        // When the stream errors or completes, exit
        writeStream.on('error', cb);
        writeStream.on('close', cb);
      });
    }, function(err) {
      // If there is an error, fail
      if (err) {
        grunt.fail.warn(err);
        return done();
      }

      // Otherwise, print a success message.
      files.map(function(file) {
        grunt.log.writeln('Files "' + file.dest + '" created.');
      });

      // Callback unless need to extract
      if (!options.extract) {
        return done();
      }

      async.map(files, function(file, cb) {
        var dest = file.dest;
        var destbasename = path.basename(file.dest, '.tar.gz');
        var destdir = path.dirname(file.dest);
        if (dest.indexOf('tar.gz') < 0) {
          return cb();
        }

        // Extract
        new targz().extract(dest, destdir, function(err) {
          if (err) {
            return cb(err);
          }
          var extractdir = path.resolve(destdir, destbasename);
          var nodesrc = path.resolve(destdir, destbasename + '/', 'bin/', 'node');
          var nodedest = path.resolve(destdir, 'node');
          grunt.log.writeln('Files "' + file.dest + '" extracted to "' + extractdir + '".');

          // Copy node executable
          try {
            fs.copySync(nodesrc, nodedest);
            fs.chmodSync(nodedest, '755');
            grunt.log.writeln('Files "' + nodedest + '" created.');
            fs.removeSync(extractdir);
            grunt.log.writeln('Files "' + extractdir + '" removed.');
            fs.removeSync(dest);
            grunt.log.writeln('Files "' + dest + '" removed.');
          } catch (err) {
            cb(err);
          }
          cb();
        });
      }, function(err) {
        if (err) {
          grunt.fail.warn(err);
          return done();
        }

        done();
      });
    });
  });

};
