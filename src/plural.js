/**
 * Pluralizes a regular English noun according to a count.
 * Handles sibilant endings (-s, -x, -z, -ch, -sh -> -es) and consonant + y
 * (-> -ies); everything else just gets -s. Irregular nouns are not handled.
 * An all-uppercase word gets an uppercase suffix ("BOX" -> "BOXES").
 *
 * @param {string} word - The singular noun, e.g. "city".
 * @param {number} count - How many there are; exactly 1 returns `word` unchanged.
 * @returns {string} The word, pluralized unless `count` is 1, e.g. "cities".
 * @throws {TypeError} If `word` is not a string or `count` is not a number.
 */
export function pluralize(word, count) {
  if (typeof word !== "string") {
    throw new TypeError("word must be a string");
  }
  if (typeof count !== "number" || Number.isNaN(count)) {
    throw new TypeError("count must be a number");
  }
  if (count === 1 || word.length === 0) {
    return word;
  }
  const upper = word !== word.toLowerCase() && word === word.toUpperCase();
  const suffix = (s) => (upper ? s.toUpperCase() : s);
  const lower = word.toLowerCase();
  if (/(s|x|z|ch|sh)$/.test(lower)) {
    return word + suffix("es");
  }
  if (/[^aeiou]y$/.test(lower)) {
    return word.slice(0, -1) + suffix("ies");
  }
  return word + suffix("s");
}
