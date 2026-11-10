const TABLE = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

/**
 * Converts an integer to a canonical Roman numeral.
 * @param {number} n Integer from 1 to 3999.
 * @returns {string} The Roman numeral, e.g. 1994 -> "MCMXCIV".
 * @throws {RangeError} If n is not an integer in 1..3999.
 */
export function toRoman(n) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) {
    throw new RangeError("toRoman expects an integer between 1 and 3999");
  }
  let rest = n;
  let out = "";
  for (const [value, symbol] of TABLE) {
    while (rest >= value) {
      out += symbol;
      rest -= value;
    }
  }
  return out;
}

/**
 * Converts a canonical, uppercase Roman numeral to an integer.
 * @param {string} s Roman numeral representing 1..3999.
 * @returns {number} The integer value, e.g. "MCMXCIV" -> 1994.
 * @throws {RangeError} If s is not a string or not a canonical numeral in range.
 */
export function fromRoman(s) {
  if (typeof s !== "string" || s === "") {
    throw new RangeError("fromRoman expects a non-empty string");
  }
  let rest = s;
  let total = 0;
  for (const [value, symbol] of TABLE) {
    while (rest.startsWith(symbol)) {
      total += value;
      rest = rest.slice(symbol.length);
    }
  }
  // Greedy parse must consume everything and round-trip, which rejects
  // non-canonical forms such as "IIII", "VX" or "IC".
  if (rest !== "" || total < 1 || total > 3999 || toRoman(total) !== s) {
    throw new RangeError(`Invalid Roman numeral: ${s}`);
  }
  return total;
}

