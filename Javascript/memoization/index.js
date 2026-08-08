/*
    Problem Statement:
    Implement a memoize function that takes a function `fn`
    and returns a memoized version of it.

    The memoized function should:
    - Cache results based on the arguments passed.
    - Return cached results for repeated calls.
    - Support any number of arguments.
    - Support different argument types.
*/

function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    // Create a unique key from arguments
    const key = JSON.stringify(args);

    // Return cached value if present
    if (cache.has(key)) {
      return cache.get(key);
    }

    // Compute result and cache it
    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
}

// For user debugging purposes
function expensiveFunction(a, b) {
  console.log("Computing...");
  return a + b;
}

const memoizedExpensiveFunction = memoize(expensiveFunction);

console.log(memoizedExpensiveFunction(1, 2));
// Computing...
// 3

console.log(memoizedExpensiveFunction(1, 2));
// 3 (from cache)

export default memoize;
