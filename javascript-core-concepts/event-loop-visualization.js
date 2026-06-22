console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

console.log("3");

/*
Execution Flow:

Call Stack:
console.log(1)

Web APIs:
setTimeout

Call Stack:
console.log(3)

Callback Queue:
console.log(2)

Event Loop:
Moves callback to Call Stack

Output:

1
3
2
*/
