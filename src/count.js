/**
 * Counts non-overlapping, case-sensitive occurrences of `needle` in `text`.
 * @param {string} text
 * @param {string} needle
 * @returns {number} 0 when `needle` is empty.
 */
export function countOccurrences(text, needle) {
  const s = String(text);
  const n = String(needle);
  if (n === '') return 0;
  let count = 0;
  let i = s.indexOf(n);
  while (i !== -1) {
    count++;
    i = s.indexOf(n, i + n.length);
  }
  return count;
}

