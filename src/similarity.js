/**
 * Levenshtein edit distance: the minimum number of single-character
 * insertions, deletions and substitutions needed to turn `a` into `b`.
 * Works on Unicode code points, so an emoji counts as one character.
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function levenshtein(a, b) {
  const x = Array.from(String(a));
  const y = Array.from(String(b));
  if (x.length === 0) return y.length;
  if (y.length === 0) return x.length;
  let prev = Array.from({ length: y.length + 1 }, (_, j) => j);
  for (let i = 1; i <= x.length; i++) {
    const row = [i];
    for (let j = 1; j <= y.length; j++) {
      const cost = x[i - 1] === y[j - 1] ? 0 : 1;
      row[j] = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = row;
  }
  return prev[y.length];
}

/**
 * Similarity of two strings from 0 (nothing in common) to 1 (identical),
 * computed as 1 - levenshtein(a, b) / length of the longer string. Two empty
 * strings are identical (1). Comparison is case-sensitive.
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function similarity(a, b) {
  const longest = Math.max(Array.from(String(a)).length, Array.from(String(b)).length);
  if (longest === 0) return 1;
  return 1 - levenshtein(a, b) / longest;
}
