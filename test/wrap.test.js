import test from 'node:test';
import assert from 'node:assert/strict';
import { wrap } from '../src/wrap.js';

test('wraps at word boundaries', () => {
  assert.equal(wrap('the quick brown fox', 10), 'the quick\nbrown fox');
});

test('line of exactly width is allowed', () => {
  assert.equal(wrap('abcde fghij', 11), 'abcde fghij');
  assert.equal(wrap('abcde fghij', 10), 'abcde\nfghij');
});

test('never exceeds width unless a word is longer', () => {
  const out = wrap('a supercalifragilistic word is here ok', 8);
  assert.equal(out, 'a\nsupercalifragilistic\nword is\nhere ok');
  for (const l of out.split('\n')) {
    assert.ok(l.length <= 8 || !l.includes(' '));
  }
});

test('keeps existing newlines and collapses spaces', () => {
  assert.equal(wrap('aa  bb\ncc dd ee', 5), 'aa bb\ncc dd\nee');
});

test('short text and empty text unchanged', () => {
  assert.equal(wrap('hi', 80), 'hi');
  assert.equal(wrap('', 10), '');
});

test('tiny width puts each word on its own line', () => {
  assert.equal(wrap('a b c', 0), 'a\nb\nc');
});

