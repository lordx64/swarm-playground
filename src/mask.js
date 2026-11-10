/**
 * Masks an email address, keeping the first character of the local part and
 * the whole domain: maskEmail('ada@example.com') -> 'a**@example.com'.
 * The local part is split from the domain at the last "@". Input with no "@"
 * or with an empty local part is returned unchanged.
 * @param {string} email
 * @returns {string}
 */
export function maskEmail(email) {
  const s = String(email);
  const at = s.lastIndexOf('@');
  if (at <= 0) return s;
  const local = Array.from(s.slice(0, at));
  return local[0] + '*'.repeat(local.length - 1) + s.slice(at);
}

/**
 * Replaces the middle of `text` with `char`, keeping `visible` characters at
 * each end: maskMiddle('1234567890', 2) -> '12******90'. Works on Unicode code
 * points. Text of at most 2 * `visible` characters is masked entirely so that
 * nothing is revealed twice. `char` is repeated once per masked character.
 * @param {string} text
 * @param {number} [visible=2] Characters kept at each end; negative counts as 0.
 * @param {string} [char='*'] Mask character.
 * @returns {string}
 */
export function maskMiddle(text, visible = 2, char = '*') {
  const chars = Array.from(String(text));
  const keep = Math.max(0, Math.floor(visible)) || 0;
  if (chars.length <= keep * 2) return String(char).repeat(chars.length);
  const end = chars.length - keep;
  return chars.slice(0, keep).join('') + String(char).repeat(end - keep) + chars.slice(end).join('');
}
