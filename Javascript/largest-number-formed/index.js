/*
    Problem Statement: Write a function that takes an array of non-negative integers
    and arranges them to form the largest possible number. Given an array of integers,
    rearrange them such that when concatenated, they form the maximum possible numeric value.
*/

function formLargestNumber(arr) {
  // Convert numbers to strings and sort them based on custom comparator
  const sortedNums = arr
    .map((num) => num.toString())
    .sort((a, b) => b + a - (a + b));

  // If all numbers are zeros, return "0"
  if (sortedNums[0] === "0") {
    return "0";
  }

  // Join sorted strings to form the largest number
  return sortedNums.join("");
}

const input = [3, 30, 34, 5, 9];
console.log(formLargestNumber(input)); // Output: "9534330"
export default formLargestNumber;
