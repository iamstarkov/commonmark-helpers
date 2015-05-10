import commonmark from 'commonmark';

const isString = (input) => typeof input === 'string';

const ast = (input) =>
  (typeof input === 'string')
    ? new commonmark.Parser().parse(input)
    : input;

const html = (input)=>
  new commonmark.HtmlRenderer().render(ast(input));

const text = (input)=> {
  let res = '';
  match(input, (event)=> {
    res += isString(literal(event)) ? literal(event) : '';
  });
  return res;
}

const match = (input, matcher) => {
  var walker = ast(input).walker();
  var event, node;
  while (event = walker.next()) {
    node = event.node;
    if (matcher(event)) {
      return node;
    }
  }
}

const literal = (event) => event.node.literal;
const isType = (event, type) => event.node.type === type;

export default {
  html: html,
  text: text,
  ast: ast,
  match: match,

  literal: literal,
  isLevel: (event, level) => event.node.level === level,
  isType: isType,

  isDocument: (event) => isType(event, 'Document'),
  isHeader: (event) => isType(event, 'Header'),
  isParagraph: (event) => isType(event, 'Paragraph'),
  isBlockQuote: (event) => isType(event, 'BlockQuote'),
  isImage: (event) => isType(event, 'Image')
};
