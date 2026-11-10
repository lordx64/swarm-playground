import test from "node:test";
import assert from "node:assert/strict";
import { ordinal } from "../src/ordinal.js";

test("1, 2, 3 and 4", () => {
  assert.equal(ordinal(1), "1st");
  assert.equal(ordinal(2), "2nd");
  assert.equal(ordinal(3), "3rd");
  assert.equal(ordinal(4), "4th");
});

test("zero", () => {
  assert.equal(ordinal(0), "0th");
  assert.equal(ordinal(-0), "0th");
});

test("5 to 10 and 20", () => {
  for (const n of [5, 6, 7, 8, 9, 10, 20]) assert.equal(ordinal(n), `${n}th`);
});

test("teens are always th", () => {
  for (const n of [11, 12, 13, 14, 15, 16, 17, 18, 19]) {
    assert.equal(ordinal(n), `${n}th`);
  }
});

test("21, 22, 23, 24", () => {
  assert.equal(ordinal(21), "21st");
  assert.equal(ordinal(22), "22nd");
  assert.equal(ordinal(23), "23rd");
  assert.equal(ordinal(24), "24th");
});

test("hundreds: teens rule applies to the last two digits", () => {
  assert.equal(ordinal(100), "100th");
  assert.equal(ordinal(101), "101st");
  assert.equal(ordinal(102), "102nd");
  assert.equal(ordinal(103), "103rd");
  assert.equal(ordinal(111), "111th");
  assert.equal(ordinal(112), "112th");
  assert.equal(ordinal(113), "113th");
  assert.equal(ordinal(121), "121st");
  assert.equal(ordinal(1011), "1011th");
  assert.equal(ordinal(1001), "1001st");
});

test("negatives keep sign and use the magnitude's suffix", () => {
  assert.equal(ordinal(-1), "-1st");
  assert.equal(ordinal(-2), "-2nd");
  assert.equal(ordinal(-3), "-3rd");
  assert.equal(ordinal(-11), "-11th");
  assert.equal(ordinal(-12), "-12th");
  assert.equal(ordinal(-21), "-21st");
  assert.equal(ordinal(-112), "-112th");
});

test("non-integer numbers throw TypeError", () => {
  assert.throws(() => ordinal(1.5), TypeError);
  assert.throws(() => ordinal(NaN), TypeError);
  assert.throws(() => ordinal(Infinity), TypeError);
  assert.throws(() => ordinal(-Infinity), TypeError);
});

test("non-number input throws TypeError", () => {
  assert.throws(() => ordinal("1"), TypeError);
  assert.throws(() => ordinal(null), TypeError);
  assert.throws(() => ordinal(undefined), TypeError);
  assert.throws(() => ordinal(1n), TypeError);
});
