import {
  text, html, match, matchRemove, matchRemoveList,
  isHeader, isLevel, isParagraph, isBlockQuote, isImage } from './index';
import { equal, deepEqual } from 'assert';
import { partialRight } from 'ramda';

const input = `
# title

## title 2

paragraph

![](imgsrc)

> BlockQuote

> BlockQuote *italic*
`;

it('node matcher', ()=> {
  equal(text(match(input, node => node.type === 'Header')), 'title');
});

it('node isHeader matcher', ()=> {
  equal(text(match(input, isHeader)), 'title');
});

it('node isHeader lvl 2 matcher', ()=> {
  equal(text(match(input, node => isLevel(node, 2))), 'title 2');
});

it('ast, html, text and match should not fail and return undefined if nothing matched', ()=> {
  equal(text(match(input, node => isLevel(node, 3))), undefined);
});

it('node isParagraph matcher', ()=> {
  equal(text(match(input, isParagraph)), 'paragraph');
});

it('node isBlockQuote matcher', ()=> {
  equal(text(match(input, isBlockQuote)), 'BlockQuote');
});

it('node isImage matcher', ()=> {
  equal(match(input, isImage).destination, 'imgsrc');
});

it('html', ()=> {
  equal(html('**awsm**'), '<p><strong>awsm</strong></p>\n');
});

it('text', ()=> {
  equal(text(input), `
title

title 2

paragraph

BlockQuote

BlockQuote italic
  `.trim());
});

it('matchRemove', ()=> {
  equal(text(matchRemove(`# asd\n\ntext`, isHeader)), `text`);
});

it('matchRemoveList simple', ()=> {
  equal(text(matchRemoveList(`# asd\n\ntext`, isHeader)), `text`);
});

it('matchRemoveList double', ()=> {
  equal(text(matchRemoveList(`# asd\n\n## double\n\ntext`, i => isLevel(i, 1), i => isLevel(i, 2))), `text`);
});
