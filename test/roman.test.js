import test from "node:test";
import assert from "node:assert/strict";
import { toRoman, fromRoman } from "../src/roman.js";

test("toRoman known values", () => {
  const known = {
    1: "I",
    4: "IV",
    5: "V",
    9: "IX",
    14: "XIV",
    40: "XL",
    90: "XC",
    400: "CD",
    900: "CM",
    1994: "MCMXCIV",
    2024: "MMXXIV",
    3888: "MMMDCCCLXXXVIII",
    3999: "MMMCMXCIX",
  };
  for (const [n, r] of Object.entries(known)) {
    assert.equal(toRoman(Number(n)), r);
  }
});

test("fromRoman known values", () => {
  assert.equal(fromRoman("I"), 1);
  assert.equal(fromRoman("IV"), 4);
  assert.equal(fromRoman("IX"), 9);
  assert.equal(fromRoman("MCMXCIV"), 1994);
  assert.equal(fromRoman("MMMCMXCIX"), 3999);
});

test("round-trips every value 1..3999", () => {
  for (let n = 1; n <= 3999; n++) {
    assert.equal(fromRoman(toRoman(n)), n);
  }
});

test("toRoman throws RangeError outside 1..3999", () => {
  for (const bad of [0, -1, 4000, 10000, -3999]) {
    assert.throws(() => toRoman(bad), RangeError, String(bad));
  }
});

test("toRoman throws RangeError for non-integers", () => {
  for (const bad of [1.5, NaN, Infinity, "5", null, undefined]) {
    assert.throws(() => toRoman(bad), RangeError, String(bad));
  }
});

test("fromRoman rejects empty and non-string input", () => {
  for (const bad of ["", 5, null, undefined, {}]) {
    assert.throws(() => fromRoman(bad), RangeError);
  }
});

test("fromRoman rejects invalid numerals", () => {
  for (const bad of ["ABC", "MMMM", "IIII", "VV", "VX", "IC", "IL", "XM", "IIV", "MCMC", "iv", " X", "X "]) {
    assert.throws(() => fromRoman(bad), RangeError, bad);
  }
});

