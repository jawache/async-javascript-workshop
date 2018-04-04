var counter = 0;
var counter2 = 0;

function adj() {
  document.getElementById("thing").textContent = counter2;
}

function log() {
  console.log(`st ${counter2} raf ${counter}`);
}

function loop1() {
  counter++;
  log();
  requestAnimationFrame(loop1);
}

function loop2() {
  counter2++;
  log();
  adj();
  setTimeout(loop2, 0);
}

function main() {
  loop1();
  loop2();
}
