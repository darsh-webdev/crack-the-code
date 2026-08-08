/*
    Problem Statement: Write a function that takes an array of numbers and returns the smallest
    number in the array. If the array is empty, return null.
*/

function findSmallest(arr) {
  if (!Array.isArray(arr)) return false;
  if (arr.length === 0) return null;

  let min;
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (typeof value !== "number" || !Number.isFinite(value)) return false;
    if (min === undefined || value < min) min = value;
  }
  return min;
}

//For the purpose of user debugging.
console.log(findSmallest([5, 2, 8, 1, -9]));
console.log(findSmallest([]));
console.log(findSmallest([5.5, 2.2, 8.8]));

export default findSmallest;
