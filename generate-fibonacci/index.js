/*
    Problem Statement: Given an integer n, return an array containing the first
    n Fibonacci numbers, starting from 0.
*/

function generateFibonacci(n) {
  // Check for invalid inputs
  if (n <= 0 || !Number.isInteger(n)) return [];

  // Handle base cases
  if (n <= 1) return [0];
  if (n === 2) return [0, 1];

  const seq = generateFibonacci(n - 1);
  const next = seq[seq.length - 1] + seq[seq.length - 2];
  return [...seq, next];
}

// For user debugging
console.log(generateFibonacci(10)); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
export default generateFibonacci;
