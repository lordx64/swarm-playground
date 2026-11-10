import { test } from "node:test";
import assert from "node:assert/strict";
import { formatBytes } from "../src/bytes.js";

test("zero and small values use bytes", () => {
  assert.equal(formatBytes(0), "0 B");
  assert.equal(formatBytes(1), "1 B");
  assert.equal(formatBytes(1023), "1023 B");
});

test("kilobytes with one decimal", () => {
  assert.equal(formatBytes(1536), "1.5 KB");
  assert.equal(formatBytes(2560), "2.5 KB");
});

test("whole numbers drop the decimal", () => {
  assert.equal(formatBytes(1024), "1 KB");
  assert.equal(formatBytes(2048), "2 KB");
  assert.equal(formatBytes(1024 ** 2), "1 MB");
  assert.equal(formatBytes(1024 ** 3), "1 GB");
});

test("megabytes and gigabytes", () => {
  assert.equal(formatBytes(1.5 * 1024 ** 2), "1.5 MB");
  assert.equal(formatBytes(5 * 1024 ** 3), "5 GB");
  assert.equal(formatBytes(2.25 * 1024 ** 3), "2.3 GB");
});

test("rounds to one decimal", () => {
  assert.equal(formatBytes(1100), "1.1 KB");
  assert.equal(formatBytes(1030), "1 KB");
});

test("rounding up to 1024 moves to the next unit", () => {
  assert.equal(formatBytes(1048575), "1 MB");
  assert.equal(formatBytes(1023.96), "1 KB");
  assert.equal(formatBytes(1024 ** 3 - 1), "1 GB");
});

test("caps at GB", () => {
  assert.equal(formatBytes(1024 ** 4), "1024 GB");
  assert.equal(formatBytes(2 * 1024 ** 4), "2048 GB");
});

test("fractional bytes", () => {
  assert.equal(formatBytes(0.5), "0.5 B");
});

test("non-number or non-finite throws TypeError", () => {
  for (const bad of [undefined, null, "1024", {}, [], NaN, Infinity, -Infinity]) {
    assert.throws(() => formatBytes(bad), TypeError);
  }
});

test("negative throws RangeError", () => {
  assert.throws(() => formatBytes(-1), RangeError);
  assert.throws(() => formatBytes(-1024), RangeError);
});
