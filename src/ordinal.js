/**
 * Formats an integer with its English ordinal suffix, e.g. 1 -> "1st",
 * 12 -> "12th", 23 -> "23rd". Negatives keep their sign: -1 -> "-1st".
 * @param {number} n An integer.
 * @returns {string}
 * @throws {TypeError} If `n` is not an integer number.
 */
export function ordinal(n) {
  if (typeof n !== "number" || !Number.isInteger(n)) {
    throw new TypeError("n must be an integer");
  }
  const abs = Math.abs(n);
  const lastTwo = abs % 100;
  let suffix = "th";
  if (lastTwo < 11 || lastTwo > 13) {
    const last = abs % 10;
    if (last === 1) suffix = "st";
    else if (last === 2) suffix = "nd";
    else if (last === 3) suffix = "rd";
  }
  return `${n === 0 ? 0 : n}${suffix}`;
}

