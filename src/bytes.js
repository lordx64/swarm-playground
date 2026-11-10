const UNITS = ["B", "KB", "MB", "GB"];

/**
 * Formats a byte count as a human-readable string using 1024-based units
 * (B, KB, MB, GB). The value is rounded to one decimal place and a
 * trailing ".0" is dropped. Values above 1024 GB stay in GB.
 *
 * @param {number} n - The number of bytes, e.g. 1536.
 * @returns {string} The formatted size, e.g. "1.5 KB".
 * @throws {TypeError} If `n` is not a finite number.
 * @throws {RangeError} If `n` is negative.
 */
export function formatBytes(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) {
    throw new TypeError("n must be a finite number");
  }
  if (n < 0) {
    throw new RangeError("n must not be negative");
  }
  let unit = 0;
  let value = n;
  while (unit < UNITS.length - 1 && Math.round(value * 10) / 10 >= 1024) {
    value /= 1024;
    unit += 1;
  }
  const rounded = Math.round(value * 10) / 10;
  return `${rounded} ${UNITS[unit]}`;
}
