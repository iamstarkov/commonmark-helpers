import md from './index';
import { equal, deepEqual } from 'assert';
const input = [
  '# title',
  '## title 2',
  'paragraph',
  '![](imgsrc)',
  '> BlockQuote'
].join('\n\n');

const isHeader = (event) => event.entering && md.isHeader(event);
const isParagraph = (event) => event.entering && md.isParagraph(event);
const isBlockQuote = (event) => event.entering && md.isBlockQuote(event);
const isImage = (event) => event.entering && md.isImage(event);

it('html', ()=> {
  equal(md.html(`*italic*`), `<p><em>italic</em></p>\n`);
});

it('text', ()=> {
  equal(md.text('**`plaintext`**'), 'plaintext');
});

it('node matcher', ()=> {
  const matcher = (event)=> event.entering && event.node.type === 'Header';
  equal(md.text(md.match(input, matcher)), 'title');
});

it('node isHeader matcher', ()=> {
  equal(md.text(md.match(input, isHeader)), 'title');
});

it('node isHeader lvl 2 matcher', ()=> {
  equal(md.text(md.match(input, (event)=> md.isLevel(event, 2))), 'title 2');
});

it('ast, html, text and match should not fail and return undefined if nothing matched', ()=> {
  equal(md.text(md.match(input, (event)=> md.isLevel(event, 3))), undefined);
});

it('node isParagraph matcher', ()=> {
  equal(md.text(md.match(input, isParagraph)), 'paragraph');
});

it('node isBlockQuote matcher', ()=> {
  equal(md.text(md.match(input, isBlockQuote)), 'BlockQuote');
});

it('node isImage matcher', ()=> {
  equal(md.match(input, isImage).destination, 'imgsrc');
});
