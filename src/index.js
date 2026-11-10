// textkit: small, dependency-free string helpers.

/** Turn any text into a URL-safe slug: "Hello, World!" -> "hello-world". */
export function slugify (text) {
  return String(text)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Count words separated by whitespace. */
export function wordCount (text) {
  const trimmed = String(text).trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}

/**
 * Shorten text to at most `max` characters (ellipsis included), cutting at a
 * word boundary where possible: truncate("The quick brown fox", 12) -> "The quick…".
 * Text that already fits is returned unchanged. If `max` is smaller than the
 * ellipsis, the ellipsis itself is cut to `max` characters.
 */
export function truncate (text, max, ellipsis = '…') {
  const str = String(text)
  const limit = Math.max(0, Math.floor(max))
  if (str.length <= limit) return str
  const budget = limit - ellipsis.length
  if (budget <= 0) return ellipsis.slice(0, limit)
  let cut = str.slice(0, budget)
  if (!/\s/.test(str[budget])) {
    const lastSpace = cut.search(/\s\S*$/)
    if (lastSpace > 0) cut = cut.slice(0, lastSpace)
  }
  return cut.trimEnd() + ellipsis
}

const SMALL_WORDS = new Set(['a', 'an', 'the', 'and', 'or', 'of', 'in', 'on', 'to'])

/**
 * Capitalize each whitespace-separated word and lowercase the rest of it.
 * The small words a, an, the, and, or, of, in, on, to stay lowercase unless
 * they are the first or last word: titleCase("the lord of the rings") -> "The Lord of the Rings".
 * Whitespace is preserved as is.
 */
export function titleCase (text) {
  const parts = String(text).split(/(\s+)/)
  const wordIdx = []
  parts.forEach((p, i) => { if (p && !/^\s+$/.test(p)) wordIdx.push(i) })
  const first = wordIdx[0]
  const last = wordIdx[wordIdx.length - 1]
  for (const i of wordIdx) {
    const lower = parts[i].toLowerCase()
    parts[i] = SMALL_WORDS.has(lower) && i !== first && i !== last
      ? lower
      : lower.charAt(0).toUpperCase() + lower.slice(1)
  }
  return parts.join('')
}

/**
 * Remove the common leading indentation from every line and drop blank
 * first/last lines. Whitespace-only lines are ignored when measuring the
 * indentation and become empty. Line endings are normalized to "\n".
 */
export function dedent (text) {
  const lines = String(text).split(/\r?\n/)
  while (lines.length && !lines[0].trim()) lines.shift()
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop()
  let indent = Infinity
  for (const line of lines) {
    if (!line.trim()) continue
    indent = Math.min(indent, line.match(/^[ \t]*/)[0].length)
  }
  if (indent === Infinity) indent = 0
  return lines.map(line => (line.trim() ? line.slice(indent) : '')).join('\n')
}

