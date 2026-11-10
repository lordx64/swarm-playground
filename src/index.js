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
