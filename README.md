# grunt-download-node

> Grunt task to download node binaries for multiple platform

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-download-node --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-download-node');
```

## The "download_node" task

### Overview
In your project's Gruntfile, add a section named `download_node` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  download_node: {
    options: {
      // Task-specific options go here.
      version: 'v0.10.29',
      platforms: ['linux-x86'],
      dest: 'node'
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.version (required)
Type: `String`
Default value: `''`
Example value: `'v0.10.29'`

A string value that is used to determin the node version to be downloaded.

#### options.platforms (required)
Type: `Array of Strings`
Default value: `[]`
Example value: `['linux-x86']`

Possible array values:
- linux-x86
- linux-x64
- darwin-x86
- darwin-x64
- sunos-x86
- sunos-x64
- windows-x86
- windows-x64

An array of string value that are used to determin what platforms of node executables to be downloaded.

#### options.dest
Type: `String`
Default value: `node`

The path to the downloaded executable. The node executable for each platform will be saved in the sub-dir of this path. For example, `node\linux-x86`.

### Usage Examples

#### Single Target

```js
grunt.initConfig({
  download_node: {
    options: {
      version: 'v0.10.29',
      platforms: ['linux-x86', 'darwin-x86', 'sunos-x86', 'windows-x86'],
      dest: 'node'
    },
  },
});
```

#### Multiple Targets with common options

```js
grunt.initConfig({
  download_node: {
    options: {
      version: 'v0.10.29',
      dest: 'node'
    },
    linux: {
      options: {
        platforms: ['linux-x86']
      }
    },
    mac: {
      options: {
        platforms: ['darwin-x86']
      }
    },
  },
});
```

#### Multiple Targets

```js
grunt.initConfig({
  download_node: {
    linux: {
      options: {
        version: 'v0.10.29',
        dest: 'node',
        platforms: ['linux-x86']
      }
    },
    mac: {
      options: {
        version: 'v0.10.19',
        dest: 'node',
        platforms: ['darwin-x86']
      }
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
