'use strict';

var os = require('os');
var path = require('path');

var isAbsolute = require('is-absolute');
var removeTrailingSep = require('remove-trailing-separator');

function replaceHomedir(filepath, replacement) {
  if (typeof filepath !== 'string') {
    throw new Error('Path for replace-homedir must be a string.');
  }

  if (!isAbsolute(filepath)) {
    return filepath;
  }

  var home = removeTrailingSep(os.homedir());
  var lookupHome = home + path.sep;
  var lookupPath = removeTrailingSep(filepath) + path.sep;

  if (lookupPath.indexOf(lookupHome) !== 0) {
    return filepath;
  }

  return filepath.replace(home, replacement);
}

module.exports = replaceHomedir;
