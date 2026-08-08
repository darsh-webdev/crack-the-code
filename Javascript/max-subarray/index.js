/*
    Problem Statement: Given an integer array nums, find the contiguous subarray
    which has the largest sum and return its sum.
*/
function maxSubArray(nums) {
  let currSum = 0;
  let maxSum = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < nums.length; i++) {
    currSum = Math.max(nums[i], currSum + nums[i]);
    maxSum = Math.max(maxSum, currSum);

    if (currSum < 0) currSum = 0;
  }

  return maxSum;
}

// For user debugging purposes
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
export default maxSubArray;
