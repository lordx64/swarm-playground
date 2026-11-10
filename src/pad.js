/**
 * Centers text in a field of `width` characters using `fill`. When the padding
 * is odd the extra character goes on the right. The fill string is repeated
 * and truncated as needed. Text already at least `width` long is returned as is.
 * @param {string} text
 * @param {number} width
 * @param {string} [fill=' '] Empty fill falls back to a space.
 * @returns {string}
 */
export function padCenter(text, width, fill = ' ') {
  const s = String(text);
  const f = String(fill) === '' ? ' ' : String(fill);
  const total = Math.floor(width) - s.length;
  if (!(total > 0)) return s;
  const left = Math.floor(total / 2);
  const right = total - left;
  return f.repeat(left).slice(0, left) + s + f.repeat(right).slice(0, right);
}

