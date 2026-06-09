/*
    Problem Statement: Write a function that takes an array of numbers and returns the count
    of elements strictly less than zero. If the array is empty, return null.
*/

function countNegative(arr) {
  if (!Array.isArray(arr)) return false;
  if (arr.length === 0) return 0;

  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (typeof value !== "number" || !Number.isFinite(value)) return false;
    if (value < 0) count++;
  }
  return count;
}

//For the purpose of user debugging.
console.log(countNegative([5, 2, 8, 1, -9]));
console.log(countNegative([]));
console.log(countNegative([5.5, -2.2, -8.8, 0, 0, "1"]));

export default countNegative;
