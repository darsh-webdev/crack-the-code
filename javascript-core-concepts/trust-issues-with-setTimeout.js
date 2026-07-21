/*

Key Learnings:

1. setTimeout() is NOT part of JavaScript.
   It is provided by Browser Web APIs.

2. setTimeout(delay) guarantees ONLY a
   minimum delay.

3. The callback does NOT execute immediately
   after the timer expires.

4. After the timer expires:
      Web APIs
          ↓
      Callback Queue
          ↓
      Event Loop
          ↓
      Call Stack
          ↓
      Callback executes

5. If the Call Stack is busy,
   the callback waits in the Callback Queue.

6. JavaScript never interrupts synchronous
   code to execute a callback.

7. setTimeout() timing should never be
   considered exact.
*/

console.log("Program Started");

setTimeout(() => {
  console.log("Timer Callback Executed");
}, 2000);

console.log("Simulating heavy synchronous work...");

// Blocking the main thread
for (let i = 0; i < 1_000_000_000; i++) {}

console.log("Heavy Work Finished");

/*
Expected Output:

Program Started
Simulating heavy synchronous work...
Heavy Work Finished
Timer Callback Executed

------------------------------------------------

Execution Flow

1. Global Execution Context is created.

2. console.log("Program Started")
   executes immediately.

3. setTimeout() is delegated to
   Browser Web APIs.

4. Browser starts a 2-second timer.

5. JavaScript continues executing the
   synchronous for-loop.

6. Even if the timer expires during
   the loop, the callback CANNOT execute.

7. The callback enters the Callback Queue.

8. The Event Loop waits until the
   Call Stack becomes empty.

9. The callback is moved from the
   Callback Queue to the Call Stack.

10. Finally,
    "Timer Callback Executed"
    is printed.

------------------------------------------------

Important Takeaway

setTimeout(2000)

DOES NOT mean

"Execute after exactly 2000ms"

It means

"Do not execute BEFORE 2000ms."

Actual execution time depends on:

✔ Timer completion
✔ Callback Queue
✔ Event Loop
✔ Call Stack availability
*/
