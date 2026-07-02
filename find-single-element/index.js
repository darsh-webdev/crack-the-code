/*
    Problem Statement: Given a sorted array of integers where every element appears
    twice, except for one element which appears only once. Find and return that single
    element that appears only once. 
*/

function findSingleElement(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    // Ensure mid is even
    if (mid % 2 === 1) {
      mid--;
    }

    // Pair is valid, so single element is on the right
    if (arr[mid] === arr[mid + 1]) {
      left = mid + 2;
    } else {
      // Pair is broken, single element is on the left (including mid)
      right = mid;
    }
  }

  return arr[left];
}

// For user debugging purposes
console.log(findSingleElement([1, 1, 2]));

export default findSingleElement;
