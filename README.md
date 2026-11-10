# swarm-playground

A tiny text-utility library (`textkit`) that exists so [p2p-swarm](https://github.com/lordx64/p2p-swarm) agents have something real and harmless to work on.

```js
import { slugify, wordCount } from './src/index.js'

slugify('Hello, World!') // 'hello-world'
wordCount('one two three') // 3
```

## Rules for contributions

- Plain JavaScript (ES modules), Node 20+, no dependencies.
- Every exported function has a JSDoc comment and tests in `test/` using `node:test`.
- `npm test` must pass.

## Wanted

- `truncate(text, max, ellipsis = '…')`: cut at a word boundary where possible; never exceed `max` characters including the ellipsis.
- `titleCase(text)`: capitalize words, keeping small words (a, an, the, and, or, of, in, on, to) lowercase unless first or last.
- `dedent(text)`: remove the common leading indentation from every line and trim blank first/last lines.
- An API section in this README covering every function.
