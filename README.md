# commonmark-helpers

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

> Even the strongest sometimes need help.

Basically, with commonmark-helpers you can find desire elements in markdown document
and process them in html or plaintext format.

Bunch of helpers for working with [commonmark][commonmark-readme]. Also, you can be interested,
why I created this module, that’s why I wrote a [post about reasons](https://iamstarkov.com/commonmark-helpers-release/).

Very important to notice, that this package is very simple and doesn’t contain
any smart and/or complicated logic, that’s why it’s tightly coupled with
[commonmark API for AST tree][commonmark-readme]. Check it out first.

[commonmark-readme]: https://github.com/jgm/commonmark.js#readme

## Install

```
npm install --save commonmark-helpers
```

## Usage

```js
var md = require('commonmark-helpers');
var input = `
# title

## title 2

paragraph

`;

md.html(`*italic*`);        // <p><em>italic</em></p>\n
md.text('**`plaintext`**'); // plaintext

var matchHeadingLevel2 = function(event) {
  var node = md.node(event);
  return event.entering && md.isHeader(node) && md.isLevel(node, 2);
};

md.text(md.match(input, matchHeadingLevel2)) // title 2

```

## API

### node(event)

Return `event.node`. Regular AST node.

##### event

Type: `walker event`

### html(input)

Return html.

##### input

Type: `string` / `AST node`


### text(input)

Return plain text.

##### input

Type: `string` / `AST node`

### ast(input)

Return AST tree for current text.

##### input

Type: `string`

### match(input, matcher)

Return first AST node matched my matcher function in process of walking through AST tree. Returns undefined if no one AST node was matched. One of the most powerful method in this collection.

##### input

Type: `string` / `AST node`

##### matcher

Type: `function`

Matcher receive one `event` parameter. It is result of `walker.next()`.
See [commonmark’s documentation and usage examples][commonmark].


### matchRemove(input, matcher)

Return first AST node matched my matcher function in process of walking through AST tree. Returns undefined if no one AST node was matched. One of the most powerful method in this collection.

##### input

Type: `string` / `AST node`

##### matcher

Type: `function`

Matcher receive one `event` parameter. It is result of `walker.next()`.
See [commonmark’s documentation and usage examples][commonmark].

[commonmark]: https://github.com/jgm/commonmark.js#usage

### Bunch of shortcut helpers

```js
const isType = (node, type) => node.type === type;
const isLevel  = (node, level) => node.level === level;
const isText = node => isType(node, 'Text');
const isEmph = node => isType(node, 'Emph');
const isCode = node => isType(node, 'Code');
const isHtml = node => isType(node, 'Html');
const isLink = node => isType(node, 'Link');
const isItem = node => isType(node, 'Item');
const isList = node => isType(node, 'List');
const isImage = node => isType(node, 'Image');
const isStrong = node => isType(node, 'Strong');
const isHeader = node => isType(node, 'Header');
const isDocument = node => isType(node, 'Document');
const isCodeBlock = node => isType(node, 'CodeBlock');
const isHtmlBlock = node => isType(node, 'HtmlBlock');
const isSoftbreak = node => isType(node, 'Softbreak');
const isHardbreak = node => isType(node, 'Hardbreak');
const isParagraph = node => isType(node, 'Paragraph');
const isBlockQuote = node => isType(node, 'BlockQuote');
const isHorizontalRule = node => isType(node, 'HorizontalRule');

const isRoot  = node => node.parent && isDocument(node.parent);
const isBreak = node => isHardbreak(node) || isSoftbreak(node);
```

## License

MIT © [Vladimir Starkov](https://iamstarkov.com/)

[npm-url]: https://npmjs.org/package/commonmark-helpers
[npm-image]: https://img.shields.io/npm/v/commonmark-helpers.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/commonmark-helpers
[travis-image]: https://img.shields.io/travis/iamstarkov/commonmark-helpers.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/iamstarkov/commonmark-helpers
[coveralls-image]: https://img.shields.io/coveralls/iamstarkov/commonmark-helpers.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/commonmark-helpers
[depstat-image]: https://david-dm.org/iamstarkov/commonmark-helpers.svg?style=flat-square

[depstat-dev-url]: https://david-dm.org/iamstarkov/commonmark-helpers
[depstat-dev-image]: https://david-dm.org/iamstarkov/commonmark-helpers/dev-status.svg?style=flat-square
