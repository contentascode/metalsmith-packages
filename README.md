# metalsmith-packages

[![Version](https://img.shields.io/npm/v/metalsmith-packages.svg)](https://npmjs.com/package/metalsmith-packages) [![Build Status](https://travis-ci.org/contentascode/metalsmith-packages.svg?branch=master)](https://travis-ci.org/contentascode/metalsmith-packages)

  A metalsmith plugin to add folders or files from outside the source directory with the idea to evolve into a content package system.

## Installation

    $ npm install metalsmith-packages

## CLI Usage

  Install via npm and then add the `metalsmith-packages` key to your `metalsmith.json` plugins, like so:

```json
{
  "plugins": {
    "metalsmith-packages": {
      "paths": {}, // Not implemented yet.
      "key": "folder"
    }
  }
}
```

The `key` option will look for this key in the global metadata object for instance
```json
{
  "folder": {
    "things": "~/some/path"
  }
}
```

The `key` object contains a mapping of the destination path (here `things`) where the absolute target path (here `~/some/path`) will be mounted.

Note that `~` will be expanded to the user's home dir.

## TODO:

 - [ ] Think about how to make this into a module system alongside the transclusion plugins.

## License

  MIT
