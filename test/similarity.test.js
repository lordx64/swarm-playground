import test from 'node:test';
import assert from 'node:assert/strict';
import { levenshtein, similarity } from '../src/similarity.js';

test('levenshtein classic examples', () => {
  assert.equal(levenshtein('kitten', 'sitting'), 3);
  assert.equal(levenshtein('flaw', 'lawn'), 2);
  assert.equal(levenshtein('saturday', 'sunday'), 3);
});
test('levenshtein identical strings', () => assert.equal(levenshtein('abc', 'abc'), 0));
test('levenshtein with empty strings', () => {
  assert.equal(levenshtein('', ''), 0);
  assert.equal(levenshtein('', 'abc'), 3);
  assert.equal(levenshtein('abcd', ''), 4);
});
test('levenshtein single edits', () => {
  assert.equal(levenshtein('abc', 'abcd'), 1);
  assert.equal(levenshtein('abc', 'ab'), 1);
  assert.equal(levenshtein('abc', 'axc'), 1);
});
test('levenshtein is symmetric', () => {
  assert.equal(levenshtein('intention', 'execution'), levenshtein('execution', 'intention'));
  assert.equal(levenshtein('intention', 'execution'), 5);
});
test('levenshtein is case-sensitive', () => assert.equal(levenshtein('a', 'A'), 1));
test('levenshtein counts code points', () => {
  assert.equal(levenshtein('😀', '🎉'), 1);
  assert.equal(levenshtein('a😀', 'a'), 1);
});
test('levenshtein coerces non-strings', () => assert.equal(levenshtein(123, 133), 1));
test('similarity bounds', () => {
  assert.equal(similarity('abc', 'abc'), 1);
  assert.equal(similarity('abc', 'xyz'), 0);
  assert.equal(similarity('', ''), 1);
  assert.equal(similarity('', 'abc'), 0);
});
test('similarity values', () => {
  assert.equal(similarity('abcd', 'abce'), 0.75);
  assert.equal(similarity('ab', 'abcd'), 0.5);
  assert.ok(Math.abs(similarity('kitten', 'sitting') - (1 - 3 / 7)) < 1e-12);
});
test('similarity is symmetric and within 0..1', () => {
  const pairs = [['hello', 'help'], ['a', 'abcdef'], ['', 'x'], ['same', 'same'], ['😀a', 'a']];
  for (const [a, b] of pairs) {
    const s = similarity(a, b);
    assert.equal(s, similarity(b, a));
    assert.ok(s >= 0 && s <= 1);
  }
});
