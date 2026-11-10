# textkit: new modules API

All functions are named ES-module exports from their own file under `src/`. They are not re-exported from `src/index.js`; import from the module file.

## src/case.js
Words are split on any non-letter/non-digit character, on lower-to-upper boundaries (`fooBar`) and on acronym boundaries (`XMLHttp` -> `XML`, `Http`). All four functions share this splitter.

- `camelCase(text)`: `camelCase('foo_bar baz')` -> `'fooBarBaz'`
- `snakeCase(text)`: `snakeCase('XMLHttpRequest')` -> `'xml_http_request'`
- `kebabCase(text)`: `kebabCase('Foo Bar')` -> `'foo-bar'`
- `pascalCase(text)`: `pascalCase('foo-bar baz')` -> `'FooBarBaz'`

## src/wrap.js
- `wrap(text, width)`: hard-wraps at word boundaries so no line exceeds `width`, unless a single word is longer (it stays unbroken on its own line). `wrap('the quick brown fox', 10)` -> `'the quick\nbrown fox'`

## src/escape.js
- `escapeHtml(text)`: escapes `& < > " '`. `escapeHtml('<b>"hi"</b>')` -> `'&lt;b&gt;&quot;hi&quot;&lt;/b&gt;'`
- `unescapeHtml(text)`: single-pass inverse, so `unescapeHtml(escapeHtml(s)) === s`. `unescapeHtml('&amp;lt;')` -> `'&lt;'`

## src/pad.js
- `padCenter(text, width, fill = ' ')`: centers text in `width` characters; with odd padding the extra character goes on the right. `padCenter('ab', 5, '*')` -> `'*ab**'`

## src/count.js
- `countOccurrences(text, needle)`: non-overlapping, case-sensitive count; `0` for an empty needle. `countOccurrences('aaaa', 'aa')` -> `2`

## src/template.js
- `template(text, values)`: replaces `{{name}}` (optional inner whitespace) with `String(values[name])`; names are own keys only, unknown placeholders are left as written. `template('Hi {{name}} {{x}}', { name: 'Ann' })` -> `'Hi Ann {{x}}'`
