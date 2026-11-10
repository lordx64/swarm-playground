/**
 * Splits text into words on non-alphanumeric characters, lower-to-upper
 * boundaries ("fooBar") and acronym boundaries ("XMLHttp" -> "XML", "Http").
 * @param {string} text
 * @returns {string[]} The words, original casing preserved.
 */
function words(text) {
  return String(text)
    .replace(/([\p{Ll}\p{N}])(\p{Lu})/gu, '$1 $2')
    .replace(/(\p{Lu})(\p{Lu}\p{Ll})/gu, '$1 $2')
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}

/**
 * Uppercases the first character and lowercases the rest.
 * @param {string} word
 * @returns {string}
 */
function capitalize(word) {
  const lower = word.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/**
 * Converts text to camelCase.
 * @param {string} text
 * @returns {string} e.g. "fooBarBaz".
 */
export function camelCase(text) {
  return words(text)
    .map((w, i) => (i === 0 ? w.toLowerCase() : capitalize(w)))
    .join('');
}

/**
 * Converts text to snake_case.
 * @param {string} text
 * @returns {string} e.g. "foo_bar_baz".
 */
export function snakeCase(text) {
  return words(text).map((w) => w.toLowerCase()).join('_');
}

/**
 * Converts text to kebab-case.
 * @param {string} text
 * @returns {string} e.g. "foo-bar-baz".
 */
export function kebabCase(text) {
  return words(text).map((w) => w.toLowerCase()).join('-');
}

/**
 * Converts text to PascalCase.
 * @param {string} text
 * @returns {string} e.g. "FooBarBaz".
 */
export function pascalCase(text) {
  return words(text).map(capitalize).join('');
}

