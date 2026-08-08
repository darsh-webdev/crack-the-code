/*
    Problem Statement: Write a function that takes an array of numbers and returns the 
    sum of all the numbers in the array. 
*/

function sumArray(arr) {
  function helper(i) {
    if (i === arr.length) return 0;
    return arr[i] + helper(i + 1);
  }
  return helper(0);
}

//For the purpose of user debugging.
console.log(sumArray([5, 2, 8, 1, -9]));
console.log(sumArray([]));
console.log(sumArray([5.5, -2.2, -8.8, 0, 0]));

export default sumArray;
