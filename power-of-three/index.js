/*
    Problem Statement: Given an integer n, return true if it is a power of three. 
    Otherwise, return false. An integer n is a power of three, if there exists an
    integer x such that n == 3^x.
*/

function isPowerOfThree(n) {
  if (n <= 0) return false;

  while (n % 3 === 0) {
    n = n / 3;
  }

  return n === 1;
}

// For user debugging purposes
console.log(isPowerOfThree(27)); // true
export default isPowerOfThree;
