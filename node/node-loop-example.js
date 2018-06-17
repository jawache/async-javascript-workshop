console.log("start");
const interval = setInterval(() => {
  debugger;
  console.log("setInterval");
}, 0);

setTimeout(() => {
  debugger;
  console.log("setTimeout 1");
  Promise.resolve()
    .then(() => {
      debugger;
      console.log("promise 3");
    })
    .then(() => {
      debugger;
      console.log("promise 4");
    })
    .then(() => {
      setTimeout(() => {
        debugger;
        console.log("setTimeout 2");
        Promise.resolve()
          .then(() => {
            debugger;
            console.log("promise 5");
          })
          .then(() => {
            debugger;
            console.log("promise 6");
          })
          .then(() => {
            debugger;
            clearInterval(interval);
          });
      });
    });
});

Promise.resolve()
  .then(() => {
    debugger;
    console.log("promise 1");
  })
  .then(() => {
    debugger;
    console.log("promise 2");
  });

console.log("end");
