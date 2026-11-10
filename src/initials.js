/**
 * Builds an uppercase initials string from a personal name.
 * Words are split on whitespace and hyphens; empty words are ignored.
 *
 * @param {string} name - The full name, e.g. "Ada Lovelace".
 * @param {number} [max=2] - Maximum number of initials to return.
 * @returns {string} The initials, e.g. "AL"; "" for empty input.
 * @throws {TypeError} If `name` is not a string or `max` is not a non-negative integer.
 */
export function initials(name, max = 2) {
  if (typeof name !== "string") {
    throw new TypeError("name must be a string");
  }
  if (!Number.isInteger(max) || max < 0) {
    throw new TypeError("max must be a non-negative integer");
  }
  return name
    .split(/[\s-]+/)
    .filter((word) => word.length > 0)
    .slice(0, max)
    .map((word) => String.fromCodePoint(word.codePointAt(0)).toUpperCase())
    .join("");
}

