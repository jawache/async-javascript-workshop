# Answer 1

```js
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

function* fileLoader(files) {
  const promises = files.map(name => readFile(name, "utf8"));
  for (let promise of promises) {
    yield promise;
  }
}

(async () => {
  for await (let contents of fileLoader([
    "./files/demofile.txt2",
    "./files/demofile.other.txt"
  ])) {
    console.log(contents);
  }
})();
```
