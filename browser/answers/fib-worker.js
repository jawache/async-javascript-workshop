function fib(x) {
  if (x <= 0) return 0;
  if (x == 1) return 1;
  return fib(x - 1) + fib(x - 2);
}

onmessage = function(e) {
  console.log("Worker recieved message", e);
  let num = parseInt(e.data);
  console.log(num);
  let res = fib(num);
  console.log("Worker posting message back");
  postMessage(res);
};
