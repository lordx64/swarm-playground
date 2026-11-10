import test from 'node:test';
import assert from 'node:assert/strict';
import { reverseWords, reverseChars } from '../src/reverse.js';

test('reverseWords basics', () => {
  assert.equal(reverseWords('hello world'), 'world hello');
  assert.equal(reverseWords('one two three'), 'three two one');
});
test('reverseWords single word', () => assert.equal(reverseWords('hello'), 'hello'));
test('reverseWords collapses whitespace', () => {
  assert.equal(reverseWords('  a   b\tc\nd  '), 'd c b a');
});
test('reverseWords empty and blank', () => {
  assert.equal(reverseWords(''), '');
  assert.equal(reverseWords('   '), '');
});
test('reverseWords coerces non-strings', () => assert.equal(reverseWords(12), '12'));
test('reverseChars basics', () => {
  assert.equal(reverseChars('abc'), 'cba');
  assert.equal(reverseChars('Hello, World!'), '!dlroW ,olleH');
});
test('reverseChars empty', () => assert.equal(reverseChars(''), ''));
test('reverseChars keeps surrogate pairs intact', () => {
  assert.equal(reverseChars('a😀b'), 'b😀a');
  assert.equal(reverseChars('😀🎉'), '🎉😀');
  assert.equal(reverseChars('𝒳y'), 'y𝒳');
});
test('reverseChars is its own inverse', () => {
  const s = 'ab😀 cd🎉';
  assert.equal(reverseChars(reverseChars(s)), s);
});
test('reverseChars coerces non-strings', () => assert.equal(reverseChars(123), '321'));
