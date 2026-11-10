import { test } from "node:test";
import assert from "node:assert/strict";
import { pluralize } from "../src/plural.js";

test("regular nouns add s", () => {
  assert.equal(pluralize("cat", 2), "cats");
  assert.equal(pluralize("dog", 5), "dogs");
});

test("sibilant endings add es", () => {
  assert.equal(pluralize("box", 2), "boxes");
  assert.equal(pluralize("bus", 2), "buses");
  assert.equal(pluralize("buzz", 2), "buzzes");
  assert.equal(pluralize("dish", 2), "dishes");
  assert.equal(pluralize("church", 2), "churches");
});

test("consonant + y becomes ies", () => {
  assert.equal(pluralize("city", 2), "cities");
  assert.equal(pluralize("baby", 3), "babies");
});

test("vowel + y just adds s", () => {
  assert.equal(pluralize("day", 2), "days");
  assert.equal(pluralize("key", 2), "keys");
  assert.equal(pluralize("boy", 2), "boys");
});

test("count 1 returns the word unchanged", () => {
  assert.equal(pluralize("cat", 1), "cat");
  assert.equal(pluralize("city", 1), "city");
  assert.equal(pluralize("BOX", 1), "BOX");
});

test("zero, negative, fractional and large counts are plural", () => {
  assert.equal(pluralize("cat", 0), "cats");
  assert.equal(pluralize("cat", -1), "cats");
  assert.equal(pluralize("cat", 1.5), "cats");
  assert.equal(pluralize("cat", 1000000), "cats");
  assert.equal(pluralize("cat", Infinity), "cats");
});

test("preserves capitalization of the word", () => {
  assert.equal(pluralize("Cat", 2), "Cats");
  assert.equal(pluralize("City", 2), "Cities");
  assert.equal(pluralize("Box", 2), "Boxes");
});

test("all-uppercase words get an uppercase suffix", () => {
  assert.equal(pluralize("BOX", 2), "BOXES");
  assert.equal(pluralize("CITY", 2), "CITIES");
  assert.equal(pluralize("CAT", 2), "CATS");
});

test("single-letter and empty words", () => {
  assert.equal(pluralize("x", 2), "xes");
  assert.equal(pluralize("y", 2), "ys");
  assert.equal(pluralize("", 2), "");
});

test("non-string word throws TypeError", () => {
  for (const bad of [undefined, null, 42, {}, [], ["cat"]]) {
    assert.throws(() => pluralize(bad, 2), TypeError);
  }
});

test("non-number count throws TypeError", () => {
  for (const bad of [undefined, null, "2", NaN, {}, []]) {
    assert.throws(() => pluralize("cat", bad), TypeError);
  }
});
