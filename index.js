'use strict';

var os = require('os');
var path = require('path');

function replaceHomedir(filepath, replacement) {
  if (typeof filepath !== 'string') {
    throw new Error('Path for replace-homedir must be a string.');
  }

  if (!path.isAbsolute(filepath)) {
    return filepath;
  }

  var home = os.homedir();
  var lookupHome = home + path.sep;
  var lookupPath = path.normalize(filepath + path.sep);

  if (lookupPath.indexOf(lookupHome) !== 0) {
    return filepath;
  }

  return filepath.replace(home, replacement);
}

module.exports = replaceHomedir;
