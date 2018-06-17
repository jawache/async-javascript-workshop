# Answer 1

This version answers the brief but is less efficient because each file is loaded in sequence, one at a time.

```js
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const files = ["./files/demofile.txt", "./files/demofile.other.txt"];

(async () => {
  for (let name of files) {
    console.log(await readFile(name, "utf8")); // <-- One file loaded at a time, instead of all files at once
  }
})();
```

This version is far more efficient, using `Promise.all` means we load both files in parralel.

```js
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const files = ["./files/demofile.txt", "./files/demofile.other.txt"];

(async () => {
  let promises = files.map(name => readFile(name, { encoding: "utf8" }));
  let values = await Promise.all(promises);
  console.log(values);
})();
```

# Answer 2

```js
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const fileIterator = files => ({
  [Symbol.asyncIterator]: () => ({
    x: 0,
    next() {
      if (this.x >= files.length) {
        return {
          done: true
        };
      }
      let file = files[this.x++];
      return readFile(file, "utf8").then(data => ({
        done: false,
        value: data
      }));
    }
  })
});

const files = ["./files/demofile.txt", "./files/demofile.other.txt"];

(async () => {
  for await (let x of fileIterator(files)) {
    console.log(x);
  }
})();
```
