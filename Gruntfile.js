/*
 * grunt-download-node
 * https://github.com/gregwym/grunt-download-node
 *
 * Copyright (c) 2014 Greg Wang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    download_node: {
      options: {
        version: 'v0.10.29',
        dest: 'tmp'
      },
      linux: {
        options: {
          platforms: ['linux-x86']
        }
      },
      linux_noextract: {
        options: {
          platforms: ['linux-x64'],
          extract: false
        }
      },
      windows: {
        options: {
          platforms: ['windows-x86']
        }
      },
      windows_x64: {
        options: {
          platforms: ['windows-x64']
        }
      },
      not_exists: {
        options: {
          platforms: ['not-exists']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'download_node', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
