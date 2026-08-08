/*
    Problem Statement: Write a function that takes a number n, and returns the sum of the first n numbers.
    return false for invalid inpurts (negative numbers, non-integer numbers, and non-number inputs).
*/

// Solution using recursion
function sumN(n) {
  if (typeof n !== "number" || n < 0 || !Number.isInteger(n)) {
    return false;
  }
  if (n === 0) return 0;
  return n + sumN(n - 1);
}

//For the purpose of user debugging.
console.log(sumN(5));
console.log(sumN(-5));
console.log(sumN(5.5));
console.log(sumN("5"));

export default sumN;
