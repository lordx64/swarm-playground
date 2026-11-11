# textkit

A tiny, dependency-free text-utility library for JavaScript.

## About

textkit is a small collection of string helpers: case conversion, slugs, counting, truncation and wrapping, HTML escaping, ordinals, Roman numerals, simple templating, reversing, masking, string similarity, pluralization, byte sizes and acronyms. It exists as a sandbox for [p2p-swarm](https://github.com/p2pswarm/p2p-swarm) agents to work on, so it is deliberately small and easy to read. It has no dependencies and is ESM-only.

## Install and usage

textkit is not published to npm. Clone the repository and import it from source. Node.js 20 or newer is required.

```sh
git clone https://github.com/p2pswarm/swarm-playground
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
  acronym,
  formatBytes,
  camelCase, snakeCase, kebabCase, pascalCase, titleCase, slugify,
  countOccurrences, wordCount,
  formatDuration,
  escapeHtml, unescapeHtml,
  initials,
  maskEmail, maskMiddle,
  ordinal,
  padCenter,
  pluralize,
  reverseWords, reverseChars,
  toRoman, fromRoman,
  levenshtein, similarity,
  template,
  wrap, truncate, dedent
} from './src/index.js'
```

### Acronym

#### `acronym(text)`

Builds an uppercase acronym from the first letter of each word. Words are split on whitespace and hyphens.

```js
acronym('portable network graphics') // → 'PNG'
```

### Bytes

#### `formatBytes(n)`

Formats a byte count with 1024-based units (`B`, `KB`, `MB`, `GB`) and at most one decimal; whole numbers have no `.0`. Throws a `RangeError` for negative numbers.

```js
formatBytes(1536) // → '1.5 KB'
formatBytes(1024) // → '1 KB'
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

### Mask

#### `maskEmail(email)`

Masks the local part of an email address, keeping its first character and the whole domain. Input without a usable `@` is returned unchanged.

```js
maskEmail('ada@example.com') // → 'a**@example.com'
```

#### `maskMiddle(text, visible = 2, char = '*')`

Replaces the middle of `text` with `char`, keeping `visible` characters at each end. Text too short to have a middle is masked entirely.

```js
maskMiddle('1234567890')         // → '12******90'
maskMiddle('1234567890', 1, '#') // → '1########0'
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

### Plural

#### `pluralize(word, count)`

Pluralizes a regular English noun unless `count` is exactly `1`. Handles `-es` endings and consonant + `y` → `-ies`; irregular nouns are not handled.

```js
pluralize('cat', 2)  // → 'cats'
pluralize('box', 2)  // → 'boxes'
pluralize('city', 3) // → 'cities'
pluralize('cat', 1)  // → 'cat'
```

### Reverse

#### `reverseWords(text)`

Reverses the order of the whitespace-separated words, joining them with single spaces.

```js
reverseWords('hello big world') // → 'world big hello'
```

#### `reverseChars(text)`

Reverses the characters of the text, keeping surrogate pairs such as emoji intact.

```js
reverseChars('abc')  // → 'cba'
reverseChars('a😀b') // → 'b😀a'
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

### Similarity

#### `levenshtein(a, b)`

The edit distance between two strings: the fewest single-character insertions, deletions and substitutions that turn `a` into `b`.

```js
levenshtein('kitten', 'sitting') // → 3
```

#### `similarity(a, b)`

How alike two strings are, from `0` to `1` (`1 - levenshtein(a, b) / length of the longer string`). Two empty strings score `1`.

```js
similarity('abcd', 'abce') // → 0.75
similarity('abc', 'xyz')   // → 0
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

- `src/` holds one module per topic (`acronym.js`, `bytes.js`, `case.js`, `count.js`, `duration.js`, `escape.js`, `initials.js`, `mask.js`, `ordinal.js`, `pad.js`, `plural.js`, `reverse.js`, `roman.js`, `similarity.js`, `template.js`, `wrap.js`); `src/index.js` re-exports the public API.
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
