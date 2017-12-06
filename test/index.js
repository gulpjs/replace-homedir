'use strict';

var path = require('path');

var expect = require('expect');
var homedir = require('homedir-polyfill');

var replaceHomedir = require('../');

describe('replace-homedir', function() {

  var home = homedir();
  var here = __dirname.replace(home, '');

  it('throws if path is not a string', function(done) {
    function invalidPath() {
      replaceHomedir(null);
    }

    expect(invalidPath).toThrow('Path for replace-homedir must be a string.');
    done();
  });

  it('replaces the homedir with replacement string', function(done) {
    var result = replaceHomedir(__dirname, '~');
    var expected = path.join('~', here);
    expect(result).toEqual(expected);
    done();
  });

  it('replaces the homedir with replacement function', function(done) {
    var result = replaceHomedir(__dirname, function() {
      return '~';
    });
    var expected = path.join('~', here);
    expect(result).toEqual(expected);
    done();
  });

  it('does not replace the homedir if not at beginning of path', function(done) {
    var filepath = path.join('/fake', __dirname);
    var result = replaceHomedir(filepath, '~');
    var expected = path.join('/fake', __dirname);
    expect(result).toEqual(expected);
    done();
  });

  it('does not replace homedir when it is a subpath', function(done) {
    var filepath = path.join(home + '-extended', here);
    var result = replaceHomedir(filepath, '~');
    var expected = path.join(home + '-extended', here);
    expect(result).toEqual(expected);
    done();
  });

  it('ignores non-absolute paths', function(done) {
    var USERPROFILE = process.env.USERPROFILE;
    var HOME = process.env.HOME;
    process.env.USERPROFILE = process.env.HOME = home.slice(1);
    var filepath = __dirname.slice(1);
    var result = replaceHomedir(filepath, '~');
    var expected = __dirname.slice(1);
    expect(result).toEqual(expected);
    done();

    process.env.USERPROFILE = USERPROFILE;
    process.env.HOME = HOME;
  });

});
