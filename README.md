# has-bytes
Quickly Determine if a File has Certain Byte Sequences

# background
You can use this to quickly identify a file type

# install
```bash
npm install has-bytes
```

# usage
```javascript
const fs = require("fs");
const hasBytes = require("./has-bytes");

const buffer = fs.readFileSync("./data/flower.jpg");
const { result } = hasBytes({
    data: buffer,
    debug: false, // set debug to true for increased logging
    sequences: {
        magic: [255, 216, 255], // magic number (including start of file)
        EOI: [0xFF, 0xD9] // end of file indicator
    }
});
// result is true
```