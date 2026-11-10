import test from 'node:test';
import assert from 'node:assert/strict';
import { template } from '../src/template.js';

test('replaces placeholders', () => {
  assert.equal(template('Hi {{name}}, you are {{age}}', { name: 'Ann', age: 30 }), 'Hi Ann, you are 30');
});

test('repeated placeholder', () => assert.equal(template('{{a}}{{a}}', { a: 'x' }), 'xx'));

test('unknown placeholders are left untouched as written', () => {
  assert.equal(template('{{a}} {{b}} {{ c }}', { a: 1 }), '1 {{b}} {{ c }}');
});

test('whitespace inside braces', () => {
  assert.equal(template('{{ a }}|{{  a}}|{{a   }}', { a: 1 }), '1|1|1');
});

test('falsy values are substituted', () => {
  assert.equal(template('{{a}}|{{b}}|{{c}}', { a: 0, b: '', c: false }), '0||false');
});

test('null and undefined count as present when the key exists', () => {
  assert.equal(template('{{a}} {{b}}', { a: null, b: undefined }), 'null undefined');
  assert.equal(template('{{a}}', {}), '{{a}}');
});

test('inherited properties are not values', () => {
  assert.equal(template('{{toString}} {{constructor}} {{__proto__}}', {}), '{{toString}} {{constructor}} {{__proto__}}');
});

test('dotted names are plain own keys', () => {
  assert.equal(template('{{user.name}}', { 'user.name': 'Ann' }), 'Ann');
  assert.equal(template('{{user.name}}', { user: { name: 'Ann' } }), '{{user.name}}');
});

test('names must start with a letter or underscore', () => {
  assert.equal(template('{{1a}} {{_a}}', { '1a': 'x', _a: 'y' }), '{{1a}} y');
});

test('values are not re-expanded or treated as replacement patterns', () => {
  assert.equal(template('{{a}}', { a: '$& {{b}}', b: 'no' }), '$& {{b}}');
});

test('non-string values are stringified', () => {
  assert.equal(template('{{a}} {{b}}', { a: [1, 2], b: true }), '1,2 true');
});

test('no placeholders / missing values object', () => {
  assert.equal(template('plain', {}), 'plain');
  assert.equal(template('{{a}}', undefined), '{{a}}');
  assert.equal(template('', {}), '');
});

test('single or malformed braces untouched', () => {
  assert.equal(template('{a} {{a} {{}} {{ }}', { a: 1 }), '{a} {{a} {{}} {{ }}');
});

