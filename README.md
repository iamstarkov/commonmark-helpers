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

```
var md = require('commonmark-helpers');
var input = [
  '# title',
  '## title 2',
  'paragraph',
  '![](imgsrc)',
  '> BlockQuote'
].join('\n\n');

// helpers above commonmark API
function isHeader(event) { return event.entering && md.isHeader(event) };
function isParagraph(event) { return event.entering && md.isParagraph(event) };
function isBlockQuote(event) { return event.entering && md.isBlockQuote(event) };
function isImage(event) { return event.entering && md.isImage(event) };

md.html(`*italic*`);        // <p><em>italic</em></p>\n
md.text('**`plaintext`**'); // plaintext

function custom(event) { return event.entering && event.node.type === 'Header'; }
md.text(md.match(input, custom));   // title
md.text(md.match(input, isHeader)); // title

md.text(md.match(input, (event)=> md.isLevel(event, 2)));  // title 2
md.text(md.match(input, isParagraph));  // paragraph
md.text(md.match(input, isBlockQuote)); // BlockQuote
md.match(input, isImage).destination;   // imgsrc
```

## API

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

[commonmark]: https://github.com/jgm/commonmark.js#usage


### node(event)

Return `event.node`. Regular AST node.

##### event

Type: `walker event`

### isLevel(event, level)

Return `true` if AST node will have desire value of `level` property; suitable only for headers.

##### event

Type: `walker event`

##### level

Type: `Number`

Desire header’s level, from 1 to 6.

### isType(event, type)

##### event

Type: `walker event`

##### type

Desire AST node’s type, can be one of this list: `Text`, `Softbreak`, `Hardbreak`, `Emph`, `Strong`, `Html`, `Link`, `Image`, `Code`, `Document`, `Paragraph`, `BlockQuote`, `Item`, `List`, `Header`, `CodeBlock`, `HtmlBlock`, `HorizontalRule`.

### isDocument(event)

Shortcut to isType, with type 'Document'.

##### event

Type: `walker event`

### isHeader(event)

Shortcut to isType, with type 'Header'.

##### event

Type: `walker event`

### isParagraph(event)

Shortcut to isType, with type 'Paragraph'.

##### event

Type: `walker event`

### isBlockQuote(event)

Shortcut to isType, with type 'BlockQuote'.

##### event

Type: `walker event`

### isImage(event)

Shortcut to isType, with type 'Image'.

##### event

Type: `walker event`




## License

MIT © [Vladimir Starkov](https://iamstarkov.com/)

[npm-url]: https://npmjs.org/package/commonmark-helpers
[npm-image]: https://img.shields.io/npm/v/commonmark-helpers.svg

[travis-url]: https://travis-ci.org/iamstarkov/commonmark-helpers
[travis-image]: https://img.shields.io/travis/iamstarkov/commonmark-helpers.svg

[coveralls-url]: https://coveralls.io/r/iamstarkov/commonmark-helpers
[coveralls-image]: https://img.shields.io/coveralls/iamstarkov/commonmark-helpers.svg

[depstat-url]: https://david-dm.org/iamstarkov/commonmark-helpers
[depstat-image]: https://david-dm.org/iamstarkov/commonmark-helpers.svg

[depstat-dev-url]: https://david-dm.org/iamstarkov/commonmark-helpers
[depstat-dev-image]: https://david-dm.org/iamstarkov/commonmark-helpers/dev-status.svg
