/**
 * Replaces {{name}} placeholders with values. Optional whitespace is allowed
 * inside the braces ({{ name }}). Names match [A-Za-z_][\w.]* and are looked up
 * as own keys of `values` only (no prototype lookups). Unknown placeholders are
 * left untouched exactly as written. Inserted values are converted with
 * String() and are not re-expanded. A key that exists with a null or undefined
 * value is substituted as "null" / "undefined".
 * @param {string} text
 * @param {Record<string, unknown>} [values]
 * @returns {string}
 */
export function template(text, values) {
  const v = values ?? {};
  return String(text).replace(/\{\{\s*([A-Za-z_][\w.]*)\s*\}\}/g, (match, name) =>
    Object.hasOwn(v, name) ? String(v[name]) : match
  );
}

