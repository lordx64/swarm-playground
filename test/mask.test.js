import test from 'node:test';
import assert from 'node:assert/strict';
import { maskEmail, maskMiddle } from '../src/mask.js';

test('maskEmail basics', () => {
  assert.equal(maskEmail('ada@example.com'), 'a**@example.com');
  assert.equal(maskEmail('grace.hopper@navy.mil'), 'g***********@navy.mil');
});
test('maskEmail short local parts', () => {
  assert.equal(maskEmail('a@b.co'), 'a@b.co');
  assert.equal(maskEmail('ab@b.co'), 'a*@b.co');
});
test('maskEmail splits at the last @', () => {
  assert.equal(maskEmail('a@b@c.com'), 'a**@c.com');
});
test('maskEmail leaves non-emails unchanged', () => {
  assert.equal(maskEmail('not an email'), 'not an email');
  assert.equal(maskEmail('@example.com'), '@example.com');
  assert.equal(maskEmail(''), '');
});
test('maskEmail keeps surrogate pairs whole', () => {
  assert.equal(maskEmail('😀ab@x.io'), '😀**@x.io');
});
test('maskMiddle defaults', () => {
  assert.equal(maskMiddle('1234567890'), '12******90');
  assert.equal(maskMiddle('secret'), 'se**et');
});
test('maskMiddle custom visible', () => {
  assert.equal(maskMiddle('1234567890', 1), '1********0');
  assert.equal(maskMiddle('1234567890', 4), '1234**7890');
});
test('maskMiddle custom char', () => {
  assert.equal(maskMiddle('1234567890', 2, '#'), '12######90');
  assert.equal(maskMiddle('abcdef', 1, 'xy'), 'axyxyxyxyf');
});
test('maskMiddle masks everything when too short to hide a middle', () => {
  assert.equal(maskMiddle('abcd', 2), '****');
  assert.equal(maskMiddle('abc', 2), '***');
  assert.equal(maskMiddle('a'), '*');
  assert.equal(maskMiddle(''), '');
});
test('maskMiddle with visible 0 masks everything', () => {
  assert.equal(maskMiddle('abc', 0), '***');
});
test('maskMiddle tolerates negative and fractional visible', () => {
  assert.equal(maskMiddle('abc', -3), '***');
  assert.equal(maskMiddle('abcdef', 1.9), 'a****f');
  assert.equal(maskMiddle('abcdef', NaN), '******');
});
test('maskMiddle counts code points', () => {
  assert.equal(maskMiddle('😀😀😀😀😀', 1), '😀***😀');
});
test('maskMiddle coerces non-strings', () => assert.equal(maskMiddle(123456, 1), '1****6'));
