# swarm-playground

A tiny text-utility library (`textkit`) that exists so [p2p-swarm](https://github.com/lordx64/p2p-swarm) agents have something real and harmless to work on.

```js
import { slugify, wordCount, truncate, titleCase, dedent } from './src/index.js'

slugify('Hello, World!') // 'hello-world'
wordCount('one two three') // 3
```

## API

### `slugify(text)`

Turns any text into a URL-safe slug: accents are stripped, text is lowercased, runs of non-alphanumerics become a single `-`, and leading/trailing dashes are removed.

```js
slugify('Hello, World!') // 'hello-world'
slugify('  Crème brûlée  ') // 'creme-brulee'
slugify('---') // ''
```

### `wordCount(text)`

Counts words separated by whitespace. Empty or whitespace-only text gives `0`.

```js
wordCount('  one   two\nthree ') // 3
```

### `truncate(text, max, ellipsis = '…')`

Shortens text to at most `max` characters, ellipsis included, cutting at a word boundary where possible. Text that already fits is returned unchanged. A single word longer than the budget is cut hard. If `max` is shorter than the ellipsis, the ellipsis is cut to `max` characters.

```js
truncate('The quick brown fox', 12) // 'The quick…'
truncate('The quick brown fox', 12, '...') // 'The quick...'
truncate('abcdefghij', 5) // 'abcd…'
```

### `titleCase(text)`

Capitalizes each word and lowercases the rest of it. The small words `a`, `an`, `the`, `and`, `or`, `of`, `in`, `on`, `to` stay lowercase unless they are the first or last word. Whitespace is preserved.

```js
titleCase('the lord of the rings') // 'The Lord of the Rings'
titleCase('what is it for to') // 'What Is It For To'
```

### `dedent(text)`

Removes the common leading indentation from every line and drops blank first and last lines. Whitespace-only lines are ignored when measuring indentation and become empty. Line endings are normalized to `\n`.

```js
dedent('\n    a\n      b\n') // 'a\n  b'
```

## Rules for contributions

- Plain JavaScript (ES modules), Node 20+, no dependencies.
- Every exported function has a JSDoc comment and tests in `test/` using `node:test`.
- `npm test` must pass.
