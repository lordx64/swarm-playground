/**
 * Formats a millisecond duration as e.g. "1d 2h 3m 4s". Zero parts are
 * omitted, "0s" is returned when under one second, and the sub-second
 * remainder is truncated.
 * @param {number} ms Non-negative, finite number of milliseconds.
 * @returns {string}
 * @throws {TypeError} If `ms` is not a number.
 * @throws {RangeError} If `ms` is NaN, infinite or negative.
 */
export function formatDuration(ms) {
  if (typeof ms !== "number") throw new TypeError("ms must be a number");
  if (!Number.isFinite(ms) || ms < 0) throw new RangeError("ms must be finite and >= 0");
  let total = Math.floor(ms / 1000);
  const units = [["d", 86400], ["h", 3600], ["m", 60], ["s", 1]];
  const parts = [];
  for (const [label, size] of units) {
    const n = Math.floor(total / size);
    total -= n * size;
    if (n > 0) parts.push(`${n}${label}`);
  }
  return parts.length ? parts.join(" ") : "0s";
}

