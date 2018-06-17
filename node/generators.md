# Generators

## RunToCompletion vs RunStopRun

* We've assumed something fundamental, one a function starts running it will complete/error/return before any other JS code can run.
* A _generator_ is a function that can be paused in the middle of running, let you do something else, and then resumed later on from exactly the point it was paused.
* Nothing can pause a generator from the outside, only a generator can pause itself by using the `yield` keyword.
* Once it's yielded though only the code it yielded to can resume it's function.

## Simple example to show how yield can pause execution midflow

```js
function* demo() {
  console.log("1");
  yield;
  console.log("2");
}
console.log("start");
const it = demo(); // Doesn't execute the body of the function
console.log("before iteration");
console.log(it.next()); // Executes generator and prints out whats yielded
console.log(it.next()); // Returns done: true
console.log(it.next()); // Returns same ended iterator
console.log("after iteration");
```

## How to pass out data with yield

```js
function* range() {
  for (let i = 0; i < 4; i++) {
    yield i; // <-- We can return data from yield
  }
  yield "moo";
  return "foo";
}
const it = range();
console.log(it.next()); // Prints the object
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
```

## Use as an Iterator

```js
function* range() {
  for (let i = 0; i < 10; i++) {
    yield i;
  }
}

for (let x of range()) {
  console.log(x); // Just prints the value
}
```

## yield can be used to communicate both ways

```js
function* sayWhat() {
  console.log(yield);
  console.log("World");
}
const it = sayWhat();
it.next(); // First yield, pauses
it.next("Hello"); // Can pass in data again
```

## Custom Async Generators

We can combine `generators` and `for-await-of` into new interesting contructs like so:

```js
function* range() {
  for (let i = 0; i < 10; i++) {
    yield Promise.resolve(i);
  }
}

(async () => {
  for (let x of range()) {
    console.log(x); // <-- This just prints out the promise
  }
})();
```

The above just prints out the promise, you can await it if you want but you can also await in the iterator itself

```js
function* range() {
  for (let i = 0; i < 10; i++) {
    yield Promise.resolve(i);
  }
}

(async () => {
  for await (let x of range()) {
    // <-- Await in the iterator
    console.log(x);
  }
})();
```

<!-- 🤔🤔🤔🤔🤔 QUIZ 1 🤔🤔🤔🤔🤔 -->
