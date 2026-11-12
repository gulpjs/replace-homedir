"use strict";

const os = require("node:os");
const path = require("node:path");
const assert = require("node:assert");
const { describe, it } = require("node:test");

const replaceHomedir = require("../");

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
    const home = os.homedir();
    const relative = "replace-homedir/test";
    const absolute = path.join(home, relative);
    const result = replaceHomedir(absolute, "~");
    const expected = path.join("~", relative);
    assert.deepStrictEqual(result, expected);
  });

  it("replaces the homedir with replacement function", function () {
    const home = os.homedir();
    const relative = "replace-homedir/test";
    const absolute = path.join(home, relative);
    const result = replaceHomedir(absolute, function () {
      return "~";
    });
    const expected = path.join("~", relative);
    assert.deepStrictEqual(result, expected);
  });

  it("does not replace the homedir if not at beginning of path", function () {
    const home = os.homedir();
    const relative = "replace-homedir/test";
    const absolute = path.join(home, relative);
    const filepath = path.join("/fake", absolute);
    const result = replaceHomedir(filepath, "~");
    const expected = path.join("/fake", absolute);
    assert.deepStrictEqual(result, expected);
  });

  it("does not replace homedir when it is a subpath", function () {
    const home = os.homedir();
    const relative = "replace-homedir/test";
    const filepath = path.join(home + "-extended", relative);
    const result = replaceHomedir(filepath, "~");
    const expected = path.join(home + "-extended", relative);
    assert.deepStrictEqual(result, expected);
  });

  it("ignores non-absolute filepath", function () {
    const home = os.homedir();
    const relative = path.join(home.slice(1), "replace-homedir/test");
    const result = replaceHomedir(relative, "~");
    const expected = relative;
    assert.deepStrictEqual(result, expected);
  });

  it("ignores non-absolute home path", function (t) {
    const home = os.homedir();
    const relative = "replace-homedir/test";
    const absolute = path.join(home, relative);

    t.mock.method(os, "homedir", function () {
      return home.slice(1);
    });

    const result = replaceHomedir(absolute, "~");
    const expected = absolute;
    assert.deepStrictEqual(result, expected);
  });

  it("handles homedir with trailing separator", function (t) {
    const home = os.homedir();
    const relative = "replace-homedir/test";
    const absolute = path.join(home, relative);

    t.mock.method(os, "homedir", function () {
      return home + path.sep;
    });

    const result = replaceHomedir(absolute, "~");
    const expected = path.join("~", relative);
    assert.deepStrictEqual(result, expected);
  });

  it("handles homedir with many trailing separators", function (t) {
    const home = os.homedir();
    const relative = "replace-homedir/test";
    const absolute = path.join(home, relative);

    t.mock.method(os, "homedir", function () {
      return home + path.sep + path.sep + path.sep;
    });

    const result = replaceHomedir(absolute, "~");
    const expected = path.join("~", relative);
    assert.deepStrictEqual(result, expected);
  });
});
