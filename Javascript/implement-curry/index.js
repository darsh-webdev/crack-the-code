/*
    Problem Statement: Create a curry function that accepts a function fn and
    returns a curried version of it. The curried function should accept arguments
    one at a time until all arguments required by fn are provided, at which point
    it should invoke fn with the collected arguments and return the result.
*/

function curry(fn) {
  return function curried(...args) {
    // If enough arguments have been provided, call original function
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // Otherwise, return a function that takes more arguments
    return function (...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

function sum(a, b, c) {
  return a + b + c;
}

// Pass appropriate input in below function call
const curriedSum = curry(sum);
//For the purpose of user debugging.
console.log(curriedSum(1)(2)(3)); // Outputs: 6
export default curry;
