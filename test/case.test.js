import test from 'node:test';
import assert from 'node:assert/strict';
import { camelCase, snakeCase, kebabCase, pascalCase } from '../src/case.js';

const inputs = ['foo bar baz', 'foo_bar-baz', 'fooBarBaz', 'FooBarBaz', 'FOO BAR BAZ', '  foo..bar,,baz!! '];

test('all four agree on word splitting', () => {
  for (const i of inputs) {
    assert.equal(camelCase(i), 'fooBarBaz', i);
    assert.equal(snakeCase(i), 'foo_bar_baz', i);
    assert.equal(kebabCase(i), 'foo-bar-baz', i);
    assert.equal(pascalCase(i), 'FooBarBaz', i);
  }
});

test('acronym boundaries', () => {
  assert.equal(snakeCase('XMLHttpRequest'), 'xml_http_request');
  assert.equal(camelCase('XMLHttpRequest'), 'xmlHttpRequest');
  assert.equal(pascalCase('parse HTML'), 'ParseHtml');
});

test('digits stay attached to words', () => {
  assert.equal(kebabCase('version2Beta'), 'version2-beta');
  assert.equal(snakeCase('h2o level 3'), 'h2o_level_3');
});

test('single word', () => {
  assert.equal(camelCase('Hello'), 'hello');
  assert.equal(pascalCase('hello'), 'Hello');
});

test('empty and punctuation-only input', () => {
  for (const f of [camelCase, snakeCase, kebabCase, pascalCase]) {
    assert.equal(f(''), '');
    assert.equal(f(' -_. '), '');
  }
});

test('unicode letters', () => {
  assert.equal(snakeCase('élanVital'), 'élan_vital');
  assert.equal(pascalCase('über cool'), 'ÜberCool');
});

