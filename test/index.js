'use strict';

var os = require('os');
var path = require('path');
var sinon = require('sinon');

var expect = require('expect');

var replaceHomedir = require('../');

describe('replace-homedir', function () {

  it('throws if path is not a string', function (done) {
    function invalidPath() {
      replaceHomedir(null);
    }

    expect(invalidPath).toThrow('Path for replace-homedir must be a string.');
    done();
  });

  it('replaces the homedir with replacement string', function (done) {
    var home = os.homedir();
    var relative = 'replace-homedir/test';
    var absolute = path.join(home, relative);
    var result = replaceHomedir(absolute, '~');
    var expected = path.join('~', relative);
    expect(result).toEqual(expected);
    done();
  });

  it('replaces the homedir with replacement function', function (done) {
    var home = os.homedir();
    var relative = 'replace-homedir/test';
    var absolute = path.join(home, relative);
    var result = replaceHomedir(absolute, function () {
      return '~';
    });
    var expected = path.join('~', relative);
    expect(result).toEqual(expected);
    done();
  });

  it('does not replace the homedir if not at beginning of path', function (done) {
    var home = os.homedir();
    var relative = 'replace-homedir/test';
    var absolute = path.join(home, relative);
    var filepath = path.join('/fake', absolute);
    var result = replaceHomedir(filepath, '~');
    var expected = path.join('/fake', absolute);
    expect(result).toEqual(expected);
    done();
  });

  it('does not replace homedir when it is a subpath', function (done) {
    var home = os.homedir();
    var relative = 'replace-homedir/test';
    var filepath = path.join(home + '-extended', relative);
    var result = replaceHomedir(filepath, '~');
    var expected = path.join(home + '-extended', relative);
    expect(result).toEqual(expected);
    done();
  });

  it('ignores non-absolute filepath', function (done) {
    var home = os.homedir();
    var relative = path.join(home.slice(1), 'replace-homedir/test');
    var result = replaceHomedir(relative, '~');
    var expected = relative;
    expect(result).toEqual(expected);
    done();
  });

  it('ignores non-absolute home path', function (done) {
    var home = os.homedir();
    var relative = 'replace-homedir/test';
    var absolute = path.join(home, relative);
    sinon.stub(os, 'homedir').callsFake(function () {
      return home.slice(1);
    });

    var result = replaceHomedir(absolute, '~');
    var expected = absolute;
    expect(result).toEqual(expected);

    os.homedir.restore();
    done();
  });

  it('handles homedir with trailing separator', function (done) {
    var home = os.homedir();
    var relative = 'replace-homedir/test';
    var absolute = path.join(home, relative);
    sinon.stub(os, 'homedir').callsFake(function () {
      return home + path.sep;
    });

    var result = replaceHomedir(absolute, '~');
    var expected = path.join('~', relative);
    expect(result).toEqual(expected);

    os.homedir.restore();
    done();
  });

  it('handles homedir with many trailing separators', function (done) {
    var home = os.homedir();
    var relative = 'replace-homedir/test';
    var absolute = path.join(home, relative);
    sinon.stub(os, 'homedir').callsFake(function () {
      return home + path.sep + path.sep + path.sep;
    });

    var result = replaceHomedir(absolute, '~');
    var expected = path.join('~', relative);
    expect(result).toEqual(expected);

    os.homedir.restore();
    done();
  });
});
