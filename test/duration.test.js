import test from "node:test";
import assert from "node:assert/strict";
import { formatDuration } from "../src/duration.js";

test("zero is 0s", () => assert.equal(formatDuration(0), "0s"));
test("sub-second is truncated to 0s", () => {
  assert.equal(formatDuration(1), "0s");
  assert.equal(formatDuration(999), "0s");
});
test("seconds only", () => {
  assert.equal(formatDuration(1000), "1s");
  assert.equal(formatDuration(59999), "59s");
});
test("minutes and seconds", () => {
  assert.equal(formatDuration(60000), "1m");
  assert.equal(formatDuration(61000), "1m 1s");
});
test("hours, minutes, seconds", () => {
  assert.equal(formatDuration(3723000), "1h 2m 3s");
});
test("zero parts are omitted", () => {
  assert.equal(formatDuration(3600000), "1h");
  assert.equal(formatDuration(3603000), "1h 3s");
  assert.equal(formatDuration(3660000), "1h 1m");
});
test("days", () => {
  assert.equal(formatDuration(86400000), "1d");
  assert.equal(formatDuration(93600000), "1d 2h");
  assert.equal(formatDuration(90061000), "1d 1h 1m 1s");
  assert.equal(formatDuration(100 * 86400000), "100d");
});
test("fractional input is truncated", () => {
  assert.equal(formatDuration(1999.9), "1s");
});
test("negative throws RangeError", () => {
  assert.throws(() => formatDuration(-1), RangeError);
});
test("non-finite throws RangeError", () => {
  assert.throws(() => formatDuration(NaN), RangeError);
  assert.throws(() => formatDuration(Infinity), RangeError);
});
test("non-number throws TypeError", () => {
  assert.throws(() => formatDuration("1000"), TypeError);
  assert.throws(() => formatDuration(undefined), TypeError);
  assert.throws(() => formatDuration(null), TypeError);
});

