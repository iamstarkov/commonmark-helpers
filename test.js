import commonmark from 'commonmark';
import md from './index';
import { equal, deepEqual } from 'assert';

const input = `
# title

## title 2

paragraph

![](imgsrc)

> BlockQuote

> BlockQuote *italic*
`;

it('node matcher', ()=> {
  const trigger = event => event.entering && event.node.type === 'Header';
  equal(md.text(md.match(input, trigger)), 'title');
});

it('node isHeader matcher', ()=> {
  const trigger = (event)=> event.entering && md.isHeader(md.node(event));
  equal(md.text(md.match(input, trigger)), 'title');
});

it('node isHeader lvl 2 matcher', ()=> {
  const trigger = (event)=> event.entering && md.isHeader(md.node(event)) && md.isLevel(md.node(event), 2);
  equal(md.text(md.match(input, trigger)), 'title 2');
});

it('ast, html, text and match should not fail and return undefined if nothing matched', ()=> {
  equal(md.text(md.match(input, (event)=> md.isLevel(event, 3))), undefined);
});

it('node isParagraph matcher', ()=> {
  const trigger = (event)=> event.entering && md.isParagraph(md.node(event));
  equal(md.text(md.match(input, trigger)), 'paragraph');
});

it('node isBlockQuote matcher', ()=> {
  const trigger = (event)=> event.entering && md.isBlockQuote(md.node(event));
  equal(md.text(md.match(input, trigger)), 'BlockQuote');
});

it('node isImage matcher', ()=> {
  const trigger = (event)=> event.entering && md.isImage(md.node(event));
  equal(md.match(input, trigger).destination, 'imgsrc');
});

it('html', ()=> {
  equal(md.html('**awsm**'), '<p><strong>awsm</strong></p>\n');
});

it('text', ()=> {
  equal(md.text(input), `
title

title 2

paragraph

BlockQuote

BlockQuote italic
  `.trim());
});

it('matchRemove', ()=> {
  const trigger = event => event.entering && md.isHeader(event.node);
  equal(md.html(md.matchRemove(`# asd\n\ntext`, trigger)), `<p>text</p>\n`);
});
