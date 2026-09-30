<p align="center">
  <a href="https://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# replace-homedir

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][ci-image]][ci-url] [![Coveralls Status][coveralls-image]][coveralls-url]

Replace user home in a string with another string. Useful for tildifying a path.

## Usage

```js
var replaceHomedir = require('replace-homedir');

var shortPath = replaceHomedir('/Users/phated/myProject', '~');
// shortPath === '~/myProject'
```

## API

### `replaceHomedir(path, replacement)`

Takes a string `path` as the first argument and a string or function `replacement` as the second argument. If the `path` is absolute and begins with the User's homedir, the homedir portion of the path is replaced with `replacement` using String#replace.

If `path` is not a string, the function will throw.

## Strict No LLM / No AI Policy

No LLMs for issues.

No LLMs for patches / pull requests.

No LLMs for comments on the bug tracker, including translation.

English is encouraged, but not required. You are welcome to post in your native language and rely on others to have their own translation tools of choice to interpret your words.

## License

MIT

<!-- prettier-ignore-start -->
[downloads-image]: https://img.shields.io/npm/dm/replace-homedir.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/replace-homedir
[npm-image]: https://img.shields.io/npm/v/replace-homedir.svg?style=flat-square

[ci-url]: https://github.com/gulpjs/replace-homedir/actions/workflows/dev.yml
[ci-image]: https://img.shields.io/github/actions/workflow/status/gulpjs/replace-homedir/dev.yml?style=flat-square

[coveralls-url]: https://coveralls.io/r/gulpjs/replace-homedir
[coveralls-image]: https://img.shields.io/coveralls/gulpjs/replace-homedir/main.svg?style=flat-square
<!-- prettier-ignore-end -->
