/*
    Problem Statement:
    Implement a throttle function that limits how often a callback
    can be executed.

    The throttled function should:
    1. Execute immediately on the first call.
    2. Ignore subsequent calls during the delay period.
    3. Execute again only after the delay has elapsed.
    4. Return the callback's return value when executed.
*/

function throttle(func, delay) {
  let lastExecutionTime = 0;
  let lastResult;

  return function (...args) {
    const now = Date.now();

    if (now - lastExecutionTime >= delay) {
      lastExecutionTime = now;
      lastResult = func.apply(this, args);
    }

    return lastResult;
  };
}

const throttledFunction = throttle(() => console.log("Function called!"), 1000);

// Example usage:
throttledFunction(); // Executes immediately
throttledFunction(); // Ignored
throttledFunction(); // Ignored
// .... after 1000ms
throttledFunction(); // Executes again
throttledFunction(); // Ignored

export default throttle;
