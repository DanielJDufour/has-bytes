const test = require("ava");
const fs = require("fs");
const hasBytes = require("./has-bytes");

test("random picture of a flower has specific bytes", t => {
  const buffer = fs.readFileSync("./data/flower.jpg");
  const { found, result, threshold, tree } = hasBytes({
    data: buffer,
    debug: false,
    sequences: {
      magic: [255, 216, 255],
      EOI: [0xff, 0xd9]
    }
  });
  t.true(result);
  t.is(threshold, 2);
  t.is(found, 2);
  t.deepEqual(tree, { 255: { 216: {} } });
});

test("GeoTIFF with 1 missing sequence", t => {
  const buffer = fs.readFileSync("./data/geo.tif");
  const { found, result, threshold, tree } = hasBytes({
    data: buffer,
    debug: false,
    sequences: {
      ModelPixelScaleTag: [14, 131], // 0x830E
      ModelTiepointTag: [130, 132], // 0x8482
      missing: [123321]
    },
    threshold: 2
  });
  t.true(result);
  t.is(threshold, 2);
  t.is(found, 2);
  t.deepEqual(tree, { 123321: "missing", 130: {}, 14: {} });
});
