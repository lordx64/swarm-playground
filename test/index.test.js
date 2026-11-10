import test from 'node:test'
import assert from 'node:assert/strict'
import { slugify, wordCount, truncate, titleCase, dedent } from '../src/index.js'

test('slugify', () => {
  assert.equal(slugify('Hello, World!'), 'hello-world')
  assert.equal(slugify('  Crème brûlée  '), 'creme-brulee')
  assert.equal(slugify('---'), '')
})

test('wordCount', () => {
  assert.equal(wordCount(''), 0)
  assert.equal(wordCount('  one   two\nthree '), 3)
})

test('truncate leaves short text alone', () => {
  assert.equal(truncate('hello', 5), 'hello')
  assert.equal(truncate('hello', 10), 'hello')
  assert.equal(truncate('', 3), '')
})

test('truncate cuts at a word boundary', () => {
  assert.equal(truncate('The quick brown fox', 12), 'The quick…')
  assert.equal(truncate('The quick brown fox', 10), 'The quick…')
  assert.equal(truncate('The quick brown fox', 9), 'The…')
})

test('truncate falls back to a hard cut for long words', () => {
  assert.equal(truncate('abcdefghij', 5), 'abcd…')
  assert.equal(truncate('supercalifragilistic word', 8), 'superca…')
})

test('truncate never exceeds max', () => {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  for (let max = 0; max < 70; max++) {
    assert.ok(truncate(text, max).length <= max, 'max=' + max)
    assert.ok(truncate(text, max, '...').length <= max, 'max=' + max + ' dots')
  }
})

test('truncate custom and oversized ellipsis', () => {
  assert.equal(truncate('The quick brown fox', 12, '...'), 'The quick...')
  assert.equal(truncate('The quick brown fox', 2, '...'), '..')
  assert.equal(truncate('The quick brown fox', 0), '')
  assert.equal(truncate('The quick brown fox', 10, ''), 'The quick')
})

test('titleCase basics', () => {
  assert.equal(titleCase('hello world'), 'Hello World')
  assert.equal(titleCase('the lord of the rings'), 'The Lord of the Rings')
  assert.equal(titleCase('war and peace'), 'War and Peace')
})

test('titleCase first and last words are always capitalized', () => {
  assert.equal(titleCase('a tale to remember in'), 'A Tale to Remember In')
  assert.equal(titleCase('what is it for to'), 'What Is It For To')
  assert.equal(titleCase('of'), 'Of')
})

test('titleCase normalizes case and keeps whitespace', () => {
  assert.equal(titleCase('HELLO wORLD'), 'Hello World')
  assert.equal(titleCase('  one   two\nthree '), '  One   Two\nThree ')
  assert.equal(titleCase(''), '')
  assert.equal(titleCase('   '), '   ')
})

test('dedent removes common indentation', () => {
  assert.equal(dedent('    a\n    b'), 'a\nb')
  assert.equal(dedent('  a\n    b\n  c'), 'a\n  b\nc')
})

test('dedent trims blank first and last lines', () => {
  assert.equal(dedent('\n    a\n    b\n'), 'a\nb')
  assert.equal(dedent('\n\n  a\n\n  '), 'a')
})

test('dedent ignores blank lines when measuring', () => {
  assert.equal(dedent('  a\n\n  b'), 'a\n\nb')
  assert.equal(dedent('  a\n      \n  b'), 'a\n\nb')
})

test('dedent edge cases', () => {
  assert.equal(dedent(''), '')
  assert.equal(dedent('   \n  '), '')
  assert.equal(dedent('no indent\n  some'), 'no indent\n  some')
  assert.equal(dedent('\t\ta\n\t\t\tb'), 'a\n\tb')
  assert.equal(dedent('  a\r\n  b'), 'a\nb')
})

test('the entry point exports the whole public API', async () => {
  const api = await import('../src/index.js')
  assert.deepEqual(Object.keys(api).sort(), [
    'camelCase', 'countOccurrences', 'dedent', 'escapeHtml', 'formatDuration', 'fromRoman', 'initials',
    'kebabCase', 'ordinal', 'padCenter', 'pascalCase', 'slugify', 'snakeCase', 'template', 'titleCase',
    'toRoman', 'truncate', 'unescapeHtml', 'wordCount', 'wrap'
  ])
})
