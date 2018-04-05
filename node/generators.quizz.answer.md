# Answer 1

```js
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const fileLoader = files => ({
  [Symbol.asyncIterator]: () => ({
    x: 0,
    next() {
      let file = files[this.x++];
      return readFile(file, "utf8");
    }
  })
});

(async () => {
  for await (let contents of fileLoader([
    "./demofile.txt",
    "./demofile.other.txt"
  ])) {
    console.log(contents);
  }
})();
```
