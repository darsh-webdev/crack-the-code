/*
    Problem Statement: Write a function that takes an array of unique integers ranging 
    from 0 to n (inclusive) with one number (exactly one) missing, and returns the missing number.
*/

function findMissingNumber(nums) {
  const len = nums.length;
  const expectedSum = (len * (len + 1)) / 2;
  const actualSum = nums.reduce((acc, num) => acc + num, 0);

  return expectedSum - actualSum;
}

//For the purpose of user debugging.
console.log(findMissingNumber([0, 2, 3, 4, 5, 6, 7, 8, 1, 10]));

export default findMissingNumber;
