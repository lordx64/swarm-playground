import test from 'node:test';
import assert from 'node:assert/strict';
import { padCenter } from '../src/pad.js';

test('even padding', () => assert.equal(padCenter('ab', 6), '  ab  '));
test('odd padding puts extra on the right', () => assert.equal(padCenter('ab', 5), ' ab  '));
test('custom fill', () => assert.equal(padCenter('hi', 6, '*'), '**hi**'));
test('multi-char fill is truncated', () => assert.equal(padCenter('x', 6, 'ab'), 'abxaba'));
test('already wide enough', () => {
  assert.equal(padCenter('hello', 5), 'hello');
  assert.equal(padCenter('hello', 2), 'hello');
});
test('empty text', () => assert.equal(padCenter('', 3, '-'), '---'));
test('empty fill falls back to space', () => assert.equal(padCenter('a', 3, ''), ' a '));

