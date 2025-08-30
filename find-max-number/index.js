/*
    Problem Statement: Write a function that takes an array of numbers as input and returns 
    the maximum number in the array. If the array is empty, return null.
*/

function findMaxNumber(arr) {
  if (arr.length === 0) return null;

  let maxNum = arr[0];
  for (const num of arr) {
    if (num > maxNum) {
      maxNum = num;
    }
  }

  return maxNum;
}

//For the purpose of user debugging.
console.log(findMaxNumber([1, 2, 3, 4, 5]));
console.log(findMaxNumber([-10, -20, -3, -4, -1]));
export default findMaxNumber;
