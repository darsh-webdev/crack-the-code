console.log("Start");

setTimeout(() => {
  console.log("Async Callback");
}, 0);

// Simulate expensive synchronous work
for (let i = 0; i < 1_000_000_000; i++) {}

console.log("End");

/*
Output:

Start
End
Async Callback

Synchronous code blocks
asynchronous callbacks.
*/
