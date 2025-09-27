/*
    Problem Statement: Given an integer n, return true if it is a power of two. 
    Otherwise, return false. An integer n is a power of two, if there exists an 
    integer x such that n == 2^x.
*/
function isPowerOfTwo(n) {
  if (n < 1) return false;

  while (n % 2 === 0) {
    n = n / 2;
  }

  return n === 1;
}

export default isPowerOfTwo;
