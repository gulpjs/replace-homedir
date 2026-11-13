"use strict";

const os = require("node:os");
const path = require("node:path");

function replaceHomedir(filepath, replacement) {
  if (typeof filepath !== "string") {
    throw new Error("Path for replace-homedir must be a string.");
  }

  if (!path.isAbsolute(filepath)) {
    return filepath;
  }

  const home = os.homedir();

  if (!path.isAbsolute(home)) {
    return filepath;
  }

  const lookupHome = path.normalize(`${home}${path.sep}`);
  const lookupPath = path.normalize(`${filepath}${path.sep}`);

  if (!lookupPath.startsWith(lookupHome, 0)) {
    return filepath;
  }

  const output = filepath.replace(lookupHome, (...args) => {
    let result = replacement;

    if (typeof replacement === "function") {
      result = replacement(...args);
    }

    return `${result}${path.sep}`;
  });

  return path.normalize(output);
}

module.exports = replaceHomedir;
