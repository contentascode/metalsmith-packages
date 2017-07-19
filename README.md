# metalsmith-symlink

[![Version](https://img.shields.io/npm/v/metalsmith-transclude-transform.svg)](https://npmjs.com/package/metalsmith-transclude-transform) [![Build Status](https://travis-ci.org/contentascode/metalsmith-transclude-transform.svg?branch=master)](https://travis-ci.org/contentascode/metalsmith-transclude-transform)

  A metalsmith plugin to add files from

## Installation

    $ npm install metalsmith-transclude

## CLI Usage

  Install via npm and then add the `metalsmith-symlink` key to your `metalsmith.json` plugins, like so:

```json
{
  "plugins": {
    "metalsmith-symlink": {
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
