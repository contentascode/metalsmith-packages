const debug = require('debug')('metalsmith:symlink');
const async = require('async');
const os = require('os');
const path = require('path');

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
  const { key = 'symlink' } = options || {};

    return function symlink(files, metalsmith, done) {

      async.eachSeries(Object.keys(metalsmith._metadata[key] || {}), function(source, cb) {
        // Remove existing files from source.
        Object.keys(files).forEach(key => {
          const match = key.startsWith(source + '/')
          if (match) {
            delete files[key];
          }
        });

        debug('source', source)
        const target = metalsmith._metadata[key][source];
        const target_path = path.resolve(target.startsWith('~/') ? os.homedir() + target.replace('~/', '/') : target);
        debug('target_path', target_path)
        metalsmith.read(target_path, function(err, symlink) {
          if (err) return cb(err)
          Object.keys(symlink).forEach(function(link) {
            files[source + '/' + link] = symlink[link]
          })
          cb()
        });
      }, (err) => {
        if (err) return done(err)
        done();
      })

  };
}
