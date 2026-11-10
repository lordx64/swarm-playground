# textkit

A tiny, dependency-free text-utility library for JavaScript.

## About

textkit is a small collection of string helpers: case conversion, slugs, counting, truncation and wrapping, HTML escaping, ordinals, Roman numerals and simple templating. It exists as a sandbox for [p2p-swarm](https://github.com/lordx64/p2p-swarm) agents to work on, so it is deliberately small and easy to read. It has no dependencies and is ESM-only.

## Install and usage

textkit is not published to npm. Clone the repository and import it from source. Node.js 20 or newer is required.

```sh
git clone https://github.com/lordx64/swarm-playground
cd swarm-playground
```

```js
import { slugify, camelCase } from './src/index.js'

slugify('Hello, World!')   // → 'hello-world'
camelCase('hello world')   // → 'helloWorld'
```

## API

```js
import {
  camelCase, snakeCase, kebabCase, pascalCase, titleCase, slugify,
  countOccurrences, wordCount,
  formatDuration,
  escapeHtml, unescapeHtml,
  initials,
  ordinal,
  padCenter,
  toRoman, fromRoman,
  template,
  wrap, truncate, dedent
} from './src/index.js'
```

### Case

#### `camelCase(text)`

Converts text to camelCase.

```js
camelCase('hello world') // → 'helloWorld'
```

#### `snakeCase(text)`

Converts text to snake_case.

```js
snakeCase('hello world') // → 'hello_world'
```

#### `kebabCase(text)`

Converts text to kebab-case.

```js
kebabCase('hello world') // → 'hello-world'
```

#### `pascalCase(text)`

Converts text to PascalCase.

```js
pascalCase('hello world') // → 'HelloWorld'
```

#### `titleCase(text)`

Capitalizes each word, keeping the small words `a`, `an`, `the`, `and`, `or`, `of`, `in`, `on`, `to` lowercase unless they are the first or last word.

```js
titleCase('the lord of the rings') // → 'The Lord of the Rings'
```

#### `slugify(text)`

Turns text into a URL-safe slug, stripping accents.

```js
slugify('Hello, World!') // → 'hello-world'
```

### Count

#### `countOccurrences(text, needle)`

Counts how many times a substring occurs in the text.

```js
countOccurrences('banana', 'an') // → 2
```

#### `wordCount(text)`

Counts whitespace-separated words.

```js
wordCount('one two three') // → 3
```

### Duration

#### `formatDuration(ms)`

Formats a number of milliseconds as a human-readable duration.

```js
formatDuration(90000)   // → '1m 30s'
formatDuration(3723000) // → '1h 2m 3s'
```

### Escape

#### `escapeHtml(text)`

Escapes HTML special characters as entities.

```js
escapeHtml('<b>') // → '&lt;b&gt;'
```

#### `unescapeHtml(text)`

Converts HTML entities back to the characters they stand for.

```js
unescapeHtml('&lt;b&gt;') // → '<b>'
```

### Initials

#### `initials(name, max = 2)`

Extracts initials from a name, at most `max` of them.

```js
initials('Ada Lovelace')             // → 'AL'
initials('Grace Brewster Hopper', 3) // → 'GBH'
```

### Ordinal

#### `ordinal(n)`

Adds the English ordinal suffix to a number.

```js
ordinal(3) // → '3rd'
```

### Pad

#### `padCenter(text, width, fill = ' ')`

Pads a string on both sides with `fill` so it is centered in `width` characters.

```js
padCenter('hi', 6)      // → '  hi  '
padCenter('hi', 7, '*') // → '**hi***'
```

### Roman

#### `toRoman(n)`

Converts a number to a Roman numeral.

```js
toRoman(4) // → 'IV'
```

#### `fromRoman(s)`

Parses a Roman numeral back into a number.

```js
fromRoman('XIV') // → 14
```

### Template

#### `template(text, values)`

Simple placeholder interpolation: replaces each `{{name}}` in `text` with the matching entry of `values`. Placeholders with no matching entry are left as they are.

```js
template('Hello, {{name}}!', { name: 'Ada' }) // → 'Hello, Ada!'
template('{{a}} and {{b}}', { a: 'x' })       // → 'x and {{b}}'
```

### Wrap

#### `wrap(text, width)`

Wraps text so lines fit within the given column width.

```js
wrap('a long piece of text', 10) // → 'a long\npiece of\ntext'
```

#### `truncate(text, max, ellipsis = '…')`

Shortens text to `max` characters, cutting at a word boundary and marking the cut with `ellipsis`.

```js
truncate('The quick brown fox', 12) // → 'The quick…'
```

#### `dedent(text)`

Removes the common leading indentation from every line and drops blank first and last lines.

```js
dedent('\n    a\n      b\n') // → 'a\n  b'
```

## Project layout

- `src/` holds one module per topic (`case.js`, `count.js`, `duration.js`, `escape.js`, `initials.js`, `ordinal.js`, `pad.js`, `roman.js`, `template.js`, `wrap.js`); `src/index.js` re-exports the public API.
- `test/` mirrors `src/` with one `*.test.js` file per module.

## Testing

```sh
npm test
```

This runs the suite with Node's built-in test runner (`node --test`). Node.js 20 or newer is required.

## Rules for contributions

- Plain JavaScript (ES modules), Node 20+, no dependencies.
- Every exported function has a JSDoc comment and tests in `test/` using `node:test`.
- `npm test` must pass.

## License

MIT
