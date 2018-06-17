# Answer 1

Create a promise version of the async readFile

```js
const fs = require("fs");
// const util = require("util");

// const readFile = util.promisify(fs.readFile);

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}
readFile("./files/demofile.txt", "utf-8").then(
  data => console.log("File Read", data),
  err => console.error("Failed To Read File", err)
);
```

# Answer 2

```js
const fs = require("fs");
const zlib = require("zlib");
const util = require("util");

// const readFile = util.promisify(fs.readFile);
// const gzip = util.promisify(zlib.gzip);

function gzip(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

// Starting to look like callback hell?
readFile("./files/demofile.txt", "utf-8").then(
  data => {
    gzip(data).then(
      res => console.log(res),
      err => console.error("Failed To Zip", err)
    );
  },
  err => console.error("Failed To Read", err)
);
```

# Answer 3

```js
const fs = require("fs");
const zlib = require("zlib");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const gzip = util.promisify(zlib.gzip);

readFile("./files/demofile.txt", "utf-8")
  .then(
    data => {
      return gzip(data);
    },
    err => {
      console.error("Failed To Read", err);
    }
  )
  .then(
    data => {
      console.log(data);
    },
    err => {
      console.error("Failed To Zip", err);
    }
  );
```

# Answer 4

```js
const fs = require("fs");
const zlib = require("zlib");
const util = require("util");

function gzip(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

readFile("./demofile.txt2", "utf-8")
  .then(data => {
    return gzip(data);
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error("Failed", err);
  });
```

- Again, throw doesn't work as you expect.

```js
const fs = require("fs");
const zlib = require("zlib");
const util = require("util");

function gzip(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) throw err; // <-- Same as before this doesn't work, it's async
      resolve(data);
    });
  });
}

readFile("./demofile.txt2", "utf-8")
  .then(data => {
    return gzip(data);
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error("Failed", err);
  });
```

# Answer 5

```js
function readFileFake(sleep) {
  return new Promise(resolve => setTimeout(resolve, sleep, "read"));
}

function timeout(sleep) {
  return new Promise((_, reject) => setTimeout(reject, sleep, "timeout"));
}

Promise.race([readFileFake(5000), timeout(1000)])
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

# Answer 6

```js
function authenticate() {
  console.log("Authenticating");
  return new Promise(resolve => setTimeout(resolve, 2000, { status: 200 }));
}

function publish() {
  console.log("Publishing");
  return new Promise(resolve => setTimeout(resolve, 2000, { status: 403 }));
}

function timeout(sleep) {
  return new Promise((resolve, reject) => setTimeout(reject, sleep, "timeout"));
}

Promise.race([publish(), timeout(1000)])
  .then(res => {
    if (res.status === 403) {
      return authenticate();
    }
    return res;
  })
  .then(res => {
    // Process save responce
    console.log("Published");
  })
  .catch(err => {
    if (err === "timeout") {
      console.error("Request timed out");
    } else {
      console.error(err);
    }
  });
```

Alternative answer with safePublish returning a publish promise

```js
function authenticate() {
  console.log("Authenticating");
  return new Promise(resolve => setTimeout(resolve, 2000, { status: 200 }));
}

function publish() {
  console.log("Publishing");
  return new Promise(resolve => setTimeout(resolve, 2000, { status: 403 }));
}

function timeout(sleep) {
  return new Promise((resolve, reject) => setTimeout(reject, sleep, "timeout"));
}

function safePublish() {
  return publish().then(res => {
    if (res.status === 403) {
      return authenticate();
    }
    return res;
  });
}

Promise.race([safePublish(), timeout(1000)])
  .then(res => {
    // Process save responce
    console.log("Published");
  })
  .catch(err => {
    if (err === "timeout") {
      console.error("Request timed out");
    } else {
      console.error(err);
    }
  });
```
