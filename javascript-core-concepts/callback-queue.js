console.log("Start");

setTimeout(() => {
  console.log("Callback");
}, 0);

console.log("End");

/*
Output:

Start
End
Callback

Flow:

Call Stack
  ↓
Web APIs
  ↓
Callback Queue
  ↓
Event Loop
  ↓
Call Stack
*/
