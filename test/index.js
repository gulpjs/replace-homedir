"use strict";

var os = require("node:os");
var path = require("node:path");
var assert = require("node:assert");
var { describe, it } = require("node:test");

var replaceHomedir = require("../");

describe("replace-homedir", function () {
  it("throws if path is not a string", function () {
    function invalidPath() {
      replaceHomedir(null);
    }

    assert.throws(invalidPath, {
      name: "Error",
      message: "Path for replace-homedir must be a string.",
    });
  });

  it("replaces the homedir with replacement string", function () {
    var home = os.homedir();
    var relative = "replace-homedir/test";
    var absolute = path.join(home, relative);
    var result = replaceHomedir(absolute, "~");
    var expected = path.join("~", relative);
    assert.deepStrictEqual(result, expected);
  });

  it("replaces the homedir with replacement function", function () {
    var home = os.homedir();
    var relative = "replace-homedir/test";
    var absolute = path.join(home, relative);
    var result = replaceHomedir(absolute, function () {
      return "~";
    });
    var expected = path.join("~", relative);
    assert.deepStrictEqual(result, expected);
  });

  it("does not replace the homedir if not at beginning of path", function () {
    var home = os.homedir();
    var relative = "replace-homedir/test";
    var absolute = path.join(home, relative);
    var filepath = path.join("/fake", absolute);
    var result = replaceHomedir(filepath, "~");
    var expected = path.join("/fake", absolute);
    assert.deepStrictEqual(result, expected);
  });

  it("does not replace homedir when it is a subpath", function () {
    var home = os.homedir();
    var relative = "replace-homedir/test";
    var filepath = path.join(home + "-extended", relative);
    var result = replaceHomedir(filepath, "~");
    var expected = path.join(home + "-extended", relative);
    assert.deepStrictEqual(result, expected);
  });

  it("ignores non-absolute filepath", function () {
    var home = os.homedir();
    var relative = path.join(home.slice(1), "replace-homedir/test");
    var result = replaceHomedir(relative, "~");
    var expected = relative;
    assert.deepStrictEqual(result, expected);
  });

  it("ignores non-absolute home path", function (t) {
    var home = os.homedir();
    var relative = "replace-homedir/test";
    var absolute = path.join(home, relative);

    t.mock.method(os, "homedir", function () {
      return home.slice(1);
    });

    var result = replaceHomedir(absolute, "~");
    var expected = absolute;
    assert.deepStrictEqual(result, expected);
  });

  it("handles homedir with trailing separator", function (t) {
    var home = os.homedir();
    var relative = "replace-homedir/test";
    var absolute = path.join(home, relative);

    t.mock.method(os, "homedir", function () {
      return home + path.sep;
    });

    var result = replaceHomedir(absolute, "~");
    var expected = path.join("~", relative);
    assert.deepStrictEqual(result, expected);
  });

  it("handles homedir with many trailing separators", function (t) {
    var home = os.homedir();
    var relative = "replace-homedir/test";
    var absolute = path.join(home, relative);

    t.mock.method(os, "homedir", function () {
      return home + path.sep + path.sep + path.sep;
    });

    var result = replaceHomedir(absolute, "~");
    var expected = path.join("~", relative);
    assert.deepStrictEqual(result, expected);
  });
});
