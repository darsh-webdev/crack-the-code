setTimeout(() => {
  console.log("First Callback");
}, 0);

setTimeout(() => {
  console.log("Second Callback");
}, 0);

setTimeout(() => {
  console.log("Third Callback");
}, 0);

/*
Output:

First Callback
Second Callback
Third Callback

Callback Queue follows FIFO:
First In, First Out.
*/
