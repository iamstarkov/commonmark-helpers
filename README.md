# commonmark-helpers

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

> Even the strongest sometimes need help.

Bunch of helpers for working with [commonmark][commonmark-readme].

[commonmark-readme]: https://github.com/jgm/commonmark.js#readme

## Install

```
npm install --save commonmark-helpers
```

## Usage

```
var md = require('commonmark-helpers');
var input = '*bold*';
md.html(input); // <p><b>bold</b></p>\n
md.text(input); // bold
```

For more usage examples see [tests][test.js].

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

Matcher receive one `event` parameter. It is result of `walker.next()`. See [commonmark’s documentation and usage examples][commonmark].

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
[npm-image]: http://img.shields.io/npm/v/commonmark-helpers.svg

[travis-url]: https://travis-ci.org/iamstarkov/commonmark-helpers
[travis-image]: http://img.shields.io/travis/iamstarkov/commonmark-helpers.svg

[coveralls-url]: https://coveralls.io/r/iamstarkov/commonmark-helpers
[coveralls-image]: http://img.shields.io/coveralls/iamstarkov/commonmark-helpers.svg

[depstat-url]: https://david-dm.org/iamstarkov/commonmark-helpers
[depstat-image]: https://david-dm.org/iamstarkov/commonmark-helpers.svg

[depstat-dev-url]: https://david-dm.org/iamstarkov/commonmark-helpers
[depstat-dev-image]: https://david-dm.org/iamstarkov/commonmark-helpers/dev-status.svg
