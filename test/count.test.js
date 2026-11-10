import test from 'node:test';
import assert from 'node:assert/strict';
import { countOccurrences } from '../src/count.js';

test('basic', () => assert.equal(countOccurrences('a b a b a', 'a'), 3));
test('multi-character needle', () => assert.equal(countOccurrences('abcabcab', 'abc'), 2));
test('non-overlapping', () => {
  assert.equal(countOccurrences('aaaa', 'aa'), 2);
  assert.equal(countOccurrences('aaa', 'aa'), 1);
});
test('case-sensitive', () => assert.equal(countOccurrences('Aa aA', 'a'), 2));
test('empty needle is 0', () => {
  assert.equal(countOccurrences('abc', ''), 0);
  assert.equal(countOccurrences('', ''), 0);
});
test('no match / empty text', () => {
  assert.equal(countOccurrences('abc', 'x'), 0);
  assert.equal(countOccurrences('', 'a'), 0);
});
test('needle longer than text', () => assert.equal(countOccurrences('ab', 'abc'), 0));
test('special characters are literal', () => {
  assert.equal(countOccurrences('a.b.c', '.'), 2);
  assert.equal(countOccurrences('a*b*', '*'), 2);
});
test('needle equal to text', () => assert.equal(countOccurrences('abc', 'abc'), 1));

