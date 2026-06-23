console.log("Before Timer");

setTimeout(() => {
  console.log("Timer Finished");
}, 1000);

console.log("After Timer");

/*
setTimeout is NOT part of JavaScript.

It is provided by Browser Web APIs.

JavaScript delegates timer handling
to the browser.
*/

/*
Execution Flow:

Call Stack:
  console.log("Before Timer")

Web APIs:
  setTimeout registers timer

Call Stack:
  console.log("After Timer")

After 1s:
  callback enters Callback Queue

Event Loop:
  waits for empty Call Stack

Call Stack:
  console.log("Timer Finished")

Output:

Before Timer
After Timer
Timer Finished
*/
