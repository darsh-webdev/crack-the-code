/*
    Problem Statement: Given an unsorted integer array nums, return the smallest positive integer 
    that is not present in the nums. The implementation must be an algorithm that runs in O(n) 
    time and uses O(1) auxiliary space. 
*/

function firstMissingPositive(nums) {
  const n = nums.length;

  // Replace invalid numbers
  for (let i = 0; i < n; i++) {
    if (nums[i] <= 0 || nums[i] > n) {
      nums[i] = n + 1;
    }
  }

  // Mark presence with negative signs
  for (let i = 0; i < n; i++) {
    const num = Math.abs(nums[i]);
    if (num <= n && nums[num - 1] > 0) {
      nums[num - 1] = -nums[num - 1];
    }
  }

  // Find first positive (unmarked) position
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      return i + 1;
    }
  }

  return n + 1;
}

console.log(firstMissingPositive([1, 2, 0])); // Output: 3
export default firstMissingPositive;
