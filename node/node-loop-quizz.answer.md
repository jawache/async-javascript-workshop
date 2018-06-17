# Answer 1

```js
console.log("start");
const interval = setInterval(() => {
  console.log("setInterval 1");
  Promise.resolve()
    .then(() => {
      console.log("promise 1");
    })
    .then(() => {
      console.log("promise 2");
      clearInterval(interval);
    });
}, 0);

console.log("end");
```

# Answer 2

```js
console.log("start");
const interval = setInterval(() => {
  console.log("setInterval 1");
  Promise.resolve()
    .then(() => {
      console.log("promise 1");
      setImmediate(() => {
        console.log("setImmediate 1");
        Promise.resolve()
          .then(() => {
            console.log("promise 3");
          })
          .then(() => {
            console.log("promise 4");
          })
          .then(() => {
            clearInterval(interval);
          });
      });
      process.nextTick(() => console.log("processNextTick 1"));
    })
    .then(() => {
      console.log("promise 2");
    });
}, 0);

console.log("end");
```
