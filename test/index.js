'use strict';

var path = require('path');

var expect = require('expect');
var homedir = require('homedir-polyfill');

var replaceHomedir = require('../');

describe('replace-homedir', function() {

  var home = homedir();
  var relative = 'replace-homedir/test';
  var absolute = path.join(home, relative);

  it('throws if path is not a string', function(done) {
    function invalidPath() {
      replaceHomedir(null);
    }

    expect(invalidPath).toThrow('Path for replace-homedir must be a string.');
    done();
  });

  it('replaces the homedir with replacement string', function(done) {
    var result = replaceHomedir(absolute, '~');
    var expected = path.join('~', relative);
    expect(result).toEqual(expected);
    done();
  });

  it('replaces the homedir with replacement function', function(done) {
    var result = replaceHomedir(absolute, function() {
      return '~';
    });
    var expected = path.join('~', relative);
    expect(result).toEqual(expected);
    done();
  });

  it('does not replace the homedir if not at beginning of path', function(done) {
    var filepath = path.join('/fake', absolute);
    var result = replaceHomedir(filepath, '~');
    var expected = path.join('/fake', absolute);
    expect(result).toEqual(expected);
    done();
  });

  it('does not replace homedir when it is a subpath', function(done) {
    var filepath = path.join(home + '-extended', relative);
    var result = replaceHomedir(filepath, '~');
    var expected = path.join(home + '-extended', relative);
    expect(result).toEqual(expected);
    done();
  });

  it('ignores non-absolute paths', function(done) {
    var USERPROFILE = process.env.USERPROFILE;
    var HOME = process.env.HOME;
    process.env.USERPROFILE = process.env.HOME = home.slice(1);
    var filepath = absolute.slice(1);
    var result = replaceHomedir(filepath, '~');
    var expected = absolute.slice(1);
    expect(result).toEqual(expected);
    done();

    process.env.USERPROFILE = USERPROFILE;
    process.env.HOME = HOME;
  });

});
