/**
 * Reverses the order of the whitespace-separated words in `text`. The words
 * themselves are left as they are and the result is joined with single spaces,
 * so leading, trailing and repeated whitespace is dropped.
 * @param {string} text
 * @returns {string}
 */
export function reverseWords(text) {
  const trimmed = String(text).trim();
  return trimmed ? trimmed.split(/\s+/).reverse().join(' ') : '';
}

/**
 * Reverses the characters of `text`. It works on Unicode code points, so
 * surrogate pairs such as emoji stay intact.
 * @param {string} text
 * @returns {string}
 */
export function reverseChars(text) {
  return Array.from(String(text)).reverse().join('');
}
