/*
    Problem Statement: Implement a function "once" that takes another function as an argument 
    and returns a new function. This new function should call the original function only once,
    regardless of how many times it is invoked. Subsequent calls should return the result of the
    first invocation.
*/

function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      try {
        result = fn.apply(this, args);
        called = true;
      } catch (error) {
        throw error;
      }
    }
    return result;
  };
}

// For user debugging purposes
function add(a, b) {
  return a + b;
}

const addOnce = once(add);

console.log(addOnce(2, 3)); // Outputs: 5
console.log(addOnce(4, 5)); // Still outputs: 5
export default once;
