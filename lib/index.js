'use strict';

var _sourceMapSupport2 = require('source-map-support');

(0, _sourceMapSupport2.install)();
var debug = require('debug')('metalsmith:symlink');
var hercule = require('hercule');
var async = require('async');
var os = require('os');
var path = require('path');
var minimatch = require('minimatch');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to add folders or files from outside the source directory.
 *
 * @param {Object} options
 * @param {string} options.key Key in the metadata object containing symlinks.
 *
 * @return {Function}
 */

function plugin(options) {
  var _ref = options || {},
      _ref$key = _ref.key,
      key = _ref$key === undefined ? 'symlink' : _ref$key;

  return function (files, metalsmith, done) {

    async.eachSeries(Object.keys(metalsmith._metadata[key] || {}), function (source, cb) {
      // Remove existing files from source.
      Object.keys(files).forEach(function (key) {
        var match = key.startsWith(source + '/');
        if (match) {
          delete files[key];
        }
      });

      debug('source', source);
      var target = metalsmith._metadata[key][source];
      var target_path = path.resolve(target.startsWith('~/') ? os.homedir() + target.replace('~/', '/') : target);
      debug('target_path', target_path);
      metalsmith.read(target_path, function (err, symlink) {
        if (err) return cb(err);
        Object.keys(symlink).forEach(function (link) {
          files[source + '/' + link] = symlink[link];
        });
        cb();
      });
    }, function (err) {
      if (err) return done(err);
      done();
    });
  };
}