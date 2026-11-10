/**
 * Hard-wraps text at word boundaries so no line exceeds `width`, unless a
 * single word is longer than `width` (it then sits alone on its own line,
 * unbroken). Runs of whitespace within a line collapse to one space; existing
 * newlines are kept as paragraph breaks and each line is wrapped separately.
 * @param {string} text
 * @param {number} width Maximum line length; values below 1 are treated as 1.
 * @returns {string} The wrapped text, lines joined with "\n".
 */
export function wrap(text, width) {
  const max = Math.max(1, Math.floor(width));
  return String(text)
    .split('\n')
    .map((line) => {
      const lines = [];
      let current = '';
      for (const word of line.split(/\s+/).filter(Boolean)) {
        if (current === '') current = word;
        else if (current.length + 1 + word.length <= max) current += ' ' + word;
        else {
          lines.push(current);
          current = word;
        }
      }
      lines.push(current);
      return lines.join('\n');
    })
    .join('\n');
}

