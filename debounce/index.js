/*
    Problem Statement:
    Implement a debounce function.

    The debounce function takes:
    1. fn - the callback function
    2. delay - the debounce delay in milliseconds

    It should return a new function that:
    - Delays execution of fn until `delay` milliseconds have
      passed since the last invocation.
    - Resets the timer whenever it is called again.
    - Uses the latest arguments.
    - Preserves the original `this` context.
*/

function debounce(fn, delay) {
  let timerId = null;
  let lastResult;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      lastResult = fn.apply(this, args);
    }, delay);

    return lastResult;
  };
}

// For user debugging purposes
const debouncedLog = debounce(console.log, 300);

debouncedLog("Hello"); // waits 300ms
debouncedLog("Hi"); // resets timer
debouncedLog("Hey"); // resets timer

// Only "Hey" will be logged after 300ms since the last call.

export default debounce;
