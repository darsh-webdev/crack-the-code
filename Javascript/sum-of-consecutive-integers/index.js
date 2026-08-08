/*
    Problem Statement: Given a number n, determine whether it can be expressed as the sum 
    of two or more consecutive positive integers. Return true or false.
*/
function isSumOfConsecutive(n) {
  if (n < 2) return false;

  for (let k = 2; (k * (k + 1)) / 2 <= n; k++) {
    const numerator = n - (k * (k - 1)) / 2;
    if (numerator % k === 0) return true;
  }

  return false;
}

// For user debugging purposes
console.log(isSumOfConsecutive(9)); // true (2 + 3 + 4)
export default isSumOfConsecutive;
