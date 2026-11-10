import test from 'node:test'
import assert from 'node:assert/strict'
import { slugify, wordCount } from '../src/index.js'

test('slugify', () => {
  assert.equal(slugify('Hello, World!'), 'hello-world')
  assert.equal(slugify('  Crème brûlée  '), 'creme-brulee')
  assert.equal(slugify('---'), '')
})

test('wordCount', () => {
  assert.equal(wordCount(''), 0)
  assert.equal(wordCount('  one   two\nthree '), 3)
})
