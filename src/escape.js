const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const UNESCAPES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" };

/**
 * Escapes & < > " ' as HTML entities.
 * @param {string} text
 * @returns {string}
 */
export function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

/**
 * Reverses escapeHtml in a single pass, so "&amp;lt;" becomes "&lt;" (not "<")
 * and unescapeHtml(escapeHtml(s)) === s for every string. Unknown entities
 * are left untouched.
 * @param {string} text
 * @returns {string}
 */
export function unescapeHtml(text) {
  return String(text).replace(/&(?:amp|lt|gt|quot|#39);/g, (e) => UNESCAPES[e]);
}

