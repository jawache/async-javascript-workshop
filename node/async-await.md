# Async/Await

## How to create

```js
const doAsyncTask = () => Promise.resolve("done");
```

When using promises we attach a then

```js
const doAsyncTask = () => Promise.resolve("done");
doAsyncTask().then(val => console.log(val));
console.log("here"); // <-- this is called first!
```

When using async/await we don't need to attach a then

```js
const doAsyncTask = () => Promise.resolve("done");
async function asim() {
  // <-- mark it as `async`
  let value = await doAsyncTask(); // <-- Don't need to call .then
  console.log(value);
}
asim();
```

can write that as an IFFE

```js
const doAsyncTask = () => Promise.resolve("done");
(async function() {
  // <-- IIFE, note the async
  let value = await doAsyncTask(); // <-- Don't need to call .then
  console.log(value);
})();
```

Also it blocks

```js
const doAsyncTask = () => Promise.resolve("1");
(async function() {
  let value = await doAsyncTask();
  console.log(value);
  console.log("2"); //----> This waits before it's printed
})();
```

vs. without the await, it prints the other way round

```js
const doAsyncTask = () => Promise.resolve("1");
(async function() {
  doAsyncTask().then(console.log);
  console.log("2");
})();
```

## Async functions return a promise

```js
const doAsyncTask = () => Promise.resolve("1");
let asyncFunction = async function() {
  let value = await doAsyncTask();
  console.log(value);
  console.log("2");
  return "3"; // Whatever we return is like a resolve
};
asyncFunction().then(v => console.log(v)); // We can attach a then to it
```

## Handling Errors

- Because it's now sync we can use try/catch, the catch value is what was returned in the reject

```js
const doAsyncTask = () => Promise.reject("error");
const asyncFunction = async function() {
  try {
    const value = await doAsyncTask();
  } catch (e) {
    console.error("Moo: ", e);
    return;
  }
};
asyncFunction();
```

<!-- 🤔🤔🤔🤔🤔 QUIZ 1 🤔🤔🤔🤔🤔 -->

## Blocking != Fast

But since it's blocking, it can be inefficient, take for example the act of loading multiple files

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

## Async isn't magic

What does the below code print?

```js
async function printLine1() {
  console.log("1");
}

async function printLine2() {
  console.log("2");
}

async function main() {
  printLine1();
  printLine2();
}
main();
console.log("Finished");
```

## Async Iterators

This feature is still in experimental phases, it hasn't been fully rolled out to all browser and it's only avaiable in node at least 9.1 behind a flag.

It's a subtle difference, but now you can iterate over iterators that return promises, like so:

`node --harmony-async-iteration working.js`

```js
(async () => {
  const util = require("util");
  const fs = require("fs");
  const readFile = util.promisify(fs.readFile);

  const files = ["./files/demofile.txt", "./files/demofile.other.txt"];
  const promises = files.map(name => readFile(name, "utf8"));
  for await (let content of promises) {
    //<-- See the await is on the for
    console.log(content);
  }
})();
```

## Custom Iterators

We can loop over a pre-built array of promises with `for-await-of`.

An array is an iterator, which just means that it's an object that has a property with name `Symbol.iterator` that points to an object with a `next()` function that returns an object with `{ done: false, value: ? }` for each value. When you want the iterator to complete just return `done: true` instead.

Then you can use it where you would use any iterator, like `for-of`.

```js
const customIterator = () => ({
  [Symbol.iterator]: () => ({
    x: 0,
    next() {
      if (this.x > 100) {
        return {
          done: true,
          value: this.x
        };
      }
      return {
        done: false,
        value: this.x++
      };
    }
  })
});

for (let x of customIterator()) {
  console.log(x);
}
```

## Custom Async Iterators

We can also use custom iterators with the new `for-await-of` syntax by using `Symbol.asyncIterator` and making sure the value returned is a `Promise`, like so:

```js
const customAsyncIterator = () => ({
  [Symbol.asyncIterator]: () => ({
    x: 0,
    next() {
      if (this.x > 100) {
        return Promise.resolve({
          done: true,
          value: this.x
        });
      }

      let y = this.x++;

      return Promise.resolve({
        done: false,
        value: y
      });
    }
  })
});

(async () => {
  for await (let x of customAsyncIterator()) {
    console.log(x);
  }
})();
```

<!-- 🤔🤔🤔🤔🤔 QUIZ 2 🤔🤔🤔🤔🤔 -->
