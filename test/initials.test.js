import { test } from "node:test";
import assert from "node:assert/strict";
import { initials } from "../src/initials.js";

test("basic two-word name", () => {
  assert.equal(initials("Ada Lovelace"), "AL");
});

test("uppercases lowercase input", () => {
  assert.equal(initials("ada lovelace"), "AL");
});

test("defaults to at most two initials", () => {
  assert.equal(initials("Augusta Ada King Lovelace"), "AA");
});

test("custom max", () => {
  assert.equal(initials("Augusta Ada King Lovelace", 3), "AAK");
  assert.equal(initials("Augusta Ada King Lovelace", 10), "AAKL");
  assert.equal(initials("Ada Lovelace", 1), "A");
  assert.equal(initials("Ada Lovelace", 0), "");
});

test("single word", () => {
  assert.equal(initials("Plato"), "P");
});

test("trims and collapses whitespace", () => {
  assert.equal(initials("  Ada \t\n  Lovelace  "), "AL");
});

test("hyphens separate words", () => {
  assert.equal(initials("Jean-Paul Sartre"), "JP");
  assert.equal(initials("Jean-Paul Sartre", 3), "JPS");
  assert.equal(initials("--Ada--"), "A");
});

test("empty and blank input", () => {
  assert.equal(initials(""), "");
  assert.equal(initials("   "), "");
  assert.equal(initials("---"), "");
});

test("non-ASCII letters", () => {
  assert.equal(initials("émile zola"), "ÉZ");
});

test("astral code points are not split", () => {
  assert.equal(initials("𝒜da Lovelace"), "𝒜L");
});

test("non-string name throws TypeError", () => {
  for (const bad of [undefined, null, 42, {}, [], ["Ada"]]) {
    assert.throws(() => initials(bad), TypeError);
  }
});

test("invalid max throws TypeError", () => {
  for (const bad of [-1, 1.5, NaN, "2", null]) {
    assert.throws(() => initials("Ada Lovelace", bad), TypeError);
  }
});

