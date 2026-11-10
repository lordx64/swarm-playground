import test from 'node:test';
import assert from 'node:assert/strict';
import { escapeHtml, unescapeHtml } from '../src/escape.js';

test('escapes all five characters', () => {
  assert.equal(escapeHtml(`& < > " '`), '&amp; &lt; &gt; &quot; &#39;');
});

test('escapes markup', () => {
  assert.equal(escapeHtml('<a href="x">'), '&lt;a href=&quot;x&quot;&gt;');
});

test('already-escaped text is escaped again', () => {
  assert.equal(escapeHtml('&lt;'), '&amp;lt;');
});

test('unescapes all five entities', () => {
  assert.equal(unescapeHtml('&amp; &lt; &gt; &quot; &#39;'), `& < > " '`);
});

test('unescape is single pass', () => {
  assert.equal(unescapeHtml('&amp;lt;'), '&lt;');
  assert.equal(unescapeHtml('&amp;amp;'), '&amp;');
  assert.equal(unescapeHtml('&amp;#39;'), '&#39;');
});

test('round trip', () => {
  const samples = ['', 'plain', '&lt;', '&amp;#39;', `<script>alert("x & 'y'")</script>`, `&&<<>>""''`, '&', '&amp'];
  for (const s of samples) {
    assert.equal(unescapeHtml(escapeHtml(s)), s);
  }
});

test('unknown entities untouched', () => {
  assert.equal(unescapeHtml('&nbsp; &foo; &#x27;'), '&nbsp; &foo; &#x27;');
});

test('empty string', () => {
  assert.equal(escapeHtml(''), '');
  assert.equal(unescapeHtml(''), '');
});

