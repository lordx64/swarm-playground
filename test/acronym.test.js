import { test } from "node:test";
import assert from "node:assert/strict";
import { acronym } from "../src/acronym.js";

test("basic phrase", () => {
  assert.equal(acronym("portable network graphics"), "PNG");
});

test("keeps already-uppercase input", () => {
  assert.equal(acronym("Portable Network Graphics"), "PNG");
});

test("no word limit", () => {
  assert.equal(acronym("as soon as possible please"), "ASAPP");
});

test("single word", () => {
  assert.equal(acronym("hello"), "H");
});

test("trims and collapses whitespace", () => {
  assert.equal(acronym("  portable \t\n network   graphics  "), "PNG");
});

test("hyphens separate words", () => {
  assert.equal(acronym("point-to-point protocol"), "PTPP");
  assert.equal(acronym("--light--emitting-- diode"), "LED");
});

test("empty and blank input", () => {
  assert.equal(acronym(""), "");
  assert.equal(acronym("   "), "");
  assert.equal(acronym("---"), "");
});

test("non-ASCII letters", () => {
  assert.equal(acronym("école normale supérieure"), "ÉNS");
});

test("astral code points are not split", () => {
  assert.equal(acronym("𝒜bc def"), "𝒜D");
});

test("non-string input throws TypeError", () => {
  for (const bad of [undefined, null, 42, {}, [], ["a b"]]) {
    assert.throws(() => acronym(bad), TypeError);
  }
});

