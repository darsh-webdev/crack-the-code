/*
    Problem Statement: Write a function that takes an array of numbers and returns the 
    largest number. If the array is empty, return null.
*/

function findLargest(arr) {
  if (!Array.isArray(arr)) return false;
  if (arr.length === 0) return null;

  let largest;
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (typeof value !== "number" || !Number.isFinite(value)) return false;
    if (largest === undefined || value > largest) largest = value;
  }
  return largest;
}

//For the purpose of user debugging.
console.log(findLargest([5, 2, 8, 1, -9]));
console.log(findLargest([]));
console.log(findLargest([5.5, -2.2, -8.8, 0, 0, "1"]));

export default findLargest;
