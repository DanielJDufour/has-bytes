const hasSubArrays = require("has-subarrays");

function len(arr) {
  if (arr.length !== undefined) return arr.length;
  if (arr.byteLength !== undefined) return arr.byteLength;
}

const isBuffer = data => typeof Buffer !== "undefined" && Buffer.isBuffer(data);

function isUndefined(value) {
  return value === undefined || value === null;
}

module.exports = function hasBytes({
  data,
  debug = false,
  end,
  sequences,
  start,
  threshold
}) {
  // validate data
  if (!data) throw new Error("[has-bytes] you must specify data");

  const valid =
    data instanceof ArrayBuffer || data instanceof Uint8Array || isBuffer(data);

  if (!valid) {
    throw new Error(
      "[has-bytes] data must be an ArrayBuffer, Buffer, or Uint8Array"
    );
  }

  if (isUndefined(start)) start = 0;
  if (debug) console.log("[has-bytes] start:", start);
  if (isUndefined(end)) end = len(data) - 1;
  if (debug) console.log("[has-bytes] end:", end);

  if (data instanceof ArrayBuffer || isBuffer(data)) {
    const length = end - start;
    data = new Uint8Array(data, start, length);
    start = 0;
    if (debug) console.log("[has-bytes] set start to zero");
    end = length;
    if (debug) console.log("[has-bytes] set end to ", length);
  }

  if (isUndefined(threshold)) threshold = Object.keys(sequences).length;

  const result = hasSubArrays({
    data: data,
    debug: false,
    end,
    start,
    subarrays: sequences,
    threshold
  });
  if (debug) console.log("[has-bytes] result from hasSubArrays is", result);
  return result;
};
