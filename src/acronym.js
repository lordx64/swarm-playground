/**
 * Builds an uppercase acronym from a phrase.
 * Words are split on whitespace and hyphens; empty words are ignored.
 *
 * @param {string} text - The phrase, e.g. "portable network graphics".
 * @returns {string} The acronym, e.g. "PNG"; "" for empty input.
 * @throws {TypeError} If `text` is not a string.
 */
export function acronym(text) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }
  return text
    .split(/[\s-]+/)
    .filter((word) => word.length > 0)
    .map((word) => String.fromCodePoint(word.codePointAt(0)).toUpperCase())
    .join("");
}

